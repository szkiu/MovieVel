import HomeImg from "../../assets/home-background.png";
import { BsPlay } from "react-icons/bs";

const NewMovie = () => {
  return (
    <div>
      <img src={HomeImg.src} alt="Front Page Image" />

      <div>
        <h1>{"Hitman's Wife's Bodyguard"}</h1>
        <p>Releasing 10 April</p>
        <div>
          <a
            href="https://www.youtube.com/watch?v=9C0l31YcahQ&ab_channel=LionsgateMovies"
            target="_blank"
            rel="noreferrer"
          >
            <BsPlay />
          </a>
          <span>Watch the trailer</span>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;
