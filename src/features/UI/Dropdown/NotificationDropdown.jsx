import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./NotificationDropdown.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import ArrowIcon from "../../../assets/svgs/notif-arrow.svg?react";
import Notification from "../../Layout/features/Notification";
import { getUserNotifications } from "../../InitApp/initAppAsyncActions";
import { translate } from "../../../utils/translations";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const lang = useSelector((state) => state.app.lang);
  const notifications = useSelector((state) => state.layout.notifications);

  const [unreadOnly, setUnreadOnly] = useState(false);

  const close = useCallback(() => props.onClickOutside(), [props.show]);
  useClickOutside(dropdownRef, close);

  useEffect(() => {
    if (props.show) {
      dispatch(getUserNotifications());
    }
  }, [props.show, dispatch]);

  const handleToggle = () => {
    setUnreadOnly(!unreadOnly);
  };

  return (
    <div
      ref={dropdownRef}
      className={
        props.show
          ? [classes.Dropdown, classes.Visible].join(" ")
          : classes.Dropdown
      }
    >
      <ArrowIcon className={classes.ArrowIcon} fill="#000" />
      <div className={classes.DropdownHeader}>
        <h1>Notifications</h1>
        <div className={classes.ToggleButton}>
          <p>Only show unread</p>
          <label className={classes.Switch}>
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={handleToggle}
            />
            <span className={classes.SliderRound}></span>
          </label>
        </div>
      </div>
      <div className={classes.MainContent}>
        {notifications && notifications.length > 0 ? (
          unreadOnly ? (
            notifications
              .filter((notif) => !notif.viewed)
              .map((notif, index) => (
                <Notification key={index} notification={notif} />
              ))
          ) : (
            notifications.map((notif, index) => (
              <Notification key={index} notification={notif} />
            ))
          )
        ) : (
          <div className={classes.Empty}>
            <span>No Notifications.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
