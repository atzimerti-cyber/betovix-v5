import React, { useEffect, useRef } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Logo from '../../../assets/svgs/logo-small.svg?react';
import classes from './HeroTimeline.module.css';

const HeroTimeline = (props) => {
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (timelineRef.current) {
                timelineRef.current.style.transform = `rotate(${scrollY / 5}deg) translateY(${scrollY / 2}px)`;
                timelineRef.current.style.opacity = 1 - (scrollY / 1000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={classes.TimelineContainer}>
            <div className={classes.TimelineTitle}>
                <span>{props.hero.name} {props.hero.subName}</span>
            </div>

            <Timeline ref={timelineRef} className={classes.TimelineTree}>
                {props.levels && Object.keys(props.levels).length > 0 ? (
                    props.levels.map((level, index) => (
                        <React.Fragment key={index}>
                            <TimelineItem
                                className={`${classes.TimelineItem}`}
                                position="left"
                            >
                                <TimelineOppositeContent className={classes.oppositeContent}>
                                    <Typography>
                                        {/* {level.progress} */}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator className={classes.MainSeparator}>
                                    <TimelineConnector className={classes.Connector} />
                                    <TimelineDot className={classes.Dot}>
                                        <div className={classes.MainSVG}>
                                            <Logo />
                                        </div>
                                    </TimelineDot>
                                    <TimelineConnector className={classes.SubConnector} />
                                </TimelineSeparator>
                                <TimelineContent className={classes.TimelineContent}>
                                    <Typography>
                                        {level.name}
                                    </Typography>
                                    <Typography>
                                        {level.id}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>

                            {level.milestones && level.milestones.map((milestone, milestoneIndex) => (
                                <TimelineItem
                                    className={`${classes.TimelineItem}`}
                                    key={`${index}-${milestoneIndex}`}
                                    position="right"
                                >
                                    <TimelineOppositeContent className={classes.oppositeContent}>
                                        <Typography>
                                            {/* {milestone.progress} */}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={classes.MainSeparator}>
                                        <TimelineConnector className={classes.SubConnector} />
                                        <TimelineDot className={classes.SubDot}>
                                            <div className={classes.SubSVG}>
                                                <Logo />
                                            </div>
                                        </TimelineDot>
                                        <TimelineConnector className={classes.SubConnector} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.SubTimelineContent}>
                                        <Typography>
                                            {milestone.name}
                                        </Typography>
                                        <Typography>
                                            {milestone.id}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </React.Fragment>
                    ))
                ) : (
                    null
                )}
            </Timeline>
        </div>
    );
};

export default HeroTimeline;
