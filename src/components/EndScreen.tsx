export { EndScreen };

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
    <>
      <p>Game over!</p>
      <p>
        You scored {currentScore}. Your high score is {highScore}.
      </p>
      <button onClick={newGameOnClick}>New game</button>
    </>
  );
}
