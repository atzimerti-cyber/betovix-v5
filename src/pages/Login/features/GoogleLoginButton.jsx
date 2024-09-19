import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import config from '../../../config';

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
      toast.success('Login successful:', data);
    })
    .catch((error) => {
      toast.error('Error during login:', error);
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
