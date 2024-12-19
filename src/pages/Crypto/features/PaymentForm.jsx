import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";

import classes from "./PaymentForm.module.css";

import { translate } from "../../../utils/translations";
import config from "../../../config";

import { submitDepositForm } from "../cryptoAsyncActions";
import Dropdown4 from "../../../features/UI/Dropdown/Dropdown4";

import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import ErrorIcon from "../../../assets/svgs/errorpayment.svg?react";

const PaymentForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const [formData, setFormData] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const depositAddress = useSelector((state) => state.crypto.depositAddress);
  const limitMessage = useSelector(
    (state) => state.crypto.withdrawLimitMessage
  );

  const debouncedFormData = useDebounce(formData, 300);

  useEffect(() => {
    const allFieldsFilled = Object.values(debouncedFormData).every((value) => {
      return value !== "" && value !== undefined;
    });

    const validAmount =
      debouncedFormData.Amount == null || debouncedFormData.Amount > 0;

    const allFieldsValid = props.method.Fields.every((field) => {
      if (!field.Regex || !debouncedFormData[field.Name]) return true; // Skip if no regex or field is empty
      const regex = eval(field.Regex);
      return regex.test(debouncedFormData[field.Name]);
    });

    setDisabledButton(!(allFieldsFilled && validAmount && allFieldsValid));
  }, [debouncedFormData, props.method.Fields]);

  useEffect(() => {
    if (props.method && props.method.Fields) {
      const initialData = props.method.Fields.reduce((f, field) => {
        // Only include fields where Deposit is true
        if (field.Deposit !== false) {
          f[field.Name] = "AF";
          if (field.Name === "Country" && field.DefaultValue) {
            f[field.Name] = field.DefaultValue;
          } else {
            const value =
              (field.DefaultValue !== "-" && field.DefaultValue) || "";
            try {
              f[field.Name] = JSON.parse(value);
            } catch (e) {
              f[field.Name] = value;
            }
          }
        }

        return f;
      }, {});
      setFormData(initialData);
    }
  }, [props.method]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      var result = "";
      if (name === "Network") {
        const selectedOption = e.target.selectedOptions[0];
        const data = selectedOption.getAttribute("data");
        result = JSON.parse(data);
      } else if (name === "Amount") {
        if (value === "" || value === undefined) {
          result = undefined;
        } else {
          result = parseFloat(value);
        }
      } else {
        result = value;
      }
      return { ...prevData, [name]: result };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cur = "";
    let net = undefined;
    if (debouncedFormData.Network) {
      cur = Object.values(debouncedFormData.Network)[0];
      net = Object.keys(debouncedFormData.Network)[0];
    } else if (debouncedFormData.Currency) {
      cur = debouncedFormData.Currency;
    }

    const depositDTO = {
      Currency: cur,
      Network: net,
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
    };
    console.log(debouncedFormData);
    console.log(depositDTO);

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(submitDepositForm(signal, depositDTO));
  };

  const renderInputField = (field) => {
    const { Name, Type, ListValues, Deposit, Visible } = field;
    if (Deposit === false || !Visible) return null;

    let inputElement = null;

    // Set up the input element based on the field's Type and properties
    if (Type === "decimal" && Name === "Amount") {
      inputElement = (
        <div className={classes.InputWrapper}>
          <CoinsIcon height="18px" width="17px" className={classes.SvgIcon} />
          <input
            className={classes.Input}
            type="number"
            step="0.1"
            min="0.1"
            name={Name}
            value={formData[Name] || ""}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "-" && e.preventDefault()}
            placeholder={translate(
              `Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`
            )}
            style={{ paddingLeft: "2rem" }}
          />
        </div>
      );
    } else if (Type === "string" && ListValues.length === 0) {
      if (Name === "Country") {
        inputElement = (
          <select
            name={Name}
            className={classes.Select}
            value={formData[Name]}
            onChange={handleChange}
          >
            <option value="AF">Afghanistan</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BR">Brazil</option>
            <option value="BN">Brunei</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo (Brazzaville)</option>
            <option value="CD">Congo (Kinshasa)</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="SZ">Eswatini</option>
            <option value="ET">Ethiopia</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GR">Greece</option>
            <option value="GD">Grenada</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HN">Honduras</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Laos</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia</option>
            <option value="MD">Moldova</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="QA">Qatar</option>
            <option value="RO">Romania</option>
            <option value="RU">Russia</option>
            <option value="RW">Rwanda</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syria</option>
            <option value="TW">Taiwan</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnam</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </select>
        );
      } else if (Name === "Phone") {
        inputElement = (
          <input
            className={
              Name === "PaymentType" || Name === "PaymentMethod"
                ? [classes.Input, classes.ReadOnly].join(" ")
                : classes.Input
            }
            type="number"
            name={Name}
            value={formData[Name] || ""}
            onChange={handleChange}
            placeholder={translate(
              `Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`
            )}
            readOnly={Name === "PaymentType" || Name === "PaymentMethod"}
            onInput={(e) => {
              // Remove any non-numeric characters from the input
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        );
      } else {
        inputElement = (
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
            placeholder={translate(
              `Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`
            )}
            readOnly={Name === "PaymentType" || Name === "PaymentMethod"}
          />
        );
      }
    } else if (
      (Type === "string" || Type === "list") &&
      ListValues.length > 0
    ) {
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
              <option
                className={classes.SelectOptions}
                key={index}
                value={key}
                data={JSON.stringify(item)}
              >
                {key}
              </option>
            );
          })}
        </select>
      );
    }

    // Return the final structure with the label and input element
    return (
      <div
        key={Name}
        style={{
          marginBottom: "10px",
          width: Name === "CardNumber" ? "100%" : "50%",
        }}
      >
        <label className={classes.Labels}>
          {translate(Name.replace(/([a-z])([A-Z])/g, "$1 $2"))}
          {Name !== "PaymentType" && Name !== "PaymentMethod" && (
            <p style={{ color: "var(--brand-green)" }}>*</p>
          )}
          {Name === "Amount" && (
            <p style={{ color: "lightblue", fontWeight: "300" }}>
              {translate(`(Minimum amount: €20)`)}
            </p>
          )}
        </label>
        {inputElement}
      </div>
    );
  };

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
                <p style={{ color: "var(--brand-green)" }}>*</p>
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
              {props.type === "Crypto" ? "Get Deposit Address" : "Submit"}
            </button>
            {limitMessage && limitMessage !== "" && (
              <div className={classes.Message}>
                <ErrorIcon />
                <span>{translate(`${limitMessage}`)}</span>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
