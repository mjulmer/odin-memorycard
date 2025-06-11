export { GameScreen };
import "../styles/GameScreen.css";

function GameScreen({
  currentScore,
  highScore,
}: {
  currentScore: number;
  highScore: number;
}) {
  return (
    <>
      <div className="cardContainer">
        <img />
        <img />
        <img />
        <img />
      </div>
      <div>
        <p>Current score: {currentScore}</p>
        <p>High score: {highScore}</p>
      </div>
    </>
  );
}
