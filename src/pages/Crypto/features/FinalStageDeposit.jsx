import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./FinalStageDeposit.module.css";
import PaymentForm from "./PaymentForm";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { translate } from "../../../utils/translations";
import CopyToClipboardCont from "../../../features/CopyToClipboard/CopyToClipboardCont";
import SpinnerIcon from "../../../assets/svgs/spinner.svg?react";
import { cryptoActions } from "../cryptoSlice";

const FinalStageDeposit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const depositAddress = useSelector((state) => state.crypto.depositAddress);
  const paymentType = useSelector(
    (state) => state.crypto.selectedPaymentTypeDeposit
  );
  const paymentMethod = useSelector(
    (state) => state.crypto.selectedPaymentMethodDeposit
  );

  const navigateToDeposit = () => {
    const searchParams = new URLSearchParams(location.search);
    if (paymentType.Methods.length <= 1) {
      searchParams.delete("stage");
    } else {
      searchParams.set("stage", "methods");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
    dispatch(cryptoActions.setDepositAddress(""));
  };

  return (
    <>
      <div className={classes.ReturnContainer}>
        <div className={classes.ReturnButtonWrapper}>
          <DsButton color="transparent" onClick={navigateToDeposit}>
            <AngleLeft2Icon />
            <span>{translate("Return to Deposit Methods")}</span>
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
          <PaymentForm
            type={paymentType?.Name}
            method={paymentMethod}
            provider={paymentType.Provider}
          />
        </div>
      )}
      {paymentType &&
        paymentType.Name === "Crypto" &&
        depositAddress !== "" && (
          <div className={classes.DepositAddressContainer}>
            <div className={classes.BtcAddressContainer}>
              <label htmlFor="container">
                {translate("Your")} {translate("deposit address")}
              </label>
              <CopyToClipboardCont text={depositAddress} />
            </div>
            <div className={classes.QrContainer}>
              <div className={classes.QrWrapper}>
                {depositAddress ? (
                  <QRCode
                    size={136}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={depositAddress}
                    viewBox={`0 0 136 136`}
                  />
                ) : (
                  <div className={classes.LoadingAddress}>
                    <SpinnerIcon className={classes.Spinner} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default FinalStageDeposit;
