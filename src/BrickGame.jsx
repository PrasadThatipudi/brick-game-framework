import { useState } from "react";
import Screen from "./components/screen/Screen";
import GameControls from "./components/controls/GameControls";

const BrickGame = ({ arrows, initialScreen }) => {
  const [screen, setScreen] = useState(initialScreen);
  const arrowControls = {
    up: () => setScreen(arrows.up()),
    right: () => setScreen(arrows.right()),
    down: () => setScreen(arrows.down()),
    left: () => setScreen(arrows.left()),
  };

  return (
    <div>
      <Screen screen={screen} />
      <GameControls arrowControls={arrowControls} />
    </div>
  );
};

export default BrickGame;
