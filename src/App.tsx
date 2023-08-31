import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import axios from "axios";
import ImageBox from "./components/ImageBox";

const API_KEY = "0aa3f952ad534505325b649b28888820";

type Coords = {
  lat: number;
  lon: number;
};

type Weather = {
  name: string;
  temp: number;
  weather: string;
  description: string;
  image: number;
};

function App() {
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setTerm(event.target.value);
    }
  };

  const handleSearch = () => {
    if (term !== "") setQuery(term);
  };

  useEffect(() => {
    if (query) {
      // get lat and lon
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
        )
        .then((res) => res.data[0])
        .then((data) => {
          setCoords({ lat: data.lat, lon: data.lon });
        });
    }
  }, [query]);

  useEffect(() => {
    // get weather
    if (coords) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);

          setWeather({
            name: data.name,
            temp: parseFloat(data.main.temp),
            weather: data.weather[0].main,
            description: data.weather[0].description,
            image: getWeatherImage(parseFloat(data.main.temp)),
          });
        });
    }
  }, [coords]);

  const getWeatherImage = (temp: number) => {
    if (temp <= 7) {
      return 0;
    } else if (temp > 7 && temp <= 12) {
      return 1;
    } else if (temp > 12 && temp <= 16) {
      return 2;
    } else if (temp > 16 && temp <= 21) {
      return 3;
    } else if (temp > 21 && temp <= 26) {
      return 4;
    } else if (temp > 26 && temp <= 30) {
      return 5;
    } else {
      return 6;
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="title">
          <h1>Costanza Weather</h1>
        </div>

        <div className="searchbar">
          <Search
            term={term}
            onInputChange={handleInputChange}
            onSearch={handleSearch}
          />
        </div>

        {weather && (
          <div className="image-container">
            <h2>{query && query}</h2>
            <h4>Temperature: {weather.temp}°C</h4>
            <h4>Weather: {weather.description}</h4>

            <ImageBox temp={weather.image} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
