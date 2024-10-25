import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./FinalStageDeposit.module.css";
import PaymentForm from "./PaymentForm";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { cryptoActions } from "../cryptoSlice";
import { translate } from "../../../utils/translations";
import MainButton from "../../../features/UI/Buttons/MainButton";

const FinalStageDeposit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentType = useSelector((state) => state.crypto.selectedPaymentType);
  const paymentMethod = useSelector(
    (state) => state.crypto.selectedPaymentMethod
  );

  const navigateToDeposit = () => {
    const searchParams = new URLSearchParams(location.search);
    if (paymentType.Items.length <= 2) {
      searchParams.delete("stage");
    } else {
      searchParams.set("stage", "methods");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <>
      <div className={classes.ReturnContainer}>
        <div className={classes.ReturnButtonWrapper}>
          <DsButton color="transparent" onClick={navigateToDeposit}>
            <AngleLeft2Icon />
            <span>{translate("Back")}</span>
          </DsButton>
        </div>
        <div className={classes.ReturnEquivalent}>
          <span>$1.00 =&nbsp;</span>
          <CoinsIcon />
          <span>1.00</span>
        </div>
      </div>
      {paymentType && paymentMethod && (
        <div className={classes.PaymentFormContainer}>
          <PaymentForm jsonString={paymentMethod.Value} />
        </div>
      )}
    </>
  );
};

export default FinalStageDeposit;
