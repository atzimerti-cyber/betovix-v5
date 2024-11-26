import { useRef, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./NotificationsModal.module.css";
import ArrowIcon from "../../../assets/svgs/notif-arrow.svg?react";
import Notification from "../../Layout/features/Notification";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";

const NotificationsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const notifications = [];
  // const notifications = [
  //   {
  //     title: "Notification",
  //     message:
  //       "eidopoihshheidopoihshhh hheidopoih shhhhhei dopoihshhhhheidopoihsh hhhheidopoihshhhhhhhh",
  //     date: "Yesterday",
  //     viewed: false,
  //   },
  //   {
  //     title: "Notiion",
  //     message: "eidopoihshhhhh",
  //     date: "Yesterday",
  //     viewed: true,
  //   },
  //   {
  //     title: "Ncation",
  //     message: "eidopoihshhhhh",
  //     date: "Yesterday",
  //     viewed: true,
  //   },
  // ];

  const [unreadOnly, setUnreadOnly] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      navigate(location.pathname);
    }
  }, [isMobile, navigate, location.pathname]);

  const handleToggle = () => {
    setUnreadOnly(!unreadOnly);
  };

  return (
    isMobile && (
      <div className={classes.NotificationModal}>
        <div className={classes.ModalContent}>
          <div className={classes.ModalHeader}>
            <h1>{translate("Notifications")}</h1>
            <div className={classes.ToggleButton}>
              <p>{translate("Only show unread")}</p>
              <label className={classes.Switch}>
                <input
                  type="checkbox"
                  checked={unreadOnly}
                  onChange={handleToggle}
                />
                <span className={classes.SliderRound}></span>
              </label>
            </div>
            <span className={classes.CloseWrapper}>
              <CloseButton
                timesIcon
                onClick={() => navigate(location.pathname)}
              />
            </span>
          </div>
          <div className={classes.MainContent}>
            {notifications && notifications.length > 0 ? (
              unreadOnly ? (
                notifications.filter((notif) => !notif.viewed).length > 0 ? (
                  notifications
                    .filter((notif) => !notif.viewed)
                    .map((notif, index) => (
                      <Notification key={index} notification={notif} />
                    ))
                ) : (
                  <div className={classes.Empty}>
                    <span>{translate("No Unread Notifications.")}</span>
                  </div>
                )
              ) : (
                notifications.map((notif, index) => (
                  <Notification key={index} notification={notif} />
                ))
              )
            ) : (
              <div className={classes.Empty}>
                <span>{translate("No Notifications")}.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationsModal;
