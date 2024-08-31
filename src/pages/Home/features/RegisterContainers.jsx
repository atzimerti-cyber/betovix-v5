import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './RegisterContainers.module.css';
import Step1Icon from '../../../assets/svgs/step1.svg?react';
import Step2Icon from '../../../assets/svgs/step2.svg?react';
import Step3Icon from '../../../assets/svgs/step3.svg?react';
import AlternativeMethods from '../../Login/features/AlternativeMethods';
import { translate } from '../../../utils/translations';

const RegisterContainers = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <>
            {/* <div className={classes.StepContainer}>
                <div className={classes.SingleStep}>
                    <Step1Icon />
                    <span className={classes.StepText}>
                        <strong>{translate('REGISTER')}</strong> {translate('AN ACCOUNT')}
                    </span>
                </div>
                <div className={classes.SingleStep}>
                    <Step2Icon />
                    <span className={classes.StepText}>
                        <strong>{translate('Make a deposit')}</strong> {translate('and play')}
                    </span>
                </div>
                <div className={classes.SingleStep}>
                    <Step3Icon />
                    <span className={classes.StepText}>
                        <strong>{translate('Receive 50%')}</strong> {translate('Rakeback')}
                    </span>
                </div>
            </div> */}

            <div className={classes.SignupTextContainer}>
                <span className={classes.SignUpTextV1}>{translate('Sign up')}</span>
                &nbsp;{translate('and')}&nbsp;
                <span className={classes.SignUpTextV1}>{translate('choose')}</span>
                <span className={classes.SignUpTextV2}>{translate('your hero')}</span>
                <span className={classes.SignUpTextV2}>{translate('get rewards!')}</span>
                <button className={classes.RegisterButton} onClick={() => addParamsToUrl('auth', 'register')}>
                    {translate('Register')}
                </button>
                {/* <div className={classes.LoginWithWrapper}>
                    <div className={classes.LoginWith}>{translate('or login with')}</div>
                    <AlternativeMethods />
                </div> */}
            </div>
        </>
    );
};

export default RegisterContainers;
