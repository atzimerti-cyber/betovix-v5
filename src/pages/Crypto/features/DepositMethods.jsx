import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./DepositMethods.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { cryptoActions } from "../cryptoSlice";
import { translate } from "../../../utils/translations";
import MainButton from "../../../features/UI/Buttons/MainButton";

const DepositMethods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentType = useSelector((state) => state.crypto.selectedPaymentType);

  const navigateToDeposit = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("method");
    dispatch(cryptoActions.resetCurrency());
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
            <span>{translate("Return to Deposit menu")}</span>
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
            paymentType.Items.map(
              (method, index) =>
                method.Name !== "Active" && (
                  <div
                    key={method.Id}
                    className={[
                      classes.PaymentButtonContainer,
                      classes.CryptoCoin,
                    ].join(" ")}
                  >
                    <MainButton
                      color="transparent"
                      //   onClick={() => {
                      //     selectPaymentMethod(paymentMethod);
                      //     navigateToModal("cashier", "deposit", "fiat");
                      //   }}
                    >
                      {/* <img
                    src={paymentType.SubCateg?.Icon}
                    crossOrigin="anonymous"
                    loading="lazy"
                    alt={paymentType.SubCateg.Name}
                  /> */}
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

export default DepositMethods;
