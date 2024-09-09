import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

import classes from './Levels.module.css';
import SimpleSwiper from '../../../features/UI/MainSwiper/SimpleSwiper';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import { useEffect, useState } from 'react';

const Levels = (props) => {
    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);
    const ericLevels = useSelector((state) => state.gamification.ericLevels);

    

    let heroLevels;
    if (!selectedHero) {
        heroLevels = ericLevels;
        // heroLevels = displayedHero.levels;
    } else if (selectedHero) {
        heroLevels = selectedHeroLevels;
    }

    return (
        <div className={classes.Levels} style={{maxWidth:"100%",overflow:"hidden"}}>
            <SimpleSwiper  
            //slidesPerView={props.slidesPerView}
            >
                {heroLevels
                    ? heroLevels.map((level) => {
                        return (
                            <SwiperSlide style={{ width: 'auto' }} key={level.id}>
                                <div
                                    className={props.activeLevel?.id === level.id ? [classes.CardContainer, classes.Active].join(' ') : classes.CardContainer}
                                    onClick={() => props.onChangeLevel(level)}
                                >
                                    <div className={classes.LevelCard}>
                                        <div className={classes.LevelHeader}>
                                            <div className={classes.IconContainer}>
                                                {level.icon ? (
                                                    level.icon
                                                ) : (
                                                    <div className={`CardLevel CardLevel`}></div>
                                                )}
                                            </div>
                                            <p className={classes.LevelName}>{level.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })
                    : Array.from({ length: props.slidesPerView }, (_, index) => (
                        <SwiperSlide style={{ width: '75px', height: '33.3px' }} key={index}>
                            <LoaderPlaceholder extraStyles={{ backgroundColor: 'var(--db-gray-3)', borderRadius: '0.375rem' }} />
                        </SwiperSlide>
                    ))}
            </SimpleSwiper>
        </div>
    );
};

export default Levels;
