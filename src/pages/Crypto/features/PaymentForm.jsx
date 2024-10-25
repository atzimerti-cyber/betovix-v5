import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./PaymentForm.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { cryptoActions } from "../cryptoSlice";
import { translate } from "../../../utils/translations";
import MainButton from "../../../features/UI/Buttons/MainButton";

import VisaIcon from "../../../assets/svgs/visa.svg?react";
import MastercardIcon from "../../../assets/svgs/mastercard.svg?react";
import OtherCardIcon from "../../../assets/svgs/othercards.svg?react";
import BankTransferIcon from "../../../assets/svgs/banktransfer.svg?react";

const PaymentForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const paymentType = useSelector((state) => state.crypto.selectedPaymentType);
  const paymentMethod = useSelector(
    (state) => state.crypto.selectedPaymentMethod
  );

  useEffect(() => {
    const initialFormData =
      typeof props.jsonString === "string"
        ? JSON.parse(props.jsonString)
        : props.jsonString || {};

    setFormData(initialFormData);
  }, [props.jsonString]);

  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? undefined : value, // Set to undefined if value is an empty string
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Process form data or send to backend
  };

  const renderInputField = (key, value) => {
    if (key === "currency") {
      return (
        <select
          name={key}
          value={value}
          onChange={handleChange}
          className={classes.Select}
        >
          <option value="">Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      );
    } else if (key === "payment_method") {
      return (
        <>
          {paymentMethod.Name === "Visa" && <VisaIcon height="60px" />}
          {paymentMethod.Name === "Mastercard" && (
            <MastercardIcon height="90px" />
          )}
          {paymentMethod.Name === "OtherCard" && (
            <OtherCardIcon height="100px" />
          )}
          {paymentMethod.Name === "BankTransferEU" && (
            <BankTransferIcon height="100px" />
          )}
          {paymentMethod.Name === "ApplePay" && (
            <input
              className={classes.SmallInput}
              readOnly
              type="text"
              name={key}
              value={paymentMethod.Name}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
            />
          )}
        </>
      );
    } else if (key === "payment_type") {
      return null;
    } else if (key === "amount") {
      return (
        <input
          className={classes.Input}
          type="number"
          name={key}
          onChange={handleChange}
          placeholder={`Enter ${key.replace(/_/g, " ")}`}
        />
      );
    } else {
      return (
        <input
          className={classes.Input}
          type="text"
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${key.replace(/_/g, " ")}`}
        />
      );
    }
  };

  const customOrder = [
    "payment_method",
    "payment_type",
    "currency",
    "amount",
    "customer_first_name",
    "customer_last_name",
    "customer_phone",
    "customer_email",
    "customer_country",
    "customer_city",
    "customer_address",
    "customer_post_code",
  ];

  return (
    <div className={classes.PaymentForm}>
      {formData && (
        <form onSubmit={handleSubmit} className={classes.InputsForm}>
          {Object.keys(formData)
            .sort((a, b) => {
              const indexA = customOrder.indexOf(a);
              const indexB = customOrder.indexOf(b);
              if (indexA === -1 && indexB === -1) return 0;
              if (indexA === -1) return 1;
              if (indexB === -1) return -1;
              return indexA - indexB;
            })
            .map((key) => (
              <div key={key} style={{ marginBottom: "10px", width: "50%" }}>
                {key !== "payment_type" && (
                  <label className={classes.Labels}>
                    {translate(
                      `${key
                        .replace(/customer/g, "")
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                        .trim()}`
                    )}
                    {key !== "payment_method" && " *"}
                  </label>
                )}

                {renderInputField(key, formData[key])}
              </div>
            ))}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              background: "#007bff",
              color: "#fff",
              border: "none",
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
