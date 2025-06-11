import { useState } from "react";
import "./styles/App.css";
import type { GameState } from "./gameState";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { EndScreen } from "./components/EndScreen";

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
}

export default App;
