import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './LoginModal.module.css';
import Tabs from '../../UI/Tabs/Tabs';
import Login from '../../../pages/Login/Login';
import Register from '../../../pages/Login/Register';
import Forgot from '../../../pages/Login/Forgot';
import { translate } from '../../../utils/translations';
import TimesIcon from '../../../assets/svgs/times.svg?react';

const LoginModal = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const registerPromoImg = useSelector((state) => state.app.registerPromoImg);
  const registerPromoImgMobile = useSelector((state) => state.app.registerPromoImgMobile);
  const hasPromoImage = Boolean(registerPromoImg || registerPromoImgMobile);
  const isForgot = props.tab === 'forgot-password';

  const changeTab = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('modal', 'auth');
    searchParams.set('tab', tab);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className={`${classes.LoginModal} ${!hasPromoImage || isForgot ? classes.NoPromo : ''}`}>
      <button type='button' className={classes.CloseButton} onClick={props.onClose} aria-label={translate('Close')}>
        <TimesIcon />
      </button>
      {!isForgot ? (
        <div className={`${classes.AuthTabs} ${!hasPromoImage ? classes.AuthTabsFull : ''}`}>
          <Tabs
            tabs={[
              { id: 'register', label: translate('Sign up'), active: props.tab === 'register' },
              { id: 'login', label: translate('Sign in'), active: props.tab === 'login' },
            ]}
            type='buttons'
            noMargin
            Width100
            onChangeTab={(tab) => changeTab(tab)}
          />
        </div>
      ) : null}

      <div role='tabpanel' className={classes.TabContent}>
        {props.tab === 'login' && <Login />}
        {props.tab === 'register' && <Register />}
        {props.tab === 'forgot-password' && <Forgot />}
      </div>
    </div>
  );
};

export default LoginModal;
