import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./EventRowLive.module.css";
import BarsIcon from "../../../assets/svgs/bars.svg?react";
import PlayIcon from "../../../assets/svgs/play.svg?react";
import Market from "./Market";
import { sportsbookActions } from "../sportsbookSlice";
import TeamLogo from "../../../features/TeamLogo/TeamLogo";
import { formatTimeString } from "../../../utils/custom";
import FlashingScore from "./FlashingScore";
import { translate, translateNameWithLang } from "../../../utils/translations";

const EventRowLive = (props) => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const sportsStatusParams = useSelector(
    (state) => state.sportsbook.sportsStatusParams
  );
  const liveStreams = useSelector((state) => state.sportsbook.liveStreams);
  const liveState = useSelector((state) => state.live.liveState);
  const liveStream = liveStreams ? liveStreams[props.eventId] : null;

  const event =
    liveState && liveState[props.eventId] ? liveState[props.eventId] : null;

  const getStatusText = () => {
    let text = event.Header.MatchTimeExtended;

    if (event?.Header.MatchTimeExtended !== "Not Started") {
      if (event?.Header?.MatchTime)
        text = event?.Header.MatchTime + "′ - " + text;
      else if (
        event?.Header?.RemainingTimeInPeriod &&
        event?.Header?.RemainingTimeInPeriod !== ""
      )
        text =
          formatTimeString(event?.Header.RemainingTimeInPeriod) + " - " + text;
    }

    return text;
  };

  const getScoreGroup = (team) => {
    const sportParams = sportsStatusParams[event.Info.SportName.International];

    if (!sportParams || (sportParams && sportParams.scoreType === "score")) {
      return (
        <FlashingScore
          score={getScore(event.Header, team)}
          previousScore={getScore(event.PreviousHeader, team)}
        />
      );
    } else if (sportParams && sportParams.scoreType === "games") {
      return (
        <>
          <FlashingScore
            score={getSetsScore(event.Header, team)}
            previousScore={getSetsScore(event.PreviousHeader, team)}
          />
          <FlashingScore
            score={getCurrentSetScore(event.Header, team)}
            previousScore={getCurrentSetScore(event.PreviousHeader, team)}
          />
          <FlashingScore
            score={getScore(event.Header, team)}
            previousScore={getScore(event.PreviousHeader, team)}
          />
        </>
      );
    }
  };

  const getScore = (header, team) => {
    if (!header) return null;

    let score = header.Score;
    if (!score) return null;

    score = score.split("(")[0]; // Found this in rugby union...
    const scoreArr = score.split(":");
    if (scoreArr.length < 2) return null;

    const thisScore = team === "home" ? scoreArr[0] : scoreArr[1];

    return thisScore;
  };

  const getCurrentSetScore = (header, team) => {
    if (!header) return null;

    const sets = header.SetScores;
    if (!sets) return null;

    const lastSet = sets[sets.length - 1];
    if (!lastSet) return null;

    const lastSetArr = lastSet.split(":");
    if (lastSetArr.length < 2) return null;

    const currentSet = team === "home" ? lastSetArr[0] : lastSetArr[1];

    return currentSet;
  };

  const getSetsScore = (header, team) => {
    if (!header) return null;

    const sets = header.SetScores;
    if (!sets) return null;

    let homeSets = 0;
    let awaySets = 0;
    for (let i = 0; i < sets.length - 1; i++) {
      const set = sets[i];
      const gamesArr = set.split(":");
      if (gamesArr.length < 2) break;

      const gamesHome = gamesArr[0];
      const gamesAway = gamesArr[1];
      if (gamesHome > gamesAway) homeSets++;
      else awaySets++;
    }
    const setsScore = team === "home" ? homeSets : awaySets;

    return setsScore;
  };

  const getMarket = () => {
    if (!event.Markets) return null;

    const filteredMarkets = event.Markets.filter(
      (m) => m.MarketName?.International
    );
    const sortedMarkets = filteredMarkets.sort(
      (a, b) => a.MarketTypeId - b.MarketTypeId
    );
    return sortedMarkets[0];
  };

  const getAllMarkets = () => {
    if (!event.Markets) return null;

    const filteredMarkets = event.Markets.filter(
      (m) => m.MarketName?.International
    );
    const sortedMarkets = filteredMarkets.sort(
      (a, b) => a.MarketTypeId - b.MarketTypeId
    );
    return sortedMarkets;
  };

  return event ? (
    <div
      className={classes.EventRow}
      data-event={`Event:${event.Info.MatchId}`}
    >
      <Link
        className={classes.Info}
        to={`/event/${event.Info.SportName.International.toLowerCase().replace(
          / /g,
          "-"
        )}/${event.Info.SportId}/${event.Header.MatchId}`}
      >
        <div className={classes.RowTop}>
          <div className={classes.EventTime}>
            <div className={classes.LiveBadge}>{translate("Live")}</div>
            <div className={classes.Time}>{getStatusText()}</div>
          </div>
          <div className={classes.IconWrapper}>
            <div
              className={classes.IconContainer}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(sportsbookActions.setShowStatsFor(event));
              }}
            >
              <BarsIcon />
              {liveStream && (
                <PlayIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(
                      sportsbookActions.setShowVideoFor({
                        Info: event.Info,
                        liveStream: liveStream,
                      })
                    );
                  }}
                />
              )}
            </div>
            <div className={classes.ExtraMarkets}>+ {event.Markets.length}</div>
          </div>
        </div>

        <div className={classes.RowBottom}>
          {event?.Header.Server && (
            <div className={classes.ServerBox}>
              <div
                className={classes.ServerIndicator}
                style={event.Header.Server === 1 ? { transform: "none" } : null}
              ></div>
            </div>
          )}
          <div className={classes.TeamGroup}>
            <div className={classes.Team}>
              <div className={classes.LogoWrapper}>
                <TeamLogo
                  teamId={event.Info.HomeTeamId}
                  isHome={true}
                  sportName={event.Info.SportName.International}
                />
              </div>
              <div className={classes.CompetitorName}>
                {translateNameWithLang(event.Info.HomeTeamName)}
              </div>
              <div className={classes.ScoreGroup}>{getScoreGroup("home")}</div>
            </div>

            {event.Info.AwayTeamName && (
              <div className={classes.Team}>
                <div className={classes.LogoWrapper}>
                  <TeamLogo
                    teamId={event.Info.AwayTeamId}
                    isHome={false}
                    sportName={event.Info.SportName.International}
                  />
                </div>
                <div className={classes.CompetitorName}>
                  {translateNameWithLang(event.Info.AwayTeamName)}
                </div>
                <div className={classes.ScoreGroup}>
                  {getScoreGroup("away")}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      <section className={classes.Outcome}>
        <div className={classes.OutcomeHeaders}></div>
        <Market
          event={event}
          market={getMarket()}
          allMarkets={getAllMarkets()}
        />
      </section>
    </div>
  ) : null;
};

export default EventRowLive;
