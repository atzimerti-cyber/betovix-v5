import { useDispatch, useSelector } from "react-redux";
import classes from "./Notification.module.css";
import LogoSmall from "../../../assets/svgs/logo-small.svg?react";
import { translate } from "../../../utils/translations";
import { disableInstantTransitions } from "framer-motion";
import { layoutActions } from "../layoutSlice";

const Notification = (props) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang);

  const openNotifPopUp = (modal, notif) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);

    dispatch(layoutActions.setSelectedNotification(notif));

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <>
      <div
        className={
          !props.notification.viewed
            ? [classes.NotificationContainer, classes.Unviewed].join(" ")
            : classes.NotificationContainer
        }
        onClick={openNotifPopUp("n", props.notification)}
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
                {props.notification.date ? props.notification.date : " "}
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
