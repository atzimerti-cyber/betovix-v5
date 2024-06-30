import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import classes from './Profile.module.css';
import User2Icon from '../../assets/svgs/user2.svg?react';
import GlobeIcon from '../../assets/svgs/globe.svg?react';
import Settings2Icon from '../../assets/svgs/settings2.svg?react';
import CheckFilledIcon from '../../assets/svgs/check-filled.svg?react';
import TabsVertical from '../../features/UI/Tabs/TabsVertical';
import Overview from './features/Overview';
import Settings from './features/Settings';
import Verification from './features/Verification';
import BarLoading from '../../features/UI/BarLoading/BarLoading';
import { translate } from '../../utils/translations';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab');

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const barLoading = useSelector((state) => state.app.barLoading);
    const [selectedTab, setSelectedTab] = useState(tab || 'overview');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('tab', selectedTab);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }, [selectedTab]);

    return (
        <>
            <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

            <div className={classes.PageContent}>
                <h1 className={classes.PageTitle}>
                    <User2Icon />
                    {translate('Profile')}
                </h1>

                <div className={classes.TabsContainer}>
                    <div className={classes.Container}>
                        <TabsVertical
                            tabs={[
                                { id: 'overview', label: translate('Overview'), icon: <GlobeIcon />, active: selectedTab === 'overview' },
                                { id: 'settings', label: translate('Settings'), icon: <Settings2Icon />, active: selectedTab === 'settings' },
                                { id: 'verification', label: translate('Verification'), icon: <CheckFilledIcon />, active: selectedTab === 'verification' },
                            ]}
                            onChangeTab={(tab) => setSelectedTab(tab)}
                            type='buttons'
                        />

                        <div className={classes.TabPanel}>
                            {selectedTab === 'overview' && <Overview />}
                            {selectedTab === 'settings' && <Settings />}
                            {selectedTab === 'verification' && <Verification />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
