import { useEffect, useRef, useState } from "react";
import { useShape } from "./hooks";
import BrickGame from "./BrickGame";
import GameMaker from "./brick-game-modules/game-maker";
import Shape from "./brick-game-modules/shape";

function App() {
  const screenRef = useRef(GameMaker.initialize(10, 10));
  const screen = screenRef.current;
  const [currentScreen, setScreen] = useState(screen.getCurrentScreen());
  const [arrowControls, setArrowControls] = useState(screen.getArrows());

  useEffect(() => {
    const unsubscribe = screen.subscribe((newScreen) => {
      setScreen(newScreen);
    });

    return unsubscribe;
  }, []);

  useShape(screen, () => {
    const cube = Shape.rectangle(2, 2, { top: 0, left: 0 });

    cube.onArrowUp(({ top, left }) => ({ top: top - 1, left }));
    cube.onArrowDown(({ top, left }) => ({ top: top + 1, left }));
    cube.onArrowLeft(({ top, left }) => ({ top, left: left - 1 }));
    cube.onArrowRight(({ top, left }) => ({ top, left: left + 1 }));

    return cube;
  });

  useShape(screen, () => {
    const plus = Shape.customShape(
      [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ],
      { top: 2, left: 0 },
    );

    plus.onArrowUp(({ top, left }) => ({ top: top - 1, left }));
    plus.onArrowDown(({ top, left }) => ({ top: top + 1, left }));
    plus.onArrowLeft(({ top, left }) => ({ top, left: left - 1 }));
    plus.onArrowRight(({ top, left }) => ({ top, left: left + 1 }));

    return plus;
  });

  useEffect(() => {
    const arrows = screen.getArrows();
    const arrowControls = {
      up: () => setScreen(arrows.up()),
      right: () => setScreen(arrows.right()),
      down: () => setScreen(arrows.down()),
      left: () => setScreen(arrows.left()),
    };

    setArrowControls(arrowControls);
  }, []);

  return (
    <div>
      <h1>Brick Game Framework</h1>
      <BrickGame screen={currentScreen} arrowControls={arrowControls} />
    </div>
  );
}

export default App;
