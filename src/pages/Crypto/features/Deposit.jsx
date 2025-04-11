import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { VouchstarBtn, VouchstarModal } from "react-vstar-websdk"; ////////////////////////
import VoucherModal from "./VoucherModal";

import classes from "./Deposit.module.css";

import { cryptoActions } from "../cryptoSlice";
import DepositMethods from "./DepositMethods";
import FinalStageDeposit from "./FinalStageDeposit";
import Vouchers from "./Vouchers";

// import VoucherIcon from "../../../assets/svgs/voucher.svg";
import VoucherIcon from "../../../assets/images/voucher.png";

import MainButton from "../../../features/UI/Buttons/MainButton";

import { translate } from "../../../utils/translations";

const Deposit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentTypes = useSelector((state) => state.crypto.DepositPaymentTypes);
  const query = new URLSearchParams(location.search);
  const stage = query.get("stage");

  let elClasses = [classes.PaymentVerticalWrapper];
  if (stage === "crypto") elClasses.push(classes.Crypto);
  else if (stage === "methods") elClasses.push(classes.Methods);
  else if (stage === "deposit") elClasses.push(classes.Deposit);
  else if (stage === "voucher") elClasses.push(classes.Voucher);

  useEffect(() => {
    if (!paymentTypes) return;

    if (paymentTypes.length === 1) {
      selectPaymentType(paymentTypes[0]);
      navigateToModal("cashier", "deposit", "methods");
    }

    return () => dispatch(cryptoActions.resetCurrency());
  }, [paymentTypes]);

  const selectPaymentType = (type) => {
    if (type.MinAmount) {
      dispatch(cryptoActions.setTypeMinAmount(type.MinAmount));
    }
    if (type.MaxAmount) {
      dispatch(cryptoActions.setTypeMaxAmount(type.MaxAmount));
    }
    dispatch(cryptoActions.setSelectedPaymentTypeDeposit(type));
  };

  const selectPaymentMethod = (type) => {
    dispatch(cryptoActions.setSelectedPaymentMethodDeposit(type.Methods[0]));
  };

  const navigateToModal = (modal, tab, stage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    if (stage) searchParams.set("stage", stage);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const vouchStarPayment = paymentTypes?.find(
    (payment) => payment.Provider === "VouchStar"
  );

  return (
    <div className={elClasses.join(" ")}>
      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
          {paymentTypes?.some(
            (payment) => payment.Provider === "VouchStar"
          ) && (
            <div
              className={classes.PaymentButtonContainer}
              style={{
                background: "var(--button-grad-op-mid)",
              }}
            >
              <MainButton
                color="transparent"
                onClick={() => {
                  navigateToModal("cashier", "deposit", "voucher");
                }}
              >
                <img
                  src={VoucherIcon}
                  loading="lazy"
                  alt="Voucher"
                  style={{ height: "65%", width: "auto" }}
                />
                <h2>{translate("Buy Deposit Voucher")}</h2>
              </MainButton>
            </div>
          )}

          {paymentTypes &&
            paymentTypes.length > 1 &&
            paymentTypes.map((paymentType, index) => {
              if (paymentType.Provider === "VouchStar") return null;

              return (
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
                      if (paymentType.Methods.length <= 1) {
                        selectPaymentType(paymentType);
                        selectPaymentMethod(paymentType);
                        navigateToModal("cashier", "deposit", "deposit");
                      } else {
                        selectPaymentType(paymentType);
                        navigateToModal("cashier", "deposit", "methods");
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
              );
            })}
        </div>
      </div>

      <div className={classes.DepositMethodsWrapper}>
        <DepositMethods />
      </div>

      <div className={classes.DepositFinalStageWrapper}>
        <FinalStageDeposit />
      </div>
      {vouchStarPayment && (
        <div className={classes.VoucherTab}>
          <Vouchers vouchers={vouchStarPayment} />
        </div>
      )}
    </div>
  );
};

export default Deposit;
