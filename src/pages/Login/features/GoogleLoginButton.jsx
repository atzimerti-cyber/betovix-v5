import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { logingGoogle } from "../loginAsyncActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { translate } from "../../../utils/translations";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSuccess = (credentialResponse) => {
    const affcode = localStorage.getItem("AffiliateCode");

    const body = {
      Token: credentialResponse.credential,
      ...(affcode && { code: affcode }),
    };

    dispatch(logingGoogle(body, navigate, location.pathname));

    // Example of what the old fetch method did, if needed:
    // fetch(config.VITE_WALLET_API_BASE + '/login/AuthenticateGoogle?siteid=' + config.VITE_SITE_ID, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ Token: credentialResponse.credential }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.Status.StatusCode !== 200) throw Error(data.Contents);
    //     setAccessToken(data.Token);

    //     fetch(config.VITE_WALLET_API_BASE + '/login/State/?lang=en&siteid=' + config.VITE_SITE_ID, {
    //       method: 'GET'
    //     });
    //     toast.success('Login successful', data.Contents);
    //     dispatch(loginActions.setUser(data.Contents));
    //   })
    //   .catch((error) => {
    //     toast.error('Error during login', error.message || data.Contents);
    //   });
  };

  const onFailure = () => {
    toast.error(translate("Login Failed"));
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      buttonText=""
      theme="dark"
      icon={true}
      uxMode="redirect"
    />
  );
};

export default GoogleLoginButton;
