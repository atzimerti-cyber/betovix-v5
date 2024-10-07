import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./BoardStats.module.css";
import FlashingScore from "../../SportsBook/features/FlashingScore";
import { translate } from "../../../utils/translations";
import { getOrdinal } from "../../../utils/custom";

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

    // Total game score
    let totalScore = header.Score;
    totalScore = totalScore.split("(")[0]; // In case of rugby union...
    if (totalScore) {
      const totalScoreArr = totalScore.split(":");
      thisScores.home.total = totalScoreArr[0];
      thisScores.away.total = totalScoreArr[1];
    }

    // Set scores (assuming header.SetScores is an array like ["1:1", "0:0"])
    if (header.SetScores) {
      header.SetScores.forEach((setScore, index) => {
        const setScoreArr = setScore.split(":");
        thisScores.home[`set${index + 1}`] = setScoreArr[0];
        thisScores.away[`set${index + 1}`] = setScoreArr[1];
      });
    }

    return thisScores;
  };

  return (
    <>
      {scores &&
        Object.keys(scores.current.home).map((key, index) => {
          if (key === "total") return null;

          const setHome = scores.current.home[key];
          const setAway = scores.current.away[key];
          const setText = getOrdinal(index + 1);

          return (
            <div key={key} className={classes.StatSection}>
              <div className={classes.Header}>
                {translate(`${setText}`)}
              </div>
              <div className={classes.Content}>
                <div className={classes.ContentRow}>
                  <FlashingScore
                    score={setHome}
                    previousScore={scores.previous.home[key]}
                    withEmptyDash
                  />
                </div>
                <p>-</p>
                <div className={classes.ContentRow}>
                  <FlashingScore
                    score={setAway}
                    previousScore={scores.previous.away[key]}
                    withEmptyDash
                  />
                </div>
              </div>
            </div>
          );
        })}

      {/* {scores && props.event.Header.Status > -1 && (
        <div className={classes.StatSection}>
          <div className={classes.Header}>{translate("Total")}</div>
          <div className={classes.Content}>
            <div className={classes.ContentRow}>
              <FlashingScore
                score={scores.current.home.total}
                previousScore={scores.previous.home.total}
                withEmptyDash
              />
            </div>
            <p>-</p>
            <div className={classes.ContentRow}>
              <FlashingScore
                score={scores.current.away.total}
                previousScore={scores.previous.away.total}
                withEmptyDash
              />
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default BoardStatsDefault;
