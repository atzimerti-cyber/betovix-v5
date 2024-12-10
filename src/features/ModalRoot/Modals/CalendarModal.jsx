import { useNavigate, useLocation } from "react-router-dom";

import classes from "./CalendarModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { sportsbookActions } from "../../../pages/SportsBook/sportsbookSlice";
import CalendarIcon from "../../../assets/svgs/calendar.svg?react";

const CalendarModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [date, setDate] = useState(null);
  //   const [date, setDate] = useState(new Date());

  const handleSearchButton = (date) => {
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = month + day;

      dispatch(sportsbookActions.setCustomDate(formattedDate));

      if (location.pathname) {
        navigate(location.pathname);
      }
    }
  };

  const handleDateChange = (date) => {
    const isSameDate = (d1, d2) =>
      d1.toISOString().split("T")[0] === d2.toISOString().split("T")[0];

    const todaysDate = new Date(); // Assuming TodaysDate is today's date

    // Check if the selected date is the same as today's date
    if (isSameDate(date, todaysDate)) return;

    // Update the state and dispatch the action
    setDate(date);
  };

  // Disable dates not in the range of today to a week from today
  const disableDates = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    oneWeekFromNow.setHours(23, 59, 59, 999); // End of the day for comparison

    if (view === "month") {
      // Disable individual dates outside the range
      return date < today || date > oneWeekFromNow;
    } else if (view === "year") {
      // Disable months where all dates are outside the range
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      return endOfMonth < today || startOfMonth > oneWeekFromNow;
    } else if (view === "decade") {
      // Disable years where all months are outside the range
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const endOfYear = new Date(date.getFullYear(), 11, 31);

      return endOfYear < today || startOfYear > oneWeekFromNow;
    } else if (view === "century") {
      // Disable decades where all years are outside the range
      const startOfDecade = new Date(
        Math.floor(date.getFullYear() / 10) * 10,
        0,
        1
      );
      const endOfDecade = new Date(
        Math.floor(date.getFullYear() / 10) * 10 + 9,
        11,
        31
      );

      return endOfDecade < today || startOfDecade > oneWeekFromNow;
    }
  };

  return (
    <div className={classes.CalendarModal}>
      <div className={classes.ModalContent}>
        <header>
          <span className={classes.Center}>
            <CalendarIcon />
            <h1>{translate("Pick a date")}</h1>
          </span>
          <span className={classes.Right}>
            <CloseButton
              timesIcon
              color="transparent"
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </header>
        <div className={classes.CalendarContainer}>
          <Calendar
            value={date}
            onChange={handleDateChange}
            tileClassName={({ date, view }) =>
              view === "month" && date.getDay() === 0 ? "highlight" : null
            }
            tileDisabled={disableDates}
          />
        </div>
        <div
          className={classes.SubmitButton}
          onClick={() => handleSearchButton(date)}
        >
          <button>{translate("Search")}</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
