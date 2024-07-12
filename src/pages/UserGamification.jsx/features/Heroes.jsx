import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { translate } from '../../../utils/translations';

import classes from './Heroes.module.css';

import MainButton from '../../../features/UI/Buttons/MainButton';
import HeroDisplaySwiper from '../../../features/UI/MainSwiper/HeroDisplaySwiper';
import Levels from '../../../features/ModalRoot/features/Levels';
import Milestones from '../../../features/ModalRoot/features/Milestones';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import { getHeroes } from '../gamificationAsyncActions';
import { gamificationActions } from '../userGamificationSlice';


import OverviewCategory from '../../Profile/features/OverviewCategory';

const Heroes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const heroes = useSelector((state) => state.gamification.heroes);
    const user = useSelector((state) => state.login.user);
    //const selectedHero = useSelector((state) => state.profile.selectedHero);
    const selectedHero = useSelector((state) => state.gamification.selectedHero);

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

        return () => { };
    }, []);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className={classes.OverviewTitle}>{translate('Heroes')}</p>

            <div className={classes.GridContainer}>
                <div className={classes.DisplayContainer}>
                    <div className={classes.ImageContainer}>
                        <img src={selectedHero.banner} loading='lazy' alt={selectedHero.HeroName} />
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

                <div className={classes.HeroDescription}>
                    <p className={classes.DescTitle}>{translate('Description')}</p>
                    <div className={classes.ImageContainer}>
                        <p className={classes.Description}>{selectedHero.description}</p>
                    </div>
                </div>

                {/* <div className={classes.Rewards}>
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
                </div> */}
            </div>

            <div className={classes.HeroesContainer}>
                <HeroDisplaySwiper title='Heroes' icon={<LogoSmallIcon />} items={heroes} />
            </div>
        </motion.div>
    );
};

export default Heroes;
