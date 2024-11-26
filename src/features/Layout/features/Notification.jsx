import { useSelector } from "react-redux";
import classes from "./Notification.module.css";
import LogoSmall from "../../../assets/svgs/logo-small.svg?react";
import { translate } from "../../../utils/translations";

const Notification = (props) => {
  const lang = useSelector((state) => state.app.lang);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

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
        onClick={addParamsToUrl("n")}
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
