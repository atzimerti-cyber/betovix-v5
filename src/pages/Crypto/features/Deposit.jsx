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
          {/* {crypto && uniqueCrypto && (
            <>
              <div
                className={classes.PaymentButtonContainer}
                style={{
                  background:
                    "linear-gradient(60deg, var(--db-gray-banner) 10%, #ffac0030 30%, #0b4a8e69 80%)",
                }}
              >
                <MainButton
                  color="transparent"
                  onClick={() => {
                    dispatch(cryptoActions.setSelectedCurrency(null));
                    navigateToModal("cashier", "deposit", "fiat");
                  }}
                >
                  <SEPA />
                  <h2>{translate("SEPA")}</h2>
                </MainButton>
              </div>
              <div
                className={classes.PaymentButtonContainer}
                style={{
                  background:
                    "linear-gradient(60deg, #eb001b40 0%, #ffac0075 50%, #1434cb57 95%)",
                }}
              >
                <MainButton
                  color="transparent"
                  onClick={() => {
                    dispatch(cryptoActions.setSelectedCurrency(null));
                    navigateToModal("cashier", "deposit", "fiat");
                  }}
                >
                  <Cards />
                  <h2>{translate("Cards")}</h2>
                </MainButton>
              </div>
              <div
                className={classes.PaymentButtonContainer}
                style={{
                  background:
                    "linear-gradient(60deg, transparent 0%, rgb(71 71 71 / 46%) 50%, rgb(191 191 191 / 25%) 95%)",
                }}
              >
                <MainButton
                  color="transparent"
                  onClick={() => {
                    dispatch(cryptoActions.setSelectedCurrency(null));
                    navigateToModal("cashier", "deposit", "fiat");
                  }}
                >
                  <APGP />
                  <h2>{translate("ApplePay/ GooglePay")}</h2>
                </MainButton>
              </div>

              {uniqueCrypto.map((item, index) => {
                if (item.id === "BEP-20") return null;

                return (
                  <div
                    key={item.Id}
                    ref={(el) => (containerRefs.current[index] = el)}
                    className={[
                      classes.PaymentButtonContainer,
                      classes.CryptoCoin,
                    ].join(" ")}
                  >
                    {item.available === false && (
                      <div className={classes.PaymentDisabledOverlay}>
                        <span>{translate("Temporarily unavailable")}</span>
                      </div>
                    )}
                    <MainButton
                      color="transparent"
                      onClick={() => {
                        selectCurrency(item);
                        navigateToModal("cashier", "deposit", "crypto");
                      }}
                      disabled={item.available === false}
                    >
                      <img
                        src={item.Logo}
                        crossOrigin="anonymous"
                        loading="lazy"
                        alt={item.Code}
                      />
                      <h2>{item.Name}</h2>
                      {item.Rate && (
                        <h3>
                          €
                          {item.Rate > 0.01
                            ? addThousandsSeparator(item.Rate)
                            : parseFloat(item.Rate.toFixed(6))}
                        </h3>
                      )}
                    </MainButton>
                  </div>
                );
              })}

              <div className={classes.PaymentButtonContainer}>
                <MainButton
                  color="transparent"
                  onClick={() => {
                    dispatch(cryptoActions.setSelectedCurrency(null));
                    navigateToModal("cashier", "deposit", "crypto");
                  }}
                >
                  <img
                    className={classes.AllCrypto}
                    src={allCrypto}
                    loading="lazy"
                    alt="All crypto"
                  />
                  <h2>{translate("All crypto coins/tokens")}</h2>
                </MainButton>
              </div>
            </>
          )} */}
          {paymentTypes &&
            paymentTypes.map((paymentType, index) => (
              <div
                key={index}
                // ref={(el) => (containerRefs.current[index] = el)}
                className={[
                  classes.PaymentButtonContainer,
                  classes.CryptoCoin,
                ].join(" ")}
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
                  <img
                    src={paymentType?.Icon}
                    crossOrigin="anonymous"
                    loading="lazy"
                    alt={paymentType.Name}
                  />
                  <h2>{paymentType.Name}</h2>
                </MainButton>
              </div>
            ))}
        </div>
      </div>

      {/* <div className={classes.DepositCryptoWrapper}>
        <DepositCrypto />
      </div> */}

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
