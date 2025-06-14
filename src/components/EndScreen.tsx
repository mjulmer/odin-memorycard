export { EndScreen };
import "../styles/EndScreen.css";

function EndScreen({
  currentScore,
  highScore,
  newGameOnClick,
}: {
  currentScore: number;
  highScore: number;
  newGameOnClick: () => void;
}) {
  return (
    <div className="content">
      <p>Game over!</p>
      <p>
        You scored {currentScore}. Your high score is {highScore}.
      </p>
      <button onClick={newGameOnClick}>New game</button>
    </div>
  );
}
