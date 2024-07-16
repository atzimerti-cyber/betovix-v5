import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { translate } from '../../../utils/translations';

import classes from './GamificationProgress.module.css';

import MainButton from '../../../features/UI/Buttons/MainButton';
import HeroDisplaySwiper from '../../../features/UI/MainSwiper/HeroDisplaySwiper';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import Levels from './Levels';
import Milestones from './Milestones';
import Rewards from './Rewards';

import { getHeroes } from '../gamificationAsyncActions';

const GamificationProgress = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const heroes = useSelector((state) => state.gamification.heroes);
    //const user = useSelector((state) => state.login.user);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);
    const selectedHero = useSelector((state) => state.gamification.selectedHero);

    const [activeLevel, setActiveLevel] = useState(null);


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
    }, [dispatch]);

    useEffect(() => {
        if (selectedHero && Object.keys(selectedHero).length > 0) {
            setActiveLevel(selectedHero.levels[0]?.id);
        }
    }, [selectedHero]);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            <p className={classes.OverviewTitle}>{translate('Your Progress')}</p>

            {selectedHero && Object.keys(selectedHero).length > 0 && (
                <div className={classes.GridContainer}>

                    <section className={classes.LevelUpSection}>
                        <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />
                        <div className={classes.LevelUpMilestone}>
                            {/* <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} /> */}
                            <Milestones activeLevel={activeLevel} />
                        </div>
                        <Rewards/>
                    </section>

                    <div className={classes.HeroesContainer}>
                        <div className={classes.DisplayContainer}>
                            <div className={classes.ImageContainer}>
                                <img src={selectedHero.banner} loading='lazy' alt={selectedHero.name} />
                            </div>
                        </div>

                        <div className={classes.HeroDescription}>
                            <p className={classes.DescTitle}>{translate(selectedHero.metadata.HeroName + ' ' + selectedHero.metadata.HeroSubName)}</p>
                        </div>
                    </div>


                </div>
            )}
        </motion.div>
    );
});


export default GamificationProgress;
