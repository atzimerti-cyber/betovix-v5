import React, { useEffect, useRef } from 'react';
import Logo from '../../../assets/svgs/logo-small.svg?react';
import classes from './HeroTimeline.module.css';

const HeroTimeline = (props) => {

    const [visibleMilestones, setVisibleMilestones] = useState({});
    const toggleMilestone = (levelIndex) => {
        setVisibleMilestones((prevState) => ({
            ...prevState,
            [levelIndex]: !prevState[levelIndex],  // DEN EINAI ETOIMO AKOMH
        }));
    };

    return (
        <div className={classes.TimelineContainer}>
            <div className={classes.TimelineTitle}>
                <span>{props.hero.name} {props.hero.subName}</span>
            </div>

            <div className={classes.TimelineTree}>
                {props.levels && Object.keys(props.levels).length > 0 ? (
                    props.levels.map((level, index) => (
                        <div className={classes.Entity} key={index}>
                            <div className={`${classes.TimelineItem} ${classes.Left}`}>
                                <div className={classes.TimelineContent}>
                                    <span>Level Name</span>
                                    <p>{level.name.toUpperCase()}</p>
                                </div>
                                <div className={classes.MainSeparator}>
                                    <div className={classes.Connector}></div>
                                    <div className={classes.Dot}>
                                        <div className={classes.MainSVG}>
                                            <Logo />
                                        </div>
                                    </div>
                                    <div className={classes.Connector}></div>
                                </div>
                                <div className={classes.OppositeContent}>
                                    <p>{level.progress}</p>
                                </div>
                            </div>

                            {level.milestones && level.milestones.map((milestone, milestoneIndex) => (
                                <div className={`${classes.TimelineItem} ${classes.Right}`} key={`${index}-${milestoneIndex}`}>
                                    <div className={classes.SubOppositeContent}>
                                        <p>{milestone.progress}</p>
                                    </div>
                                    <div className={classes.MainSeparator}>
                                        <div className={classes.SubConnector}></div>
                                        <div className={classes.SubDot}>
                                            <div className={classes.SubSVG}>
                                                <Logo />
                                            </div>
                                        </div>
                                        <div className={classes.SubConnector}></div>
                                    </div>
                                    <div className={classes.SubTimelineContent}>
                                        <span>Milestone Name</span>
                                        <p>{milestone.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    );
};

export default HeroTimeline;
