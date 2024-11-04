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
              <h4>{translate(`Total: `)} </h4>
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
              <h4>{translate(`Available to Withdraw: `)} </h4>
              <CoinsIcon />
              {user.Wallet.Balance - user.Wallet.ReservedBalance}
            </div>
          </div>
          <div className={classes.BalanceInfo}>
            <span style={{ textAlign: "start" }}>
              {translate(`Reserved Balance = ${user.Wallet.ReservedBalance}€`)}
            </span>
            {/* <span style={{ textAlign: "start" }}>
              {translate(
                `Available to Withdraw = €${
                  user.Wallet.Balance - user.Wallet.ReservedBalance
                }`
              )}
            </span> */}
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
              <span>1.00&#8364;</span>
            </div>
          </div>
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
