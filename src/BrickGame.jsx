import { useState } from "react";
import Screen from "./Screen";

const BrickGame = () => {
  const zeros = Array(10).fill(0);
  const [screen, setScreen] = useState(Array.from({ length: 10 }, () => zeros));

  return <Screen screen={screen} />;
};

export default BrickGame;
