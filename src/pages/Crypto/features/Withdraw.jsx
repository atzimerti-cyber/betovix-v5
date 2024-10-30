import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Withdraw.module.css";
import { cryptoActions } from "../cryptoSlice";
import WithdrawCrypto from "./WithdrawCrypto";
import MainButton from "../../../features/UI/Buttons/MainButton";
import { addThousandsSeparator } from "../../../utils/custom";
import allCrypto from "../../../assets/svgs/withdrawreq.svg";
import { translate } from "../../../utils/translations";
import WithdrawMethods from "./WithdrawMethods";
import FinalStageWithdraw from "./FinalStageWithdraw";
import WithdrawRequests from "./WithdrawRequests";

const Withdraw = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const crypto = useSelector((state) => state.crypto.crypto);
  const paymentTypes = useSelector(
    (state) => state.crypto.WithdrawPaymentTypes
  );

  const query = new URLSearchParams(location.search);
  const stage = query.get("stage");

  const containerRefs = useRef([]);

  let elClasses = [classes.PaymentVerticalWrapper];
  if (stage === "crypto") elClasses.push(classes.Crypto);
  else if (stage === "methods") elClasses.push(classes.Methods);
  else if (stage === "withdraw") elClasses.push(classes.Withdraw);
  else if (stage === "requests") elClasses.push(classes.Requests);

  //================  DOMINANT COLOR FOR BACKGROUND ======================//
  useEffect(() => {
    containerRefs.current.forEach((ref, index) => {
      if (ref && ref.querySelector("img")) {
        const img = ref.querySelector("img");
        img.onload = () => {
          const dominantColor = getDominantColor(img);
          ref.style.backgroundImage = dominantColor;
        };
      }
    });
  }, [crypto]);

  function getDominantColor(imgElement) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    const isGrayscale =
      Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;

    if (isGrayscale) {
      r = 50;
      g = 87;
      b = 54;
    }

    return `linear-gradient(60deg, var(--db-gray-banner), rgba(${r},${g},${b},0.7))`;
  }

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
              border: "1px solid #a2bbd1a1",
              backgroundColor: "#b1d6eecc",
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
              <h2 style={{ color: "#0c2233" }}>
                {translate("Withdraw Requests")}
              </h2>
            </MainButton>
          </div>
          {paymentTypes &&
            paymentTypes.map((paymentType, index) => (
              <div
                key={index}
                // ref={(el) => (containerRefs.current[index] = el)}
                className={[
                  classes.PaymentButtonContainer,
                  classes.CryptoCoin,
                ].join(" ")}
                style={{ backgroundColor: "#113750" }}
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
                  {/* <img
                    src={paymentType?.Icon}
                    crossOrigin="anonymous"
                    loading="lazy"
                    alt={paymentType.Name}
                  /> */}
                  <div
                    className={classes.Image}
                    style={{
                      backgroundImage: `url("${paymentType.Icon}")`,
                    }}
                  ></div>
                  <h2>{paymentType.Name}</h2>
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
