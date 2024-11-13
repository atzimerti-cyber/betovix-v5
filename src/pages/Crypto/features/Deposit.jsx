import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./Deposit.module.css";
import { cryptoActions } from "../cryptoSlice";
import DepositCrypto from "./DepositCrypto";
import DepositMethods from "./DepositMethods";
import FinalStageDeposit from "./FinalStageDeposit";
import MainButton from "../../../features/UI/Buttons/MainButton";
import { addThousandsSeparator } from "../../../utils/custom";
import { translate } from "../../../utils/translations";

const Deposit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentTypes = useSelector((state) => state.crypto.DepositPaymentTypes);
  const crypto = useSelector((state) => state.crypto.crypto);
  const query = new URLSearchParams(location.search);
  const stage = query.get("stage");

  const containerRefs = useRef([]);

  let elClasses = [classes.PaymentVerticalWrapper];
  if (stage === "crypto") elClasses.push(classes.Crypto);
  else if (stage === "methods") elClasses.push(classes.Methods);
  else if (stage === "deposit") elClasses.push(classes.Deposit);

  useEffect(() => {
    return () => dispatch(cryptoActions.setSelectedCurrency(null));
  }, []);

  const selectCurrency = (option) => {
    dispatch(cryptoActions.setSelectedCurrency(option));
    const network = option.Code || option.label;
    dispatch(
      cryptoActions.setSelectedNetwork({ id: option.Id, label: network })
    );
  };

  const selectPaymentType = (type) => {
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

  //=============== REMOVE DUPLICATES ====================//
  const uniqueCrypto = [];
  const names = new Set();
  {
    crypto &&
      crypto.map((item) => {
        if (!names.has(item.Name)) {
          names.add(item.Name);
          if (item.AllowDeposit) {
            uniqueCrypto.push(item);
          }
        }
      });
  }

  //========== DOMINANT COLOR FOR BACKGROUND ============//
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

  return (
    <div className={elClasses.join(" ")}>
      <div className={classes.PaymentOptionsWrapper}>
        <div className={classes.Grid}>
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
                  <h2>{paymentType.Name}</h2>
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
