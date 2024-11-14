import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import CopyToClipboardCont from "../../../features/CopyToClipboard/CopyToClipboardCont";
import classes from "./Settings.module.css";
import MainInput2 from "../../../features/UI/Inputs/MainInput2";
import MainInput from "../../../features/UI/Inputs/MainInput";
import MainButton2 from "../../../features/UI/Buttons/MainButton2";
import { translate } from "../../../utils/translations";
import EyeIcon from "../../../assets/svgs/eye.svg?react"; // Import the eye icon component
import CheckIcon from "../../../assets/svgs/check.svg?react";
import EditIcon from "../../../assets/svgs/edit.svg?react";
import ReturnIcon from "../../../assets/svgs/return.svg?react";
import ArrowDown from "../../../assets/svgs/arrowdown.svg?react";
import Times2Icon from "../../../assets/svgs/times2.svg?react";
import Autoheight from "../../../features/UI/Autoheight/Autoheight"; // Import Autoheight
import { changePassword, changeUsername } from "../profileAsyncActions";

const Settings = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const username = useSelector((state) => state.login.user?.Username);

  //   const [profileIsHidden, setProfileIsHidden] = useState(user?.profileHidden);
  //   const [marketingEmails, setMarketingEmails] = useState(user?.marketingEmails);
  const [displayName, setDisplayName] = useState(user?.Username);
  const [changeUsernameDisabled, setChangeUsernameDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [loadingUsername, setloadingUsername] = useState(false);
  const [error, setError] = useState(null);

  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [validPassword, setValidPassword] = useState({
    minSize: false,
    special: false,
    cases: false,
    numbers: false,
  });
  const [verify, setVerify] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!user) return;
  }, []);

  //------------------CHANGE USERNAME------------------//
  useEffect(() => {
    if (!user) return;

    let isDis = true;
    if (displayName.trim() !== user.Username.trim() && password) {
      isDis = false;
    }

    setChangeUsernameDisabled(isDis);
  }, [displayName, password]);

  //-----------------SAVE NEW USERNAME------------------//
  const saveUsernameChanges = async () => {
    setloadingUsername(true);
    const payload = {
      Username: displayName,
      Password: password,
    };

    console.log(payload);
    const controller = new AbortController();
    const signal = controller.signal;

    const result = await dispatch(changeUsername(signal, payload));

    if (result.success) {
      setloadingUsername(false);
      setEditUsername(false);
      setDisplayName(username);
      setError(null);
    } else {
      setloadingUsername(false);
      setError(`${result.error}`);
    }
  };

  //------------------PASSWORD TO CHANGE USERNAME------------------//
  const handlePassword = (value) => {
    setPassword(value);
  };
  const handlePasswordChange = (value) => {
    setNewPassword(value);
    validatePassword(value);
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  //------------------CURRENT PASSWORD------------------//
  const handleCurrentPassword = (value) => {
    setCurrentPassword(value);
  };
  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  //------------------NEW PASSWORD------------------//
  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const validatePassword = (value) => {
    setValidPassword({
      minSize: value.length >= 8,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      cases: /[a-z]/.test(value) && /[A-Z]/.test(value),
      numbers: /\d/.test(value),
    });
  };

  //------------------CONFIRM PASSWORD------------------//
  const toggleShowVerifyPassword = () => {
    setShowVerifyPassword((prev) => !prev);
  };
  const handleVerify = (value) => {
    setVerifyPassword(value);
    validateVerify(value);
  };
  const validateVerify = (value) => {
    if (value === newPassword) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  //------------------SAVE NEW PASSWORD------------------//
  useEffect(() => {
    let isDis = true;

    if (
      currentPassword &&
      newPassword &&
      verifyPassword &&
      verify &&
      validPassword.minSize &&
      validPassword.special &&
      validPassword.cases &&
      validPassword.numbers
    ) {
      isDis = false;
    }

    setIsDisabled(isDis);
  }, [currentPassword, newPassword, verifyPassword, verify, validPassword]);
  const savePasswordChanges = () => {
    const payload = {
      OldPass: currentPassword,
      Password: newPassword,
      RePassword: verifyPassword,
    };
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(changePassword(signal, payload));
  };

  //------------------ACCOUNT TYPE------------------//
  const getAccountType = (role) => {
    switch (role) {
      case 40:
        return translate("Player");
      case 30:
        return translate("Shop");
      case 20:
        return translate("Agent");
      case 10:
        return translate("Owner");
      case 1 || 0:
        return translate("Admin");
      default:
        return "-";
    }
  };

  return (
    <motion.div
      className={classes.TabContent}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={classes.Form}>
        <div>
          <p className={classes.Header}>{translate("Settings")}</p>
          <div className={classes.FormGroup}>
            <div
              className={classes.GroupTitle}
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                marginTop: "0.5rem",
              }}
            >
              {translate(`User Information`)}
            </div>
            <div className={classes.UsernameForm}>
              <p className={classes.Title}>{translate("Username")}</p>
              {editUsername && (
                <p className={classes.Text}>
                  {translate(
                    "Your username must be between 1 and 24 characters."
                  )}
                </p>
              )}

              <div className={classes.UsernameInput}>
                <MainInput2
                  type="text"
                  name="displayName"
                  value={editUsername ? displayName : username}
                  onChange={(value) => setDisplayName(value)}
                  readonly={editUsername ? false : true}
                />
                <button
                  className={classes.EditBtn}
                  onClick={() => {
                    setEditUsername((prevState) => !prevState);
                    setDisplayName(username);
                    setPassword(null);
                    setError(null);
                  }}
                >
                  {editUsername ? <ReturnIcon /> : <EditIcon />}
                </button>
              </div>
              {editUsername && (
                <>
                  <p className={classes.Text}>
                    {translate(
                      "You must enter your password to change your username."
                    )}
                  </p>
                  <div className={classes.ChangeUsernameSection}>
                    <MainInput
                      inSettings
                      role="textbox"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder={translate("Enter Password")}
                      value={password}
                      onChange={handlePassword}
                      noAutoComplete
                      rightIcon={
                        <EyeIcon
                          className={
                            showPassword
                              ? [
                                  classes.ShowPasswordIcon,
                                  classes.ShowLine,
                                ].join(" ")
                              : classes.ShowPasswordIcon
                          }
                          onClick={toggleShowPassword}
                        />
                      }
                    />
                    <button
                      className={
                        changeUsernameDisabled
                          ? [classes.SaveUsernameBtn, classes.Disabled].join(
                              " "
                            )
                          : classes.SaveUsernameBtn
                      }
                      onClick={saveUsernameChanges}
                      disabled={changeUsernameDisabled} // Optional: Disable the button when saving
                    >
                      {loadingUsername ? (
                        <>
                          <div className={classes.Spinner}></div>
                        </>
                      ) : (
                        translate("Save")
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className={classes.Text} style={{ color: "#d9510d" }}>
                      {translate(`${error}`)}
                    </p>
                  )}
                </>
              )}
            </div>

            {user?.Email && (
              <>
                <p className={classes.Title}>{translate("Email")}</p>
                <MainInput2
                  type="text"
                  name="displayName"
                  value={user?.Email}
                  readonly={true}
                />
              </>
            )}
          </div>

          <div className={classes.FormGroup}>
            <button
              className={classes.AccBtn}
              onClick={() => {
                setChangePasswordForm((prevState) => !prevState);
                setCurrentPassword("");
                setNewPassword("");
                setVerifyPassword("");
              }}
            >
              {translate("Security & privacy")} <ArrowDown />
            </button>
            {changePasswordForm && (
              <div className={classes.ChangePasswordForm}>
                <p
                  className={classes.Title}
                  style={{ fontSize: "0.9rem", color: "white" }}
                >
                  {translate("Change Password")}
                </p>
                <div className={classes.InputOuter}>
                  <label htmlFor="currentPassword">
                    <p className={classes.Text}>
                      {translate("Current Password")}
                    </p>
                  </label>
                  <MainInput
                    inSettings
                    role="textbox"
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="password"
                    placeholder={translate("Type your current password")}
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    noAutoComplete
                    rightIcon={
                      <EyeIcon
                        className={
                          showCurrentPassword
                            ? [classes.ShowPasswordIcon, classes.ShowLine].join(
                                " "
                              )
                            : classes.ShowPasswordIcon
                        }
                        onClick={toggleShowCurrentPassword}
                      />
                    }
                  />
                  <label htmlFor="password">
                    <p className={classes.Text}>{translate("New Password")}</p>
                  </label>
                  <MainInput
                    inSettings
                    role="textbox"
                    type={showNewPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder={translate("Type your password")}
                    value={newPassword}
                    onChange={handlePasswordChange}
                    noAutoComplete
                    isInvalid={
                      newPassword &&
                      (!validPassword.minSize ||
                        !validPassword.special ||
                        !validPassword.cases ||
                        !validPassword.numbers)
                    }
                    rightIcon={
                      <EyeIcon
                        className={
                          showNewPassword
                            ? [classes.ShowPasswordIcon, classes.ShowLine].join(
                                " "
                              )
                            : classes.ShowPasswordIcon
                        }
                        onClick={toggleShowNewPassword}
                      />
                    }
                  />

                  <label htmlFor="verifyPassword">
                    <p className={classes.Text}>
                      {translate("Verify Password")}
                    </p>
                  </label>
                  <MainInput
                    inSettings
                    role="textbox"
                    type={showVerifyPassword ? "text" : "password"}
                    id="verifyPassword"
                    name="password"
                    placeholder={translate("Type your password")}
                    value={verifyPassword}
                    onChange={handleVerify}
                    noAutoComplete
                    isInvalid={verifyPassword && !verify}
                    rightIcon={
                      <EyeIcon
                        className={
                          showVerifyPassword
                            ? [classes.ShowPasswordIcon, classes.ShowLine].join(
                                " "
                              )
                            : classes.ShowPasswordIcon
                        }
                        onClick={toggleShowVerifyPassword}
                      />
                    }
                  />

                  <p className={classes.Text}>
                    {translate(
                      "Your password must meet the following criteria"
                    )}
                    {": "}
                  </p>

                  <div className={classes.FormValidationMessage}>
                    <Autoheight show={true}>
                      <div className={classes.PasswordCheckContainer}>
                        <div
                          className={
                            validPassword.minSize
                              ? [classes.PasswordMessage, classes.IsValid].join(
                                  " "
                                )
                              : classes.PasswordMessage
                          }
                        >
                          {validPassword.minSize ? (
                            <CheckIcon />
                          ) : (
                            <Times2Icon />
                          )}
                          <div className={classes.PasswordText}>
                            {translate("Min. 8 characters")}
                          </div>
                        </div>
                        <div
                          className={
                            validPassword.special
                              ? [classes.PasswordMessage, classes.IsValid].join(
                                  " "
                                )
                              : classes.PasswordMessage
                          }
                        >
                          {validPassword.special ? (
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
                            validPassword.cases
                              ? [classes.PasswordMessage, classes.IsValid].join(
                                  " "
                                )
                              : classes.PasswordMessage
                          }
                        >
                          {validPassword.cases ? <CheckIcon /> : <Times2Icon />}
                          <div className={classes.PasswordText}>
                            {translate("Upper and Lowercase")}
                          </div>
                        </div>
                        <div
                          className={
                            validPassword.numbers
                              ? [classes.PasswordMessage, classes.IsValid].join(
                                  " "
                                )
                              : classes.PasswordMessage
                          }
                        >
                          {validPassword.numbers ? (
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
                <MainButton2
                  disabled={isDisabled}
                  onClick={savePasswordChanges}
                >
                  <span>{translate("Change Password")}</span>
                </MainButton2>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className={classes.Header}>{translate("Account Information")}</p>
          <div className={classes.FormGroup}>
            <p className={classes.GroupTitle} style={{ marginTop: "0.4rem" }}>
              {translate("User ID")}
            </p>
            <p className={classes.Text}>
              {translate(
                "This is your unique ID. Please include this ID when contacting support."
              )}
            </p>

            <CopyToClipboardCont text={user?.AccountId} />
          </div>
          <div className={classes.FormGroup}>
            <p className={classes.GroupTitle}>{translate("Account Type")}</p>
            <p className={classes.Text}>
              {user?.Role && getAccountType(user.Role)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
