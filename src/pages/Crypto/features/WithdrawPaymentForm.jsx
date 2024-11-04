import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";

import classes from "./WithdrawPaymentForm.module.css";

import { translate } from "../../../utils/translations";
import config from "../../../config";

import { submitWithdrawForm } from "../cryptoAsyncActions";
import CreditCard from "../../../assets/svgs/credit-card.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";

const WithdrawPaymentForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const [formData, setFormData] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);

  const debouncedFormData = useDebounce(formData, 300);

  useEffect(() => {
    const allFieldsFilled = Object.values(debouncedFormData).every(
      (value) => value !== "" && value !== undefined
    );

    const validAmount =
      debouncedFormData.Amount == null || debouncedFormData.Amount > 0;

    const allFieldsValid = props.method.Fields.every((field) => {
      if (!field.Regex || !debouncedFormData[field.Name]) return true;
      const regex = new RegExp(field.Regex);
      return regex.test(debouncedFormData[field.Name]);
    });

    setDisabledButton(!(allFieldsFilled && validAmount && allFieldsValid));
  }, [debouncedFormData, props.method.Fields]);

  useEffect(() => {
    if (props.method && props.method.Fields) {
      const initialData = props.method.Fields.reduce((f, field) => {
        if (field.Withdraw !== false) {
          const value =
            (field.DefaultValue !== "-" && field.DefaultValue) || "";
          try {
            f[field.Name] = JSON.parse(value);
          } catch (e) {
            f[field.Name] = value;
          }
        }
        return f;
      }, {});
      setFormData(initialData);
    }
  }, [props.method]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Format CardNumber input
    if (name === "CardNumber") {
      updatedValue = formatCardNumber(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "Amount"
          ? parseFloat(updatedValue) || undefined
          : updatedValue === ""
          ? undefined
          : updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const withdrawDTO = {
      Currency:
        debouncedFormData.Currency ||
        (debouncedFormData.Network &&
          Object.values(debouncedFormData.Network).join(", ")),
      Network:
        debouncedFormData.Network &&
        Object.keys(debouncedFormData.Network).join(", "),
      Amount: debouncedFormData.Amount,
      PaymentType: debouncedFormData.PaymentType,
      PaymentMethod: debouncedFormData.PaymentMethod,
      PaymentProvider: props.provider,
      SiteId: `${config.VITE_SITE_ID}`,
      CustomerFirstName: debouncedFormData.FirstName,
      CustomerLastName: debouncedFormData.LastName,
      CustomerPhone: debouncedFormData.Phone,
      CustomerEmail: debouncedFormData.Email,
      CustomerCountry: debouncedFormData.Country,
      CustomerCity: debouncedFormData.City,
      CustomerAddress: debouncedFormData.WalletAddress
        ? debouncedFormData.WalletAddress
        : debouncedFormData.Address,
      CustomerPostCode: debouncedFormData.PostCode,
      CardNumber: debouncedFormData.CardNumber.replace(/\s+/g, ""),
    };
    console.log(debouncedFormData);
    console.log(withdrawDTO);

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(submitWithdrawForm(signal, withdrawDTO));
  };

  const renderInputField = (field) => {
    const { Name, Type, ListValues, Withdraw, Visible } = field;

    if (!Withdraw || !Visible) return null;

    let inputElement;

    if (Type === "decimal" && Name === "Amount") {
      inputElement = (
        <div className={classes.InputWrapper}>
          <CoinsIcon height="18px" width="17px" className={classes.SvgIcon} />
          <input
            className={classes.SmallInput}
            type="number"
            step="0.1"
            min="0.1"
            name={Name}
            value={formData[Name] || ""}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "-" && e.preventDefault()}
            placeholder={`Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`}
            style={{ paddingLeft: "2rem" }}
          />
        </div>
      );
    } else if (Type === "string") {
      const isReadOnly = false;
      const CardNumber = Name === "CardNumber";
      if (Name === "CardNumber") {
        inputElement = (
          <>
            <div className={classes.InputWrapper}>
              <CreditCard
                height="18px"
                width="27px"
                className={classes.SvgIcon}
              />
              <input
                className={classes.BigInput}
                type="text"
                name={Name}
                value={formData[Name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${Name.replace(
                  /([a-z])([A-Z])/g,
                  "$1 $2"
                )}`}
                readOnly={isReadOnly}
                autoComplete="false"
                style={{ paddingLeft: "2.6rem" }}
              />
            </div>
            {Name === "CardNumber" && (
              <p
                style={{
                  marginTop: "3px",
                  marginLeft: "1px",
                  display: "flex",
                  columnGap: " 0.3rem",
                  color: "lightblue",
                  fontSize: "0.75rem",
                  alignSelf: "flex-start",
                }}
              >
                {translate(
                  `Please note: Your credit card information will NOT be stored or retained for future use.`
                )}
              </p>
            )}
          </>
        );
      } else {
        inputElement = (
          <input
            className={`${classes.Input}`}
            type="text"
            name={Name}
            value={formData[Name] || ""}
            onChange={handleChange}
            placeholder={`Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`}
            readOnly={isReadOnly}
          />
        );
      }
    } else if (Type === "list" && ListValues.length > 0) {
      inputElement = (
        <select
          name={Name}
          id={Name}
          className={classes.Select}
          onChange={handleChange}
          value={formData[Name]}
        >
          {ListValues.map((item, index) => {
            const key = Object.keys(item)[0];
            return (
              <option className={classes.SelectOptions} key={index} value={key}>
                {key}
              </option>
            );
          })}
        </select>
      );
    } else {
      return null;
    }

    return (
      <div
        key={Name}
        style={{
          marginBottom: "10px",
          width: Name === "CardNumber" || Name === "Amount" ? "100%" : "50%",
        }}
      >
        <label className={classes.Labels}>
          {translate(Name.replace(/([a-z])([A-Z])/g, "$1 $2"))}
          {Name !== "PaymentType" && Name !== "PaymentMethod" && (
            <p style={{ color: "var(--db-brand-green)" }}>*</p>
          )}
        </label>
        {inputElement}
      </div>
    );
  };

  function formatCardNumber(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  return (
    <div className={classes.PaymentForm}>
      {props.method && props.method.Fields && (
        <>
          {props.icon != null && props.icon !== "" && (
            <div
              className={classes.Image}
              style={{
                backgroundImage: `url("${props.icon}")`,
                width: "50%",
              }}
            ></div>
          )}
          <form onSubmit={handleSubmit} className={classes.InputsForm}>
            {props.method.Fields.map((field) => renderInputField(field))}
            <div className={classes.Text}>
              <span
                style={{
                  display: "flex",
                  columnGap: " 0.3rem",
                  color: " white",
                  fontSize: "0.7rem",
                }}
              >
                <p style={{ color: "var(--db-brand-green)" }}>*</p>
                {translate("Required Fields")}
              </span>
            </div>
            <button
              type="submit"
              className={
                disabledButton
                  ? [classes.SubmitButton, classes.Disabled].join(" ")
                  : classes.SubmitButton
              }
              disabled={disabledButton}
            >
              Make Withdraw Request
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default WithdrawPaymentForm;
