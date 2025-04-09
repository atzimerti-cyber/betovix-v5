import classes from "./LoadBookedModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import LoadBooked from "../../Layout/features/LoadBooked";

const LoadBookedModal = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.LoadBooked}>
      <div className={classes.ModalContent}>
        <header>
          <span className={classes.Center}>
            <h1>{translate("Load Shared Betslip")}</h1>
          </span>
          <span className={classes.Right}>
            <CloseButton
              timesIcon
              color="transparent"
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </header>

        <div className={classes.LoadBookedContent}>
          <LoadBooked isModal={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadBookedModal;
