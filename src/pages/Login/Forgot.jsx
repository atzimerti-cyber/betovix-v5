import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import MainInput from '../../features/UI/Inputs/MainInput';
import MainButton from '../../features/UI/Buttons/MainButton';
import EyeIcon from '../../assets/svgs/eye.svg?react';
import classes from './Forgot.module.css';
import { requestPasswordReset, resetPassword } from './loginAsyncActions';
import { translate } from '../../utils/translations';

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const updateLoading = useSelector((state) => state.login.updateLoading);
  const passwordMinLength = useSelector((state) => Number(state.app.settings?.passwordMinLength || 6));

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tokenFromUrl = searchParams.get('resetToken') || searchParams.get('token') || '';

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [resetToken, setResetToken] = useState(tokenFromUrl);
  const [requested, setRequested] = useState(Boolean(tokenFromUrl));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (tokenFromUrl) {
      setResetToken(tokenFromUrl);
      setRequested(true);
    }
  }, [tokenFromUrl]);

  const changeTab = (tab) => {
    const params = new URLSearchParams(location.search);
    params.set('modal', 'auth');
    params.set('tab', tab);
    params.delete('resetToken');
    params.delete('token');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const onRequestReset = async (event) => {
    event.preventDefault();
    if (!usernameOrEmail.trim() || updateLoading) return;

    const result = await dispatch(requestPasswordReset(usernameOrEmail));
    if (!result?.success) return;

    // Current backend returns ResetToken only in DEV until notification delivery is fully wired.
    // In production the user receives the token/link by email and can return to this form.
    if (result.data?.resetToken) setResetToken(result.data.resetToken);
    setRequested(true);
  };

  const passwordValid = newPassword.length >= passwordMinLength;
  const passwordsMatch = newPassword === confirmPassword && Boolean(confirmPassword);

  const onReset = async (event) => {
    event.preventDefault();
    if (!resetToken.trim() || !passwordValid || !passwordsMatch || updateLoading) return;

    const result = await dispatch(resetPassword(resetToken, newPassword));
    if (result?.success) changeTab('login');
  };

  return (
    <div className={classes.ForgotShell}>
      {!requested ? (
        <form className={classes.Form} onSubmit={onRequestReset}>
          <div className={classes.Header}>
            <h2>{translate('Forgot your password?')}</h2>
            <p>{translate('Enter your username or email and we will send you password reset instructions.')}</p>
          </div>

          <div className={classes.InputOuter}>
            <label htmlFor='forgot-username'>{translate('Username or Email')}</label>
            <MainInput
              id='forgot-username'
              type='text'
              value={usernameOrEmail}
              placeholder={translate('Username or Email')}
              onChange={(value) => setUsernameOrEmail(value)}
            />
          </div>

          <MainButton color='primary' type='submit' loading={updateLoading} disabled={!usernameOrEmail.trim() || updateLoading}>
            {translate('Send reset link')}
          </MainButton>

          <button type='button' className={classes.LinkButton} onClick={() => changeTab('login')}>
            {translate('Back to login')}
          </button>
        </form>
      ) : (
        <form className={classes.Form} onSubmit={onReset}>
          <div className={classes.Header}>
            <h2>{translate('Reset password')}</h2>
            <p>{translate('Use the reset token from your email and choose a new password.')}</p>
          </div>

          <div className={classes.InputOuter}>
            <label htmlFor='reset-token'>{translate('Reset Token')}</label>
            <MainInput
              id='reset-token'
              type='text'
              value={resetToken}
              placeholder={translate('Paste reset token')}
              onChange={(value) => setResetToken(value)}
            />
          </div>

          <div className={classes.InputOuter}>
            <label htmlFor='new-password'>{translate('New Password')}</label>
            <MainInput
              id='new-password'
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              placeholder={translate('New Password')}
              onChange={(value) => setNewPassword(value)}
              rightIcon={<EyeIcon className={showPassword ? classes.EyeOpen : ''} onClick={() => setShowPassword((value) => !value)} />}
            />
            {newPassword && !passwordValid ? (
              <span className={classes.ErrorText}>
                {translate('Password must be at least')} {passwordMinLength} {translate('characters long')}
              </span>
            ) : null}
          </div>

          <div className={classes.InputOuter}>
            <label htmlFor='confirm-password'>{translate('Confirm Password')}</label>
            <MainInput
              id='confirm-password'
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder={translate('Confirm Password')}
              onChange={(value) => setConfirmPassword(value)}
            />
            {confirmPassword && !passwordsMatch ? <span className={classes.ErrorText}>{translate('Passwords do not match')}</span> : null}
          </div>

          <MainButton
            color='primary'
            type='submit'
            loading={updateLoading}
            disabled={!resetToken.trim() || !passwordValid || !passwordsMatch || updateLoading}
          >
            {translate('Update Password')}
          </MainButton>

          <button type='button' className={classes.LinkButton} onClick={() => setRequested(false)}>
            {translate('Request a new reset link')}
          </button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
