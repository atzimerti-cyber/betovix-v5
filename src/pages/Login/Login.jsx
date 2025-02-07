import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import MainInput from "../../features/UI/Inputs/MainInput";
import MainButton from "../../features/UI/Buttons/MainButton";
import classes from "./Login.module.css";
import { login } from "./loginAsyncActions";
import { verify } from "./loginAsyncActions";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AlternativeMethods from "./features/AlternativeMethods";
import { translate } from "../../utils/translations";
import config from "../../config";
import { loginActions } from "./loginSlice";
import { wrap } from "lodash";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const loginLoading = useSelector((state) => state.login.loginLoading);
  const mobileImg = useMediaQuery({ query: "(max-width: 768px)" });
  const registerPromoImg = useSelector((state) => state.app.registerPromoImg);
  const registerPromoImgMobile = useSelector(
    (state) => state.app.registerPromoImgMobile
  );
  const cookiesSettings = useSelector(
    (state) => state.app.siteSettings.Cookies
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("activationCode");
    if (code) {
      setLoading(true);
      dispatch(verify(code, navigate)).then(() => setLoading(false));
    }
  }, [dispatch]);

  const [loginInfo, setLoginInfo] = useState({
    Provider: 1,
    SiteId: config.VITE_SITE_ID,
    Username: "",
    Password: "",
    RememberMe: false,
    Ip: 1,
    "2fa": "",
  });
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  useEffect(() => {
    if (loginInfo.Username && loginInfo.Password) setIsLoginDisabled(false);
    else setIsLoginDisabled(true);
  }, [loginInfo.Username, loginInfo.Password]);

  const updateLoginInfo = (property, value) => {
    setLoginInfo({ ...loginInfo, [property]: value });
  };

  const changeTab = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", "auth");
    searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <>
      {loading ? (
        <div className={classes.Loading}>
          <div className={classes.Spinner}></div>
        </div>
      ) : (
        <div className={classes.RegisterContainer}>
          <div className={classes.PromoContainer}>
            <div
              className={classes.ImageContainer}
              style={{
                backgroundImage: mobileImg
                  ? `url(${registerPromoImgMobile})`
                  : `url(${registerPromoImg})`,
              }}
            ></div>
          </div>
          <form className={classes.Form}>
            <div
              className={classes.Title}
              style={{ marginBottom: "1rem", textWrap: "wrap", width: "60%" }}
            >
              {translate(`Log in to your account.`)}
            </div>
            <label htmlFor="Username">{translate("Username")}</label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="Username"
                name="Username"
                placeholder={translate("Type your Username")}
                value={loginInfo.Username}
                onChange={(value) => updateLoginInfo("Username", value)}
              />
            </div>

            <label htmlFor="Password">{translate("Password")}</label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="password"
                id="Password"
                name="Password"
                placeholder={translate("Type your Password")}
                value={loginInfo.Password}
                onChange={(value) => updateLoginInfo("Password", value)}
                noAutoComplete={false}
              />
            </div>

            {/* <label htmlFor='twoFactor'>{translate('2FA Code (If enabled)')}</label>
                        <div className={classes.InputOuter}>
                            <MainInput
                                role='textbox'
                                type='number'
                                id='twoFactor'
                                name='twoFactor'
                                inputmode='decimal'
                                value={loginInfo['2fa']}
                                onChange={(value) => updateLoginInfo('2fa', value)}
                            />
                        </div> */}

            <MainButton
              loading={loginLoading}
              color="primary"
              disabled={isLoginDisabled}
              onClick={() => {
                dispatch(login(loginInfo, navigate, location.pathname));
              }}
            >
              {translate("Login")}
            </MainButton>
            {config.VITE_GOOGLE_CLIENT_ID !== "" && (
              <>
                <p className={classes.LoginWith}>
                  {translate("or login with")}
                </p>
                <GoogleOAuthProvider clientId={config.VITE_GOOGLE_CLIENT_ID}>
                  <AlternativeMethods />
                </GoogleOAuthProvider>
              </>
            )}
            <MainButton
              color="transparent"
              onClick={() => changeTab("forgot-password")}
            >
              {translate("Forgot your password?")}
            </MainButton>

            {cookiesSettings && (
              <label
                htmlFor="terms"
                className={classes.CheckboxLabel}
                style={{ fontWeight: "300", marginLeft: "0rem" }}
              >
                {translate(
                  "By accessing this site I attest that I have read and agree with the"
                )}{" "}
                <Link
                  to="/pages/terms-of-service"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>{translate("Terms and Conditions")}</b>.
                </Link>
                *
              </label>
            )}

            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: "400",
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "underline",
                color: "white",
              }}
              onClick={() => changeTab("register")}
            >
              <i>{translate("No account? Register here")}</i>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
