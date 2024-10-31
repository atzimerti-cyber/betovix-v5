import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";

import classes from "./PaymentForm.module.css";

import { translate } from "../../../utils/translations";
import config from "../../../config";

import { getDepositAddress, submitPaymentForm } from "../cryptoAsyncActions";
import Dropdown4 from "../../../features/UI/Dropdown/Dropdown4";

const PaymentForm = (props) => {
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

    if (allFieldsFilled === true && validAmount === true) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [debouncedFormData]);

  useEffect(() => {
    if (props.method && props.method.Fields) {
      const initialData = props.method.Fields.reduce((f, field) => {
        const value = (field.DefaultValue !== "-" && field.DefaultValue) || "";
        try {
          f[field.Name] = JSON.parse(value);
        } catch (e) {
          f[field.Name] = value;
        }
        return f;
      }, {});
      setFormData(initialData);
    }
  }, [props.method]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "Amount"
          ? parseFloat(value) || undefined
          : value === ""
          ? undefined
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const depositDTO = {
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
      CustomerAddress: debouncedFormData.Address,
      CustomerPostCode: debouncedFormData.PostCode,
    };
    console.log(debouncedFormData);
    console.log(depositDTO);

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(submitPaymentForm(signal, depositDTO));
  };

  const renderInputField = (field) => {
    const { Name, Type, ListValues } = field;

    if (Type === "decimal") {
      return (
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
        />
      );
    } else if (Type === "string" && ListValues.length === 0) {
      return (
        <input
          className={
            Name === "PaymentType" || Name === "PaymentMethod"
              ? [classes.Input, classes.ReadOnly].join(" ")
              : classes.Input
          }
          type="text"
          name={Name}
          value={formData[Name] || ""}
          onChange={handleChange}
          placeholder={`Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`}
          readOnly={
            (Name === "PaymentType" || Name === "PaymentMethod") && true
          }
        />
      );
    } else if (
      (Type === "string" || Type === "list") &&
      ListValues.length > 0
    ) {
      return (
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
    }
  };

  return (
    <div className={classes.PaymentForm}>
      {props.method && props.method.Fields && (
        <form onSubmit={handleSubmit} className={classes.InputsForm}>
          {props.method.Fields.map(
            (field, index) =>
              field.Visible && (
                <div key={index} style={{ marginBottom: "10px", width: "50%" }}>
                  <label className={classes.Labels}>
                    {translate(field.Name.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                    {field.Name !== "PaymentType" &&
                      field.Name !== "PaymentMethod" && (
                        <p style={{ color: "var(--db-brand-green)" }}>*</p>
                      )}
                  </label>
                  {renderInputField(field)}
                </div>
              )
          )}
          <button
            type="submit"
            className={
              disabledButton
                ? [classes.SubmitButton, classes.Disabled].join(" ")
                : classes.SubmitButton
            }
            disabled={disabledButton}
          >
            {props.type === "Crypto" ? "Get Deposit Address" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
