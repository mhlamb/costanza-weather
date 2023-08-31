import { temperatures } from "../images/images";

interface Props {
  temp: number;
}

const ImageBox = ({ temp }: Props) => {
  const temperature = temperatures[temp];
  return (
    <>
      <h2>{temperature.name}</h2>
      <img src={temperature.image} alt="COLD" height="300" width="400" />
    </>
  );
};

export default ImageBox;
