import PixelBox from "./PixelBox";

const PixelRow = ({ length }) => {
  const row = Array.from({ length }, (_, index) => <PixelBox key={index} />);

  return <tr>{row}</tr>;
};

export default PixelRow;
