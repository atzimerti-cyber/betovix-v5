import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import HeroTimeline from './HeroTimeline'

import classes from './ProgressMap.module.css';
import { translate } from '../../../utils/translations';


const ProgressMap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

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
                <div className={classes.Timeline}>
                    {selectedHero && Object.keys(selectedHero).length > 0 ? (
                        <HeroTimeline hero={selectedHero} levels={selectedHeroLevels} />
                    ) : (
                        null
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProgressMap;
