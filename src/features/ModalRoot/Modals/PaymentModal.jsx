import classes from "./PaymentModal.module.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyTfa } from "../../../pages/Login/loginAsyncActions";
import MainButton from "../../UI/Buttons/MainButton";
import TimesIcon from "../../../assets/svgs/times.svg?react";
import { translate } from "../../../utils/translations";
import {
  storageGetPaymentAddress,
  storageDeletePaymentAddress,
} from "../../../utils/storage";

const PaymentModal = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //   const iframeAddress = useSelector(
  //     (state) => state.userInfo.depositIframeAddress
  //   );

  const [pAddress, setPAddress] = useState(null);

  useEffect(() => {
    const iframeAddress = storageGetPaymentAddress();
    if (!iframeAddress) {
      if (props) props.onClose();
      return;
    } else {
      setPAddress(iframeAddress);
    }

    return () => {
      storageDeletePaymentAddress();
    };
  }, []);

  return (
    <div className={classes.PaymentModal}>
      <div className={classes.CloseButton} onClick={props.onClose}>
        <TimesIcon />
      </div>

      <div className={classes.PaymentCheck}>
        <div className={classes.PaymentHeader}>
          <h5>{translate("Deposit")}</h5>
        </div>
        <div className={classes.PaymentContent}>
          <iframe
            className={classes.DepositIframe}
            src={pAddress}
            allow="autoplay; clipboard-write; fullscreen"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
