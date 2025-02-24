import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Deposit.module.css";

import { cryptoActions } from "../cryptoSlice";
import DepositMethods from "./DepositMethods";
import FinalStageDeposit from "./FinalStageDeposit";

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

  return (
    <div className={elClasses.join(" ")}>
      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
          {paymentTypes &&
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
            ))}
        </div>
      </div>

      <div className={classes.DepositMethodsWrapper}>
        <DepositMethods />
      </div>

      <div className={classes.DepositFinalStageWrapper}>
        <FinalStageDeposit />
      </div>
    </div>
  );
};

export default Deposit;
