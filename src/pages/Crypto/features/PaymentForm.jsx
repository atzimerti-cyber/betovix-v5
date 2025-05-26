import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { siteCurrency } from "../../../utils/custom";

import classes from "./PaymentForm.module.css";

import { translate } from "../../../utils/translations";
import config from "../../../config";

import { submitDepositForm } from "../cryptoAsyncActions";

import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import ErrorIcon from "../../../assets/svgs/errorpayment.svg?react";

const PaymentForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const limitMessage = useSelector(
    (state) => state.crypto.withdrawLimitMessage
  );
  const typeMinAmount = useSelector((state) => state.crypto.typeMinAmount);
  const typeMaxAmount = useSelector((state) => state.crypto.typeMaxAmount);
  const methodMinAmount = useSelector((state) => state.crypto.methodMinAmount);
  const methodMaxAmount = useSelector((state) => state.crypto.methodMaxAmount);
  const currency = useSelector((state) => state.app.siteCurrency);
  const buttonLoading = useSelector((state) => state.crypto.buttonLoading);
  const defaultCountry = useSelector((state) => state.app.defaultCountry);

  const [paymiFrame, setPaymiFrame] = useState(null);
  const [formData, setFormData] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const [siteCountry, setSiteCountry] = useState("");

  const debouncedFormData = useDebounce(formData, 300);

  const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Christmas Island", code: "CX" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo", code: "CG" },
    { name: "Congo, The Democratic Republic of the", code: "CD" },
    { name: "Cook Islands", code: "CK" },
    { name: "Costa Rica", code: "CR" },
    { name: "Cote D'Ivoire", code: "CI" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Ethiopia", code: "ET" },
    { name: "Falkland Islands (Malvinas)", code: "FK" },
    { name: "Faroe Islands", code: "FO" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "French Guiana", code: "GF" },
    { name: "French Polynesia", code: "PF" },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Gibraltar", code: "GI" },
    { name: "Greece", code: "EL" },
    { name: "Greenland", code: "GL" },
    { name: "Grenada", code: "GD" },
    { name: "Guadeloupe", code: "GP" },
    { name: "Guam", code: "GU" },
    { name: "Guatemala", code: "GT" },
    { name: "Guernsey", code: "GG" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Heard Island and Mcdonald Islands", code: "HM" },
    { name: "Holy See (Vatican City State)", code: "VA" },
    { name: "Honduras", code: "HN" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Isle of Man", code: "IM" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jersey", code: "JE" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Korea, Democratic People's Republic of", code: "KP" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Lao People's Democratic Republic", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libyan Arab Jamahiriya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Macao", code: "MO" },
    { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Martinique", code: "MQ" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mayotte", code: "YT" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia, Federated States of", code: "FM" },
    { name: "Moldova, Republic of", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montserrat", code: "MS" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Helena", code: "SH" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Pierre and Miquelon", code: "PM" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia and Montenegro", code: "CS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Georgia and the South Sandwich Islands", code: "GS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Svalbard and Jan Mayen", code: "SJ" },
    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania, United Republic of", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tokelau", code: "TK" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Turks and Caicos Islands", code: "TC" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "EN" },
    { name: "United States", code: "US" },
    { name: "United States Minor Outlying Islands", code: "UM" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Virgin Islands, British", code: "VG" },
    { name: "Virgin Islands, U.S.", code: "VI" },
    { name: "Wallis and Futuna", code: "WF" },
    { name: "Western Sahara", code: "EH" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];

  useEffect(() => {
    if (defaultCountry && defaultCountry !== "") {
      const countryCode = countries.find(
        (country) => country.name === defaultCountry
      )?.code;
      if (countryCode) {
        setSiteCountry(countryCode);
      }
    }
  }, [defaultCountry]);

  useEffect(() => {
    const allFieldsFilled = Object.values(debouncedFormData).every((value) => {
      return value !== "" && value !== undefined;
    });

    const validAmount =
      debouncedFormData.Amount == null || debouncedFormData.Amount > 0;

    const allFieldsValid = props.method.Fields.every((field) => {
      if (!field.Regex || !debouncedFormData[field.Name]) return true; // Skip if no regex or field is empty
      const regex = eval(`/${field.Regex}/`);
      return regex.test(debouncedFormData[field.Name]);
    });

    setDisabledButton(!(allFieldsFilled && validAmount && allFieldsValid));
  }, [debouncedFormData, props.method.Fields]);

  useEffect(() => {
    if (props.method && props.method.Fields) {
      const initialData = props.method.Fields.reduce((f, field) => {
        if (field.Deposit !== false) {
          // f[field.Name] = siteCountry ? siteCountry : "AF";
          if (field.Name === "Country" && field.DefaultValue) {
            f[field.Name] = siteCountry ? siteCountry : "";
            // f[field.Name] = field.DefaultValue;
          }
          else if (field.Name == "iframeUrl" && field.DefaultValue) {
            setPaymiFrame(field.DefaultValue);
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
  }, [props.method, siteCountry]);

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

    let cur = null;
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
      CustomerIdCode: debouncedFormData.IDCode,
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
    } else if (Type == "DateTime") {
      inputElement = (
        <div className={classes.InputWrapper}>
          <input
            className={classes.Input}
            type="date"
            name={Name}
            value={formData[Name] || ""}
            onChange={handleChange}
            placeholder={translate(
              `Enter ${Name.replace(/([a-z])([A-Z])/g, "$1 $2")}`
            )}
          />
        </div>
      );
    } else if (Type === "string" && ListValues.length === 0) {
      if (Name === "Country") {
        inputElement = (
          <select
            name={Name}
            className={classes.Select}
            value={formData.Country ? formData.Country : siteCountry}
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
          value={typeof formData[Name] === "object" ? Object.keys(formData[Name])[0] : formData[Name]}
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
          {/* {Name === "Amount" && (
            <p style={{ color: "lightblue", fontWeight: "300" }}>
              {"("}
              {translate(`Minimum amount`)}
              {": €"}
              {`${minAmount}`}
              {")"}
            </p>
          )} */}
        </label>
        {inputElement}
      </div>
    );
  };

  const setiFrame = (field) => {
    setPaymiFrame(field.DefaultValue);
  }

  return (
    <div className={classes.PaymentForm}>
      {paymiFrame &&
        <div className={classes.IFrameWrapper}>
          <iframe
            className={classes.paymIframe}
            src={paymiFrame}
            referrerPolicy="no-referrer"
            allow="autoplay; clipboard-write; fullscreen"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
      }
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
          <div className={classes.PaymentInfo}>
            {(methodMinAmount || typeMinAmount) && (
              <div className={classes.Info}>
                <p>
                  {translate(`Minimum amount`)}
                  {": "}
                  {siteCurrency(currency)}
                  {`${methodMinAmount || typeMinAmount}`}
                </p>
              </div>
            )}
            {(methodMaxAmount || typeMaxAmount) && (
              <div className={classes.Info}>
                <p>
                  {translate(`Maximum amount`)}
                  {": "}
                  {siteCurrency(currency)}
                  {`${methodMaxAmount || typeMaxAmount}`}
                </p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className={classes.InputsForm}>
            {props.method.Fields
              .filter((field) => field.Name !== "iframeUrl")
              .map((field) => renderInputField(field))}
            {!paymiFrame && (
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
            )}


            {buttonLoading && !paymiFrame ? null : (
              !paymiFrame &&
              < button
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
            )}

            {limitMessage && limitMessage !== "" && (
              <div className={classes.Message}>
                <ErrorIcon />
                <span>{translate(`${limitMessage}`)}</span>
              </div>
            )}
          </form>

        </>
      )
      }
    </div >
  );
};

export default PaymentForm;
