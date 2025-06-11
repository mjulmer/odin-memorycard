import { useState } from "react";
import "./styles/App.css";

type GameState = "startScreen" | "inProgress" | "gameEnded";

function App() {
  const [gameState, setGameState] = useState<GameState>("startScreen");
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  if (gameState === "startScreen") {
    return <StartScreen setGameState={setGameState} />;
  } else if (gameState === "inProgress") {
    return <GameScreen currentScore={currentScore} highScore={highScore} />;
  } else {
    return <EndScreen currentScore={currentScore} highScore={highScore} />;
  }

  function StartScreen({
    setGameState,
  }: {
    setGameState: (gameState: GameState) => void;
  }) {
    return (
      <>
        <button onClick={() => setGameState("inProgress")}>Start game</button>
      </>
    );
  }

  function GameScreen({
    currentScore,
    highScore,
  }: {
    currentScore: number;
    highScore: number;
  }) {
    return (
      <>
        <p>Current score: {currentScore}</p>
        <p>High score: {highScore}</p>
      </>
    );
  }

  function EndScreen({
    currentScore,
    highScore,
  }: {
    currentScore: number;
    highScore: number;
  }) {
    return <></>;
  }
}

export default App;
