import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./HeroConfirmation.module.css";

import WarningIcon from "../../../assets/svgs/warning.svg?react";
import LogoSmallIcon from "../../../assets/svgs/logo-small.svg?react";

import CloseButton from "../../UI/Buttons/CloseButton";

import { translate } from "../../../utils/translations";
import MainButton from "../../UI/Buttons/MainButton";
import { selectedHero } from "../../../pages/UserGamification.jsx/gamificationAsyncActions";
import { gamificationActions } from "../../../pages/UserGamification.jsx/userGamificationSlice";

const HeroConfirmationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    navigate(location.pathname);
  };

  return (
    <div className={classes.ConfirmationModal}>
      <div className={classes.ModalContent}>
        <div className={classes.MainContent}>
          <p className={classes.Message}>
            {translate(
              `You picked ${displayedHero.metadata.HeroName} ${displayedHero.metadata.HeroSubName}.`
            )}
            <br></br>
            {translate(
              "Once you select a hero, you cannot go back! Are you sure you want to select this hero?"
            )}
          </p>
        </div>
        <div className={classes.Buttons}>
          <MainButton color="bv-light-green" onClick={handleButtonClick}>
            <span>{translate("Ok")}</span>
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default HeroConfirmationModal;
