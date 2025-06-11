import type { GameState } from "../gameState";

export { StartScreen };

function StartScreen({
  setGameState,
}: {
  setGameState: (gameState: GameState) => void;
}) {
  return (
    <>
      <p>
        Welcome to Memory Card. Each round, choose a card you haven't chosen in
        a previous round. The game ends when you pick a duplicate card.
      </p>
      <button onClick={() => setGameState("inProgress")}>Start game</button>
    </>
  );
}
