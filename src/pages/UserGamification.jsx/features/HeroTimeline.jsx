import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../../assets/svgs/logo-small.svg?react';
import classes from './HeroTimeline.module.css';

import Shimmer from '../../../features/UI/Shimmer/Shimmer'

import { getUserAchievements } from '../gamificationAsyncActions';

const HeroTimeline = (props) => {

    const [visibleMilestoneIndex, setVisibleMilestoneIndex] = useState(null);

    const toggleMilestone = (index) => {
        setVisibleMilestoneIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const currentLevel = useSelector((state) => state.gamification.currentLevel); 

    return (
        <div className={classes.TimelineContainer}>
            <div className={classes.TimelineTitle}>
                <span>{props.hero.name} {props.hero.subName}</span>
            </div>

            <div className={classes.TimelineTree}>
                {props.levels && Object.keys(props.levels).length > 0 ? (
                    props.levels.map((level, index) => (
                        <div className={classes.Entity} key={index}>
                            <div
                                className={`${classes.TimelineItem} ${classes.Left}`}
                                onClick={() => toggleMilestone(index)}
                            >
                                <div className={classes.TimelineContent}>
                                    <span>{level.name}</span>
                                    <p>{`LEVEL ${index + 1}`}</p>
                                </div>
                                <div className={classes.MainSeparator}>
                                    <div className={classes.Connector}></div>
                                    <div
                                        // className={classes.Dot}
                                        className={level.id == currentLevel.id ? [`${classes.Dot}`, `${classes.DotAnimation}`].join(' ') : `${classes.Dot}`}
                                    >
                                        <div className={classes.MainSVG}>
                                            <Logo />
                                        </div>
                                    </div>
                                    <div className={classes.SubConnector}></div>
                                </div>
                                <div className={classes.OppositeContent}>
                                    {/* <p>{level.reward[0].description}</p> */}
                                </div>
                            </div>

                            {level.milestones && level.milestones.map((milestone, milestoneIndex) => (
                                <div
                                    className={`${classes.SubTimelineItem} ${visibleMilestoneIndex === index ? classes.SubTimelineItemVisible : ''}`}
                                    key={`${index}-${milestoneIndex}`}
                                >
                                    <div className={classes.SubOppositeContent}>
                                       
                                        <p>{milestone.reward[0].description}</p>
                                    </div>
                                    <div className={classes.MainSeparator}>
                                        <div className={classes.SubConnector}></div>
                                        <div className={classes.SubDot}>
                                            <div className={classes.SubSVG}>
                                                {/* <Logo /> */}
                                            </div>
                                        </div>
                                        <div className={classes.SubConnector}></div>
                                    </div>
                                    <div className={classes.SubTimelineContent}>
                                        <span>{milestone.name}</span>
                                        <p>{milestone.progress === 0 ? ("Locked") : (`${milestone.progress}%`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div >
    );
};

export default HeroTimeline;
