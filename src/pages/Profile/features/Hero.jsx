import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import classes from './Hero.module.css';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';

import HeroDisplaySwiper from '../../../features/UI/MainSwiper/HeroDisplaySwiper';
import Levels from '../../../features/ModalRoot/features/Levels';
import Milestones from '../../../features/ModalRoot/features/Milestones';

import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { getOverview } from '../profileAsyncActions';
import DecorationDiv from '../../../features/DecorationDiv/DecorationDiv';
import OverviewCategory from './OverviewCategory';
import { millisecondsToDateStr } from '../../../utils/custom';
import { translate } from '../../../utils/translations';

import { modalActions } from '../../../features/ModalRoot/modalSlice';
import { profileActions } from '../profileSlice'; 
import levels from '../../../dummyData/levels';
import rewards from '../../../dummyData/rewards';
import MainButton from '../../../features/UI/Buttons/MainButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHeroes } from '../profileAsyncActions';

const Hero = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const heroes = useSelector((state) => state.profile.heroes);
    const user = useSelector((state) => state.login.user);
    const selectedHero = useSelector((state) => state.profile.selectedHero);

    const [activeLevel, setActiveLevel] = useState(user?.level);

    //dispatch(modalActions.setLevels(levels));
    //dispatch(modalActions.setRewards(rewards));

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getHeroes(signal));

        return () => dispatch(profileActions.setTopGames(null));
    }, []);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className={classes.OverviewTitle}>{translate('Heroes')}</p>

            <div className={classes.GridContainer}>
                <div className={classes.DisplayContainer}>
                    <div className={classes.ImageContainer}>
                        <img src={selectedHero.icontb} loading='lazy' alt={selectedHero.name} />
                    </div>
                </div>

                <div className={classes.SelectHeroBtn}>
                    <MainButton color='bv-light-green' onClick={() => addParamsToUrl('hero-confirm')}>
                        <span>Select Hero</span>
                    </MainButton>
                </div>
                <section className={classes.LevelUpSection}>
                    <div className={classes.LevelUpMilestone}>
                        <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />
                        <Milestones activeLevel={activeLevel} />
                    </div>
                </section>

                {/* <DecorationDiv color='primary'>
                    <>
                        <p className={classes.TotalName}>{translate('Level 1')}</p>
                        <p className={classes.TotalBits}>
                            <CoinsIcon />
                            0.00
                        </p>
                    </>
                </DecorationDiv>

                <DecorationDiv color='secondary'>
                    <>
                        <p className={classes.TotalName}>{translate('Level 2')}</p>
                        <p className={classes.TotalBits}>
                            <CoinsIcon />
                            0.00
                        </p>
                    </>
                </DecorationDiv> */}

                <div className={classes.Rewards}>
                    <OverviewCategory title='Instant' percentage='20%' bits={20} />
                    <OverviewCategory title='Daily' percentage='0%' bits={0} />
                    <OverviewCategory title='Weekly' percentage='0%' bits={0} />
                    <OverviewCategory title='Monthly' percentage='0%' bits={0} />
                    <OverviewCategory title='Leaderboard' percentage='0%' bits={90} />
                    <OverviewCategory title='Level up bonus' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                    <OverviewCategory title='Other' percentage='0%' bits={0} />
                </div>
            </div>

            <div className={classes.HeroesContainer}>
                <HeroDisplaySwiper title='Heroes' icon={<LogoSmallIcon />} items={heroes} />
            </div>
        </motion.div>
    );
};

export default Hero;
