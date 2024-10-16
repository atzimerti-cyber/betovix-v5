import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './LoginModal.module.css';
import Tabs from '../../UI/Tabs/Tabs';
import logo from '../../../assets/svgs/logo-small.svg';
// import logo from '../../../assets/images/auth_modal_promo.webp';
import AfaIcon from '../../../assets/svgs/afa.svg?react';
import Login from '../../../pages/Login/Login';
import Register from '../../../pages/Login/Register';
import { translate } from '../../../utils/translations';
import Forgot from '../../../pages/Login/Forgot';
import { modalActions } from '../modalSlice';

const LoginModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const onCloseModal = useSelector((state) => state.modal.onCloseModal);

    const changeTab = (tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', 'auth');
        searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className={classes.LoginModal}>
            <div className={classes.ModalContent}>
                
                {/* {!isMobile && (
                    <div className={classes.PromoSection}>
                        <div className={classes.ImageContainer}>
                            <img src={logo} loading='lazy' />
                        </div> 
                    </div>
                    
                )} */}


                <div className={classes.FormSection}>
                    <Tabs
                        tabs={[
                            { id: 'login', label: 'Login', active: props.tab === 'login' },
                            { id: 'register', label: 'Register', active: props.tab === 'register' },
                        ]}
                        type='buttons'
                        noMargin
                        Width100
                        onClose={props.onClose}
                        onChangeTab={(tab) => changeTab(tab)}
                    />

                    <div role='tabpanel' className={classes.TabContent}>
                        {props.tab === 'login' && <Login />}
                        {props.tab === 'register' && <Register />}
                        {props.tab === 'forgot-password' && <Forgot />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
