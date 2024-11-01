import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./FinalStageWithdraw.module.css";
import WithdrawPaymentForm from "./WithdrawPaymentForm";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { translate } from "../../../utils/translations";
import { cryptoActions } from "../cryptoSlice";

const FinalStageWithdraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentType = useSelector(
    (state) => state.crypto.selectedPaymentTypeWithdraw
  );
  const paymentMethod = useSelector(
    (state) => state.crypto.selectedPaymentMethodWithdraw
  );
  const withdrawRequestState = useSelector(
    (state) => state.crypto.withdrawRequestMessage
  );

  const navigateToWithdraw = () => {
    const searchParams = new URLSearchParams(location.search);
    if (paymentType.Methods.length <= 1) {
      searchParams.delete("stage");
    } else {
      searchParams.set("stage", "methods");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
    dispatch(cryptoActions.setSelectedPaymentMethodWithdraw(null));
    dispatch(cryptoActions.setWithdrawRequestMessage(null));
  };

  return (
    <>
      <div className={classes.ReturnContainer}>
        <div className={classes.ReturnButtonWrapper}>
          <DsButton color="transparent" onClick={navigateToWithdraw}>
            <AngleLeft2Icon />
            <span>{translate("Return to Withdraw Methods")}</span>
          </DsButton>
        </div>
        <div className={classes.ReturnEquivalent}>
          <span>$1.00 =&nbsp;</span>
          <CoinsIcon />
          <span>1.00</span>
        </div>
      </div>
      {withdrawRequestState !== true && withdrawRequestState !== false
        ? paymentType &&
          paymentMethod && (
            <div className={classes.PaymentFormContainer}>
              <WithdrawPaymentForm
                method={paymentMethod}
                provider={paymentType.Provider}
              />
            </div>
          )
        : withdrawRequestState === true
        ? "withdraw request was successfull"
        : "withdraw request failed. Please try again."}
    </>
  );
};

export default FinalStageWithdraw;
