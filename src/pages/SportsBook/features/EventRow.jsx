import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./EventRow.module.css";
import {
  formatDateTime,
  getTimeUntil,
  formatDate,
} from "../../../utils/custom";
import BarsIcon from "../../../assets/svgs/bars.svg?react";
import PlayIcon from "../../../assets/svgs/play.svg?react";
import Market from "./Market";
import { sportsbookActions } from "../sportsbookSlice";

import TeamLogo from "../../../features/TeamLogo/TeamLogo";
import { translateNameWithLang } from "../../../utils/translations";
import { sportsHomeActions } from "../subpages/sportsHomeSlice";

const EventRow = (props) => {
  const dispatch = useDispatch();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const getMarket = () => {
    if (!props.event.Markets) return null;

    const filteredMarkets = props.event.Markets.filter(
      (m) => m.MarketName?.International
    );
    const sortedMarkets = filteredMarkets.sort(
      (a, b) => a.MarketTypeId - b.MarketTypeId
    );

    return sortedMarkets[0];
  };

  const getAllMarkets = () => {
    if (!props.event.Markets) return null;

    const filteredMarkets = props.event.Markets.filter(
      (m) => m.MarketName?.International
    );
    const sortedMarkets = filteredMarkets.sort(
      (a, b) => a.MarketTypeId - b.MarketTypeId
    );

    return sortedMarkets;
  };

  return (
    <div
      className={classes.EventRow}
      data-event={`Event:${props.event.Info.MatchId}`}
      onClick={() => {
        dispatch(sportsHomeActions.setSelectedCategory(props.catId));
        dispatch(sportsHomeActions.setSelectedTournament(props.tourId));
      }}
    >
      <Link
        className={classes.Info}
        to={`/event/${props.event.Info.SportName.International.toLowerCase().replace(
          / /g,
          "-"
        )}/${props.event.Info.SportId}/${props.event.MatchId}`} //props.event.Header.MatchId
      >
        <div className={classes.RowTop}>
          <div className={classes.EventTime}>
            <div className={classes.Time}>
              {/* <span>{formatDateTime(props.event.Info.DateOfMatch)}</span> */}
              <span>
                {formatDate(props.event.Info.DateOfMatch, "datetime")}
              </span>
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
            <div className={classes.ExtraMarkets} to="/">
              + {props.event.Markets.length}
            </div>
          </div>
        </div>
        <div className={classes.TeamGroup} style={{ marginBottom: "0.5rem" }}>
          {props.withTournament && (
            <p
              style={{
                color: "var(--yellow-accent-color)",
                fontSize: "13px",
              }}
            >
              <i>{props.event.Info.TournamentName.International}</i>
            </p>
          )}
        </div>
        <div className={classes.RowBottom}>
          <div className={classes.TeamGroup}>
            <div className={classes.Team}>
              <div className={classes.LogoWrapper}>
                <TeamLogo
                  teamId={props.event.Info.HomeTeamId}
                  isHome={true}
                  sportName={props.event.Info.SportName.International}
                />
              </div>
              <div className={classes.CompetitorName}>
                {translateNameWithLang(props.event.Info.HomeTeamName)}
              </div>
              <div className={classes.ScoreGroup}>
                <div className={classes.Score}></div>
              </div>
            </div>

            {props.event.Info?.AwayTeamName && (
              <div className={classes.Team}>
                <div className={classes.LogoWrapper}>
                  <TeamLogo
                    teamId={props.event.Info.AwayTeamId}
                    isHome={false}
                    sportName={props.event.Info.SportName.International}
                  />
                </div>
                <div className={classes.CompetitorName}>
                  {translateNameWithLang(props.event.Info.AwayTeamName)}
                </div>
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
        <Market
          event={props.event}
          market={getMarket()}
          allMarkets={getAllMarkets()}
        />
      </section>
    </div>
  );
};

export default EventRow;
