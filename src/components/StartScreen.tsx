import type { GameState } from "../gameState";

export { StartScreen };

function StartScreen({
  gameState,
  startGameOnClick,
}: {
  gameState: GameState;
  startGameOnClick: () => void;
}) {
  return (
    <>
      <p>
        Welcome to Memory Card. Each round, choose a card you haven't chosen in
        a previous round. The game ends when you pick a duplicate card.
      </p>
      <>
        {gameState === "startScreen" ? (
          <button onClick={startGameOnClick}>Start game</button>
        ) : (
          <p>Loading</p>
        )}
      </>
    </>
  );
}
