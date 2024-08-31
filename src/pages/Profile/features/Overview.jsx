import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import classes from './Overview.module.css';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { getOverview } from '../profileAsyncActions';
import { profileActions } from '../profileSlice';
import DecorationDiv from '../../../features/DecorationDiv/DecorationDiv';
import OverviewCategory from './OverviewCategory';
import { millisecondsToDateStr } from '../../../utils/custom';
import { translate } from '../../../utils/translations';

const Overview = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const topGames = useSelector((state) => state.profile.topGames);
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getOverview(signal));

        return () => dispatch(profileActions.setTopGames(null));
    }, []);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className={classes.OverviewTitle}>{translate('Overview')}</p>

            <div className={classes.GridContainer}>
                <div className={classes.UserClassContainer}>
                    <div className={classes.LevelContainer}>
                        <div className={classes.LevelBadge}>
                            <div>{user?.level}</div>
                        </div>
                    </div>
                    <p className={classes.Username}>{user?.Username}</p>
                    <p className={classes.MemberSince}>
                        {translate('Member since')} {millisecondsToDateStr(user?.registered)}
                    </p>
                </div>

                <DecorationDiv color='primary'>
                    <>
                        <p className={classes.TotalName}>{translate('Active Tickets')}</p>
                        <p className={classes.TotalBits}>
                            {/* <CoinsIcon /> */}
                            {user?.OpenTickets}
                        </p>
                    </>
                </DecorationDiv>

                <DecorationDiv color='secondary'>
                    <>
                        <p className={classes.TotalName}>{translate('Active Wagared')}</p>
                        <p className={classes.TotalBits}>
                            <CoinsIcon />
                            {user?.OpenTotal.toFixed(2)}
                        </p>
                    </>
                </DecorationDiv>

                {/* <div className={classes.Rewards}>
                    <OverviewCategory title='Instant' percentage='20%' bits={20} />
                    <OverviewCategory title='Daily' percentage='0%' bits={0} />
                    <OverviewCategory title='Weekly' percentage='0%' bits={0} />
                    <OverviewCategory title='Monthly' percentage='0%' bits={0} />
                    <OverviewCategory title='Leaderboard' percentage='0%' bits={0} />
                    <OverviewCategory title='Level up bonus' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                </div> */}
            </div>

            <div className={classes.GamesContainer}>
                <SwiperWithOverlay title='Top Games' link='/casino/slots' icon={<LogoSmallIcon />} items={topGames?.Data} max={24} />
            </div>
        </motion.div>
    );
};

export default Overview;
