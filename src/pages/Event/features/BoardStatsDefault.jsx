import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './BoardStats.module.css';
import FlashingScore from '../../SportsBook/features/FlashingScore';
import { translate } from '../../../utils/translations';
import { getOrdinal } from '../../../utils/custom';

const BoardStatsDefault = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [scores, setScores] = useState(null);

    // Calculate all scores
    useEffect(() => {
        const currentScores = calculateScores(props.event?.Header);
        const previousScores = calculateScores(props.event?.PreviousHeader);

        setScores({
            current: currentScores,
            previous: previousScores,
        });
    }, [props.event?.Header]);

    const calculateScores = (header) => {
        let thisScores = {
            home: {},
            away: {},
        };

        if (!header) return thisScores;

        const quarterScores = header.SetScores;

        quarterScores.forEach((quarterScore, index) => {
            const quarterArr = quarterScore ? quarterScore.split(':') : null;
            const quarterNum = 'q' + (index + 1);
            thisScores.home[quarterNum] = quarterArr[0] !== null ? quarterArr[0] : null;
            thisScores.away[quarterNum] = quarterArr[1] !== null ? quarterArr[1] : null;
        });

        // This game
        let totalScore = header.Score;
        totalScore = totalScore.split('(')[0]; // Found this in rugby union...
        if (totalScore) {
            const totalScoreArr = totalScore.split(':');
            thisScores.home.total = totalScoreArr[0];
            thisScores.away.total = totalScoreArr[1];
        }

        return thisScores;
    };

    return (
        <>
            {scores &&
                scores.current.home &&
                Object.keys(scores.current.home).map((key, index) => {
                    if (key === 'total') return null;

                    const quarterHome = scores.current.home[key];
                    const quarterAway = scores.current.away[key];
                    const quarterText = getOrdinal(index + 1);

                    return (
                        <div key={key} className={classes.StatSection}>
                            <div className={classes.Header}>{translate(quarterText)}</div>
                            <div className={classes.Content}>
                                <div className={classes.ContentRow}>
                                    <FlashingScore score={quarterHome} previousScore={scores.previous.home[key]} withEmptyDash />
                                </div>
                                <div className={classes.ContentRow}>
                                    <FlashingScore score={quarterAway} previousScore={scores.previous.away[key]} withEmptyDash />
                                </div>
                            </div>
                        </div>
                    );
                })}

            {scores && props.event.Header.Status > -1 && (
                <div className={classes.StatSection}>
                    <div className={classes.Header}>{translate('Total')}</div>
                    <div className={classes.Content}>
                        <div className={classes.ContentRow}>
                            <FlashingScore score={scores.current.home.total} previousScore={scores.previous.home.total} withEmptyDash />
                        </div>
                        <div className={classes.ContentRow}>
                            <FlashingScore score={scores.current.away.total} previousScore={scores.previous.away.total} withEmptyDash />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BoardStatsDefault;
