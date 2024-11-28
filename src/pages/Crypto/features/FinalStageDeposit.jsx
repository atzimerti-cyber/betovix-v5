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
import WarningIcon from "../../../assets/svgs/warning-yellow.svg?react";
import { cryptoActions } from "../cryptoSlice";

const FinalStageDeposit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "0.2rem",
              alignItems: "center",
            }}
          >
            <span>{translate(`Total Balance`)}:</span>
            <CoinsIcon />
            <span>{user?.Wallet.Balance}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "0.2rem",
              alignItems: "center",
            }}
          >
            <span>1.00&#8364; =</span> <CoinsIcon />
            <span>1.00</span>
          </div>
        </div>
      </div>
      {paymentType && paymentMethod && (
        <div className={classes.PaymentFormContainer}>
          <PaymentForm
            type={paymentType?.Name}
            method={paymentMethod}
            provider={paymentType.Provider}
            icon={paymentMethod?.Icon}
          />
        </div>
      )}
      {paymentType && depositAddress !== "" && (
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
                  size={150}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={depositAddress}
                  viewBox={`0 0 150 150`}
                />
              ) : (
                <div className={classes.LoadingAddress}>
                  <SpinnerIcon className={classes.Spinner} />
                </div>
              )}
            </div>
          </div>
          <div className={classes.Message}>
            <WarningIcon height="15px" />
            <span>
              {translate(
                `Please be advised that your transaction may take a while to complete. You will receive an email once it is completed.`
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalStageDeposit;
