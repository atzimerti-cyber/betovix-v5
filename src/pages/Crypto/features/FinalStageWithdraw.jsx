import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./FinalStageWithdraw.module.css";
import WithdrawPaymentForm from "./WithdrawPaymentForm";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import SuccessIcon from "../../../assets/svgs/successpayment.svg?react";
import ErrorIcon from "../../../assets/svgs/errorpayment.svg?react";
import { translate } from "../../../utils/translations";
import { cryptoActions } from "../cryptoSlice";
import { getWithrawalReqs } from "../cryptoAsyncActions";
import { siteCurrency } from "../../../utils/custom";

const FinalStageWithdraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const paymentType = useSelector(
    (state) => state.crypto.selectedPaymentTypeWithdraw
  );
  const paymentMethod = useSelector(
    (state) => state.crypto.selectedPaymentMethodWithdraw
  );
  const withdrawRequestState = useSelector(
    (state) => state.crypto.withdrawRequestMessage
  );
  const currency = useSelector((state) => state.app.siteCurrency);

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
    dispatch(cryptoActions.setWithdrawLimitMessage(null));
    dispatch(cryptoActions.setMethodMinAmount(null));
    dispatch(cryptoActions.setMethodMaxAmount(null));
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getWithrawalReqs(signal, 1, 10, "DateAdded_desc", ""));
  };

  const navigateToWithdrawalReqs = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("stage", "requests");
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getWithrawalReqs(signal, 1, 10, "DateAdded_desc", ""));
    navigate(`/?${searchParams.toString()}`);
    dispatch(cryptoActions.setSelectedPaymentMethodWithdraw(null));
    dispatch(cryptoActions.setWithdrawRequestMessage(null));
    dispatch(cryptoActions.setWithdrawLimitMessage(null));
    dispatch(cryptoActions.setMethodMinAmount(null));
    dispatch(cryptoActions.setMethodMaxAmount(null));
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

        <div className={classes.Balance}>
          <div className={classes.BalanceContainerLabel}>
            <h4>{translate("Balance Details")}</h4>
          </div>
          <div className={classes.BalanceContainer}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "white",
                fontWeight: "600",
                columnGap: "0.5rem",
              }}
            >
              <h4>
                {translate(`Total`)} {" : "}{" "}
              </h4>
              <CoinsIcon />
              {user ? user.Wallet.Balance : 0}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "white",
                fontWeight: "600",
                columnGap: "0.5rem",
              }}
            >
              <h4>
                {translate(`Available to Withdraw`)} {" : "}{" "}
              </h4>
              <CoinsIcon />
              {user.Wallet.Balance - user.Wallet.ReservedBalance}
            </div>
          </div>
          <div className={classes.BalanceInfo}>
            <div
              style={{
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                columnGap: "0.1rem",
              }}
            >
              <span>
                {translate(`Reserved Balance`)}
                {" = "}
              </span>
              <CoinsIcon height="11px" />
              <span>{user.Wallet.ReservedBalance}</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CoinsIcon height="10px" />
              <span>1.00 =&nbsp;</span>
              <span>1.00{siteCurrency(currency)}</span>
            </div>
          </div>
        </div>
      </div>
      {withdrawRequestState !== true && withdrawRequestState !== false ? (
        paymentType &&
        paymentMethod && (
          <div className={classes.PaymentFormContainer}>
            <WithdrawPaymentForm
              method={paymentMethod}
              provider={paymentType.Provider}
            />
          </div>
        )
      ) : withdrawRequestState === true ? (
        <div className={classes.Message}>
          <SuccessIcon />
          <span>
            {translate(`Withdrawal request was successfull`)}.
            <p
              onClick={() => navigateToWithdrawalReqs()}
              className={classes.GoToReqs}
            >
              <i>{translate(`Check your withdrawal requests here`)}.</i>
            </p>
          </span>
        </div>
      ) : (
        <div className={classes.Message}>
          <ErrorIcon />
          <span>
            {translate(`Withdrawal request failed. Please try again`)}.
          </span>
        </div>
      )}
    </>
  );
};

export default FinalStageWithdraw;
