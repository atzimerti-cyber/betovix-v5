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

import HeartIcon from "../../assets/svgs/heart.svg?react";
import ExpandOutlineIcon from "../../assets/svgs/expand-outline.svg?react";
import FullscreenOutlineIcon from "../../assets/svgs/fullscreen-outline.svg?react";
import Arrow2LeftIcon from "../../assets/svgs/arrow2-left.svg?react";

const CasinoGame = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang);
  const prevPage = useSelector((state) => state.app.prevPage);
  const { type, providername, id, brandgameid, name } = useParams();

  const gameContentRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFav, setIsFav] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [isIOS, setIsIOS] = useState(null);
  const [elClasses, setElClasses] = useState([classes.CasinoGameWrapper]);

  const casinoFavs = useSelector((state) => state.casinoFavorites.casinoFavs);

  const casinoGame = useSelector((state) => state.casino.casinoGame);
  const showCasinoGame = useSelector((state) => state.casino.showCasinoGame);
  const user = useSelector((state) => state.login.user);
  const barLoading = useSelector((state) => state.app.barLoading);

  //OPEN GAME
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
  }, [user?.AccountId]);

  useEffect(() => {
    const newClasses = [classes.CasinoGameWrapper];
    if (isExpanded) newClasses.push(classes.Expanded);
    setElClasses(newClasses);
  }, [isExpanded]);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    // if (isIOSDevice) {
    //   document.getElementById("loadGame").style.display = "block";
    //   console.error("mauro");
    //   if (casinoGame) {
    //     console.error("paixnidi");
    //     document.getElementById("btnBack").style.display = "block";
    //     document.getElementById("game").style.display = "block";
    //     document.getElementById("game").src = casinoGame?.url;
    //   }
    // }

    if (isIOSDevice) {
      document.getElementById("loadGame").style.display = "block";
    }

    setIsIOS(isIOSDevice);

    return () => {
      document.getElementById("loadGame").style.display = "none";
    };
  }, []);

  useEffect(() => {
    if (isIOS) {
      console.info("paixnidi");
      document.getElementById("btnBack").style.display = "flex";
      document.getElementById("gameName").style.display = "flex";
      document.getElementById("gameName").innerText = name;
      document.getElementById("gameHeader").style.display = "flex";
      document.getElementById("game").style.display = "block";
      document.getElementById("game").src = casinoGame?.url;
    }

    return () => {
      if (isIOS) {
        document.getElementById("game").style.display = "none";
        document.getElementById("btnBack").style.display = "none";
        document.getElementById("gameHeader").style.display = "none";
        document.getElementById("gameName").style.display = "none";
        dispatch(casinoActions.setCasinoGame(null));
        dispatch(casinoActions.setShowCasinoGame(false));
      }
    };
  }, [casinoGame]);

  //CHECK IF GAME IS FAV
  useEffect(() => {
    if (user && isFav === null) {
      if (!casinoFavs) {
        dispatch(getCasinoFavs());
      } else {
        const isFavorite =
          Array.isArray(casinoFavs) &&
          casinoFavs.some((fav) => fav.Data.Id == id);

        // Update the isFav state
        setIsFav(isFavorite);
      }
    }
  }, [user?.AccountId, casinoFavs]);

  //FULLSCREEN EVENTS
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullScreen(!!isFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  //TOGGLE FULLSCREEN BUTTON
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
    }
  };

  //TOGGLE FAVORITE BUTTON
  const onToggleFavorite = (id) => {
    if (user) {
      if (isFav) {
        dispatch(removeCasinoFav(id)).then(() => {
          setIsFav(false);
          toast.success(translate("Removed from favorites") + ".");
        });
      } else {
        dispatch(addCasinoFav(id)).then(() => {
          setIsFav(true);
          toast.success(translate("Added to favorites") + ".");
        });
      }
    }
  };

  // const handleBack = () => {
  //   //navigate("/casino/lobby");
  //   let stepsBack = -1;
  //   const maxSteps = -window.history.length;
  //   const checkAndNavigate = () => {
  //     if (stepsBack < maxSteps) {
  //       console.log("No valid URL found in history");
  //       navigate("/casino/lobby");
  //       return;
  //     }

  //     window.history.go(stepsBack);
  //     setTimeout(() => {
  //       const currentURL = window.location.href;

  //       if (!currentURL.includes("modal")) {
  //         return;
  //       } else {
  //         checkAndNavigate();
  //       }
  //     }, 100);
  //   };
  //   checkAndNavigate();
  // };

  const handleBack = () => {
    if (prevPage) {
      navigate(prevPage);
    } else {
      navigate("/casino");
    }
  };

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>
      {!isIOS && (
        <div className={elClasses.join(" ")}>
          <div className={classes.CasinoGame}>
            <div className={classes.Header}>
              <div className={classes.LeftSection}>
                <MainButton color="transparent" onClick={handleBack}>
                  <Arrow2LeftIcon />
                  <span>{translate("Back")}</span>
                </MainButton>
              </div>
              <div className={classes.RightSection}>
                <MainButton
                  color="transparent"
                  onClick={() => {
                    if (user) {
                      onToggleFavorite(id);
                    } else {
                      toast.warning(translate("Login to access this feature"));
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
            <div className={classes.Placeholder} ref={gameContentRef}>
              <div className={classes.GameContent}>
                {casinoGame && (
                  <iframe
                    className={classes.GameIframe}
                    src={casinoGame.url}
                    referrerpolicy="no-referrer"
                    allow="autoplay; clipboard-write; fullscreen"
                    allowFullScreen
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
                        {translate(`Please Login or Register to Play.`)}
                      </div>
                      <div className={classes.OverlayButtons}>
                        <MainButton
                          color="primary"
                          onClick={() => addParamsToUrl("auth", "login")}
                        >
                          {translate("Login")}
                        </MainButton>
                        <MainButton
                          color="secondary"
                          onClick={() => addParamsToUrl("auth", "register")}
                        >
                          {translate("Register")}
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
      )}
    </>
  );
};

export default CasinoGame;
