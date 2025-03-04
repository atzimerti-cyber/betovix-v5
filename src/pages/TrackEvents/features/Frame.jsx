import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../../CasinoGame/CasinoGame.module.css";
import MainButton from "../../../features/UI/Buttons/MainButton";
import Arrow2LeftIcon from "../../../assets/svgs/arrow2-left.svg?react";
import FullscreenOutlineIcon from "../../../assets/svgs/fullscreen-outline.svg?react";
import { translate } from "../../../utils/translations";
import { useLocation, useNavigate } from "react-router-dom";

const Frame = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [gameURL, setGameURL] = useState(null);
  const [isIOS, setIsIOS] = useState(null);

  const [elClasses, setElClasses] = useState([classes.CasinoGameWrapper]);
  const gameContentRef = useRef(null);
  const user = useSelector((state) => state.login.user);

  //CHECK IF DEVICE IS IOS AND MOBILE TO OPEN IFRAME
  useEffect(() => {
    if (props.url) {
      const userAgent = window.navigator.userAgent;
      const isIOSDevice =
        /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      if (isIOSDevice) {
        console.info("mauro");
        document.getElementById("loadGame").style.display = "block";
      }

      setIsIOS(isIOSDevice);
      setGameURL(props.url);
    }

    return () => {
      document.getElementById("loadGame").style.display = "none";
    };
  }, []);

  useEffect(() => {
    if (isIOS) {
      console.info("paixnidi");
      document.getElementById("btnBack").style.display = "flex";
      document.getElementById("gameName").style.display = "flex";
      document.getElementById("gameName").innerText = props.name;
      document.getElementById("gameHeader").style.display = "flex";
      document.getElementById("game").style.display = "block";
      document.getElementById("game").src = gameURL;
    }
    t;
    return () => {
      document.getElementById("game").style.display = "none";
      document.getElementById("btnBack").style.display = "none";
      document.getElementById("gameHeader").style.display = "none";
      document.getElementById("gameName").style.display = "none";
    };
  }, [gameURL]);

  //TOGGLE FULLSCREEN BUTTON
  const toggleFullScreen = () => {
    // if (isIOS) {
    //   setIsFullScreen((prev) => !prev);
    // } else {
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
    // }
  };

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleBack = () => {
    let stepsBack = -1;
    const maxSteps = -window.history.length;

    const checkAndNavigate = () => {
      if (stepsBack < maxSteps) {
        console.log("No valid URL found in history");
        navigate("/");
        return;
      }

      window.history.go(stepsBack);

      setTimeout(() => {
        const currentURL = window.location.href;

        if (!currentURL.includes("modal")) {
          return;
        } else {
          checkAndNavigate();
        }
      }, 100);
    };

    checkAndNavigate();
  };

  return (
    <>
      {!isIOS && (
        //   {!isIOS && gameURL && (
        <div className={elClasses.join(" ")}>
          <div className={classes.CasinoGame}>
            <div className={classes.Header}>
              <div className={classes.LeftSection}>
                <MainButton color="transparent" onClick={() => handleBack()}>
                  <Arrow2LeftIcon />
                  <span>{translate("Back")}</span>
                </MainButton>
              </div>
              <div className={classes.RightSection}>
                {/* <MainButton
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
                </MainButton> */}

                {/* <MainButton
                  color="transparent"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  <ExpandOutlineIcon />
                  <span>{translate("Expand")}</span>
                </MainButton> */}

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
                {gameURL && (
                  <iframe
                    className={classes.GameIframe}
                    src={gameURL}
                    allow="autoplay; clipboard-write; fullscreen"
                    allowFullScreen
                    width="100%"
                    height="100%"
                  ></iframe>
                )}
              </div>
              {!user && (
                <div className={classes.GameOverlay}>
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
                </div>
              )}
            </div>
            <div className={classes.GameControls}>
              <div className={classes.GameNameWrapper}>
                <h3 className={classes.GameName}>{props.Arrow2LeftIconname}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Frame;
