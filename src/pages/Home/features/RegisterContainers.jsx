import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./RegisterContainers.module.css";
import { translate } from "../../../utils/translations";
import { siteCurrency } from "../../../utils/custom";

const RegisterContainers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const permissions = useSelector((state) => state.login.permissions);
  const currency = useSelector((state) => state.app.siteCurrency);

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
                <p style={{ fontSize: "0.9rem" }}>x</p>
                <p>30</p>
              </div>
            </div>
          </div>
          {permissions.AllowGamification && (
            <>
              <span className={classes.SignUpTextV1}>
                {translate("Sign up")}
              </span>
              &nbsp;{translate("and")}&nbsp;
              <span className={classes.SignUpTextV1}>
                {translate("choose")}{" "}
              </span>
              <span className={classes.SignUpTextV1}>
                {translate("your hero")}
              </span>
            </>
          )}
          <span className={classes.SignUpTextV2}>
            150% {translate("on")}{" "}
            <span style={{ fontWeight: "400", textTransform: "lowercase" }}>
              {translate("1st")}
            </span>{" "}
            <span style={{ fontWeight: "400" }}>{translate("deposit")} </span>
          </span>
          <span className={classes.SignUpTextV1}>
            {translate("up to")} 200 {siteCurrency(currency, "symbol")}
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
