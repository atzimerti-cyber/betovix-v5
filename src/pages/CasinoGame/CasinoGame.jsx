import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import classes from "./CasinoGame.module.css";

import { getVendorGame, getLiveVendorGame } from "../Casino/casinoAsyncActions";
import { appActions } from "../../features/InitApp/appSlice";
import {
  addCasinoFav,
  removeCasinoFav,
} from "../../features/CasinoFavorites/CasinoFavoritesAsync";
import { getCasinoFavs } from "../../features/CasinoFavorites/CasinoFavoritesAsync";
import { casinoActions } from "../Casino/casinoSlice";

import MainButton from "../../features/UI/Buttons/MainButton";
import BarLoading from "../../features/UI/BarLoading/BarLoading";

import { translate } from "../../utils/translations";

import LogoSmall from "../../assets/svgs/logo-small.svg?react";
import HeartIcon from "../../assets/svgs/heart.svg?react";
import ExpandOutlineIcon from "../../assets/svgs/expand-outline.svg?react";
import FullscreenOutlineIcon from "../../assets/svgs/fullscreen-outline.svg?react";
import Arrow2LeftIcon from "../../assets/svgs/arrow2-left.svg?react";

const CasinoGame = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang);
  const { type, providername, id, brandgameid, name } = useParams();

  const gameContentRef = useRef(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFav, setIsFav] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const casinoFavs = useSelector((state) => state.casinoFavorites.casinoFavs);

  const casinoGame = useSelector((state) => state.casino.casinoGame);
  const showCasinoGame = useSelector((state) => state.casino.showCasinoGame);
  const user = useSelector((state) => state.login.user);
  const barLoading = useSelector((state) => state.app.barLoading);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (user && isFav === null) {
      dispatch(getCasinoFavs())
        .then(() => {
          const isFav =
            Array.isArray(casinoFavs) &&
            casinoFavs.some((fav) => fav.Data.Id == id);

          if (isFav) {
            setIsFav(true);
          } else {
            setIsFav(false);
          }
        })
        .catch((error) => {
          null;
        });
    }

    return () => {
      //ispatch(casinoFavoritesActions.reset());
    };
  }, [casinoFavs]);

  useEffect(() => {
    if (user) dispatch(casinoActions.setShowCasinoGame(true));
    else dispatch(casinoActions.setShowCasinoGame(false));

    const searchParams = new URLSearchParams(location.search);
    const isBonus = searchParams.get("isBonus");

    const controller = new AbortController();
    const signal = controller.signal;

    if (type === "live")
      dispatch(
        getLiveVendorGame(
          providername,
          id,
          brandgameid,
          name,
          isDemo,
          signal,
          isBonus
        )
      );
    else
      dispatch(
        getVendorGame(
          providername,
          id,
          brandgameid,
          name,
          isDemo,
          signal,
          isBonus
        )
      );

    return () => {
      controller.abort();
      dispatch(casinoActions.setCasinoGame(null));
      dispatch(casinoActions.setShowCasinoGame(false));
      dispatch(appActions.setBarLoading(false));
    };
  }, [isDemo, user?.AccountId]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (gameContentRef.current.requestFullscreen) {
        gameContentRef.current.requestFullscreen().catch((err) => {
          setIsFullScreen(false);
        });
      } else if (gameContentRef.current.webkitRequestFullscreen) {
        gameContentRef.current.webkitRequestFullscreen().catch((err) => {
          setIsFullScreen(false);
        });
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const onToggleFavorite = (id) => {
    if (user) {
      if (isFav) {
        dispatch(removeCasinoFav(id)).then(() => {
          setIsFav(false);
          toast.success("Removed from favorites.");
        });
      } else {
        dispatch(addCasinoFav(id)).then(() => {
          setIsFav(true);
          toast.success("Added to favorites.");
        });
      }
    }
  };

  let elClasses = [classes.CasinoGameWrapper];
  if (isExpanded) elClasses.push(classes.Expanded);
  if (isFullScreen) elClasses.push(classes.FullScreen);
  // if (isMobile) elClasses.push(classes.IsMobile);

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

      <div className={elClasses.join(" ")}>
        <div className={classes.CasinoGame}>
          <div className={classes.Header}>
            <div className={classes.LeftSection}>
              <MainButton color="transparent" onClick={() => navigate(-1)}>
                <Arrow2LeftIcon />
                <span>{translate("Back")}</span>
              </MainButton>
            </div>
            <LogoSmall />
            <div className={classes.RightSection}>
              <MainButton
                color="transparent"
                onClick={() => {
                  if (user) {
                    onToggleFavorite(id);
                  } else {
                    toast.warning("Login to access this feature");
                  }
                }}
              >
                <HeartIcon
                  className={
                    isFav ? classes.FavoriteIcon : classes.NotFavoriteIcon
                  }
                />

                <span>{isFav ? translate("Liked") : translate("Like")}</span>
              </MainButton>

              <MainButton
                color="transparent"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                <ExpandOutlineIcon />
                <span>{translate("Expand")}</span>
              </MainButton>

              <MainButton
                color="transparent"
                onClick={() => toggleFullScreen()}
              >
                <FullscreenOutlineIcon />
                <span>{translate("Full Screen")}</span>
              </MainButton>
            </div>
          </div>
          <div
            className={classes.Placeholder}
            style={
              isMobile
                ? {
                    height: `calc(${viewportHeight} - 10%)`,
                    width: `calc(${viewportWidth} - 10%)`,
                  }
                : { height: "65vh" }
            }
            ref={gameContentRef}
          >
            <div className={classes.GameContent}>
              {casinoGame && (
                <iframe
                  className={classes.GameIframe}
                  src={casinoGame.url}
                  allow="autoplay; clipboard-write; fullscreen"
                  allowFullScreen
                  // allow='autoplay; clipboard-write; geolocation;camera;microphone'
                  width="100%"
                  height="100%"
                ></iframe>
              )}
            </div>
            {!showCasinoGame && (
              <div className={classes.GameOverlay}>
                {!user && (
                  <>
                    <div className={classes.OverlayTitle}>
                      {translate(`Login to play.`)}
                    </div>
                    <div className={classes.OverlayButtons}>
                      <MainButton
                        color="primary"
                        onClick={() => addParamsToUrl("auth", "login")}
                      >
                        {translate("Login")}
                      </MainButton>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={classes.GameControls}>
            <div className={classes.GameNameWrapper}>
              <h3 className={classes.GameName}>{name}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoGame;
