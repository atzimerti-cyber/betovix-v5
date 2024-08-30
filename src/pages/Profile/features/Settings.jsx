import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import CopyToClipboardCont from '../../../features/CopyToClipboard/CopyToClipboardCont';
import classes from './Settings.module.css';
import MainInput2 from '../../../features/UI/Inputs/MainInput2';
import MainInput from '../../../features/UI/Inputs/MainInput';
import MainButton2 from '../../../features/UI/Buttons/MainButton2';
import { translate } from '../../../utils/translations';
import EyeIcon from '../../../assets/svgs/eye.svg?react'; // Import the eye icon component
import CheckIcon from '../../../assets/svgs/check.svg?react';
import Times2Icon from '../../../assets/svgs/times2.svg?react';
import Autoheight from '../../../features/UI/Autoheight/Autoheight'; // Import Autoheight

const Settings = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const [displayName, setDisplayName] = useState(user?.Username);
    const [profileIsHidden, setProfileIsHidden] = useState(user?.profileHidden);
    const [marketingEmails, setMarketingEmails] = useState(user?.marketingEmails);
    const [isDisabled, setIsDisabled] = useState(true);

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validPassword, setValidPassword] = useState({
        minSize: false,
        special: false,
        cases: false,
        numbers: false,
    });

    useEffect(() => {
        if (!user) return;

        let isDis = false;
        if (displayName === user.Username && profileIsHidden === user.profileHidden && marketingEmails === user.marketingEmails && !password) {
            isDis = true;
        }

        setIsDisabled(isDis);
    }, [displayName, profileIsHidden, marketingEmails, password]);

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
    };

    const validatePassword = (value) => {
        setValidPassword({
            minSize: value.length >= 8,
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            cases: /[a-z]/.test(value) && /[A-Z]/.test(value),
            numbers: /\d/.test(value),
        });
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const saveChanges = () => {
        console.log('SAVE');
        // Add functionality to save the changes (e.g., API call)
    };

    return (
        <motion.div
            className={classes.TabContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className={classes.Form}>
                <div>
                    <p className={classes.Title}>{translate('Settings')}</p>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate('Display Name')}</p>
                        {/* <p className={classes.Text}>{translate('Your display name must be between 1 and 24 characters.')}</p> */}

                        <MainInput2
                            type='text'
                            name='displayName'
                            value={displayName}
                            //onChange={(value) => setDisplayName(value)}
                            readonly
                        />

                        <p className={classes.Title}>{translate('Change Your Password')}</p>
                        <p className={classes.Text}>{translate('Your password must meet the following criteria:')}</p>

                        <div className={classes.InputOuter}>
                            <MainInput
                                role='textbox'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder={translate('Type your password')}
                                value={password}
                                onChange={handlePasswordChange}
                                noAutoComplete
                                isInvalid={
                                    !validPassword.minSize || !validPassword.special || !validPassword.cases || !validPassword.numbers
                                }
                                rightIcon={
                                    <EyeIcon
                                        className={showPassword ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                        onClick={toggleShowPassword}
                                    />
                                }
                            />
                            <div className={classes.FormValidationMessage}>
                                <Autoheight show={true}>
                                    <div className={classes.PasswordCheckContainer}>
                                        <div className={validPassword.minSize ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                            {validPassword.minSize ? <CheckIcon /> : <Times2Icon />}
                                            <div className={classes.PasswordText}>
                                                {translate('Min. 8 characters')}
                                            </div>
                                        </div>
                                        <div className={validPassword.special ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                            {validPassword.special ? <CheckIcon /> : <Times2Icon />}
                                            <div className={classes.PasswordText}>{translate('1 Special Character')}</div>
                                        </div>
                                        <div className={validPassword.cases ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                            {validPassword.cases ? <CheckIcon /> : <Times2Icon />}
                                            <div className={classes.PasswordText}>{translate('Upper and Lowercase')}</div>
                                        </div>
                                        <div className={validPassword.numbers ? [classes.PasswordMessage, classes.IsValid].join(' ') : classes.PasswordMessage}>
                                            {validPassword.numbers ? <CheckIcon /> : <Times2Icon />}
                                            <div className={classes.PasswordText}>{translate('1 Number')}</div>
                                        </div>
                                    </div>
                                </Autoheight>
                            </div>
                        </div>

                        <MainButton2 disabled={isDisabled} onClick={saveChanges}>
                            <span>{translate('Save Changes')}</span>
                        </MainButton2>
                    </div>
                </div>

                <div>
                    <p className={classes.Title}>{translate('User Information')}</p>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate('User ID')}</p>
                        <p className={classes.Text}>{translate('This is your unique ID. Please include this ID when contacting support.')}</p>

                        <CopyToClipboardCont text={user?.AccountId} />
                    </div>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate('Account Type')}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
