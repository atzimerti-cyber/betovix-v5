import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./CasinoGameCard.module.css";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import { removeFavoriteCasino, addFavoriteCasino } from "../casinoAsyncActions";
import { translate } from "../../../utils/translations";

const CasinoGameCard = (props) => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.game.isFav);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);

  const onToggleFavorite = () => {
    if (!user) {
      toast.warning("Login to access this feature");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteCasino(props.game.Data.Id));
      setIsFavorite(false);
    } else {
      dispatch(addFavoriteCasino(props.game.Data.Id));
      setIsFavorite(true);
    }
  };

  const gameType = props.game.Data.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  return (
    <div className={classes.SlideContainer}>
      <Link
        to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=false`}
      >
        <article className={classes.Card}>
          <div className={classes.ImageContainer}>
            {/* {!isLoaded && <LoaderPlaceholder />} */}
            {/* <img src={props.game.Data.ImageUrl} loading='lazy' onLoad={() => setIsLoaded(true)} /> */}
            <div
              style={{
                backgroundImage: `url(${props.game.Data.ImageUrl.replace(
                  / /g,
                  "%20"
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
              onLoad={() => updateLoadedImages(index)}
            ></div>
          </div>
          {props.game.isNew && (
            <div className={classes.NewLabel}>{translate("NEW")}</div>
          )}
        </article>
      </Link>
      {bonusBalance > 0 && props.game.allowBonus && (
        <Link
          to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=true`}
        >
          <div className={classes.isBonus}>
            <button className={classes.bonusContainer}>
              <GiftIcon />
              {translate("Play With Bonus")}
            </button>
          </div>
        </Link>
      )}
      <div className={classes.BackgroundContainer}>
        <div>
          <p className={classes.BgGameName}>{props.game.Data.Name}</p>
          {/* <p className={classes.BgVendor}>{props.game.Data.BrandName}</p> */}
          <p className={classes.BgVendor}>{props.game.Data.VendorName}</p>
        </div>
        <HeartIcon
          className={isFavorite ? classes.FavoriteIcon : null}
          // className={props.game.isFav ? classes.FavoriteIcon : null}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (user) {
              onToggleFavorite(props.game);
            } else {
              toast.warning("Login to access this feature");
            }
          }}
        />
      </div>
    </div>
  );
};

export default CasinoGameCard;
