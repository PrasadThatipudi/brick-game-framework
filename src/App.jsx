import BrickGame from "./BrickGame";
import GameMaker from "./brick-game-modules/game-maker";
import Shape from "./brick-game-modules/shape";

function App() {
  const screen = GameMaker.initialize(10, 10);
  const plus = Shape.customShape(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    { top: 4, left: 0 },
  );

  plus.onArrowDown(({ top, left }) => ({ top: top + 1, left }));
  plus.onArrowUp(({ top, left }) => ({ top: top - 1, left }));
  plus.onArrowLeft(({ top, left }) => ({ top, left: left - 1 }));
  plus.onArrowRight(({ top, left }) => ({ top, left: left + 1 }));

  screen.addShapeToScreen(plus);

  return (
    <div>
      <h1>Brick Game Framework</h1>
      <BrickGame initialScreen={screen.render()} arrows={screen.getArrows()} />
    </div>
  );
}

export default App;
