export { GameScreen };
import "../styles/GameScreen.css";

function GameScreen({
  currentScore,
  highScore,
  images,
  imageOnClick,
}: {
  currentScore: number;
  highScore: number;
  images: Array<Array<string>>;
  imageOnClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) {
  return (
    <>
      <div className="cardContainer">
        <>
          {images.map((img) => (
            <img
              key={img[0]}
              src={img[2]}
              alt={img[1]}
              data-id={img[0]}
              onClick={imageOnClick}
            />
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
