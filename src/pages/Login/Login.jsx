import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import MainInput from '../../features/UI/Inputs/MainInput';
import MainButton from '../../features/UI/Buttons/MainButton';
import EyeIcon from '../../assets/svgs/eye.svg?react';
import classes from './Login.module.css';
import { login, verify } from './loginAsyncActions';
import { translate } from '../../utils/translations';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const loginLoading = useSelector((state) => state.login.loginLoading);
  const registerPromoImg = useSelector((state) => state.app.registerPromoImg);
  const registerPromoImgMobile = useSelector((state) => state.app.registerPromoImgMobile);

  const [loadingVerification, setLoadingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });

  const promoImage = useMemo(
    () =>
      isMobile
        ? registerPromoImgMobile || registerPromoImg || null
        : registerPromoImg || registerPromoImgMobile || null,
    [isMobile, registerPromoImg, registerPromoImgMobile],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('activationCode');
    if (!code) return;

    setLoadingVerification(true);
    Promise.resolve(dispatch(verify(code, navigate))).finally(() => setLoadingVerification(false));
  }, [dispatch, location.search, navigate]);

  const changeTab = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('modal', 'auth');
    searchParams.set('tab', tab);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.usernameOrEmail.trim() || !form.password || loginLoading) return;

    await dispatch(
      login(
        {
          Username: form.usernameOrEmail,
          Password: form.password,
        },
        navigate,
        location.pathname,
      ),
    );
  };

  if (loadingVerification) return <div className={classes.AuthLoading}>{translate('Loading')}...</div>;

  return (
    <div className={`${classes.RegisterContainer} ${classes.LoginContainer} ${!promoImage ? classes.NoPromo : ''}`}>
      {promoImage ? (
        <div className={`${classes.PromoContainer} ${classes.LoginPromoContainer}`}>
          <div className={classes.ImageContainer} style={{ backgroundImage: `url(${promoImage})` }} />
          <div className={classes.PromoOverlay} />
          <div className={classes.LoginPromoCopy}>
            <strong>{translate('Welcome Back')}</strong>
            <span>{translate('Log in and let the games begin')}</span>
          </div>
        </div>
      ) : null}

      <form className={`${classes.Form} ${classes.LoginForm}`} onSubmit={onSubmit}>
        <div className={classes.AuthIntro}>
          <div className={classes.Title}>{translate('Log In')}</div>
          <p>{translate('Log in and let the games begin')}</p>
        </div>

        <div className={classes.InputOuter}>
          <MainInput
            type='text'
            value={form.usernameOrEmail}
            placeholder={translate('Email')}
            onChange={(value) => setForm((current) => ({ ...current, usernameOrEmail: value }))}
          />
        </div>

        <div className={classes.InputOuter}>
          <MainInput
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            placeholder={translate('Password')}
            onChange={(value) => setForm((current) => ({ ...current, password: value }))}
            rightIcon={<EyeIcon className={showPassword ? classes.ShowPasswordIcon : `${classes.ShowPasswordIcon} ${classes.ShowLine}`} onClick={() => setShowPassword((value) => !value)} />}
          />
        </div>

        <button type='button' className={classes.AuthTextAction} onClick={() => changeTab('forgot-password')}>
          {translate('Forgot your password?')}
        </button>

        <MainButton
          color='primary'
          type='submit'
          loading={loginLoading}
          disabled={!form.usernameOrEmail.trim() || !form.password || loginLoading}
        >
          {translate('Sign In')}
        </MainButton>

        <div className={classes.AuthSwitch}>
          <span>{translate('You are a new player?')}</span>
          <button type='button' onClick={() => changeTab('register')}>{translate('Create Account')}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
