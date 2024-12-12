import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./SelfExclusion.module.css";
import { translate } from "../../../utils/translations";
import Hide from "../../../assets/svgs/eye-open.svg?react";
import Show from "../../../assets/svgs/eye-closed.svg?react";
import { toast } from "react-toastify";

const SelfExclusion = () => {
  const dispatch = useDispatch();

  const [pageStep, setPageStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOptionChange = (event) => {
    if (pageStep === 1) {
      setSelectedOption(event.target.value);
    }
  };

  const handleStepChange = (pageStep) => {
    if (pageStep === 1) {
      setPageStep(2);
    } else if (pageStep === 2) {
      setPageStep(1);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const throwerror = (event) => {
    event.preventDefault(); // Prevent the default form submission
    toast.error("Something went wrong. Please contact our customer support.");
  };

  return (
    <div className={classes.Content}>
      <div className={classes.Container}>
        {pageStep === 1 ? (
          <p>
            If you believe you are at risk of developing a gambling problem or
            are currently experiencing one, we encourage you to consider
            Self-Exclusion. <br></br>
            <br></br>For those who wish to take a break from playing for other
            reasons, please visit our Time-Out page.<br></br>
            <br></br> Betovix offers a Self-Exclusion option that allows
            customers to temporarily deactivate their account for a specified
            period. Once this option is activated, the account cannot be
            reactivated for any reason until the selected exclusion period has
            ended. During the Self-Exclusion period, Betovix will take all
            necessary steps to prevent the creation of new accounts.<br></br>
            <br></br>
            If you need additional details about Self-Exclusion, feel free to
            contact us, and our team will assist you. <br></br>
            <br></br>To self-exclude, select your desired exclusion period
            below. <br></br>
            <br></br>Once confirmed, the Self-Exclusion will be implemented
            immediately.
          </p>
        ) : (
          <p>
            By choosing to self-exclude, you will lose access to your account
            for the duration of the selected time period. Betovix will take all
            reasonable steps to prevent you from opening any new accounts, and
            you agree not to attempt creating new Betovix accounts during the
            self-exclusion period.
            <br></br> <br></br>
            Please ensure the information is accurate, as the self-exclusion
            cannot be reversed until the selected time period has passed.
            <br></br> <br></br>
            Once the self-exclusion is activated, a confirmation email will be
            sent to your registered email address.
            <br></br> <br></br>
            To proceed, enter your password and select ‘Self-Exclude’. The
            process will take effect immediately.
            <br></br> <br></br>
            If you want to change your choice or decide not to proceed, select
            ‘Cancel’.
          </p>
        )}
        {pageStep === 1 ? (
          <div className={classes.CheckboxContainer}>
            <h2>{translate("Self-Exclusion Options")}:</h2>
            <form method="post" className={classes.Form}>
              <div className={classes.Row}>
                <input
                  type="radio"
                  name="self_exclusion"
                  id="self_exclusion_1m"
                  value="1_month"
                  onChange={handleOptionChange}
                  className={classes.CustomRadio}
                />
                <label
                  htmlFor="self_exclusion_1m"
                  className={classes.CustomLabel}
                >
                  1 {translate("Month")}
                </label>
              </div>
              <br />
              <div className={classes.Row}>
                <input
                  type="radio"
                  name="self_exclusion"
                  id="self_exclusion_6m"
                  value="6_months"
                  onChange={handleOptionChange}
                  className={classes.CustomRadio}
                />
                <label
                  htmlFor="self_exclusion_6m"
                  className={classes.CustomLabel}
                >
                  6 {translate("Months")}
                </label>
              </div>
              <br />
              <div className={classes.Row}>
                <input
                  type="radio"
                  name="self_exclusion"
                  id="self_exclusion_4ever"
                  value="indefinitely"
                  onChange={handleOptionChange}
                  className={classes.CustomRadio}
                />
                <label
                  htmlFor="self_exclusion_4ever"
                  className={classes.CustomLabel}
                >
                  {translate("Indefinitely")}
                </label>
              </div>
              <br />
              <button
                className={classes.ContinueBtn}
                type="submit"
                disabled={!selectedOption}
                onClick={() => handleStepChange(pageStep)}
              >
                {translate("Continue")}
              </button>
            </form>
          </div>
        ) : (
          <div className={classes.PasswordContainer}>
            <form onSubmit={throwerror} className={classes.Form2}>
              <label htmlFor="password"></label>
              <div className={classes.InputWrapper}>
                <input
                  className={classes.Input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  placeholder={translate(`Enter your password`)}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className={classes.ShowPasswordBtn}
                >
                  {showPassword ? <Hide /> : <Show />}
                </button>
              </div>
              <button type="submit" className={classes.ContinueBtn}>
                {translate(`Self Exclude`)}
              </button>
              <button
                onClick={() => {
                  handleStepChange(pageStep);
                  setSelectedOption(null);
                }}
                className={classes.CancelBtn}
              >
                {translate(`Cancel`)}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfExclusion;
