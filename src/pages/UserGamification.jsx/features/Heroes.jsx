import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { translate } from '../../../utils/translations';

import classes from './Heroes.module.css';

import MainButton from '../../../features/UI/Buttons/MainButton';
import HeroDisplaySwiper from '../../../features/UI/MainSwiper/HeroDisplaySwiper';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import Levels from './Levels';
import Milestones from './Milestones';

import { getHeroes } from '../gamificationAsyncActions';

const Heroes = React.memo(() => {
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

    }, [dispatch]);

    useEffect(() => {
        if (displayedHero && Object.keys(displayedHero).length > 0) {
            setActiveLevel(displayedHero?.levels[0]);
        }
    }, [displayedHero]);

    // console.log(activeLevel);
    //   console.log(displayedHero);

    return (
        <motion.div className={classes.TabContent} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>

            {displayedHero && Object.keys(displayedHero).length > 0 && (
                <div className={classes.GridContainer}>
                    <div className={classes.DisplayContainer}>
                        {/* <div className={classes.ImageContainer}> */}
                        <img src={displayedHero.banner} loading='lazy' alt={displayedHero.name} />
                        {/* </div> */}
                    </div>

                    <div className={classes.SelectHeroBtn}>
                        {selectedHero && Object.keys(selectedHero).length > 0 ? (
                            <MainButton disabled>
                                <span>You have selected a hero</span>
                            </MainButton>
                        ) : (
                            <MainButton color='bv-light-green' onClick={() => addParamsToUrl('hero-confirm')}>
                                <span>Select Hero</span>
                            </MainButton>
                        )}

                    </div>

                    {displayedHero && Object.keys(displayedHero).length > 0 &&
                        <section className={classes.LevelUpSection}>
                            <div className={classes.LevelUpMilestone}>
                                <Levels activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />
                                <Milestones activeLevel={activeLevel} profile />
                            </div>
                        </section>
                    }


                    <div className={classes.HeroDescription}>
                        <p className={classes.DescTitle}>{translate(displayedHero.metadata.HeroName + ' ' + displayedHero.metadata.HeroSubName)}</p>
                        <div className={classes.ImageContainer}>
                            <p className={classes.Description}>{displayedHero?.description?.replace(/<\/?p>/g, "")}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className={classes.HeroesContainer}>
                <HeroDisplaySwiper title='Heroes' icon={<LogoSmallIcon />} items={heroes} />
            </div>
        </motion.div>
    );
});


export default Heroes;
