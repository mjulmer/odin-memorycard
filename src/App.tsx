import { useState, useEffect } from "react";
import "./styles/App.css";
import type { GameState } from "./gameState";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { EndScreen } from "./components/EndScreen";
import { ImageController } from "./imageController";

let hasInitialized = false;

function App() {
  const [gameState, setGameState] = useState<GameState>("startScreen");
  const [fetchedInitialData, setFetchedInitialData] = useState(false);
  const imageController = useState<ImageController>(new ImageController())[0];
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (!hasInitialized) {
      hasInitialized = true;
      imageController.fetchData(setFetchedInitialData);
    }
  }, [imageController]);

  if (gameState === "startScreen" || fetchedInitialData === false) {
    return <StartScreen gameState={gameState} setGameState={setGameState} />;
  } else if (gameState === "inProgress") {
    return (
      <GameScreen
        currentScore={currentScore}
        highScore={highScore}
        images={imageController.getImages()}
      />
    );
  } else {
    return <EndScreen currentScore={currentScore} highScore={highScore} />;
  }
}

export default App;
