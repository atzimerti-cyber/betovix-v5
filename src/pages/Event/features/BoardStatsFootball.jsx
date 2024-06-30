import classes from './BoardStats.module.css';
import CornerIcon from '../../../assets/svgs/corner.svg?react';
import YellowCardIcon from '../../../assets/svgs/yellow-card.svg?react';
import RedCardIcon from '../../../assets/svgs/red-card.svg?react';
import FootballIcon from '../../../assets/sportIcons/soccer.svg?react';
import FlashingScore from '../../SportsBook/features/FlashingScore';

const BoardStatsFootball = (props) => {
    const getScore = (header, team) => {
        if (!header) return null;

        let score = header.Score;
        score = score.split('(')[0]; // Found this in rugby union...
        const scoreArr = score.split(':');
        const thisScore = team === 'home' ? scoreArr[0] : scoreArr[1];

        return thisScore;
    };

    return (
        <>
            <div className={classes.StatSection}>
                <div className={classes.Header}>
                    <CornerIcon />
                </div>
                <div className={classes.Content}>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.CornersHome} previousScore={props.event?.PreviousHeader?.CornersHome} />
                    </div>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.CornersAway} previousScore={props.event?.PreviousHeader?.CornersAway} />
                    </div>
                </div>
            </div>

            <div className={classes.StatSection}>
                <div className={classes.Header}>
                    <YellowCardIcon />
                </div>
                <div className={classes.Content}>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.YellowCardsHome} previousScore={props.event?.PreviousHeader?.YellowCardsHome} />
                    </div>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.YellowCardsAway} previousScore={props.event?.PreviousHeader?.YellowCardsAway} />
                    </div>
                </div>
            </div>

            <div className={classes.StatSection}>
                <div className={classes.Header}>
                    <RedCardIcon />
                </div>
                <div className={classes.Content}>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.RedCardsHome} previousScore={props.event?.PreviousHeader?.RedCardsHome} />
                    </div>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={props.event?.Header.RedCardsAway} previousScore={props.event?.PreviousHeader?.RedCardsAway} />
                    </div>
                </div>
            </div>

            <div className={classes.StatSection}>
                <div className={classes.Header}>
                    <div className={classes.HeaderIcon}>
                        <FootballIcon />
                    </div>
                </div>
                <div className={classes.Content}>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={getScore(props.event?.Header, 'home')} previousScore={getScore(props.event?.PreviousHeader, 'home')} />
                    </div>
                    <div className={classes.ContentRow}>
                        <FlashingScore score={getScore(props.event?.Header, 'away')} previousScore={getScore(props.event?.PreviousHeader, 'away')} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardStatsFootball;
