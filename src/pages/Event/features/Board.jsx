import { useSelector } from "react-redux";

import classes from "./Board.module.css";
import TeamLogo from "../../../features/TeamLogo/TeamLogo";
import { formatTimeString } from "../../../utils/custom";
import BoardStatsFootball from "./BoardStatsFootball";
import BoardStatsBasketball from "./BoardStatsBasketball";
import BoardStatsTennis from "./BoardStatsTennis";
import BoardStatsDefault from "./BoardStatsDefault";
import { translate, translateNameWithLang } from "../../../utils/translations";
import FlashingScore from "../../SportsBook/features/FlashingScore";

const Board = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const sportsStatusParams = useSelector(
    (state) => state.sportsbook.sportsStatusParams
  );

  const getScore = (header, team) => {
    if (!header) return null;

    let score = header.Score;
    score = score.split("(")[0]; // Found this in rugby union...
    const scoreArr = score.split(":");
    const thisScore = team === "home" ? scoreArr[0] : scoreArr[1];

    return thisScore;
  };

  const getStatusText = () => {
    let text = props.event.Header.MatchTimeExtended;

    if (props.event?.Header.MatchTimeExtended !== "Not Started") {
      if (props.event?.Header?.MatchTime)
        text = props.event?.Header.MatchTime + "′ - " + text;
      else if (
        props.event?.Header?.RemainingTimeInPeriod &&
        props.event?.Header?.RemainingTimeInPeriod !== ""
      )
        text =
          formatTimeString(props.event?.Header.RemainingTimeInPeriod) +
          " - " +
          text;
    }

    return text;
  };

  const calculateScores = (header, team) => {
    let thisScores = {
      home: {},
      away: {},
    };
    // This game
    let totalScore = header?.Score;
    if (totalScore) {
      totalScore = totalScore.split("(")[0]; // Found this in rugby union...
    }

    if (totalScore) {
      const totalScoreArr = totalScore.split(":");
      thisScores.home.total = totalScoreArr[0];
      thisScores.away.total = totalScoreArr[1];
    }
    if (team === "homeTotal") {
      return thisScores.home.total;
    } else if (team === "awayTotal") {
      return thisScores.away.total;
    }
  };

  return (
    <div className={classes.Board}>
      <div className={classes.Header}>
        <div className={classes.Tournament}>
          {translateNameWithLang(props.event?.Info?.TournamentName)}
        </div>
        <div className={classes.Timing}>
          <div className={classes.EventTime}>
            <div className={classes.LiveBadge}>{translate("Live")}</div>
            <div className={classes.Time}>{getStatusText()}</div>
          </div>
        </div>
      </div>

      <div className={classes.CenterRow}>
        <div className={classes.Teams}>
          {/* <div className={classes.ContentRow}> */}
          <div className={classes.TeamText}>
            <div className={classes.LogoWrapper}>
              <TeamLogo
                teamId={props.event?.Info.HomeTeamId}
                isHome={true}
                sportName={props.event?.Info.SportName.International}
              />
            </div>
            <div className={classes.Name}>
              {translateNameWithLang(props.event?.Info.HomeTeamName)}
            </div>
            <div className={classes.ScoreGroup}></div>
          </div>
          {sportsStatusParams &&
            sportsStatusParams[props.event?.Info.SportName.International] &&
            sportsStatusParams[props.event?.Info.SportName.International]
              .board === "football" && (
              <div className={classes.ContentRow} style={{ padding: "3px" }}>
                <div
                  className={[classes.HomeScore, classes.Server].join(" ")}
                  // className={
                  //   props.event?.Header?.Server &&
                  //   props.event?.Header?.Server === 1
                  //     ? [classes.HomeScore, classes.Server].join(" ")
                  //     : classes.HomeScore
                  // }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "home")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "home"
                    )}
                  />
                </div>
                <p className={classes.Dash}>-</p>
                <div
                  className={[classes.AwayScore, classes.Server].join(" ")}
                  // className={
                  //   props.event?.Header?.Server &&
                  //   props.event?.Header?.Server === 2
                  //     ? [classes.AwayScore, classes.Server].join(" ")
                  //     : classes.AwayScore
                  // }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "away")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "away"
                    )}
                  />
                </div>
              </div>
            )}
          {sportsStatusParams &&
            sportsStatusParams[props.event?.Info.SportName.International] &&
            sportsStatusParams[props.event?.Info.SportName.International]
              .board === "basketball" && (
              <div className={classes.ContentRow}>
                <div
                  className={[classes.HomeScore, classes.Server].join(" ")}
                  // className={
                  //   props.event?.Header?.Server &&
                  //   props.event?.Header?.Server === 1
                  //     ? [classes.HomeScore, classes.Server].join(" ")
                  //     : classes.HomeScore
                  // }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "home")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "home"
                    )}
                  />
                </div>
                <p className={classes.Dash}>-</p>
                <div
                  className={[classes.AwayScore, classes.Server].join(" ")}
                  // className={
                  //   props.event?.Header?.Server &&
                  //   props.event?.Header?.Server === 2
                  //     ? [classes.AwayScore, classes.Server].join(" ")
                  //     : classes.AwayScore
                  // }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "away")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "away"
                    )}
                  />
                </div>
              </div>
            )}
          {sportsStatusParams &&
            sportsStatusParams[props.event?.Info.SportName.International] &&
            sportsStatusParams[props.event?.Info.SportName.International]
              .board === "tennis" && (
              <div className={classes.ContentRow}>
                <div
                  // className={classes.HomeScore}
                  className={
                    props.event?.Header?.Server &&
                    props.event?.Header?.Server === 1
                      ? [classes.HomeScore, classes.Server].join(" ")
                      : classes.HomeScore
                  }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "home")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "home"
                    )}
                  />
                </div>
                <p className={classes.Dash}>-</p>
                <div
                  // className={classes.AwayScore}
                  className={
                    props.event?.Header?.Server &&
                    props.event?.Header?.Server === 2
                      ? [classes.AwayScore, classes.Server].join(" ")
                      : classes.AwayScore
                  }
                >
                  <FlashingScore
                    score={getScore(props.event?.Header, "away")}
                    previousScore={getScore(
                      props.event?.PreviousHeader,
                      "away"
                    )}
                  />
                </div>
              </div>
            )}
          {(sportsStatusParams[props.event?.Info.SportName.International] ===
            undefined ||
            sportsStatusParams[props.event?.Info.SportName.International]
              .board === undefined) && (
            <div className={classes.ContentRow}>
              <div
                // className={classes.HomeScore}
                className={
                  props.event?.Header?.Server &&
                  props.event?.Header?.Server === 1
                    ? [classes.HomeScore, classes.Server].join(" ")
                    : classes.HomeScore
                }
              >
                <FlashingScore
                  score={calculateScores(props.event?.Header, "homeTotal")}
                  previousScore={calculateScores(
                    props.event?.PreviousHeader,
                    "home"
                  )}
                  withEmptyDash
                />
              </div>
              <p className={classes.Dash}>-</p>
              <div
                // className={classes.AwayScore}
                className={
                  props.event?.Header?.Server &&
                  props.event?.Header?.Server === 2
                    ? [classes.AwayScore, classes.Server].join(" ")
                    : classes.AwayScore
                }
              >
                <FlashingScore
                  score={calculateScores(props.event?.Header, "awayTotal")}
                  previousScore={calculateScores(
                    props.event?.PreviousHeader,
                    "away"
                  )}
                  withEmptyDash
                />
              </div>
            </div>
          )}

          {props.event?.Info?.AwayTeamName && (
            <div className={classes.TeamText}>
              <div className={classes.LogoWrapper}>
                <TeamLogo
                  teamId={props.event?.Info.AwayTeamId}
                  sportName={props.event?.Info.SportName.International}
                />
              </div>
              <div className={classes.Name}>
                {translateNameWithLang(props.event?.Info.AwayTeamName)}
              </div>
              <div className={classes.ScoreGroup}></div>
            </div>
          )}
        </div>
        {/* {props.event?.Header?.Server && (
          <div className={classes.ServerBox}>
            <div
              className={classes.ServerIndicator}
              style={
                props.event?.Header?.Server === 1
                  ? { transform: "translateX(10%)" }
                  : { transform: "translateX(180%)" }
              }
            ></div>
          </div>
        )} */}
      </div>

      <div className={classes.Stats}>
        {sportsStatusParams &&
          sportsStatusParams[props.event?.Info.SportName.International] &&
          sportsStatusParams[props.event?.Info.SportName.International]
            .board === "football" && <BoardStatsFootball event={props.event} />}
        {sportsStatusParams &&
          sportsStatusParams[props.event?.Info.SportName.International] &&
          sportsStatusParams[props.event?.Info.SportName.International]
            .board === "basketball" && (
            <BoardStatsBasketball event={props.event} />
          )}
        {sportsStatusParams &&
          sportsStatusParams[props.event?.Info.SportName.International] &&
          sportsStatusParams[props.event?.Info.SportName.International]
            .board === "tennis" && <BoardStatsTennis event={props.event} />}

        {(sportsStatusParams[props.event?.Info.SportName.International] ===
          undefined ||
          sportsStatusParams[props.event?.Info.SportName.International]
            .board === undefined) && <BoardStatsDefault event={props.event} />}
      </div>
    </div>
  );
};

export default Board;
