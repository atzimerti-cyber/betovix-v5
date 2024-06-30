import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import CopyToClipboardCont from '../../../features/CopyToClipboard/CopyToClipboardCont';
import classes from './Settings.module.css';
import MainInput2 from '../../../features/UI/Inputs/MainInput2';
import Switch from '../../../features/UI/Switch/Switch';
import MainButton2 from '../../../features/UI/Buttons/MainButton2';
import { translate } from '../../../utils/translations';

const Settings = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const [displayName, setDisplayName] = useState(user?.Username);
    const [profileIsHidden, setProfileIsHidden] = useState(user?.profileHidden);
    const [marketingEmails, setMarketingEmails] = useState(user?.marketingEmails);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (!user) return;

        let isDis = false;

        if (displayName === user.Username && profileIsHidden === user.profileHidden && marketingEmails === user.marketingEmails) isDis = true;

        setIsDisabled(isDis);
    }, [displayName, profileIsHidden, marketingEmails]);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className={classes.Form}>
                <div>
                    <p className={classes.Title}>{translate('Settings')}</p>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate('Display Name')}</p>
                        <p className={classes.Text}>{translate('Your display name must be between 1 and 24 characters.')}</p>

                        <MainInput2 type='text' name='displayName' value={displayName} onChange={(value) => setDisplayName(value)} />

                        <div className={classes.ToggleContainer}>
                            <label onClick={() => setProfileIsHidden((prev) => !prev)}>{translate('Toggle Profile Privacy')}</label>
                            <Switch active={profileIsHidden} label='' onClick={() => setProfileIsHidden((prev) => !prev)} />
                        </div>
                        <p className={classes.Text}>{translate(`If enabled, your stats and bet history will display as 'Hidden' for others.`)}</p>

                        <div className={classes.ToggleContainer}>
                            <label onClick={() => setMarketingEmails((prev) => !prev)}>{translate(`Marketing Emails`)}</label>
                            <Switch active={marketingEmails} label='' onClick={() => setMarketingEmails((prev) => !prev)} />
                        </div>
                        <p className={classes.Text}>{translate(`Send me bonus and marketing emails.`)}</p>

                        <MainButton2 disabled={isDisabled} onClick={() => console.log('SAVE')}>
                            <span>{translate(`Save Changes`)}</span>
                        </MainButton2>
                    </div>
                </div>

                <div>
                    <p className={classes.Title}>{translate(`User Information`)}</p>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate(`User ID`)}</p>
                        <p className={classes.Text}>{translate(`This is your unique ID. Please include this ID when contacting support.`)}</p>

                        <CopyToClipboardCont text={user?.AccountId} />
                    </div>
                    <div className={classes.FormGroup}>
                        <p className={classes.Title}>{translate(`Account Type`)}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
