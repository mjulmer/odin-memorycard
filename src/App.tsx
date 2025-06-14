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
  const [images, setImages] = useState<Array<Array<string>>>([]);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (!hasInitialized) {
      hasInitialized = true;
      imageController.fetchData(setFetchedInitialData);
    }
  }, [imageController]);

  function startGameOnClick() {
    setImages(imageController.getImages());
    setGameState("inProgress");
  }

  function imageOnClick(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const imageId = (event.target as HTMLImageElement).getAttribute("data-id");
    console.log(imageId);
    if (imageId === null) {
      console.error("Got null image ID when user clicked image.");
      return;
    }

    if (imageController.isImageSeen(imageId)) {
      setGameState("gameEnded");
    } else {
      setCurrentScore(currentScore + 1);
      setHighScore(Math.max(highScore, currentScore + 1));
      imageController.markImageAsSeenAndQueryNewImages(imageId);
      setImages(imageController.getImages());
    }
  }

  function restartGameOnClick() {
    setCurrentScore(0);
    imageController.resetImages();
    setImages(imageController.getImages());
    setGameState("inProgress");
  }

  if (gameState === "startScreen" || fetchedInitialData === false) {
    return (
      <StartScreen gameState={gameState} startGameOnClick={startGameOnClick} />
    );
  } else if (gameState === "inProgress") {
    return (
      <GameScreen
        currentScore={currentScore}
        highScore={highScore}
        images={images}
        imageOnClick={imageOnClick}
      />
    );
  } else {
    return (
      <EndScreen
        currentScore={currentScore}
        highScore={highScore}
        newGameOnClick={restartGameOnClick}
      />
    );
  }
}

export default App;
