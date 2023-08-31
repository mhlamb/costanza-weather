import { ChangeEvent } from "react";

interface Props {
  term: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Search = ({ term, onInputChange, onSearch }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter a city"
        value={term}
        onChange={onInputChange}
      />
      <button onClick={onSearch}>Search</button>
    </>
  );
};

export default Search;
