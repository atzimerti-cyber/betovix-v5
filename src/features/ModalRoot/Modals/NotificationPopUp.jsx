import { useSelector } from "react-redux";
import classes from "./NotificationsModal.module.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CloseButton from "../../UI/Buttons/CloseButton";

const NotificationsModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const notification = useSelector(
    (state) => state.layout.selectedNotification
  );

  return (
    isMobile && (
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
            {props.notification && (
              <p>jkjkkkkkkkkkkkkkkvsbjddddddddddddddddddddddddddddddddd</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationsModal;
