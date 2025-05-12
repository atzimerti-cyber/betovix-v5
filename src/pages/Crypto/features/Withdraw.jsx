import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Withdraw.module.css";

import { cryptoActions } from "../cryptoSlice";

import WithdrawMethods from "./WithdrawMethods";
import FinalStageWithdraw from "./FinalStageWithdraw";
import WithdrawRequests from "./WithdrawRequests";

import allCrypto from "../../../assets/svgs/withdrawreq.svg";
import MainButton from "../../../features/UI/Buttons/MainButton";

import { translate } from "../../../utils/translations";
import { useEffect } from "react";

const Withdraw = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const paymentTypes = useSelector(
    (state) => state.crypto.WithdrawPaymentTypes
  );

  const query = new URLSearchParams(location.search);
  const stage = query.get("stage");

  let elClasses = [classes.PaymentVerticalWrapper];
  if (stage === "crypto") elClasses.push(classes.Crypto);
  else if (stage === "methods") elClasses.push(classes.Methods);
  else if (stage === "withdraw") elClasses.push(classes.Withdraw);
  else if (stage === "requests") elClasses.push(classes.Requests);

  useEffect(() => {
    if (!paymentTypes) return;

    if (paymentTypes.length === 1) {
      selectPaymentType(paymentTypes[0]);
      navigateToModal("cashier", "withdraw", "methods");
    }

    return () => dispatch(cryptoActions.resetCurrency());
  }, [paymentTypes]);

  const navigateToModal = (modal, tab, stage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    if (stage) searchParams.set("stage", stage);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const selectPaymentType = (type) => {
    if (type.MinAmount) {
      dispatch(cryptoActions.setTypeMinAmount(type.MinAmount));
    }
    if (type.MaxAmount) {
      dispatch(cryptoActions.setTypeMaxAmount(type.MaxAmount));
    }
    dispatch(cryptoActions.setSelectedPaymentTypeWithdraw(type));
  };
  const selectPaymentMethod = (type) => {
    dispatch(cryptoActions.setSelectedPaymentMethodWithdraw(type.Methods[0]));
  };

  return (
    <div className={elClasses.join(" ")}>
      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
          <div
            className={classes.PaymentButtonContainer}
            style={{
              border: "1px solid var(--card-odds-button)",
              backgroundColor: "var(--card-odds-button)",
            }}
          >
            <MainButton
              color="transparent"
              onClick={() => {
                navigateToModal("cashier", "withdraw", "requests");
              }}
            >
              <img
                className={classes.AllCrypto}
                src={allCrypto}
                loading="lazy"
                alt="All crypto"
              />
              <h2 style={{ color: "var(--darkcolor-op1)" }}>
                {translate("Withdrawal Requests")}
              </h2>
            </MainButton>
          </div>

          {paymentTypes &&
            paymentTypes.length > 1 &&
            paymentTypes.map((paymentType, index) => (
              <div
                key={index}
                className={[
                  classes.PaymentButtonContainer,
                  classes.CryptoCoin,
                ].join(" ")}
                style={{
                  background: "var(--button-grad-op-mid)",
                }}
              >
                <MainButton
                  color="transparent"
                  onClick={() => {
                    if (paymentType.Methods.length <= 2) {
                      selectPaymentType(paymentType);
                      selectPaymentMethod(paymentType);
                      navigateToModal("cashier", "withraw", "withdraw");
                    } else {
                      selectPaymentType(paymentType);
                      navigateToModal("cashier", "withdraw", "methods");
                    }
                  }}
                >
                  <div
                    className={classes.Image}
                    style={{
                      backgroundImage: `url("${paymentType.Icon}")`,
                    }}
                  ></div>
                  <h2>{translate(`${paymentType.Name}`)}</h2>
                </MainButton>
              </div>
            ))}
        </div>
      </div>

      <div className={classes.WithdrawMethodsWrapper}>
        <WithdrawMethods />
      </div>

      <div className={classes.WithdrawFinalStageWrapper}>
        <FinalStageWithdraw />
      </div>

      <div className={classes.WithdrawRequests}>
        <WithdrawRequests />
      </div>
    </div>
  );
};

export default Withdraw;
