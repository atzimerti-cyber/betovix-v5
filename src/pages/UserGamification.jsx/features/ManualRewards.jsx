import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./ManualRewards.module.css";
import Calendar1dIcon from "../../../assets/svgs/calendar1d.svg?react";
import Calendar7dIcon from "../../../assets/svgs/calendar7d.svg?react";
import Calendar30dIcon from "../../../assets/svgs/calendar30d.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { translate } from "../../../utils/translations";
import { recRewards } from "../gamificationAsyncActions";
import { gamificationActions } from "../userGamificationSlice";

const ManualRewards = ({ onDataNotFound }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const dataCame = useSelector((state) => state.gamification.dataCame);
  const dailyRewards = useSelector(
    (state) => state.gamification.manualRewards.dailyRewards
  );
  const weeklyRewards = useSelector(
    (state) => state.gamification.manualRewards.weeklyRewards
  );
  const monthlyRewards = useSelector(
    (state) => state.gamification.manualRewards.monthlyRewards
  );
  let rewards = [dailyRewards, weeklyRewards, monthlyRewards];

  const [timeUntilEndOfDay, setTimeUntilEndOfDay] = useState("");
  const [timeUntilNextSunday, setTimeUntilNextSunday] = useState("");
  const [timeUntilEndOfMonth, setTimeUntilEndOfMonth] = useState("");
  const [percentOfDay, setPercentOfDay] = useState(0);
  const [percentOfWeek, setPercentOfWeek] = useState(0);
  const [percentOfMonth, setPercentOfMonth] = useState(0);

  //Remove Component if no favs found
  useEffect(() => {
    let foundOneNotNull = false;
    for (let i = 0; i < rewards.length; i++) {
      if (rewards[i] !== null) {
        foundOneNotNull = true;
        break;
      }
    }
    if (dataCame !== null && foundOneNotNull === false) {
      onDataNotFound();
    }
  }, [dataCame, rewards, onDataNotFound]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );
      const timeToEndOfDay = endOfDay - now;
      const timeSinceStartOfDay = now - startOfDay;
      const totalDayTime = endOfDay - startOfDay;
      setTimeUntilEndOfDay(formatTime(timeToEndOfDay));
      setPercentOfDay(((timeSinceStartOfDay / totalDayTime) * 100).toFixed(2));

      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(startOfWeek.getTime());
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      endOfWeek.setHours(23, 59, 59, 999);
      const timeToNextSunday = endOfWeek - now;
      const totalWeekTime = endOfWeek - startOfWeek;
      setTimeUntilNextSunday(formatTime(timeToNextSunday));
      setPercentOfWeek(
        (((now - startOfWeek) / totalWeekTime) * 100).toFixed(2)
      );

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      const timeToEndOfMonth = endOfMonth - now;
      const totalMonthTime = endOfMonth - startOfMonth;
      setTimeUntilEndOfMonth(formatTime(timeToEndOfMonth));
      setPercentOfMonth(
        (((now - startOfMonth) / totalMonthTime) * 100).toFixed(2)
      );
    }, 1000);

    const controller = new AbortController();

    dispatch(recRewards());

    return () => {
      clearInterval(timer);
      controller.abort();
      dispatch(gamificationActions.reset());
    };
    //return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getTime = (id) => {
    if (id === 148) {
      return null;
    } else if (id === 145) {
      return timeUntilEndOfDay;
    } else if (id === 146) {
      return timeUntilNextSunday;
    } else if (id === 147) {
      return timeUntilEndOfMonth;
    }
  };

  return (
    <>
      <div className={classes.ManualRewards}>
        {rewards.map((reward, index) => (
          <article className={classes.Card} key={index}>
            <header>
              <div className={classes.IconContainer}>
                <Calendar7dIcon />
              </div>
              <p className={classes.Title}>{translate(reward?.name)}</p>
              {/* <p className={classes.Title}>{translate(weeklyRewards?.name)}</p> */}
            </header>
            <main className={classes.CardMain}>
              {reward ? (
                <>
                  <p className={classes.Description}>
                    {translate(`${reward.description}`)}
                  </p>
                  <div className={classes.ProgressBarContainer}>
                    <div className={classes.ProgressBar}>
                      <div
                        className={classes.Progress}
                        style={{ "--progress": `${reward.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {reward.completed ? (
                    <div className={classes.ButtonContainer}>
                      <button className={classes.TempButton} disabled>
                        {translate("Completed")}
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={classes.ClaimIn}>
                        {translate("Ends in")} {getTime(reward.id)}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className={classes.Description}>
                    {translate(`Loading`)}...
                  </p>
                  <div className={classes.ProgressBarContainer}>
                    <div className={classes.ProgressBar}>
                      <div
                        className={classes.Progress}
                        style={{ "--progress": `0%` }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </main>
          </article>
        ))}
      </div>
    </>
  );
};

export default ManualRewards;
