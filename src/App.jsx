import BrickGame from "./BrickGame";
import ScreenManager from "./screen-modules/screen-manager";

function App() {
  const screen = ScreenManager.initialize(10, 10);

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
