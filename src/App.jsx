import BrickGame from "./BrickGame";
import GameMaker from "./brick-game-modules/game-maker";
import Shape from "./brick-game-modules/shape";

function App() {
  const screen = GameMaker.initialize(10, 10);
  const plus = Shape.customShape([
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]);

  const arrowControls = {
    down: ({ top, left }, _shape) => ({ top: top + 1, left }),
  };

  screen.addShapeToScreen(plus, { top: 1, left: 0 }, arrowControls);

  return (
    <div>
      <h1>Brick Game Framework</h1>
      <BrickGame
        initialScreen={screen.getScreen()}
        arrows={screen.getArrows()}
      />
    </div>
  );
}

export default App;
