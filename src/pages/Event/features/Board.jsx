import { useSelector } from 'react-redux';

import classes from './Board.module.css';
import TeamLogo from '../../../features/TeamLogo/TeamLogo';
import { formatTimeString } from '../../../utils/custom';
import BoardStatsFootball from './BoardStatsFootball';
import BoardStatsBasketball from './BoardStatsBasketball';
import BoardStatsTennis from './BoardStatsTennis';
import BoardStatsDefault from './BoardStatsDefault';
import { translate, translateNameWithLang } from '../../../utils/translations';

const Board = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const sportsStatusParams = useSelector((state) => state.sportsbook.sportsStatusParams);

    const getStatusText = () => {
        let text = props.event.Header.MatchTimeExtended;

        if (props.event?.Header.MatchTimeExtended !== 'Not Started') {
            if (props.event?.Header?.MatchTime) text = props.event?.Header.MatchTime + '′ - ' + text;
            else if (props.event?.Header?.RemainingTimeInPeriod && props.event?.Header?.RemainingTimeInPeriod !== '')
                text = formatTimeString(props.event?.Header.RemainingTimeInPeriod) + ' - ' + text;
        }

        return text;
    };

    return (
        <div className={classes.Board}>
            <div className={classes.Column}>
                <div className={classes.Header}>
                    <div className={classes.Tournament}>{translateNameWithLang(props.event?.Info?.TournamentName)}</div>
                    <div className={classes.Timing}>
                        <div className={classes.EventTime}>
                            <div className={classes.LiveBadge}>{translate('Live')}</div>
                            <div className={classes.Time}>{getStatusText()}</div>
                        </div>
                    </div>
                </div>
                <div className={classes.Content}>
                    {props.event?.Header?.Server && (
                        <div className={classes.ServerBox}>
                            <div className={classes.ServerIndicator} style={props.event?.Header.Server === 1 ? { transform: 'none' } : null}></div>
                        </div>
                    )}
                    <div className={classes.ContentRow}>
                        <div className={classes.TeamText}>
                            <div className={classes.LogoWrapper}>
                                <TeamLogo teamId={props.event?.Info.HomeTeamId} isHome={true} sportName={props.event?.Info.SportName.International} />
                            </div>
                            <div className={classes.Name}>{translateNameWithLang(props.event?.Info.HomeTeamName)}</div>
                            <div className={classes.ScoreGroup}></div>
                        </div>
                    </div>

                    {props.event?.Info?.AwayTeamName && (
                        <div className={classes.ContentRow}>
                            <div className={classes.TeamText}>
                                <div className={classes.LogoWrapper}>
                                    <TeamLogo teamId={props.event?.Info.AwayTeamId} sportName={props.event?.Info.SportName.International} />
                                </div>
                                <div className={classes.Name}>{translateNameWithLang(props.event?.Info.AwayTeamName)}</div>
                                <div className={classes.ScoreGroup}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.StatsColumn}>
                {/* <div className={classes.StatSectionFade}></div> */}
                {sportsStatusParams &&
                    sportsStatusParams[props.event?.Info.SportName.International] &&
                    sportsStatusParams[props.event?.Info.SportName.International].board === 'football' && <BoardStatsFootball event={props.event} />}
                {sportsStatusParams &&
                    sportsStatusParams[props.event?.Info.SportName.International] &&
                    sportsStatusParams[props.event?.Info.SportName.International].board === 'basketball' && <BoardStatsBasketball event={props.event} />}
                {sportsStatusParams &&
                    sportsStatusParams[props.event?.Info.SportName.International] &&
                    sportsStatusParams[props.event?.Info.SportName.International].board === 'tennis' && <BoardStatsTennis event={props.event} />}

                {(sportsStatusParams[props.event?.Info.SportName.International] === undefined ||
                    sportsStatusParams[props.event?.Info.SportName.International].board === undefined) && <BoardStatsDefault event={props.event} />}
            </div>
        </div>
    );
};

export default Board;
