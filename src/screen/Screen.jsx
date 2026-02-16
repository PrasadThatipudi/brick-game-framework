import PixelRow from "./PixelRow";

const Screen = ({ screen }) => {
  const height = screen.length;

  const rows = Array.from({ length: height }, (_, rowIndex) => {
    return <PixelRow row={screen[rowIndex]} key={rowIndex} />;
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Screen;
