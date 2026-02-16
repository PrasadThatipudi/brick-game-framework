import { useState } from "react";
import Screen from "./screen/Screen";
import GameControls from "./controls/GameControls";

const BrickGame = () => {
  const zeros = Array(10).fill(0);
  const [screen, setScreen] = useState(Array.from({ length: 10 }, () => zeros));

  return (
    <div>
      <Screen screen={screen} />
      <GameControls />
    </div>
  );
};

export default BrickGame;
