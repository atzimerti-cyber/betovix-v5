import classes from "./Preloader.module.css";
import config from "../../../config";

const Preloader = () => {
  const basePath = window.location.origin;
  const sitename = config.VITE_SITE_NAME ? config.VITE_SITE_NAME + "/" : "";
  return (
    <div className={classes.Preloader}>
      <img src={`${basePath}/${sitename}loading.webp`} alt="Loading" />
    </div>
  );
};

export default Preloader;
