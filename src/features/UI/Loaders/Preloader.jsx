import classes from "./Preloader.module.css";

const Preloader = () => {
  const basePath = window.location.origin;
  return (
    <div className={classes.Preloader}>
      <img src={`${basePath}/loading.webp`} alt="Loading" />
    </div>
  );
};

export default Preloader;
