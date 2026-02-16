import Arrow from "./Arrow";

const ArrowControls = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "200px",
        justifyContent: "space-around",
      }}
    >
      <Arrow text={"⬆️"} />
      <Arrow text={"➡️"} />
      <Arrow text={"⬇️"} />
      <Arrow text={"⬅️"} />
    </div>
  );
};

export default ArrowControls;
