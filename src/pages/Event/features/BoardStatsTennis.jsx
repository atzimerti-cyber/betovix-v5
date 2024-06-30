import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './BoardStats.module.css';
import FlashingScore from '../../SportsBook/features/FlashingScore';
import { translate } from '../../../utils/translations';

const BoardStatsTennis = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [scores, setScores] = useState({
        current: {
            home: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
            away: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
        },
        previous: {
            home: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
            away: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
        },
    });

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
            home: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
            away: { q1: null, q2: null, q3: null, q4: null, q5: null, game: null },
        };

        if (!header) return thisScores;

        const quarterScores = header.SetScores;

        const quarter1 = quarterScores[0];
        const quarter2 = quarterScores[1];
        const quarter3 = quarterScores[2];
        const quarter4 = quarterScores[3];
        const quarter5 = quarterScores[4];

        const quarter1Arr = quarter1 ? quarter1.split(':') : null;
        const quarter2Arr = quarter2 ? quarter2.split(':') : null;
        const quarter3Arr = quarter3 ? quarter3.split(':') : null;
        const quarter4Arr = quarter4 ? quarter4.split(':') : null;
        const quarter5Arr = quarter5 ? quarter5.split(':') : null;

        thisScores.home.q1 = quarter1Arr !== null ? parseInt(quarter1Arr[0]) : null;
        thisScores.away.q1 = quarter1Arr !== null ? parseInt(quarter1Arr[1]) : null;
        thisScores.home.q2 = quarter2Arr !== null ? parseInt(quarter2Arr[0]) : null;
        thisScores.away.q2 = quarter2Arr !== null ? parseInt(quarter2Arr[1]) : null;
        thisScores.home.q3 = quarter3Arr !== null ? parseInt(quarter3Arr[0]) : null;
        thisScores.away.q3 = quarter3Arr !== null ? parseInt(quarter3Arr[1]) : null;
        thisScores.home.q4 = quarter4Arr !== null ? parseInt(quarter4Arr[0]) : null;
        thisScores.away.q4 = quarter4Arr !== null ? parseInt(quarter4Arr[1]) : null;
        thisScores.home.q5 = quarter5Arr !== null ? parseInt(quarter5Arr[0]) : null;
        thisScores.away.q5 = quarter5Arr !== null ? parseInt(quarter5Arr[1]) : null;

        // This game
        const totalScore = header.Score;
        if (totalScore) {
            const totalScoreArr = totalScore.split(':');
            thisScores.home.total = totalScoreArr[0];
            thisScores.away.total = totalScoreArr[1];
        }

        return thisScores;
    };

    return (
        <>
            <div className={classes.StatSection}>
                <div className={classes.Header}>{translate('1st')}</div>
                <div className={classes.Content}>
                    <div
                        className={
                            scores.current.home.q1 > scores.current.away.q1 && scores.current.home.q2 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.home.q1} previousScore={scores.previous.home.q1} withEmptyDash />
                    </div>
                    <div
                        className={
                            scores.current.away.q1 > scores.current.home.q1 && scores.current.home.q2 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.away.q1} previousScore={scores.previous.away.q1} withEmptyDash />
                    </div>
                </div>
            </div>

            <div className={classes.StatSection}>
                <div className={classes.Header}>{translate('2nd')}</div>
                <div className={classes.Content}>
                    <div
                        className={
                            scores.current.home.q2 > scores.current.away.q2 && scores.current.home.q3 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.home.q2} previousScore={scores.previous.home.q2} withEmptyDash />
                    </div>
                    <div
                        className={
                            scores.current.away.q2 > scores.current.home.q2 && scores.current.home.q3 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.away.q2} previousScore={scores.previous.away.q2} withEmptyDash />
                    </div>
                </div>
            </div>

            <div className={classes.StatSection}>
                <div className={classes.Header}>{translate('3rd')}</div>
                <div className={classes.Content}>
                    <div
                        className={
                            scores.current.home.q3 > scores.current.away.q3 && scores.current.home.q4 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.home.q3} previousScore={scores.previous.home.q3} withEmptyDash />
                    </div>
                    <div
                        className={
                            scores.current.away.q3 > scores.current.home.q3 && scores.current.home.q4 !== null
                                ? [classes.ContentRow, classes.Green].join(' ')
                                : classes.ContentRow
                        }
                    >
                        <FlashingScore score={scores.current.away.q3} previousScore={scores.previous.away.q3} withEmptyDash />
                    </div>
                </div>
            </div>

            {scores.current.home.q4 !== null && (
                <div className={classes.StatSection}>
                    <div className={classes.Header}>{translate('4th')}</div>
                    <div className={classes.Content}>
                        <div
                            className={
                                scores.current.home.q4 > scores.current.away.q4 && scores.current.home.q5 !== null
                                    ? [classes.ContentRow, classes.Green].join(' ')
                                    : classes.ContentRow
                            }
                        >
                            <FlashingScore score={scores.current.home.q4} previousScore={scores.previous.home.q4} withEmptyDash />
                        </div>
                        <div
                            className={
                                scores.current.away.q4 > scores.current.home.q4 && scores.current.home.q5 !== null
                                    ? [classes.ContentRow, classes.Green].join(' ')
                                    : classes.ContentRow
                            }
                        >
                            <FlashingScore score={scores.current.away.q4} previousScore={scores.previous.away.q4} withEmptyDash />
                        </div>
                    </div>
                </div>
            )}

            {scores.current.home.q5 !== null && (
                <div className={classes.StatSection}>
                    <div className={classes.Header}>{translate('5th')}</div>
                    <div className={classes.Content}>
                        <div className={classes.ContentRow}>
                            <FlashingScore score={scores.current.home.q4} previousScore={scores.previous.home.q4} withEmptyDash />
                        </div>
                        <div className={classes.ContentRow}>
                            <FlashingScore score={scores.current.away.q4} previousScore={scores.previous.away.q4} withEmptyDash />
                        </div>
                    </div>
                </div>
            )}

            {props.event.Header.Status > -1 && (
                <div className={classes.StatSection}>
                    <div className={classes.Header}>{translate('Current Game')}</div>
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

export default BoardStatsTennis;
