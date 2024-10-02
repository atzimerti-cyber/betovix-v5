import classes from "./Notification.module.css";
import LogoSmall from "../../../assets/svgs/logo-small.svg?react";

const Notification = (props) => {
  return (
    <>
      <div
        className={
          !props.notification.viewed
            ? [classes.NotificationContainer, classes.Unviewed].join(" ")
            : classes.NotificationContainer
        }
      >
        <div className={classes.Icon}>
          <LogoSmall />
        </div>
        <div className={classes.Main}>
          <div className={classes.Header}>
            <div className={classes.Title}>
              {props.notification.title
                ? props.notification.title
                : "Notification"}
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
              : "You have a new notification!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
