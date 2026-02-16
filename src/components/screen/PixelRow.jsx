import PixelBox from "./PixelBox";

const PixelRow = ({ row }) => {
  const pixelRow = Array.from({ length: row.length }, (_, index) => (
    <PixelBox
      key={index}
      backgroundColor={row[index] ? "black" : "whitesmoke"}
    />
  ));

  return <tr>{pixelRow}</tr>;
};

export default PixelRow;
