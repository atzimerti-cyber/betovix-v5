import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './Forgot.module.css';
import { translate } from '../../utils/translations';
import MainInput from '../../features/UI/Inputs/MainInput';
import MainButton from '../../features/UI/Buttons/MainButton';
import useDebounce from '../../hooks/useDebounce';
import Autoheight from '../../features/UI/Autoheight/Autoheight';
import { sentRecoveryEmail, verifyCode, updatePassword } from './loginAsyncActions';
import ArrowButton from '../../features/UI/Buttons/ArrowButton';
import AngleLeftIcon from '../../assets/svgs/angle-left.svg?react';
import EyeIcon from '../../assets/svgs/eye.svg?react';
import Times2Icon from '../../assets/svgs/times2.svg?react';
import CheckIcon from '../../assets/svgs/check.svg?react';
import { loginActions } from './loginSlice';

const Forgot = () => {
    const navigate = useNavigate();
    const location = useLocation();   
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang);
    const recoverId = useSelector((state) => state.login.recoverId);
    const emailSent = useSelector((state) => state.login.emailSent);
    const settings = useSelector((state) => state.app.settings);
    const updateLoading = useSelector((state) => state.login.updateLoading);

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

    const [validChecks, setValidChecks] = useState({
        password: {
            valid: true,
            show: false,
            minSize: true,
            numbers: true,
            special: true,
            cases: true,
        },
        verifyPassword: null,
    });

    const [updateInfo, setUpdateInfo] = useState({
        Password: null,
        RePassword: null
    });

    const debPassword = useDebounce(updateInfo.Password);
    const debVerifyPassword = useDebounce(updateInfo.RePassword);

    const updateRecoverInfo = (property, value) => {
        if (property === 'password') value = value.trim();

        setUpdateInfo({ ...updateInfo, [property]: value });
    };

    useEffect(() => {
        if (!debPassword) return;
    
        const validMinSize = debPassword.length >= settings.passwordMinLength;
    
        const hasUppercase = /[A-Z]/.test(debPassword);
        const hasLowercase = /[a-z]/.test(debPassword);
        const validCases = hasUppercase && hasLowercase;
    
        const validNumbers = /\d/.test(debPassword);
    
        const specialCharRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const validSpecial = specialCharRegex.test(debPassword);
    
        const isValid = validMinSize && validCases && validNumbers && validSpecial;
    
        // Functional update to avoid stale state
        setValidChecks((prevValidChecks) => ({
            ...prevValidChecks,
            password: {
                valid: isValid,
                show: prevValidChecks.password.show,
                minSize: validMinSize,
                numbers: validNumbers,
                special: validSpecial,
                cases: validCases,
            },
        }));
    }, [debPassword, settings.passwordMinLength]);

    useEffect(() => {
        if (!debPassword || !debVerifyPassword) return;

        const isMatching = debPassword === debVerifyPassword;
        setValidChecks({
            ...validChecks,
            verifyPassword: isMatching,
        });
    }, [debPassword, debVerifyPassword]);

    useEffect(() => {
        if (
            updateInfo.Password &&
            updateInfo.RePassword &&
            validChecks.password.valid &&
            validChecks.verifyPassword
        )
        setIsUpdateDisabled(false);
        else setIsUpdateDisabled(true);
    }, [validChecks.password.valid, validChecks.verifyPassword]);
    
    const onTogglePassword = () => {
        const updated = {
            ...validChecks,
            password: {
                ...validChecks.password,
                show: !validChecks.password.show,
            },
        };
        setValidChecks(updated);
    };
    
    return (
        <form className={classes.RecoverForm}>
            {!emailSent && !recoverId && (
                <>
                    <label className={classes.Text} htmlFor='email'>{translate('Email address')}</label>
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
                            disabled={emailSent}
                        />
                    </div>

                    <div className={classes.RequestButtonWrapper}>
                        <MainButton
                            loading={updateLoading}
                            color='primary'
                            disabled={email === '' || updateLoading}
                            onClick={() => dispatch(sentRecoveryEmail(email))}
                        >
                            {translate('Recover')}
                        </MainButton>
                    </div>
                </>
            )}

            {emailSent && !recoverId && (
                <>
                    <label className={classes.Text} htmlFor='code'>{translate('Verification Code')}</label>
                    <div className={classes.InputOuter}>
                        <MainInput
                            role='textbox'
                            type='text'
                            id='code'
                            name='code'
                            placeholder={translate('Enter the code sent to your email')}
                            value={code}
                            onChange={(value) => setCode(value)}
                            autoComplete
                        />
                    </div>
                    <div className={classes.RequestButtonWrapper}>
                        <MainButton
                            loading={updateLoading}
                            color='primary'
                            disabled={code === '' || updateLoading}
                            onClick={() => dispatch(verifyCode(code))}
                        >
                            {translate('Verify Code')}
                        </MainButton>
                    </div>
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                        <ArrowButton onClick={() => dispatch(loginActions.setEmailSentCorrectly(false))}>
                            <AngleLeftIcon />
                        </ArrowButton>
                    </div>
                </>
            )}

            {emailSent && recoverId && (
                <>
                    <label className={classes.Text} htmlFor='password'>
                        {translate('Password')}
                        <span className={debPassword && validChecks.password ? [classes.Required, classes.Fulfilled].join(' ') : classes.Required}>∗</span>
                    </label>
                    <div className={classes.InputOuter}>
                        <MainInput
                            role='textbox'
                            type={validChecks.password.show ? 'text' : 'password'}
                            id='password'
                            name='password'
                            placeholder={translate('Type your password')}
                            value={updateInfo.Password}
                            onChange={(value) => updateRecoverInfo('Password', value)}
                            noAutoComplete
                            isInvalid={!validChecks.password.valid}
                            rightIcon={
                                <EyeIcon
                                    className={validChecks.password.show ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                    onClick={onTogglePassword}
                                />
                            }
                        />
                        <div className={classes.FormValidationMessage}>
                            <Autoheight show={!validChecks.password.valid}>
                                {translate('Password must include a special character, upper and lower case, and a number')}
                            </Autoheight>
                            <Autoheight show={debPassword && debPassword.length > 0}>
                                <div className={classes.PasswordCheckContainer}>
                                    <div className={validChecks.password.minSize ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                        {validChecks.password.minSize ? <CheckIcon /> : <Times2Icon />}
                                        <div className={classes.PasswordText}>
                                            {translate('Min.')} {settings.passwordMinLength} {translate('character')}
                                        </div>
                                    </div>
                                    <div className={validChecks.password.special ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                        {validChecks.password.special ? <CheckIcon /> : <Times2Icon />}
                                        <div className={classes.PasswordText}>{translate('1 Special Character')}</div>
                                    </div>
                                    <div className={validChecks.password.cases ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                        {validChecks.password.cases ? <CheckIcon /> : <Times2Icon />}
                                        <div className={classes.PasswordText}>{translate('Upper and Lowercase')}</div>
                                    </div>
                                    <div className={validChecks.password.numbers ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                        {validChecks.password.numbers ? <CheckIcon /> : <Times2Icon />}
                                        <div className={classes.PasswordText}>{translate('1 Number')}</div>
                                    </div>
                                </div>
                            </Autoheight>
                        </div>
                    </div>


                    <label className={classes.Text} htmlFor='verify-password'>
                        {translate('Verify Password')}
                        <span className={debVerifyPassword && validChecks.verifyPassword ? [classes.Required, classes.Fulfilled].join(' ') : classes.Required}>∗</span>
                    </label>
                    <div className={classes.InputOuter}>
                        <MainInput
                            role='textbox'
                            type={validChecks.password.show ? 'text' : 'password'}
                            id='verify-password'
                            name='verifyPassword'
                            placeholder={translate('Type your password again')}
                            value={updateInfo.RePassword}
                            onChange={(value) => updateRecoverInfo('RePassword', value)}
                            noAutoComplete
                            isInvalid={updateInfo.RePassword && !validChecks.verifyPassword}
                            rightIcon={
                                <EyeIcon
                                    className={validChecks.password.show ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                    onClick={onTogglePassword}
                                />
                            }
                        />
                        <div className={classes.FormValidationMessage}>
                            <Autoheight show={updateInfo.RePassword && !validChecks.verifyPassword}>
                                {translate('Passwords do not match')}
                            </Autoheight>
                        </div>
                    </div>

                    <MainButton
                        loading={updateLoading}
                        color='primary'
                        disabled={isUpdateDisabled}
                        onClick={() => dispatch(updatePassword(updateInfo, recoverId, navigate, location.pathname))}
                    >
                        {translate('Update Password')}
                    </MainButton>
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                        <ArrowButton onClick={() => dispatch(loginActions.setRecoverAccountId(null))} >
                            <AngleLeftIcon />
                        </ArrowButton>
                    </div>
                </>
            )}
        </form>
    );
};

export default Forgot;
