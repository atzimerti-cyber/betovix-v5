import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./RegisterContainers.module.css";
import Step1Icon from "../../../assets/svgs/step1.svg?react";
import Step2Icon from "../../../assets/svgs/step2.svg?react";
import Step3Icon from "../../../assets/svgs/step3.svg?react";
import AlternativeMethods from "../../Login/features/AlternativeMethods";
import { translate } from "../../../utils/translations";

const RegisterContainers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <>
      <div className={classes.SignupTextContainer}>
        {/* Badge element */}
        <div className={classes.ParentContainer}>
          <div className={classes.Badge}>
            <div className={classes.BagdeContent}>
            <span>{translate("Wager")}</span>

              <div className={classes.Animation}>
                <p style={{fontSize:'0.9rem'}}>x</p>
                <p>30</p>
              </div>
              {/* <svg width="80" height="80">
                <defs>
                  <path
                    id="circlePath"
                    d="M 40,-5 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0"
                  />
                </defs>
                <text fill="white" fontSize="10px" textAnchor="middle">
                  <textPath href="#circlePath" startOffset="25%">
                    {translate("to withdraw")}
                  </textPath>
                </text>
              </svg> */}
            </div>
          </div>
          <span className={classes.SignUpTextV1}>{translate("Sign up")}</span>
          &nbsp;{translate("and")}&nbsp;
          <span className={classes.SignUpTextV1}>{translate("choose")} </span>
          <span className={classes.SignUpTextV1}>{translate("your hero")}</span>
          <span className={classes.SignUpTextV2}>
            {translate("150% on")}{" "}
            <span style={{ fontWeight: "400", textTransform: "lowercase" }}>
              {translate("1st")}
            </span>{" "}
            <span style={{ fontWeight: "400" }}>{translate("deposit")} </span>
            {/* <span style={{ fontWeight: "900", textTransform: "lowercase" }}>
              {" "}
              - x7{" "}
            </span>
            <span style={{ fontWeight: "400" }}>
              {translate("to withdraw")}{" "}
            </span> */}
          </span>
          <span className={classes.SignUpTextV1}>
            {translate("up to 200€")}
          </span>
          <button
            className={classes.RegisterButton}
            style={{ width: "100%" }}
            onClick={() => addParamsToUrl("auth", "register")}
          >
            {translate("Register")}
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterContainers;
