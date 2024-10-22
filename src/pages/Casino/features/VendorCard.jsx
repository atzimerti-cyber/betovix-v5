import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./VendorCard.module.css";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import BonusIcon from "../../../assets/svgs/bonus.svg?react";
//import { removeFavoriteCasino, addFavoriteCasino } from '../casinoAsyncActions';
import { translate } from "../../../utils/translations";

const VendorCard = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  return (
    <div className={classes.SlideContainer}>
      <Link to={`/search?provider=${props.vendor.Data.Name}`}>
        <article className={classes.Card}>
          <div className={classes.ImageContainer} ref={containerRef}>
            {!isLoaded && <LoaderPlaceholder />}
            <img
              src={props.vendor.Data.Logo}
              crossOrigin="anonymous"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            ></img>
          </div>
          {props.vendor.isNew && (
            <div className={classes.NewLabel}>{translate("NEW")}</div>
          )}
          <div className={classes.InfoOverlay}>
            <div className={classes.InfoContent}>
              <div>
                <p className={classes.InfoCategory}>{props.vendor.Data.Name}</p>
                <p className={classes.Rtp}>
                  {props.vendor.GameCount} {translate("Games")}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default VendorCard;
