import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { translate } from '../../../utils/translations';

import classes from './GamificationBanner.module.css';

import MainButton from '../../../features/UI/Buttons/MainButton';
import HeroDisplaySwiper from '../../../features/UI/MainSwiper/HeroDisplaySwiper';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import ArrowButton from '../../../features/UI/Buttons/ArrowButton';
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';
import AngleRight2Icon from '../../../assets/svgs/angle-right2.svg?react';

import BigSwiper from '../../../features/UI/MainSwiper/BigSwiper';

import Levels from '../features/Levels';
import Milestones from '../features/Milestones';

import { getHeroes } from '../gamificationAsyncActions';
import { SwiperSlide } from 'swiper/react';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';

const GamificationBanner = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const swiperRef = useRef(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const heroes = useSelector((state) => state.gamification.heroes);
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

    const isBeginning = swiperRef.current?.swiper.isBeginning;
    const isEnd = swiperRef.current?.swiper.isEnd;

    return (
        <div className={classes.BannerContainer}>

            <div className={classes.SwiperHeader}>
                <div className={classes.Title}>
                    {<LogoSmallIcon />}
                    <span>Heroes</span>
                </div>
                <div className={classes.NavButtons}>
                    <>
                        <Link to={'/profile/?tab=heroes'} className={classes.ViewAllLink}>
                            View all
                        </Link>

                        <ArrowButton disabled={isBeginning} onClick={() => swiperRef.current.swiper.slidePrev()}>
                            <AngleLeftIcon />
                        </ArrowButton>
                        <ArrowButton
                            disabled={isEnd || !heroes || heroes.length <= 1}
                            onClick={() => swiperRef.current.swiper.slideNext()}
                        >
                            <AngleRightIcon />
                        </ArrowButton>
                    </>
                </div>
            </div>

            <BigSwiper
                ref={swiperRef}
                slidesPerView={1}
                noPagination={true}
            >
                {heroes && Object.keys(heroes).length > 0 ? (
                    heroes.map((hero) => (
                        <SwiperSlide key={hero.Id}>


                            <div className={classes.HeroContainer}>
                                <div className={classes.HeroName}>
                                    <p className={classes.DescTitle}>{translate(hero.metadata.HeroName + ' ' + hero.metadata.HeroSubName)}</p>
                                </div>
                                <div className={classes.HeroImg}>
                                    <img src={hero.banner} loading='lazy' alt={hero.name} />
                                </div>
                                <div className={classes.HeroLevelsContainer}>
                                    <div className={classes.HeroLevels}>
                                        <Levels displayedHero={hero} activeLevel={activeLevel} onChangeLevel={(level) => setActiveLevel(level)} />

                                    </div>
                                    <div className={classes.HeroMilestones}>
                                        <Milestones activeLevel={activeLevel} profile />
                                    </div>
                                </div>
                            </div>


                        </SwiperSlide>
                    ))

                ) : (
                    <SwiperSlide>
                        <div className={classes.BannerBackground}>
                            <LoaderPlaceholder />
                        </div>
                    </SwiperSlide>
                )}
            </BigSwiper>
        </div>
    );
});

export default GamificationBanner;
