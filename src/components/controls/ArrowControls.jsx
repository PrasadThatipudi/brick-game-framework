import Arrow from "./Arrow";

const ArrowControls = ({ arrowControls: { up, down, left, right } }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "200px",
        justifyContent: "space-around",
      }}
    >
      <Arrow text={"⬆️"} onClick={up} />
      <Arrow text={"➡️"} onClick={right} />
      <Arrow text={"⬇️"} onClick={down} />
      <Arrow text={"⬅️"} onClick={left} />
    </div>
  );
};

export default ArrowControls;
