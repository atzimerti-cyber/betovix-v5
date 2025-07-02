import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./CasinoGameCard.module.css";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import LockedIcon from "../../../assets/svgs/locked-region.svg?react";
import { removeFavoriteCasino, addFavoriteCasino } from "../casinoAsyncActions";
import { translate } from "../../../utils/translations";
import { casinoActions } from "../casinoSlice";

import PlayButton from "../../../assets/svgs/playbutton.svg?react";
import useTouchScreen from "../../../hooks/useTouchScreen";

const CasinoGameCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(props.game.isFav);
  const inModal = useSelector((state) => state.app.siteSettings?.CasinoGameStyle);


  const isTouchScreen = useTouchScreen();
  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const [imageUrl, setImageUrl] = useState(null);

  const onToggleFavorite = () => {
    if (!user) {
      toast.warning(translate("Login to access this feature"));
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


  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  // const openGameModal = (game) => {
  //   dispatch(casinoActions.setGameOptionsModal(game));
  //   addParamsToUrl("game-options");
  // };

  const openGameModal = (game) => {
    if (inModal === 'FULLSCREEN') {
      const gameType = game.Data.Tags.toLowerCase().includes("live")
        ? "live"
        : "slots";
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('modal', 'cgame');
      searchParams.set('ty', gameType);
      searchParams.set('pn', game.Data.ProviderName);
      searchParams.set('gameid', game.Data.Id);
      searchParams.set('bgid', game.Data.BrandGameId);
      searchParams.set('name', game.Data.Name);
      searchParams.set('isBonus', false);

      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: false,
      });
    } else {
      dispatch(casinoActions.setGameOptionsModal(game));
      addParamsToUrl("game-options");
    }

  };

  useEffect(() => {
    const testImg = new Image();
    testImg.src = props.game.Data.ImageUrl;

    testImg.onload = () => setImageUrl(props.game.Data.ImageUrl);
    testImg.onerror = () => setImageUrl(props.game.Data.ImageUrl2);
  }, [props.game.Data.ImageUrl, props.game.Data.ImageUrl2]);

  return (
    <div
      className={classes.SlideContainer}
      onClick={() => {
        isTouchScreen ? (
          !props.game.isLocked && openGameModal(props.game)
        ) : (
          inModal !== 'WITHBONUS' && !props.game.isLocked && openGameModal(props.game)
        )
      }}
      style={props.game.isLocked ? { pointerEvents: "none" } : {}}
    >
      <article
        className={classes.Card}
        style={props.game.isLocked ? { pointerEvents: "none" } : {}}
      >
        {props.game.isLocked && (
          <div className={classes.NotAvailable}>
            <div className={classes.IconWrapper}>
              <LockedIcon />
            </div>
            <p>{translate("Not available in your region")}</p>
          </div>
        )}
        <div className={classes.ImageContainer}>
          {/* <div
            style={{
              backgroundImage:
                props.game.Data.ImageUrl !== null &&
                `url(${props.game.Data.ImageUrl.replace(/ /g, "%20")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
            onLoad={() => updateLoadedImages(index)}
          ></div> */}
          <div
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl.replace(/ /g, "%20")})` : "none",
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
        {!isTouchScreen && !props.game.isLocked && inModal === 'WITHBONUS' && (
          <div className={classes.OverlayContainer}>
            <div className={classes.InfoContainer}>
              <div className={classes.FavContainer}>
                <HeartIcon
                  className={isFavorite ? classes.FavoriteIcon : null}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onToggleFavorite();
                  }}
                />
              </div>
              <div>
                <p className={classes.BgGameName}>{props.game.Data.Name}</p>
                <p className={classes.BgVendor}>{props.game.Data.VendorName}</p>
              </div>
            </div>
            <div className={classes.ButtonsContainer}>
              <div className={classes.PlayBtnContainer}>
                <button className={classes.PlayBtn} onClick={() => {
                  !props.game.isLocked && openGameModal(props.game)
                }}>
                  <PlayButton />
                </button>
              </div>
              {bonusBalance > 0 && props.game.allowBonus && (
                <div className={classes.isBonus}>
                  <button className={classes.bonusContainer}>
                    <GiftIcon />
                    {/* <p>{translate("Available with Bonus")}</p> */}
                  </button>
                </div>
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
  );
};

export default CasinoGameCard;
