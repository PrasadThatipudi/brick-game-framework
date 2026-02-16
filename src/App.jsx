import BrickGame from "./BrickGame";
import GameMaker from "./brick-game-modules/game-maker";

function App() {
  const screen = GameMaker.initialize(10, 10);

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
