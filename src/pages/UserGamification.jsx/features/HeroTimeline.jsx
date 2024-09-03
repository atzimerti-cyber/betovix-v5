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
    return (
        <div className={classes.TimelineContent}>
            <div className={classes.TimelineTitle}>
                <span>{props.hero.name} {props.hero.subName}</span>
            </div>

            <Timeline position="alternate" className={classes.TimelineTree}>
                {props.levels && Object.keys(props.levels).length > 0 ? (
                    props.levels.map((level) => (
                        <>
                            <TimelineItem className={classes.TimelineItem}>
                                <TimelineOppositeContent className={classes.oppositeContent}>
                                    <Typography>
                                        {/* {level.progress} */}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator className={classes.MainSeparator}>
                                    <TimelineConnector className={classes.Connector} />
                                    <TimelineDot className={classes.Dot}>
                                        <Logo />
                                    </TimelineDot>
                                    <TimelineConnector className={classes.Connector} />
                                </TimelineSeparator>
                                <TimelineContent className={classes.timelineContent}>
                                    <Typography>
                                        {level.name}
                                    </Typography>
                                    <Typography>
                                        {level.id}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>

                            {level.milestones && level.milestones.map((milestone, milestoneIndex) => (
                                <TimelineItem className={classes.TimelineItem} key={`${`index`}-${milestoneIndex}`}>
                                    <TimelineOppositeContent className={classes.oppositeContent}>
                                        <Typography>
                                            {/* {milestone.progress} */}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={classes.MainSeparator}>
                                        <TimelineConnector className={classes.Connector} />
                                        <TimelineDot className={classes.SubDot}>
                                            <Logo />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.Connector} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.timelineContent}>
                                        <Typography>
                                            {milestone.name}
                                        </Typography>
                                        <Typography>
                                            {milestone.id}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </>
                    ))
                ) : (
                null
                )}
            </Timeline>
        </div>
    );
};

export default HeroTimeline;
