import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import config from '../../../config';
import { loginActions } from '../loginSlice';

const onSuccess = (credentialResponse) => {
  fetch(config.VITE_WALLET_API_BASE + '/login/AuthenticateGoogle?siteid=' + config.VITE_SITE_ID, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Token: credentialResponse.credential }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.Status.StatusCode !== 200) throw Error(data.Contents);
      toast.success('Login successful', data.Contents);
      dispatch(loginActions.setUser(data.Contents));
    })
    .catch((error) => {
      toast.error('Error during login', error || data.Contents);
    });
};

const onFailure = () => {
  toast.error('Login Failed');
};

const GoogleLoginButton = () => (
  <GoogleLogin
    onSuccess={onSuccess}
    onError={onFailure}
  />
);

export default GoogleLoginButton;
