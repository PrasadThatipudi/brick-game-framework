import Arrow from "./Arrow";

const ArrowControls = ({ arrowControls: { up, down, left, right } }) => {
  const extractArrowKey = (keyName) => keyName.split("Arrow")[1].toLowerCase();

  document.onkeydown = (event) => {
    const actions = {
      up,
      down,
      left,
      right,
    };

    actions[extractArrowKey(event.key)]();
  };
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
