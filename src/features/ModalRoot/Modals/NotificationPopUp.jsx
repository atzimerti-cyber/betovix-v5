import { useSelector } from "react-redux";
import { useEffect } from "react";
import { layoutActions } from "../../Layout/layoutSlice";
import classes from "./NotificationPopUp.module.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CloseButton from "../../UI/Buttons/CloseButton";
import BellIcon from "../../../assets/svgs/bell.svg?react";

const NotificationPopUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const notification = useSelector(
    (state) => state.layout.selectedNotification
  );

  useEffect(() => {
    return () => {
      dispatch(layoutActions.setSelectedNotification(null));
    };
  }, []);

  function formatUserFriendlyDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className={classes.NotificationModal}>
      <div className={classes.ModalContent}>
        <div className={classes.ModalHeader}>
          <span className={classes.CloseWrapper}>
            <CloseButton
              timesIcon
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </div>
        <div className={classes.MainContent}>
          {notification && (
            <>
              <h1 className={classes.Title}>
                <BellIcon />
                <p>{notification.title}</p>
              </h1>
              <p className={classes.Message}>{notification.message}</p>
              <p className={classes.Date}>
                {notification.date
                  ? formatUserFriendlyDate(`${notification.date}`)
                  : " "}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopUp;
