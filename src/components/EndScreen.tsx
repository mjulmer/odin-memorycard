export { EndScreen };

function EndScreen({
  currentScore,
  highScore,
}: {
  currentScore: number;
  highScore: number;
}) {
  return (
    <>
      <p>Game over!</p>
      <p>
        You scored {currentScore}. Your high score is {highScore}.
      </p>
    </>
  );
}
