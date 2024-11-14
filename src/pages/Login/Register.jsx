import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import MainInput from "../../features/UI/Inputs/MainInput";
import MainButton from "../../features/UI/Buttons/MainButton";
import classes from "./Login.module.css";
import useDebounce from "../../hooks/useDebounce";
import Autoheight from "../../features/UI/Autoheight/Autoheight";
import EyeIcon from "../../assets/svgs/eye.svg?react";
import Times2Icon from "../../assets/svgs/times2.svg?react";
import CheckIcon from "../../assets/svgs/check.svg?react";
import PromoImage from "../../assets/images/testpromo.png";
import { register } from "./loginAsyncActions";
import { translate } from "../../utils/translations";
import { affiliateCampaigns } from "./loginAsyncActions";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";
import config from "../../config";
import AlternativeMethods from "./features/AlternativeMethods";
import Arrow2LeftIcon from "../../assets/svgs/arrow2-left.svg?react";

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
  const settings = useSelector((state) => state.app.settings);
  const loginLoading = useSelector((state) => state.login.loginLoading);
  const [isOver18, setIsOver18] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get("code");
    if (value) {
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
  });
  const debDisplayName = useDebounce(registerInfo.displayName);
  const debEmail = useDebounce(registerInfo.email);
  const debPassword = useDebounce(registerInfo.password);
  const debVerifyPassword = useDebounce(registerInfo.verifyPassword);
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
    if (!debEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(debEmail);

    if (debEmail.length > 0 && !isValid)
      setValidChecks({ ...validChecks, email: false });
    else setValidChecks({ ...validChecks, email: true });
  }, [debEmail]);

  useEffect(() => {
    if (!debPassword) return;

    const validMinSize = debPassword.length >= settings.passwordMinLength;

    const hasUppercase = /[A-Z]/.test(debPassword);
    const hasLowercase = /[a-z]/.test(debPassword);
    const validCases = hasUppercase && hasLowercase;

    const validNumbers = /\d/.test(debPassword);

    const specialCharRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const validSpecial = specialCharRegex.test(debPassword);

    const isValid = validMinSize && validCases && validNumbers && validSpecial;

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
    setValidChecks({
      ...validChecks,
      verifyPassword: isMatching,
    });
  }, [debPassword, debVerifyPassword]);

  useEffect(() => {
    if (
      registerInfo.displayName &&
      registerInfo.email &&
      registerInfo.password &&
      registerInfo.verifyPassword &&
      registerInfo.country &&
      validChecks.displayName &&
      validChecks.email &&
      validChecks.password.valid &&
      validChecks.verifyPassword &&
      isOver18 &&
      isTermsAccepted
    )
      setIsRegisterDisabled(false);
    else setIsRegisterDisabled(true);
  }, [
    registerInfo.displayName,
    registerInfo.email,
    // registerInfo.country,
    registerInfo.password,
    registerInfo.verifyPassword,
    validChecks.displayName,
    validChecks.email,
    validChecks.password.valid,
    validChecks.verifyPassword,
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
              ? `url(${registerPromoImg})`
              : `url(${registerPromoImgMobile})`,
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
                        ? [classes.ShowPasswordIcon, classes.ShowLine].join(" ")
                        : classes.ShowPasswordIcon
                    }
                    onClick={onTogglePassword}
                  />
                }
              />
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
                          ? [classes.PasswordMessage, classes.IsValid].join(" ")
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
                          ? [classes.PasswordMessage, classes.IsValid].join(" ")
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
                          ? [classes.PasswordMessage, classes.IsValid].join(" ")
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
                          ? [classes.PasswordMessage, classes.IsValid].join(" ")
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
                ∗
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
                        ? [classes.ShowPasswordIcon, classes.ShowLine].join(" ")
                        : classes.ShowPasswordIcon
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
            <div className={classes.ReturnBtn} style={{ maxWidth: "30%" }}>
              <button
                onClick={handleBack}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textDecoration: "underline",
                }}
              >
                <Arrow2LeftIcon height="20px" width="20px" />
                {translate("Back")}
              </button>
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
                value={registerInfo.country}
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

            {/* <div className={classes.Container}>
                <Switch
                    id='switch'
                    active={registerInfo.bonus}
                    label={translate('Send me bonus and marketing emails')}
                    onClick={() => updateRegisterInfo('bonus', !registerInfo.bonus)}
                />
            </div> */}

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
                {translate("Yes, I'm over 18 *")}
              </label>
            </div>
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
                {/* {translate("I've read and agree to the Terms and Conditions *")} */}
                {translate(
                  "By accessing this site I attest that I have read and agree with the"
                )}{" "}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>{translate("Terms and Conditions")}</b>.
                </Link>
                *
              </label>
            </div>

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
        <p className={classes.LoginWith}>{translate("or register with")}</p>
        <GoogleOAuthProvider clientId={config.VITE_GOOGLE_CLIENT_ID}>
          <AlternativeMethods />
        </GoogleOAuthProvider>
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
