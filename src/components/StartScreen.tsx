import type { GameState } from "../gameState";

export { StartScreen };

function StartScreen({
  setGameState,
}: {
  setGameState: (gameState: GameState) => void;
}) {
  return (
    <>
      <button onClick={() => setGameState("inProgress")}>Start game</button>
    </>
  );
}
