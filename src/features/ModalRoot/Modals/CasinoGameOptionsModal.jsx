import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import classes from "./CasinoGameOptionsModal.module.css";
import { translate } from "../../../utils/translations";

import GiftIcon from "../../../assets/svgs/gift.svg?react";
import BackIcon from "../../../assets/svgs/times3.svg?react";
import axiosApi from "../../../axios-api";
import config from "../../../config";
import { getLang } from "../../../utils/storage";
import LockedIcon from "../../../assets/svgs/locked-region.svg?react";

const CasinoGameOptionsModal = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const game = useSelector((state) => state.casino.gameOptionsModal);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);

  const [bannerGame, setBannerGame] = useState({});

  const gameType = game?.Data?.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  useEffect(() => {
    if (!game) {
      closeModal();
    }
  }, [game]);

  useEffect(() => {
    if (game?.Position !== null && game?.Position !== undefined) {
      fetchGameData(game);
    }
  }, [game]);

  const fetchGameData = async (game) => {
    try {
      if (game.GameId !== null && game.GameName !== null) {
        const lang = getLang();
        const controller = new AbortController();
        const signal = controller.signal;

        const response = await axiosApi.get(
          `MyCasino/GetGame?id=${game.GameId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            signal: signal,
            baseURLOverride: config.VITE_CASINO_BASE,
          }
        );

        if (response.data.Status.StatusCode !== 200) throw Error();

        const providerName = response.data?.Contents?.ProviderName;
        const gameid = game.GameId;
        const brandGameId = response.data?.Contents?.BrandGameId;
        const gameName = response.data?.Contents?.Name;
        const isDemo = false;
        const isBonus = false;

        if (!brandGameId) throw Error();

        setBannerGame({
          providerName: providerName,
          gameid: gameid,
          brandGameId: brandGameId,
          gameName: gameName,
          isDemo: isDemo,
          isBonus: isBonus,
        });
      }
    } catch (error) {
      if (!error?.code === "ERR_CANCELED")
        toast.error(translate(`${error?.message}`));
    }
  };

  const closeModal = () => {
    props.onClose();
  };

  return game && game.Data ? (
    <div className={classes.GameOptionsModal}>
      <div className={classes.ModalContent}>
        <div className={classes.CloseButton} onClick={() => closeModal()}>
          <BackIcon />
        </div>
        <div className={classes.GameInfo}>
          <div className={classes.ImageContainer}>
            <div
              className={classes.Image}
              style={{
                backgroundImage:
                  game.Data.ImageUrl3 !== null &&
                  `url(${game.Data.ImageUrl3.replace(/ /g, "%20")})`,
              }}
            ></div>
          </div>
        </div>

        <div className={classes.OptionsContainer}>
          <div className={classes.GameName}>
            {translate(`${game.Data.Name}`)}
          </div>
          <div className={classes.GameVendor}>
            {translate(`${game.Data.VendorName}`)}
          </div>
          {game.isLocked ? (
            <div
              className={classes.PlayBtnContainer}
              style={{
                pointerEvents: "none",
                flexDirection: "column",
                color: "var(--white)",
                opacity: "0.7",
              }}
            >
              <LockedIcon />
              <span style={{ textAlign: "center" }}>
                {translate("Not available in your region")}
              </span>
            </div>
          ) : (
            <Link
              to={`/casino/game/${gameType}/${game.Data.ProviderName}/${game.Data.Id}/${game.Data.BrandGameId}/${game.Data.Name}?isBonus=false`}
              style={{ width: "100%" }}
            >
              <div className={classes.PlayBtnContainer}>
                <button className={classes.PlayBtn}>
                  <span>{translate("Play")}</span>
                </button>
              </div>
            </Link>
          )}

          {bonusBalance > 0 && game.allowBonus && !game.isLocked && (
            <Link
              style={{ width: "100%" }}
              to={`/casino/game/${gameType}/${game.Data.ProviderName}/${game.Data.Id}/${game.Data.BrandGameId}/${game.Data.Name}?isBonus=true`}
            >
              <div className={classes.isBonus}>
                <button className={classes.bonusContainer}>
                  <GiftIcon />
                  <span>{translate("Play With Bonus")}</span>
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : (
    Object.keys(bannerGame).length > 0 && (
      <div className={classes.GameOptionsModal}>
        <div className={classes.ModalContent}>
          <div className={classes.CloseButton} onClick={() => closeModal()}>
            <BackIcon />
          </div>
          <div className={classes.GameInfo}>
            <div className={classes.ImageContainer}>
              <div
                className={classes.Image}
                style={{
                  backgroundImage:
                    game.Img !== null &&
                    `url(${game.Img.replace(/ /g, "%20")})`,
                }}
              ></div>
            </div>
          </div>

          <div className={classes.OptionsContainer}>
            <div className={classes.GameName}>
              {translate(`${bannerGame.gameName}`)}
            </div>
            <div className={classes.GameVendor}>
              {translate(`${bannerGame.providerName}`)}
            </div>
            {game.isLocked ? (
              <div
                className={classes.PlayBtnContainer}
                style={{
                  pointerEvents: "none",
                  flexDirection: "column",
                  color: "var(--white)",
                  opacity: "0.7",
                }}
              >
                <LockedIcon />
                <span style={{ textAlign: "center" }}>
                  {translate("Not available in your region")}
                </span>
              </div>
            ) : (
              <Link
                to={`/casino/game/${gameType}/${bannerGame.providerName}/${bannerGame.gameid}/${bannerGame.brandGameId}/${bannerGame.gameName}?isBonus=false`}
                style={{ width: "100%" }}
              >
                <div className={classes.PlayBtnContainer}>
                  <button className={classes.PlayBtn}>
                    <span>{translate("Play Game")}</span>
                  </button>
                </div>
              </Link>
            )}

            {bonusBalance > 0 && game.allowBonus && !game.isLocked && (
              <Link
                style={{ width: "100%" }}
                to={`/casino/game/${gameType}/${bannerGame.providerName}/${bannerGame.gameid}/${bannerGame.brandGameId}/${bannerGame.gameName}?isBonus=true`}
              >
                <div className={classes.isBonus}>
                  <button className={classes.bonusContainer}>
                    <GiftIcon />
                    <span>{translate("Play With Bonus")}</span>
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CasinoGameOptionsModal;
