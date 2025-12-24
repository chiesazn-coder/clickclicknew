import heroVideo from "../assets/t1m-vid.mp4";
import "../styles/main.css";

function Hero() {
  return (
    <div className="hero-container">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default Hero;
