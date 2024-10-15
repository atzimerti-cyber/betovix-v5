import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './EventRow.module.css';
import { formatDateTime, getTimeUntil } from '../../../utils/custom';
import BarsIcon from '../../../assets/svgs/bars.svg?react';
import PlayIcon from '../../../assets/svgs/play.svg?react';
import Market from './Market';
import { sportsbookActions } from '../sportsbookSlice';

import TeamLogo from '../../../features/TeamLogo/TeamLogo';
import { translateNameWithLang } from '../../../utils/translations';

const EventRow = (props) => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const getMarket = () => {
        if (!props.event.Markets) return null;

        const filteredMarkets = props.event.Markets.filter((m) => m.MarketName?.International);
        const sortedMarkets = filteredMarkets.sort((a, b) => a.MarketTypeId - b.MarketTypeId);
        
        return sortedMarkets[0];
    };

    const getAllMarkets = () => {
        if (!props.event.Markets) return null;

        const filteredMarkets = props.event.Markets.filter((m) => m.MarketName?.International);
        const sortedMarkets = filteredMarkets.sort((a, b) => a.MarketTypeId - b.MarketTypeId);
        
        return sortedMarkets;
    };

    return (
        <div className={classes.EventRow} data-event={`Event:${props.event.Info.MatchId}`}>
            <Link
                className={classes.Info}
                to={`/event/${props.event.Info.SportName.International.toLowerCase().replace(/ /g, '-')}/${props.event.Info.SportId}/${
                    props.event.Header.MatchId
                }`}
            >
                <div className={classes.RowTop}>
                    <div className={classes.EventTime}>
                        <div className={classes.Time}>
                            <span>{formatDateTime(props.event.Info.DateOfMatch)}</span>
                            <span> - {getTimeUntil(props.event.Info.DateOfMatch)}</span>
                        </div>
                    </div>
                    <div className={classes.IconWrapper}>
                        <div
                            className={classes.IconContainer}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                dispatch(sportsbookActions.setShowStatsFor(props.event));
                            }}
                        >
                            <BarsIcon />
                            {props.event.withPlay && <PlayIcon />} {/* TODO: */}
                        </div>
                        <div className={classes.ExtraMarkets} to='/'>
                            + {props.event.Markets.length}
                        </div>
                    </div>
                </div>

                <div className={classes.RowBottom}>
                    <div className={classes.TeamGroup}>
                        <div className={classes.Team}>
                            <div className={classes.LogoWrapper}>
                                <TeamLogo teamId={props.event.Info.HomeTeamId} isHome={true} sportName={props.event.Info.SportName.International} />
                            </div>
                            <div className={classes.CompetitorName}>{translateNameWithLang(props.event.Info.HomeTeamName)}</div>
                            <div className={classes.ScoreGroup}>
                                <div className={classes.Score}></div>
                            </div>
                        </div>

                        {props.event.Info?.AwayTeamName && (
                            <div className={classes.Team}>
                                <div className={classes.LogoWrapper}>
                                    <TeamLogo teamId={props.event.Info.AwayTeamId} isHome={false} sportName={props.event.Info.SportName.International} />
                                </div>
                                <div className={classes.CompetitorName}>{translateNameWithLang(props.event.Info.AwayTeamName)}</div>
                                <div className={classes.ScoreGroup}>
                                    <div className={classes.Score}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            <section className={classes.Outcome}>
                <div className={classes.OutcomeHeaders}></div>
                <Market event={props.event} market={getMarket()} allMarkets={getAllMarkets()} />
            </section>
        </div>
    );
};

export default EventRow;
