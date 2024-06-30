import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './GameCard.module.css';
import OddsButton from '../../pages/SportsBook/features/OddsButton';
import { formatDateTimeObj } from '../../utils/custom';
import TeamLogo from '../TeamLogo/TeamLogo';
import { translate, translateNameWithLang } from '../../utils/translations';

const GameCard = (props) => {
    const navigate = useNavigate();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const sportIcons = useSelector((state) => state.app.sportIcons);

    const [datetime, setDatetime] = useState({ date: null, time: null });

    useEffect(() => {
        if (!props.game) return;

        // Datetime. TODO: Timezone?
        if (props.type === 'scheduled') {
            const datetime = formatDateTimeObj(props.game.Info.DateOfMatch);
            setDatetime({ date: datetime.date, time: datetime.time });
        }
    }, [props.game]);

    const getScore = () => {
        if (props.type !== 'live') return 'vs';
        else if (props.game.Header.Status === 0) return '0 : 0';
        else {
            return props.game.Header.Score;
        }
    };

    const getDescription = () => {
        if (props.game.Header.Status === 0) return 'Not Started';
        else if (props.game.Header.MatchTimeExtended) return props.game.Header.MatchTimeExtended;
        else return 'Not Started';
    };

    const getOddsLabel = (label) => {
        if (label === 'W1') return '1';
        else if (label === 'W2') return '2';
        else if (label === 'Draw') return 'x';

        return translate(label);
    };

    const gotoEvent = () => {
        const sportName = props.game?.Info?.SportName?.International.toLowerCase().replace(/ /g, '-');
        const sportId = props.game?.Info?.SportId;
        const eventId = props.game?.Info?.MatchId;

        navigate(`/event/${sportName}/${sportId}/${eventId}`);
    };

    return (
        <div onClick={gotoEvent} className={classes.Card}>
            <div className={classes.SportDecoration}>{sportIcons[props.game.Info.SportName.International] || null}</div>

            <p className={classes.LeftComponent}>
                {props.game.Header.Status > 0 || props.type === 'live' ? (
                    <>
                        <span className={classes.LiveBadge}>Live</span>
                        <span className={classes.Time}>{getDescription()}</span>
                    </>
                ) : (
                    <>
                        <span className={classes.Date}>{datetime.date} |</span>
                        <span className={classes.Time}>{datetime.time}</span>
                    </>
                )}
            </p>

            <div className={classes.TeamContainer}>
                <div className={classes.TeamHome}>
                    <div className={classes.TeamLogoWrapper}>
                        <TeamLogo teamId={props.game.Info.HomeTeamId} isHome={true} sportName={props.game.Info.SportName.International} />
                    </div>
                    <div className={classes.TeamName}>{translateNameWithLang(props.game.Info.HomeTeamName)}</div>
                </div>
                <div className={classes.MiddleText}>{getScore()}</div>
                <div className={classes.TeamAway}>
                    <div className={classes.TeamLogoWrapper}>
                        <TeamLogo teamId={props.game.Info.AwayTeamId} isHome={false} sportName={props.game.Info.SportName.International} />
                    </div>
                    <div className={classes.TeamName}>{translateNameWithLang(props.game.Info.AwayTeamName)}</div>
                </div>
            </div>

            <div className={classes.OddsContainer}>
                {props.game.Markets && props.game.Markets.length > 0 ? (
                    props.game.Markets[0].MarketFields.map((marketField) => {
                        return (
                            <OddsButton
                                key={marketField.FieldId}
                                label={getOddsLabel(marketField.FieldName.International)}
                                event={props.game}
                                market={props.game.Markets[0]}
                                marketField={marketField}
                                odds={marketField.Value}
                                disabled={!marketField.Active}
                                style='card'
                            />
                        );
                    })
                ) : (
                    <>
                        <OddsButton key={0} label='' event={props.game} market={null} marketField={null} odds='-' disabled={true} style='card' />
                        <OddsButton key={1} label='' event={props.game} market={null} marketField={null} odds='-' disabled={true} style='card' />
                    </>
                )}
            </div>
        </div>
    );
};

export default GameCard;
