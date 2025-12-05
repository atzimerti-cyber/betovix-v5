import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./DepositMethods.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import { cryptoActions } from "../cryptoSlice";
import { translate } from "../../../utils/translations";
import MainButton from "../../../features/UI/Buttons/MainButton";

const DepositMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentTypes = useSelector((state) => state.crypto.DepositPaymentTypes);
    const selectedPaymentMethods = useSelector((state) => state.crypto.selectedPaymentMethods);
  const [methods, setMethods] = useState(null);

  const paymentType = useSelector(
    (state) => state.crypto.selectedPaymentTypeDeposit
  );

  useEffect(() => {
    if (
      !paymentType ||
      paymentType.length === 0 ||
      Object.keys(paymentType).length === 0
    ) {
      navigateToDeposit();
    } else if (paymentType.Provider === 'FairPay') {
      if(selectedPaymentMethods && selectedPaymentMethods.length > 0) setMethods(selectedPaymentMethods);
    } else {
      setMethods(paymentType.Methods);
    }
  }, [paymentType, selectedPaymentMethods]);

  const navigateToDeposit = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("stage");
    dispatch(cryptoActions.resetCurrency());
    dispatch(cryptoActions.setTypeMinAmount(null));
    dispatch(cryptoActions.setTypeMaxAmount(null));
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
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

  const selectPaymentMethod = (method) => {
    if (method.MinAmount) {
      dispatch(cryptoActions.setMethodMinAmount(method.MinAmount));
    }
    if (method.MaxAmount) {
      dispatch(cryptoActions.setMethodMaxAmount(method.MaxAmount));
    }
    dispatch(cryptoActions.setSelectedPaymentMethodDeposit(method));
  };

  return (
    <>
      {paymentTypes && paymentTypes.length > 1 && (
        <div className={classes.ReturnContainer}>
          <div className={classes.ReturnButtonWrapper}>
            <DsButton color="transparent" onClick={navigateToDeposit}>
              <AngleLeft2Icon />
              <span>{translate("Return to Deposit Menu")}</span>
            </DsButton>
          </div>
        </div>
      )}

      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
          {paymentType &&
            methods?.map(
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
                        navigateToModal("cashier", "deposit", "deposit");
                      }}
                    >
                      <div
                        className={classes.Image}
                        style={{
                          backgroundImage: `url("${method.Icon}")`,
                        }}
                      ></div>
                      <h2>{translate(`${method.Name}`)}</h2>
                    </MainButton>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default DepositMethods;
