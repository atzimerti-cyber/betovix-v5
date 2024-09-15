import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { translate } from '../../../utils/translations';

import classes from './GamificationBanner.module.css';

import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import ArrowButton from '../../../features/UI/Buttons/ArrowButton';
import BigSwiper from '../../../features/UI/MainSwiper/BigSwiper';
import Levels from '../features/Levels';
import Milestones from '../features/Milestones';

import { getHeroes } from '../gamificationAsyncActions';
import { gamificationActions } from '../userGamificationSlice';

import { SwiperSlide } from 'swiper/react';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import SkeletonMilestone from '../../../features/UI/Skeletons/SkeletonMilestone';

const GamificationBanner = ({ onDataNotFound }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const swiperRef = useRef(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const heroes = useSelector((state) => state.gamification.heroes);
    const user = useSelector((state) => state.login.user);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);

    const [activeLevel, setActiveLevel] = useState(null);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getHeroes(signal));

    }, [dispatch]);

    //Remove Component if no favs found
    useEffect(() => {
        if (heroes !== null && (!heroes || Object.keys(heroes).length === 0)) {
            onDataNotFound();
        }
    }, [heroes, onDataNotFound]);

    const handleBannerClick = (hero) => {
        if (user) {
            dispatch(gamificationActions.setDisplayedHero(hero));
            navigate(`/profile?tab=heroes`);
        } else {
            setRedirectAfterLogin(`/profile?tab=heroes`);
            addParamsToUrl('auth', 'login');
            dispatch(gamificationActions.setDisplayedHero(hero));
        }
    };

    useEffect(() => {
        if (user && redirectAfterLogin) {
            navigate(redirectAfterLogin);
            setRedirectAfterLogin(null);
        }
    }, [user, redirectAfterLogin]);

    return (
        <div className={classes.BannerContainer}>

            <div className={classes.SwiperHeader}>
                <Link to={'/profile/?tab=heroes'} className={classes.ViewAllLink}>
                    <div className={classes.Title}>
                        {<LogoSmallIcon />}
                        <span>Heroes</span>
                    </div>
                </Link>
                <div className={classes.NavButtons}>
                    <>
                        <Link to={'/profile/?tab=heroes'} className={classes.ViewAllLink}>
                            View all
                        </Link>

                        <ArrowButton
                            showArrows
                            onClick={() => swiperRef.current?.swiper?.slidePrev()}
                        >
                            <AngleLeftIcon />
                        </ArrowButton>
                        <ArrowButton
                            showArrows
                            onClick={() => swiperRef.current?.swiper?.slideNext()}
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
                //autoplay={true}
                delay={7000}
                loop={true}
                noTouchMove={true}
                onSlideChange={() => setActiveLevel(null)}
            >
                {heroes && Object.keys(heroes).length > 0 ?
                    (
                        heroes.map((hero) => (
                            <SwiperSlide key={hero.id} >
                                <div className={classes.HeroContainer} >
                                    <div className={classes.HeroName}>
                                        <p className={classes.DescTitle}>{translate(hero.metadata.HeroName + ' ' + hero.metadata.HeroSubName)}</p>
                                    </div>
                                    <div className={classes.HeroImg} onClick={() => handleBannerClick(hero)}>
                                        <img src={hero.cropped} loading='lazy' alt={<LoaderPlaceholder />} />
                                    </div>
                                    <div className={classes.HeroLevelsContainer}>
                                        <div className={classes.HeroLevels}>
                                            <Levels displayedHero={hero} activeLevel={activeLevel ? activeLevel : hero.levels[0]} onChangeLevel={(level) => setActiveLevel(level)} />
                                        </div>
                                        <div className={classes.HeroMilestones}>
                                            <Milestones displayedHero={hero} activeLevel={activeLevel ? activeLevel : hero.levels[0]} profile banner/>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide key={1}>
                            <div className={classes.BannerBackground}>
                                <div className={classes.HeroContainer}>
                                    <div className={classes.HeroName} style={{ height: '218px', marginTop: '15px' }}>
                                        <LoaderPlaceholder />
                                    </div>
                                    <div className={classes.HeroImg} style={{ width: '300px' }}>
                                        <LoaderPlaceholder />
                                    </div>
                                    <div className={classes.HeroLevelsContainer}>
                                        <div className={classes.HeroLevels}>
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <SwiperSlide style={{ width: '75px', height: '33.3px', marginLeft: '5px', marginRight: '5px' }} key={index}>
                                                    <LoaderPlaceholder extraStyles={{ backgroundColor: 'var(--db-gray-3)', borderRadius: '0.375rem' }} />
                                                </SwiperSlide>
                                            ))}
                                        </div>
                                        <div className={classes.CardsContainer}>
                                            {Array.from({ length: 7 }, (_, index) => (
                                                <div key={index} className={classes.SkeletonWrapper}>
                                                    <div className={classes.Background}>
                                                        <SkeletonMilestone />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </BigSwiper>
        </div>
    );
};

export default GamificationBanner;
