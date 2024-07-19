import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Forgot.module.css';
import { translate } from '../../utils/translations';
import MainInput from '../../features/UI/Inputs/MainInput';
import MainButton from '../../features/UI/Buttons/MainButton';

const Forgot = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [email, setEmail] = useState('');

    return (
        <form className={classes.RecoverForm}>
            <h1 className={classes.FormTitle}>{translate('Password Recovery')}</h1>

            {/* <label fhtmlFr='email'>{translate('Email address')}</label> */}
            <label htmlFor='email'>{translate('Email address')}</label>
            <div className={classes.InputOuter}>
                <MainInput
                    role='textbox'
                    type='text'
                    id='email'
                    name='email'
                    placeholder={translate('Type your Email')}
                    value={email}
                    onChange={(value) => setEmail(value)}
                    autoComplete
                />
            </div>
            <div className={classes.RequestButtonWrapper}>
                <MainButton
                    // loading={loginLoading}
                    color='primary'
                    disabled={email === ''}
                    onClick={() => console.log('Recover')}
                >
                    {translate('Recover')}
                </MainButton>
            </div>
        </form>
    );
};

export default Forgot;
