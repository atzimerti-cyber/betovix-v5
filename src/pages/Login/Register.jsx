import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import GoogleIcon from "../../assets/svgs/google.svg?react";
import SteamIcon from "../../assets/svgs/steam.svg?react";
import MainInput from "../../features/UI/Inputs/MainInput";
import MainButton from "../../features/UI/Buttons/MainButton";
import classes from "./Login.module.css";
import Switch from "../../features/UI/Switch/Switch";
import useDebounce from "../../hooks/useDebounce";
import Autoheight from "../../features/UI/Autoheight/Autoheight";
import EyeIcon from "../../assets/svgs/eye.svg?react";
import Times2Icon from "../../assets/svgs/times2.svg?react";
import CheckIcon from "../../assets/svgs/check.svg?react";
import { register } from "./loginAsyncActions";
import AlternativeMethods from "./features/AlternativeMethods";
import { translate } from "../../utils/translations";
import { affiliateCampaigns } from "./loginAsyncActions";

import Select from "react-select";
import { getNames } from "country-list";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const settings = useSelector((state) => state.app.settings);
  const loginLoading = useSelector((state) => state.login.loginLoading);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
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

  const countryOptions = getNames().map((country) => ({
    label: country,
    value: country,
  }));

  const [registerInfo, setRegisterInfo] = useState({
    displayName: null,
    email: null,
    password: null,
    verifyPassword: null,
    code: null,
    country: null,
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
      isOver18 && // Check if the user is over 18
      isTermsAccepted // Check if terms are accepted
    )
      setIsRegisterDisabled(false);
    else setIsRegisterDisabled(true);
  }, [
    registerInfo.country,
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

  return (
    <form className={classes.Form} autoComplete="off">
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
                {validChecks.password.minSize ? <CheckIcon /> : <Times2Icon />}
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
                {validChecks.password.special ? <CheckIcon /> : <Times2Icon />}
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
                {validChecks.password.cases ? <CheckIcon /> : <Times2Icon />}
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
                {validChecks.password.numbers ? <CheckIcon /> : <Times2Icon />}
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
          onChange={(value) => updateRegisterInfo("verifyPassword", value)}
          noAutoComplete
          isInvalid={registerInfo.verifyPassword && !validChecks.verifyPassword}
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
            show={registerInfo.verifyPassword && !validChecks.verifyPassword}
          >
            {translate("Passwords do not match")}
          </Autoheight>
        </div>
      </div>

      {/* Country dropdown */}
      <label htmlFor="country">
        {translate("Country")}
        <span className={classes.Required}>∗</span>
      </label>
      <div className={classes.InputOuterCountry}>
        <Select
          className={classes.InputOuterCountrySelect}
          options={countryOptions}
          onChange={(option) => updateRegisterInfo("country", option.value)}
          placeholder={translate("Select your country")}
        />
      </div>

      <label htmlFor="code">
        {translate("Affiliate Code")}
        <span className={classes.Optional}> (Optional)</span>
      </label>
      <div className={classes.InputOuter}>
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
          {translate("I've read and agree to the Terms and Conditions *")}
        </label>
      </div>

      <MainButton
        loading={loginLoading}
        color="primary"
        disabled={isRegisterDisabled}
        onClick={() =>
          dispatch(register(registerInfo, navigate, location.pathname))
        }
      >
        {translate("Register")}
      </MainButton>

      {/* <p className={classes.LoginWith}>{translate('or login with')}</p> */}
      {/* <AlternativeMethods /> */}

      {/* {isMobile && (
                <div className={classes.Acknowledgement}>
                    {translate('By accessing this site I attest that I am at least 18 years old and have read and agree with the')}{' '}
                    <Link href='/terms' target='_blank' rel='noreferrer'>
                        <b>{translate('Terms of Service')}</b>.
                    </Link>
                </div>
            )} */}
    </form>
  );
};

export default Register;
