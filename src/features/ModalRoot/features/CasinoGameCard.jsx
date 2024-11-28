import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import classes from "./CasinoGameCard.module.css";
import useTouchScreen from "../../../hooks/useTouchScreen";
import {
  removeFavoriteCasino,
  addFavoriteCasino,
} from "../../../pages/Casino/casinoAsyncActions";
import { casinoActions } from "../../../pages/Casino/casinoSlice";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import PlayButton from "../../../assets/svgs/playbutton.svg?react";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import { toast } from "react-toastify";

const CasinoGameCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isTouchScreen = useTouchScreen(); // Detect if the device has a touchscreen
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);

  const [isFavorite, setIsFavorite] = useState(props.game.isFav);

  const gameType = props.game.Data.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  const onToggleFavorite = () => {
    if (!user) {
      let toastMessage = translate("Login to access this feature");
      toast.warning(toastMessage);
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

  const openGameModal = (game) => {
    dispatch(casinoActions.setGameOptionsModal(game));
    addParamsToUrl("game-options");
  };

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <li>
      <div
        className={classes.SlideContainer}
        onClick={() => {
          if (isTouchScreen) {
            openGameModal(props.game);
          }
        }}
      >
        <article className={classes.Card}>
          <div className={classes.ImageContainer}>
            <div
              style={{
                backgroundImage:
                  props.game.Data.ImageUrl3 !== null &&
                  `url(${props.game.Data.ImageUrl3.replace(/ /g, "%20")})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                height: "100%",
              }}
              onLoad={() => updateLoadedImages(index)}
            ></div>
          </div>
          {props.game.isNew && (
            <div className={classes.NewLabel}>{translate("NEW")}</div>
          )}
          {!isTouchScreen && (
            <div className={classes.OverlayContainer}>
              <div className={classes.InfoContainer}>
                {user && (
                  <div className={classes.FavContainer}>
                    {/* <HeartIcon
                    className={props.game.isFav ? classes.FavoriteIcon : null}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (user) {
                        onToggleFavorite(props.game);
                      } else {
                        toast.warning("Login to access this feature");
                      }
                    }}
                  /> */}
                    <HeartIcon
                      className={isFavorite ? classes.FavoriteIcon : null}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onToggleFavorite();
                        // if (user) {
                        //   onToggleFavorite(props.game);
                        // } else {
                        //   toast.warning("Login to access this feature");
                        // }
                      }}
                    />
                  </div>
                )}

                <div>
                  <p className={classes.BgGameName}>{props.game.Data.Name}</p>
                  <p className={classes.BgVendor}>
                    {props.game.Data.VendorName}
                  </p>
                </div>
              </div>
              <div className={classes.ButtonsContainer}>
                <Link
                  to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=false`}
                >
                  <div className={classes.PlayBtnContainer}>
                    <button className={classes.PlayBtn}>
                      <PlayButton />
                    </button>
                  </div>
                </Link>
                {bonusBalance > 0 && props.game.allowBonus && (
                  <Link
                    to={`/casino/game/${gameType}/${props.game.Data.ProviderName}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}?isBonus=true`}
                  >
                    <div className={classes.isBonus}>
                      <button className={classes.bonusContainer}>
                        <GiftIcon />
                      </button>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </article>
        <div className={classes.BackgroundContainer}>
          <div>
            <p className={classes.SmallGameName}>{props.game.Data.Name}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CasinoGameCard;
