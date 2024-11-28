import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import classes from "./CasinoGameOptionsModal.module.css";
import { translate } from "../../../utils/translations";

import GiftIcon from "../../../assets/svgs/gift.svg?react";
import BackIcon from "../../../assets/svgs/times3.svg?react";

import { modalActions } from "../modalSlice";

const CasinoGameOptionsModal = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const game = useSelector((state) => state.casino.gameOptionsModal);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);

  const gameType = game?.Data?.Tags.toLowerCase().includes("live")
    ? "live"
    : "slots";

  useEffect(() => {
    if (!game || !game.Data) {
      closeModal();
    }
  }, [game]);

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
                // backgroundImage: `url(${game.Data.ImageUrl})`,
              }}
            ></div>
          </div>
          {/* <div className={classes.GameName}>
            {translate(`${game.Data.Name}`)}
          </div>
          <div className={classes.GameVendor}>
            {translate(`${game.Data.VendorName}`)}
          </div> */}
        </div>

        <div className={classes.OptionsContainer}>
          <div className={classes.GameName}>
            {translate(`${game.Data.Name}`)}
          </div>
          <div className={classes.GameVendor}>
            {translate(`${game.Data.VendorName}`)}
          </div>
          <Link
            to={`/casino/game/${gameType}/${game.Data.ProviderName}/${game.Data.Id}/${game.Data.BrandGameId}/${game.Data.Name}?isBonus=false`}
            style={{ width: "100%" }}
          >
            <div className={classes.PlayBtnContainer}>
              <button className={classes.PlayBtn}>
                <span>{translate("Play Game")}</span>
              </button>
            </div>
          </Link>
          {bonusBalance > 0 && game.allowBonus && (
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
  ) : null;
};

export default CasinoGameOptionsModal;
