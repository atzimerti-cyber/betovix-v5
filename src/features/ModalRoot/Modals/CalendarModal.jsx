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
import { getCustomDateEvents } from "../../../pages/SportsBook/sportsbookAsyncActions";

const CalendarModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change
  const [date, setDate] = useState(null);
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

  const handleSearchButton = (date) => {
    let payload = {};
    if (date && selectedSport) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = month + day;

      payload = {
        ProviderId: 1,
        did: formattedDate,
        sportid: selectedSport.Id,
        groupName: null,
        subGroupName: null,
      };

      // Stringify the payload
      const stringifiedPayload = JSON.stringify(payload);

      const controller = new AbortController();
      const signal = controller.signal;

      dispatch(sportsbookActions.setCustomDate(formattedDate));
      dispatch(getCustomDateEvents(signal, stringifiedPayload));

      if (location.pathname) {
        navigate(location.pathname);
      }
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    handleSearchButton(date);
  };

  // Disable dates not in the range of today to a week from today
  const disableDates = ({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    oneWeekFromNow.setHours(23, 59, 59, 999);

    if (view === "month") {
      return date < today || date > oneWeekFromNow;
    } else if (view === "year") {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      return endOfMonth < today || startOfMonth > oneWeekFromNow;
    } else if (view === "decade") {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const endOfYear = new Date(date.getFullYear(), 11, 31);

      return endOfYear < today || startOfYear > oneWeekFromNow;
    } else if (view === "century") {
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
        {/* <div
          className={classes.SubmitButton}
          onClick={() => handleSearchButton(date)}
        >
          <button>{translate("Search")}</button>
        </div>*/}
      </div>
    </div>
  );
};

export default CalendarModal;
