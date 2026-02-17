import BrickGame from "./BrickGame";
import GameMaker from "./brick-game-modules/game-maker";
import Shape from "./brick-game-modules/shape";

function App() {
  const screen = GameMaker.initialize(10, 10);
  const cube = Shape.rectangle(5, 5);
  const plus = Shape.customShape([
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]);

  screen.addShapeToScreen(cube, { top: 0, left: 0 });
  screen.addShapeToScreen(plus, { top: 7, left: 0 });

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
