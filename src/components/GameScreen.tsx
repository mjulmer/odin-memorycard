export { GameScreen };

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
