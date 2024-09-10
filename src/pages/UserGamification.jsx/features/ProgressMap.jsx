import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import HeroTimeline from './HeroTimeline'

import classes from './ProgressMap.module.css';
import { translate } from '../../../utils/translations';

//import { getUserAchievements } from '../gamificationAsyncActions';


const ProgressMap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    //const selectedHero = useSelector((state) => state.gamification.selectedHero);
    //const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);

    const selectedHero = {
        name: "Eric",
        subName: "The Viking",
    }

    const selectedHeroLevels = [
        {
            id: 1,
            name: "level 1",
            subName: "The Viking",
            progress: 100,
            milestones: [
                {
                    id: 1,
                    name: "milestone 1",
                },
                {
                    id: 2,
                    name: "milestone 2",
                }
            ]
        },
        {
            id: 2,
            name: "level 2",
            subName: "The Viking",
            progress: 63,
            milestones: [
                {
                    id: 1,
                    name: "milestone 1",
                },
                {
                    id: 2,
                    name: "milestone 2",
                }
            ]
        }
    ];

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
