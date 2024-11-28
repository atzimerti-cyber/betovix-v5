import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./PleaseVerify.module.css";

import InboxIcon from "../../../assets/svgs/inbox.svg?react";

import { translate } from "../../../utils/translations";
import MainButton from "../../UI/Buttons/MainButton";

const PleaseVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    navigate(`${location.pathname}`);
  };

  return (
    <div className={classes.ConfirmationModal}>
      <div className={classes.ModalContent}>
        <div className={classes.MainContent}>
          <InboxIcon />
          <p className={classes.Message}>
            {translate("A verification email has been sent to your inbox")}.
            {translate(
              "Please check your email and click the link to confirm your account"
            )}
            .
          </p>
        </div>
        <div className={classes.Buttons}>
          <MainButton color="dark" onClick={handleButtonClick}>
            <span>{translate("Done")}</span>
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default PleaseVerify;
