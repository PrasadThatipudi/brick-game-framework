import BrickGame from "./BrickGame";

function App() {
  const zeros = Array(10).fill(0);
  const initialScreen = Array.from({ length: 10 }, () => zeros);
  const arrows = {
    up: () => initialScreen,
    down: () => initialScreen,
    left: () => initialScreen,
    right: () => initialScreen,
  };

  return (
    <div>
      <h1>Brick Game Framework</h1>
      <BrickGame initialScreen={initialScreen} arrows={arrows} />
    </div>
  );
}

export default App;
