import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import classes from './ProgressMap.module.css';

import HeroTimeline from './HeroTimeline'
import MainButton from '../../../features/UI/Buttons/MainButton'
import { translate } from '../../../utils/translations';

import { getUserAchievements } from '../gamificationAsyncActions';


const ProgressMap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        dispatch(getUserAchievements());
    }, [])

    const addParamsToUrl = (tab) => {
        const searchParams = new URLSearchParams();
        if (tab) searchParams.set('tab', tab);

        navigate(`/profile?${searchParams.toString()}`, { replace: true });
    };

    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);

    return (
        <div className={classes.PageContent}>
            <div className={classes.Banner}>
                <h1 className={classes.BannerTitle}>
                    <span>{translate(`HERO'S HAVEN`)}</span>
                </h1>
            </div>

            <div className={classes.Container}>
                {selectedHero && Object.keys(selectedHero).length > 0 ? (
                    <div className={classes.Timeline}>
                        <HeroTimeline hero={selectedHero} levels={selectedHeroLevels} />
                    </div>
                ) : (
                    <div className={classes.ButtonContainer}>
                        <MainButton color='bv-light-green' size='small' onClick={() => addParamsToUrl('heroes')}>
                            Select a hero
                        </MainButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressMap;
