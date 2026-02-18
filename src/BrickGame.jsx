import { useState } from "react";
import Screen from "./components/screen/Screen";
import GameControls from "./components/controls/GameControls";

const BrickGame = ({ arrowControls, screen }) => {
  return (
    <div>
      <Screen screen={screen} />
      <GameControls arrowControls={arrowControls} />
    </div>
  );
};

export default BrickGame;
