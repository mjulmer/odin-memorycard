export { GameScreen };
import "../styles/GameScreen.css";

function GameScreen({
  currentScore,
  highScore,
  images,
}: {
  currentScore: number;
  highScore: number;
  images: Array<Array<string>>;
}) {
  return (
    <>
      <div className="cardContainer">
        <>
          {images.map((img) => (
            <img key={img[0]} src={img[2]} />
          ))}
        </>
      </div>
      <div>
        <p>Current score: {currentScore}</p>
        <p>High score: {highScore}</p>
      </div>
    </>
  );
}
