import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { translate } from '../../../utils/translations';

import classes from './MyRewards.module.css';
import { getUserAchievements } from '../gamificationAsyncActions';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';

import RewardsSwiper from '../../../features/UI/MainSwiper/RewardsSwiper';

import NewIcon from '../../../assets/casinoIcons/new.svg?react';

const MyRewards = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang);

    //const user = useSelector((state) => state.login.user);
    const claimedRewards = useSelector((state) => state.gamification.claimedRewards);
    const newRewards = useSelector((state) => state.gamification.newRewards);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getUserAchievements(signal));

        return () => { };
    }, [dispatch]);

    return (

        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className={classes.OverviewTitle}>{translate('My Rewards')}</p>
            <div className={classes.RewardsSwiper}>
                <RewardsSwiper
                    items={newRewards}
                    viewText
                    icon={<NewIcon className={classes.NewIcon} />}
                    title={'New Rewards'}
                    slidesPerView={1}
                    slidesPerGroup={1}>
                </RewardsSwiper>
            </div>
            <div className={classes.RewardsSwiper}>
                <RewardsSwiper
                    claimed
                    items={claimedRewards}
                    viewAll
                    viewText
                    icon={<NewIcon className={classes.NewIcon} />}
                    title={'Claimed Rewards'}>
                </RewardsSwiper>
            </div>

        </motion.div>

    );
});

export default MyRewards;