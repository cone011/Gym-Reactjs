import classes from "./PresentationSection.module.css";

const PresentationSection = () => {
  return (
    <div className={classes.heroContainer}>
      <video src="../../../public/assets/video-1.mp4" autoPlay loop muted />
      <h1>ENJOY THE RUTINE</h1>
      <p>Come on and join in</p>
    </div>
  );
};

export default PresentationSection;
