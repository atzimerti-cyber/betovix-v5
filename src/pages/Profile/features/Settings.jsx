import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { changePassword } from '../profileAsyncActions';

const Settings = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const [displayName, setDisplayName] = useState(user?.Username);
    const [profileIsHidden, setProfileIsHidden] = useState(user?.profileHidden);
    const [marketingEmails, setMarketingEmails] = useState(user?.marketingEmails);
    const [isDisabled, setIsDisabled] = useState(true);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [validPassword, setValidPassword] = useState({
        minSize: false,
        special: false,
        cases: false,
        numbers: false,
    });
    const [verify, setVerify] = useState(false)

    useEffect(() => {
        if (!user) return;

        let isDis = false;
        if (displayName === user.Username && profileIsHidden === user.profileHidden && marketingEmails === user.marketingEmails && !newPassword) {
            isDis = true;
        }

        setIsDisabled(isDis);
    }, [displayName, profileIsHidden, marketingEmails, newPassword]);

    const handleCurrentPassword = (value) => {
        setCurrentPassword(value);
    };

    const handlePasswordChange = (value) => {
        setNewPassword(value);
        validatePassword(value);
    };

    const handleVerify = (value) => {
        setVerifyPassword(value);
        validateVerify(value);
    };

    const validatePassword = (value) => {
        setValidPassword({
            minSize: value.length >= 8,
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            cases: /[a-z]/.test(value) && /[A-Z]/.test(value),
            numbers: /\d/.test(value),
        });
    };

    const validateVerify = (value) => {
        if (value === newPassword){
            setVerify(true);
        }else{
            setVerify(false);
        }
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword((prev) => !prev);
    };
    const toggleShowNewPassword = () => {
        setShowNewPassword((prev) => !prev);
    };
    const toggleShowVerifyPassword = () => {
        setShowVerifyPassword((prev) => !prev);
    };

    const saveChanges = () => {
        console.log('SAVE');
        const payload = {
            OldPass: currentPassword,
            Password: newPassword,
            RePassword: verifyPassword,
        }
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(changePassword(signal, payload));
    };

    const getAccountType = (role) => {
        switch (role) {
            case 40:
                return "Player";
            case 30:
                return "Shop";
            case 20:
                return "Agent";
            case 10:
                return "Owner";
            case 1 || 0:
                return "Admin";
            default:
                return "-";
        }
    }

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


                        <div className={classes.InputOuter}>
                            <label htmlFor='currentPassword'>
                            <p className={classes.Text}>{translate('Current Password')}</p>
                            </label>
                            <MainInput
                                inSettings
                                role='textbox'
                                type={showCurrentPassword ? 'text' : 'password'}
                                id='currentPassword'
                                name='password'
                                placeholder={translate('Type your current password')}
                                value={currentPassword}
                                onChange={handleCurrentPassword}
                                noAutoComplete
                                rightIcon={
                                    <EyeIcon
                                        className={showCurrentPassword ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                        onClick={toggleShowCurrentPassword}
                                    />
                                }
                            />
                            <label htmlFor='password'>
                            <p className={classes.Text}>{translate('New Password')}</p>
                            </label>
                            <MainInput
                                inSettings
                                role='textbox'
                                type={showNewPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder={translate('Type your password')}
                                value={newPassword}
                                onChange={handlePasswordChange}
                                noAutoComplete
                                isInvalid={
                                    newPassword && (
                                        !validPassword.minSize || !validPassword.special || !validPassword.cases || !validPassword.numbers
                                    )
                                }
                                rightIcon={
                                    <EyeIcon
                                        className={showNewPassword ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                        onClick={toggleShowNewPassword}
                                    />
                                }
                            />

                            <label htmlFor='verifyPassword'>
                                <p className={classes.Text}>{translate('Verify Password')}</p>
                            </label>
                            <MainInput
                                inSettings
                                role='textbox'
                                type={showVerifyPassword ? 'text' : 'password'}
                                id='verifyPassword'
                                name='password'
                                placeholder={translate('Type your password')}
                                value={verifyPassword}
                                onChange={handleVerify}
                                noAutoComplete
                                isInvalid={
                                    verifyPassword && (
                                        !verify
                                    )
                                }
                                rightIcon={
                                    <EyeIcon
                                        className={showVerifyPassword ? [classes.ShowPasswordIcon, classes.ShowLine].join(' ') : classes.ShowPasswordIcon}
                                        onClick={toggleShowVerifyPassword}
                                    />
                                }
                            />

                            <p className={classes.Text}>{translate('Your password must meet the following criteria:')}</p>

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
                        <p className={classes.Text}>
                            {user?.Role && getAccountType(user.Role)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
