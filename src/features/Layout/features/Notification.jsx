import { useDispatch, useSelector } from "react-redux";
import classes from "./Notification.module.css";
import LogoSmall from "../../../assets/svgs/logo-small.svg?react";
import { translate } from "../../../utils/translations";
import { disableInstantTransitions } from "framer-motion";
import { layoutActions } from "../layoutSlice";
import { useNavigate } from "react-router-dom";
import { viewUserNotification } from "../../InitApp/initAppAsyncActions";

const Notification = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.app.lang);

  const openNotifPopUp = (modal, notif) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);

    dispatch(layoutActions.setSelectedNotification(notif));

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

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

  const readNotification = (id) => {
    if (id) {
      dispatch(viewUserNotification(id));
    }
  };

  return (
    <>
      <div
        className={
          !props.notification.viewed
            ? [classes.NotificationContainer, classes.Unviewed].join(" ")
            : classes.NotificationContainer
        }
        onClick={() => {
          openNotifPopUp("n", props.notification);
          readNotification(props.notification.id);
        }}
      >
        <div className={classes.Icon}>
          <LogoSmall />
        </div>
        <div className={classes.Main}>
          <div className={classes.Header}>
            <div className={classes.Title}>
              {props.notification.title
                ? props.notification.title
                : translate("Notification")}
            </div>
            <div className={classes.RightPart}>
              <div className={classes.Date}>
                {props.notification.date
                  ? formatUserFriendlyDate(`${props.notification.date}`)
                  : " "}
              </div>
              {!props.notification.viewed && (
                <span className={classes.NewNotif}></span>
              )}
            </div>
          </div>
          <div className={classes.Message}>
            {props.notification.message
              ? props.notification.message
              : translate("You have a new notification!")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
