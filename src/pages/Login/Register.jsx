import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// import PhoneInput from "react-phone-input-2";
import PhoneInput from "react-phone-number-input";

import classes from "./Login.module.css";

import MainInput from "../../features/UI/Inputs/MainInput";
import MainButton from "../../features/UI/Buttons/MainButton";
import useDebounce from "../../hooks/useDebounce";
import Autoheight from "../../features/UI/Autoheight/Autoheight";
import EyeIcon from "../../assets/svgs/eye.svg?react";
import Times2Icon from "../../assets/svgs/times2.svg?react";
import CheckIcon from "../../assets/svgs/check.svg?react";
import { register } from "./loginAsyncActions";
import { translate } from "../../utils/translations";
import { affiliateCampaigns } from "./loginAsyncActions";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loginActions } from "../../pages/Login/loginSlice";
import { Link } from "react-router-dom";
import config from "../../config";
import AlternativeMethods from "./features/AlternativeMethods";
import AngleLeftIcon from "../../assets/svgs/angle-left.svg?react";
import { isMoreThan14DaysOld } from "../../utils/custom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const mobileImg = useMediaQuery({ query: "(max-width: 768px)" });

  const [registerStage, setRegisterStage] = useState(1);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const registerPromoImg = useSelector((state) => state.app.registerPromoImg);
  const registerPromoImgMobile = useSelector(
    (state) => state.app.registerPromoImgMobile
  );
  const cookiesSettings = useSelector(
    (state) => state.app.siteSettings.Cookies
  );
  const settings = useSelector((state) => state.app.settings);
  const loginLoading = useSelector((state) => state.login.loginLoading);
  const strongPassword = useSelector((state) => state.login.strongPassword);
  const idRequired = useSelector((state) => state.login.idRequired);
  const defaultCountry = useSelector((state) => state.app.defaultCountry);

  const [isOver18, setIsOver18] = useState(false);
  const [siteCountry, setSiteCountry] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

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
    if (cookiesSettings === "false") {
      setIsTermsAccepted(true);
    }
  }, [cookiesSettings]);

  useEffect(() => {
    if (defaultCountry && defaultCountry !== "") {
      const countryCode = countries.find(
        (country) => country.name === defaultCountry
      )?.code;
      setSiteCountry(countryCode);
    } else {
      setSiteCountry("AF");
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let value = searchParams.get("code");
    if (!value) {
      value = localStorage.getItem("AffiliateCode");
      const date = localStorage.getItem("AffiliateCodeDate");
      const isMore = isMoreThan14DaysOld(date);
      if (isMore) {
        localStorage.removeItem("AffilliateCode");
        localStorage.removeItem("AffilliateCodeDate");
      }
    }
    if (value) {
      localStorage.setItem("AffiliateCode", value);
      localStorage.setItem("AffiliateCodeDate", new Date().toISOString());

      dispatch(loginActions.logout());

      updateRegisterInfo("code", value);
      dispatch(affiliateCampaigns(value));
    }
  }, []);

  const [registerInfo, setRegisterInfo] = useState({
    displayName: null,
    email: null,
    password: null,
    verifyPassword: null,
    code: null,
    country: "",
    idCode: idRequired ? null : "true",
    firstName: idRequired ? null : "true",
    lastName: idRequired ? null : "true",
    birthDate: idRequired ? null : "true",
    phoneNumber: idRequired ? null : "true",
  });

  const debDisplayName = useDebounce(registerInfo.displayName);
  const debEmail = useDebounce(registerInfo.email);
  const debPassword = useDebounce(registerInfo.password);
  const debVerifyPassword = useDebounce(registerInfo.verifyPassword);
  const debFirstName = useDebounce(registerInfo.firstName);
  const debLastName = useDebounce(registerInfo.lastName);
  const debBirthDate = useDebounce(registerInfo.birthDate);
  const debPhoneNumber = useDebounce(registerInfo.phoneNumber);
  const debIDCode = useDebounce(registerInfo.idCode);
  const debCode = useDebounce(registerInfo.code);

  const [validChecks, setValidChecks] = useState({
    displayName: true,
    email: true,
    password: {
      valid: true,
      show: false,
      minSize: true,
      numbers: true,
      special: true,
      cases: true,
    },
    verifyPassword: null,
    code: true,
    idCode: true,
    firstName: true,
    lastName: true,
    birthDate: true,
    phoneNumber: true,
  });

  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);

  const updateRegisterInfo = (property, value) => {
    if (property === "email" || property === "password") value = value.trim();

    setRegisterInfo({ ...registerInfo, [property]: value });
  };

  useEffect(() => {
    if (!debDisplayName) return;

    if (
      debDisplayName.trim().length > 0 &&
      debDisplayName.trim().length < settings.usernameMinLength
    )
      setValidChecks({ ...validChecks, displayName: false });
    else setValidChecks({ ...validChecks, displayName: true });
  }, [debDisplayName]);

  useEffect(() => {
    if (idRequired && !debFirstName) return;

    if (idRequired) {
      if (debFirstName.trim().length > 0)
        setValidChecks({ ...validChecks, firstName: true });
      else setValidChecks({ ...validChecks, firstName: false });
    }
    // else {
    //   setRegisterInfo({ ...registerInfo, firstName: true });
    //   setValidChecks({ ...validChecks, firstName: true });
    // }
  }, [debFirstName]);

  useEffect(() => {
    if (idRequired && !debLastName) return;

    if (idRequired) {
      if (debLastName.trim().length > 0)
        setValidChecks({ ...validChecks, lastName: true });
      else setValidChecks({ ...validChecks, lastName: false });
    }
    // else {
    //   setRegisterInfo({ ...registerInfo, lastName: true });
    //   setValidChecks({ ...validChecks, lastName: true });
    // }
  }, [debLastName]);

  useEffect(() => {
    if (idRequired && !debBirthDate) return;

    if (idRequired) {
      if (debBirthDate.trim().length > 0)
        setValidChecks({ ...validChecks, birthDate: true });
      else setValidChecks({ ...validChecks, birthDate: false });
    }
    // else {
    //   setRegisterInfo({ ...registerInfo, birthDate: true });
    //   setValidChecks({ ...validChecks, birthDate: true });
    // }
  }, [debBirthDate]);

  useEffect(() => {
    if (idRequired && !debPhoneNumber) return;

    if (idRequired) {
      if (debPhoneNumber.trim().length > 0)
        setValidChecks({ ...validChecks, phoneNumber: true });
      else setValidChecks({ ...validChecks, phoneNumber: false });
    }
    // else {
    //   setRegisterInfo({ ...registerInfo, phoneNumber: true });
    //   setValidChecks({ ...validChecks, phoneNumber: true });
    // }
  }, [debPhoneNumber]);

  useEffect(() => {
    if (!debEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(debEmail);

    if (debEmail.length > 0 && !isValid)
      setValidChecks({ ...validChecks, email: false });
    else setValidChecks({ ...validChecks, email: true });
  }, [debEmail]);

  useEffect(() => {
    if (idRequired && !debIDCode) return;

    if (idRequired) {
      const hasNumber = /\d/.test(debIDCode);
      const hasNonSpaceChar = debIDCode.replace(/\s/g, "").length > 0;

      if (debIDCode.length > 0 && hasNumber && hasNonSpaceChar) {
        setValidChecks({ ...validChecks, idCode: true });
      } else {
        setValidChecks({ ...validChecks, idCode: false });
      }
    }
    // else {
    //   setRegisterInfo({ ...registerInfo, idCode: true });
    //   setValidChecks({ ...validChecks, idCode: true });
    // }
  }, [debIDCode]);

  useEffect(() => {
    if (!debPassword) return;

    let validMinSize = debPassword.length >= settings.passwordMinLength;

    const hasUppercase = /[A-Z]/.test(debPassword);
    const hasLowercase = /[a-z]/.test(debPassword);
    const validCases = hasUppercase && hasLowercase;

    const validNumbers = /\d/.test(debPassword);

    const specialCharRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const validSpecial = specialCharRegex.test(debPassword);

    let isValid;
    if (strongPassword) {
      isValid = validMinSize && validCases && validNumbers && validSpecial;
    } else if (!strongPassword || strongPassword === "false") {
      isValid = debPassword.length >= 3;
      validMinSize = debPassword.length >= 3;
    }

    // Functional update to avoid stale state
    setValidChecks((prevValidChecks) => ({
      ...prevValidChecks,
      password: {
        valid: isValid,
        show: prevValidChecks.password.show,
        minSize: validMinSize,
        numbers: validNumbers,
        special: validSpecial,
        cases: validCases,
      },
    }));
  }, [debPassword, settings.passwordMinLength]);

  useEffect(() => {
    if (!debPassword || !debVerifyPassword) return;

    const isMatching = debPassword === debVerifyPassword;
    setValidChecks((prevValidChecks) => ({
      ...prevValidChecks,
      verifyPassword: isMatching,
    }));
  }, [debPassword, debVerifyPassword]);

  useEffect(() => {
    if (
      registerInfo.displayName &&
      registerInfo.email &&
      registerInfo.password &&
      registerInfo.verifyPassword &&
      registerInfo.country &&
      registerInfo.idCode &&
      registerInfo.firstName &&
      registerInfo.lastName &&
      registerInfo.phoneNumber &&
      registerInfo.birthDate &&
      validChecks.displayName &&
      validChecks.email &&
      validChecks.password.valid &&
      validChecks.verifyPassword &&
      validChecks.idCode &&
      validChecks.firstName &&
      validChecks.lastName &&
      validChecks.phoneNumber &&
      validChecks.birthDate &&
      isOver18 &&
      isTermsAccepted
    )
      setIsRegisterDisabled(false);
    else setIsRegisterDisabled(true);
  }, [
    registerInfo.displayName,
    registerInfo.email,
    registerInfo.country,
    registerInfo.password,
    registerInfo.verifyPassword,
    registerInfo.idCode,
    registerInfo.firstName,
    registerInfo.lastName,
    registerInfo.phoneNumber,
    registerInfo.birthDate,
    validChecks.displayName,
    validChecks.email,
    validChecks.password.valid,
    validChecks.verifyPassword,
    validChecks.idCode,
    validChecks.firstName,
    validChecks.lastName,
    validChecks.phoneNumber,
    validChecks.birthDate,
    isOver18,
    isTermsAccepted,
  ]);

  const onTogglePassword = () => {
    const updated = {
      ...validChecks,
      password: {
        ...validChecks.password,
        show: !validChecks.password.show,
      },
    };
    setValidChecks(updated);
  };

  const handleNextStep = () => {
    if (
      registerInfo.displayName &&
      validChecks.displayName &&
      validChecks.email &&
      validChecks.password.valid &&
      validChecks.verifyPassword
    ) {
      setRegisterStage(2);
    }
  };

  const handleBack = () => {
    if (registerStage === 2) setRegisterStage(1);
  };

  const changeTab = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", "auth");
    searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className={classes.RegisterContainer}>
      <div className={classes.PromoContainer}>
        <div
          className={classes.ImageContainer}
          style={{
            backgroundImage: mobileImg
              ? `url(${registerPromoImgMobile})`
              : `url(${registerPromoImg})`,
          }}
        ></div>
      </div>
      <form className={classes.Form} autoComplete="off">
        {registerStage === 1 && (
          <div className={classes.StepOne}>
            <div
              className={classes.Title}
              style={{
                marginBottom: "0.6rem",
                textWrap: "wrap",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "0.4rem",
              }}
            >
              {translate(`Create your account`)}!
            </div>
            <label htmlFor="displayName">
              {translate("Username")}
              <span
                className={
                  debDisplayName && validChecks.displayName
                    ? [classes.Required, classes.Fulfilled].join(" ")
                    : classes.Required
                }
              >
                ∗
              </span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                required
                role="textbox"
                type="text"
                id="displayName"
                name="displayName"
                placeholder={translate("Type your display name")}
                value={registerInfo.displayName}
                onChange={(value) => updateRegisterInfo("displayName", value)}
                noAutoComplete
                isInvalid={!validChecks.displayName}
              />
              <div className={classes.FormValidationMessage}>
                <Autoheight show={!validChecks.displayName}>{`${translate(
                  "Username needs to be at least"
                )} ${settings.usernameMinLength} ${translate(
                  "characters long"
                )}`}</Autoheight>
              </div>
            </div>

            <label htmlFor="email">
              {translate("Email")}
              <span
                className={
                  debEmail && validChecks.email
                    ? [classes.Required, classes.Fulfilled].join(" ")
                    : classes.Required
                }
              >
                ∗
              </span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                required
                role="textbox"
                type="text"
                id="email"
                name="email"
                placeholder={translate("Type your Email")}
                value={registerInfo.email}
                onChange={(value) => updateRegisterInfo("email", value)}
                noAutoComplete
                isInvalid={!validChecks.email}
              />
              <div className={classes.FormValidationMessage}>
                <Autoheight show={!validChecks.email}>
                  {translate("Please enter a valid email address")}
                </Autoheight>
              </div>
            </div>

            <label htmlFor="password">
              {translate("Password")}
              <span
                className={
                  debPassword && validChecks.password
                    ? [classes.Required, classes.Fulfilled].join(" ")
                    : classes.Required
                }
              >
                ∗
              </span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type={validChecks.password.show ? "text" : "password"}
                id="password"
                name="password"
                placeholder={translate("Type your password")}
                value={registerInfo.password}
                onChange={(value) => updateRegisterInfo("password", value)}
                noAutoComplete
                isInvalid={!validChecks.password.valid}
                rightIcon={
                  <EyeIcon
                    className={
                      validChecks.password.show
                        ? classes.ShowPasswordIcon
                        : [classes.ShowPasswordIcon, classes.ShowLine].join(" ")
                    }
                    onClick={onTogglePassword}
                  />
                }
              />
              {strongPassword ? (
                <div className={classes.FormValidationMessage}>
                  <Autoheight show={!validChecks.password.valid}>
                    {translate(
                      "Password must include a special character, upper and lower case, and a number"
                    )}
                  </Autoheight>
                  <Autoheight show={debPassword && debPassword.length > 0}>
                    <div className={classes.PasswordCheckContainer}>
                      <div
                        className={
                          validChecks.password.minSize
                            ? [classes.PasswordMessage, classes.IsValid].join(
                                " "
                              )
                            : classes.PasswordMessage
                        }
                      >
                        {validChecks.password.minSize ? (
                          <CheckIcon />
                        ) : (
                          <Times2Icon />
                        )}
                        <div className={classes.PasswordText}>
                          {translate("Min.")} {settings.passwordMinLength}{" "}
                          {translate("character")}
                        </div>
                      </div>
                      <div
                        className={
                          validChecks.password.special
                            ? [classes.PasswordMessage, classes.IsValid].join(
                                " "
                              )
                            : classes.PasswordMessage
                        }
                      >
                        {validChecks.password.special ? (
                          <CheckIcon />
                        ) : (
                          <Times2Icon />
                        )}
                        <div className={classes.PasswordText}>
                          {translate("1 Special Character")}
                        </div>
                      </div>
                      <div
                        className={
                          validChecks.password.cases
                            ? [classes.PasswordMessage, classes.IsValid].join(
                                " "
                              )
                            : classes.PasswordMessage
                        }
                      >
                        {validChecks.password.cases ? (
                          <CheckIcon />
                        ) : (
                          <Times2Icon />
                        )}
                        <div className={classes.PasswordText}>
                          {translate("Upper and Lowercase")}
                        </div>
                      </div>
                      <div
                        className={
                          validChecks.password.numbers
                            ? [classes.PasswordMessage, classes.IsValid].join(
                                " "
                              )
                            : classes.PasswordMessage
                        }
                      >
                        {validChecks.password.numbers ? (
                          <CheckIcon />
                        ) : (
                          <Times2Icon />
                        )}
                        <div className={classes.PasswordText}>
                          {translate("1 Number")}
                        </div>
                      </div>
                    </div>
                  </Autoheight>
                </div>
              ) : (
                <div className={classes.FormValidationMessage}>
                  <Autoheight show={debPassword && debPassword.length > 0}>
                    <div className={classes.PasswordCheckContainer}>
                      <div
                        className={
                          validChecks.password.minSize
                            ? [classes.PasswordMessage, classes.IsValid].join(
                                " "
                              )
                            : classes.PasswordMessage
                        }
                      >
                        {validChecks.password.minSize ? (
                          <CheckIcon />
                        ) : (
                          <Times2Icon />
                        )}
                        <div className={classes.PasswordText}>
                          {translate("Minimum 3 characters.")}
                        </div>
                      </div>
                    </div>
                  </Autoheight>
                </div>
              )}
            </div>

            <label htmlFor="verify-password">
              {translate("Verify Password")}
              <span
                className={
                  debVerifyPassword && validChecks.verifyPassword
                    ? [classes.Required, classes.Fulfilled].join(" ")
                    : classes.Required
                }
              >
                *
              </span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type={validChecks.password.show ? "text" : "password"}
                id="verify-password"
                name="verifyPassword"
                placeholder={translate("Type your password again")}
                value={registerInfo.verifyPassword}
                onChange={(value) =>
                  updateRegisterInfo("verifyPassword", value)
                }
                noAutoComplete
                isInvalid={
                  registerInfo.verifyPassword && !validChecks.verifyPassword
                }
                rightIcon={
                  <EyeIcon
                    className={
                      validChecks.password.show
                        ? classes.ShowPasswordIcon
                        : [classes.ShowPasswordIcon, classes.ShowLine].join(" ")
                    }
                    onClick={onTogglePassword}
                  />
                }
              />
              <div className={classes.FormValidationMessage}>
                <Autoheight
                  show={
                    registerInfo.verifyPassword && !validChecks.verifyPassword
                  }
                >
                  {translate("Passwords do not match")}
                </Autoheight>
              </div>
            </div>
            <div className={classes.BigBtn}>
              <MainButton
                color="primary"
                onClick={handleNextStep}
                disabled={
                  !registerInfo.displayName ||
                  !validChecks.displayName ||
                  !validChecks.email ||
                  !validChecks.password.valid ||
                  !validChecks.verifyPassword
                }
              >
                {translate("Next Step")}
              </MainButton>
            </div>
          </div>
        )}

        {/* ============================================================================================================================= */}

        {registerStage === 2 && (
          <div className={classes.StepTwo}>
            <div
              className={classes.ReturnBtn}
              style={{
                width: "100%",
                background: "#ffffff0d",
                borderRadius: "8px",
                paddingInline: "10px",
              }}
            >
              <button
                onClick={handleBack}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                <AngleLeftIcon height="10px" width="20px" />
                {translate("Back")}
              </button>
            </div>

            <label
              htmlFor="firstName"
              style={idRequired ? {} : { display: "none" }}
            >
              {translate("First Name")}
              <span className={classes.Required}>*</span>
            </label>
            <div
              className={classes.InputOuter}
              style={idRequired ? {} : { display: "none" }}
            >
              <MainInput
                role="textbox"
                type="text"
                id="firstName"
                name="firstName"
                placeholder={translate("Enter your first name")}
                value={registerInfo.firstName}
                onChange={(value) => updateRegisterInfo("firstName", value)}
                noAutoComplete
                isInvalid={!validChecks.firstName}
              />
            </div>

            <label
              htmlFor="lastName"
              style={idRequired ? {} : { display: "none" }}
            >
              {translate("Last Name")}
              <span className={classes.Required}>*</span>
            </label>
            <div
              className={classes.InputOuter}
              style={idRequired ? {} : { display: "none" }}
            >
              <MainInput
                role="textbox"
                type="text"
                id="lastName"
                name="lastName"
                placeholder={translate("Enter your first name")}
                value={registerInfo.lastName}
                onChange={(value) => updateRegisterInfo("lastName", value)}
                noAutoComplete
                isInvalid={!validChecks.lastName}
              />
            </div>

            <label
              htmlFor="birthDate"
              style={idRequired ? {} : { display: "none" }}
            >
              {translate("Date of Birth")}
              <span className={classes.Required}>*</span>
            </label>
            <div
              className={classes.InputOuter}
              style={idRequired ? {} : { display: "none" }}
            >
              <MainInput
                type="date"
                id="birthDate"
                name="birthDate"
                value={registerInfo.birthDate}
                onChange={(value) => updateRegisterInfo("birthDate", value)}
                noAutoComplete
                isInvalid={!validChecks.birthDate}
              />
            </div>

            <label
              htmlFor="phoneNumber"
              style={idRequired ? {} : { display: "none" }}
            >
              {translate("Phone Number")}
              <span className={classes.Required}>*</span>
            </label>
            <div
              className={classes.InputOuter}
              style={idRequired ? {} : { display: "none" }}
            >
              <div className={classes.RegPhoneNum}>
                <PhoneInput
                  className={classes.RegPhone}
                  international
                  defaultCountry={siteCountry}
                  value={registerInfo.phoneNumber}
                  onChange={(value) => updateRegisterInfo("phoneNumber", value)}
                />
              </div>
            </div>

            <label
              htmlFor="playerID"
              style={idRequired ? {} : { display: "none" }}
            >
              {translate("ID Code")}
              <span className={classes.Required}>∗</span>
            </label>
            <div
              className={classes.InputOuter}
              style={idRequired ? {} : { display: "none" }}
            >
              <MainInput
                role="textbox"
                type="text"
                id="playerID"
                name="playerID"
                placeholder={translate("Type your Identification Code")}
                value={registerInfo.idCode}
                onChange={(value) => updateRegisterInfo("idCode", value)}
                noAutoComplete
                isInvalid={!validChecks.idCode}
              />
            </div>

            <label htmlFor="country">
              {translate("Country")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <select
                id="country"
                name="country"
                className={classes.InputOuterCountrySelect}
                value={siteCountry}
                onChange={(e) =>
                  setRegisterInfo({ ...registerInfo, country: e.target.value })
                }
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
            </div>

            <label htmlFor="code" style={{ display: "none" }}>
              {translate("Affiliate Code")}
              <span className={classes.Optional}> (Optional)</span>
            </label>
            <div className={classes.InputOuter} style={{ display: "none" }}>
              <MainInput
                role="textbox"
                type="text"
                id="code"
                name="code"
                placeholder={translate("Type your Affiliate Code")}
                value={registerInfo.code}
                onChange={(value) => updateRegisterInfo("code", value)}
                noAutoComplete
                isInvalid={!validChecks.email}
              />
            </div>

            <div className={classes.CheckboxContainer}>
              <input
                checked={isOver18}
                onChange={(e) => setIsOver18(e.target.checked)}
                type="checkbox"
                id="over18"
                name="over18"
                className={classes.CheckboxInput}
              />
              <label htmlFor="over18" className={classes.CheckboxLabel}>
                {translate("Yes, I'm over 18")}*
              </label>
            </div>

            {cookiesSettings === "true" ? (
              <div className={classes.CheckboxContainer}>
                <input
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className={classes.CheckboxInput}
                />
                <label htmlFor="terms" className={classes.CheckboxLabel}>
                  {translate(
                    "By accessing this site I attest that I have read and agree with the"
                  )}{" "}
                  <Link
                    to="/pages/terms-of-service"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>{translate("Terms and Conditions")}</b>.
                  </Link>
                  *
                </label>
              </div>
            ) : null}

            <div className={classes.BigBtn}>
              <MainButton
                loading={loginLoading}
                color="primary"
                disabled={isRegisterDisabled}
                onClick={() =>
                  dispatch(register(registerInfo, navigate, location.pathname))
                }
                style={{ width: "100%" }}
              >
                {translate("Register")}
              </MainButton>
            </div>
          </div>
        )}

        {config.VITE_GOOGLE_CLIENT_ID !== "" && (
          <>
            <p className={classes.LoginWith}>{translate("or register with")}</p>
            <GoogleOAuthProvider clientId={config.VITE_GOOGLE_CLIENT_ID}>
              <AlternativeMethods />
            </GoogleOAuthProvider>
          </>
        )}
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "400",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "underline",
            color: "white",
          }}
          onClick={() => changeTab("login")}
        >
          <i>{translate("Already have an account? Log in")}</i>
        </p>
      </form>
    </div>
  );
};

export default Register;
