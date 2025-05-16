import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./LoginFullPage.module.css";
import WarningIcon from "../../assets/svgs/warning.svg?react";
import SuccessIcon from "../../assets/svgs/check-filled.svg?react";
import BackIcon from "../../assets/svgs/angle-left.svg?react";
import { translate } from "../../utils/translations";
import { login } from "./loginAsyncActions";
import MainButton from "../../features/UI/Buttons/MainButton";
import config from "../../config";
import Forgot from "./Forgot";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import config from "../../config";
// import AlternativeMethods from "./features/AlternativeMethods";

const LoginFullPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const theme = useSelector((state) => state.layout.theme);
  const user = useSelector((state) => state.login.user);
  const siteSettings = useSelector((state) => state.app.siteSettings);

  const logoURL = config.VITE_SITE_LOGO ? config.VITE_SITE_LOGO : null;

  const [tab, setTab] = useState("login");
  const [loginInfo, setLoginInfo] = useState({
    Provider: 1,
    Username: "",
    Password: "",
    RememberMe: false,
    Ip: 1,
  });

  const updateLoginInfo = (property, value) => {
    setLoginInfo({ ...loginInfo, [property]: value });
  };

  const ToastCloseButton = ({ closeToast }) => (
    <button
      className={classes.ToastCloseButton}
      aria-label="Close"
      type="button"
      onClick={closeToast}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        xmlns="http://www.w3.org/2000/svg"
        fill="#374E57"
        data-testid="close-icon"
      >
        <path d="M7.6497 6.50084L12.7618 1.38875C13.0794 1.07142 13.0794 0.556521 12.7618 0.239183C12.4442 -0.0784256 11.9298 -0.0784256 11.6122 0.239183L6.50014 5.35127L1.38778 0.239183C1.07017 -0.0784256 0.555815 -0.0784256 0.238206 0.239183C-0.0794021 0.556521 -0.0794021 1.07142 0.238206 1.38875L5.35057 6.50084L0.238206 11.6129C-0.0794021 11.9303 -0.0794021 12.4452 0.238206 12.7625C0.397011 12.921 0.605136 13.0004 0.812991 13.0004C1.02085 13.0004 1.22897 12.921 1.38778 12.7622L6.50014 7.65014L11.6122 12.7622C11.771 12.921 11.9792 13.0004 12.187 13.0004C12.3949 13.0004 12.603 12.921 12.7618 12.7622C13.0794 12.4449 13.0794 11.93 12.7618 11.6127L7.6497 6.50084Z"></path>
      </svg>
    </button>
  );

  const onLogin = (e) => {
    if (loginInfo.Username.trim() && loginInfo.Password.trim()) {
      // e.preventDefault();
      dispatch(login(loginInfo, navigate, location.pathname));
    }
  };

  return user || siteSettings.NeedAuth !== "true" ? (
    <Navigate to="/" />
  ) : (
    <div id="layout" data-theme={theme} className={classes.LoginFullPage}>
      <ToastContainer
        className={classes.MyToast}
        closeButton={ToastCloseButton}
        autoClose={5000}
        icon={({ type }) => {
          if (type === "success") return <SuccessIcon />;
          else if (type === "error") return <WarningIcon />;
          else if (type === "warning") return <WarningIcon />;
        }}
      />

      <div
        className={classes.Content}
        // style={{ backgroundImage: `url(customer/loginPicCasino.jpg)` }}
      >
        {/* <div className={classes.DarkOverlay}></div>
        <img
          className={classes.RouletteImage}
          src="customer/roulette.png"
          alt="Roulette img"
        /> */}
        <div className={classes.FormWrapper}>
          <div className={classes.FormContainer}>
            <div className={classes.LogoContainer}>
              <div
                className={classes.SiteLogo}
                style={{
                  backgroundImage: `url(${logoURL})`,
                }}
              ></div>
            </div>

            {tab === "login" ? (
              <>
                <form>
                  <label htmlFor="Username">{translate("Username")}</label>
                  {/* <div className={classes.InputOuter}> */}
                  <input
                    className={classes.LoginInput}
                    type="text"
                    name="Username"
                    placeholder={translate("Username")}
                    value={loginInfo.Username}
                    onChange={(e) =>
                      updateLoginInfo("Username", e.target.value)
                    }
                    required
                  />
                  {/* </div> */}

                  <label htmlFor="Password">{translate("Password")}</label>
                  {/* <div className={classes.InputOuter}> */}
                  <input
                    className={classes.LoginInput}
                    type="password"
                    name="Password"
                    placeholder={translate("Password")}
                    value={loginInfo.Password}
                    onChange={(e) =>
                      updateLoginInfo("Password", e.target.value)
                    }
                    required
                  />
                  {/* </div> */}

                  <div className={classes.SubmitButtonWrapper}>
                    <MainButton color="primary" onClick={onLogin}>
                      {translate("Login")}
                    </MainButton>
                  </div>
                </form>
                <div className={classes.ForgotBtnWrapper}>
                  <MainButton
                    color="transparent"
                    onClick={() => setTab("forgot-password")}
                  >
                    {translate("Forgot your password?")}
                  </MainButton>
                </div>
              </>
            ) : (
              tab == "forgot-password" && (
                <div className={classes.ForgotTabWrapper}>
                  <div className={classes.BackWrapper}>
                    <button
                      className={classes.BackBtn}
                      onClick={() => setTab("login")}
                    >
                      <BackIcon />
                      {translate("Back")}
                    </button>
                  </div>
                  <div style={{ padding: "0px 15px" }}>
                    <Forgot />
                  </div>
                </div>
              )
            )}

            {/* {config.VITE_GOOGLE_CLIENT_ID !== "" && (
              <>
                <p className={classes.LoginWith}>
                  {translate("or login with")}
                </p>
                <GoogleOAuthProvider clientId={config.VITE_GOOGLE_CLIENT_ID}>
                  <AlternativeMethods />
                </GoogleOAuthProvider>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFullPage;
