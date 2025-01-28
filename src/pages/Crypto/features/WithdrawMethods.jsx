import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./WithdrawMethods.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { cryptoActions } from "../cryptoSlice";
import { translate } from "../../../utils/translations";
import MainButton from "../../../features/UI/Buttons/MainButton";

const WithdrawMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentType = useSelector(
    (state) => state.crypto.selectedPaymentTypeWithdraw
  );

  const navigateToWithdraw = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("stage");
    dispatch(cryptoActions.resetCurrency());
    dispatch(cryptoActions.setTypeMinAmount(null));
    dispatch(cryptoActions.setTypeMaxAmount(null));
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (
      !paymentType ||
      paymentType.length === 0 ||
      Object.keys(paymentType).length === 0
    ) {
      navigateToWithdraw();
    }
  }, [paymentType]);

  const navigateToModal = (modal, tab, stage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    if (stage) searchParams.set("stage", stage);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const selectPaymentMethod = (method) => {
    if (method.MinAmount) {
      dispatch(cryptoActions.setMethodMinAmount(method.MinAmount));
    }
    if (method.MaxAmount) {
      dispatch(cryptoActions.setMethodMaxAmount(method.MaxAmount));
    }
    dispatch(cryptoActions.setSelectedPaymentMethodWithdraw(method));
  };

  return (
    <>
      <div className={classes.ReturnContainer}>
        <div className={classes.ReturnButtonWrapper}>
          <DsButton color="transparent" onClick={navigateToWithdraw}>
            <AngleLeft2Icon />
            <span>{translate("Return to Withdraw menu")}</span>
          </DsButton>
        </div>
        <div className={classes.ReturnEquivalent}>
          <span>$1.00 =&nbsp;</span>
          <CoinsIcon />
          <span>1.00</span>
        </div>
      </div>
      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
          {paymentType &&
            paymentType?.Methods.map(
              (method, index) =>
                method.Name !== "Active" && (
                  <div
                    key={method.Name}
                    className={[
                      classes.PaymentButtonContainer,
                      classes.CryptoCoin,
                    ].join(" ")}
                  >
                    <MainButton
                      color="transparent"
                      onClick={() => {
                        selectPaymentMethod(method);
                        navigateToModal("cashier", "withdraw", "withdraw");
                      }}
                    >
                      <div
                        className={classes.Image}
                        style={{
                          backgroundImage: `url("${method.Icon}")`,
                        }}
                      ></div>
                      <h2>{method.Name}</h2>
                    </MainButton>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default WithdrawMethods;
