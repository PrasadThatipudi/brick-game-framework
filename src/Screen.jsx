import PixelRow from "./PixelRow";

const Screen = ({ width, height }) => {
  const rows = Array.from({ length: height }, (_, index) => {
    return <PixelRow length={width} key={index} />;
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Screen;
