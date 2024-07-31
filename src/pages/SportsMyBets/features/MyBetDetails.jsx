import { memo } from 'react';
import { useSelector } from 'react-redux';

import classes from './MyBetDetails.module.css';
import TeamLogo from '../../../features/TeamLogo/TeamLogo';
import { translate } from '../../../utils/translations';
import { addThousandsSeparator, formatDateTime2 } from '../../../utils/custom';
import LiveBadge from '../../../features/LiveBadge/LiveBadge';

const MyBetDetails = memo(function (props) {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const liveState = useSelector((state) => state.live.liveState);
    // const sportsStatusParams = useSelector((state) => state.sportsbook.sportsStatusParams);

    // const getStatusText = (event) => {
    //     let text = event.Header.MatchTimeExtended;
    //     const sportParams = sportsStatusParams[event.Info.SportName.International];
    //     if (sportParams && sportParams.withTime && event.Header.Status >= 1 && event.Header.Status <= 9)
    //         if (sportParams.withTime === 'MatchTime') text = event.Header.MatchTime + '′ - ' + text;
    //         else if (sportParams.withTime === 'RemainingTimeInPeriod') text = formatTimeString(event.Header.RemainingTimeInPeriod) + ' - ' + text;

    //     return text;
    // };
    const getStatusText = (event) => {
        let text = event.Header.MatchTimeExtended;

        if (event?.Header.MatchTimeExtended !== 'Not Started') {
            if (event?.Header?.MatchTime) text = event?.Header.MatchTime + '′ - ' + text;
            else if (event?.Header?.RemainingTimeInPeriod && event?.Header?.RemainingTimeInPeriod !== '')
                text = formatTimeString(event?.Header.RemainingTimeInPeriod) + ' - ' + text;
        }

        return text;
    };

    const getNotLiveGameScore = (ticketEvent) => {
        if (ticketEvent.Tournament.includes('Outright') || ticketEvent.Tournament.includes('Specials')) {
            return '';
        }

        const result = JSON.parse(ticketEvent.Result);

        if (result) {
            const score = result.away !== null ? result.home + '-' + result.away : result.home;
            return score;
        }

        return '';
    };

    return (
        <section className={classes.MyBetDetailsSection}>
            {props.item.TicketEvents.map((ticketEvent, index) => {
                return (
                    <div key={ticketEvent.EventId}>
                        {index > 0 && <div className={classes.Separator}></div>}
                        <div className={classes.DateOfMatch}>{formatDateTime2(ticketEvent.DateOfMatch)}</div>
                        <div className={classes.HeaderContainer}>
                            <div className={classes.TeamSection}>
                                <div className={classes.EventName}>
                                    <div className={classes.TeamVersusGroup}>{ticketEvent.Event}</div>
                                </div>

                                <div className={classes.OutcomeContainer}>
                                    <div className={classes.Outcome}>
                                        <span className={classes.MarketName}>{translate(ticketEvent.MarketName)}</span>
                                        <span className={classes.SectionOutcome}>{ticketEvent.PointName}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.OddsSection}>
                                <div
                                    className={
                                        ticketEvent.Wins === 'W'
                                            ? [classes.StatusContainer, classes.Win].join(' ')
                                            : ticketEvent.Wins === 'L'
                                            ? [classes.StatusContainer, classes.Loss].join(' ')
                                            : classes.StatusContainer
                                    }
                                >
                                    <div className={classes.Circle}></div>
                                    <span className={classes.Status}>
                                        {ticketEvent.Wins === 'W' ? translate('Win') : ticketEvent.Wins === 'L' ? translate('Loss') : translate('Pending')}
                                    </span>
                                </div>
                                <div className={classes.Odds}>
                                    <span>{addThousandsSeparator(ticketEvent.Odd)}</span>
                                </div>
                            </div>
                        </div>

                        {liveState[ticketEvent.EventId] ? (
                            <div className={classes.InfoContainer}>
                                <div className={classes.EventTime}>
                                    {liveState[ticketEvent.EventId] && (
                                        <>
                                            <LiveBadge />
                                            <div className={classes.Time}>{getStatusText(liveState[ticketEvent.EventId])}</div>
                                        </>
                                    )}
                                </div>
                                <div className={classes.InfoScore}>{liveState[ticketEvent.EventId].Header?.Score}</div>
                            </div>
                        ) : (
                            <div className={classes.InfoContainer}>
                                <div className={classes.EventTime}></div>
                                <div className={classes.InfoScore}>{getNotLiveGameScore(ticketEvent)}</div>
                            </div>
                        )}
                    </div>
                );
            })}
        </section>
    );
});

export default MyBetDetails;
