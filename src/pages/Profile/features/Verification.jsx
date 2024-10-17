import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import classes from "./Verification.module.css";

import { getLevelsVerified } from "../profileAsyncActions";

import PersonalInfoVerification from "./PersonalInfoVerification";
import LivePhotoCheck from "./LivePhotoCheck";

import MainButton2 from "../../../features/UI/Buttons/MainButton2";

import WarningIcon from "../../../assets/svgs/warning.svg?react";
import SuccessIcon from "../../../assets/svgs/success.svg?react";
import AngleUpIcon from "../../../assets/svgs/angle-up.svg?react";
import Trash from "../../../assets/svgs/trash.svg?react";

import { translate } from "../../../utils/translations";

const Verification = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const level1Status = useSelector(
    (state) => state.profile.verificationLevels.level1
  );
  const level2Status = useSelector(
    (state) => state.profile.verificationLevels.level2
  );
  const level3Status = useSelector(
    (state) => state.profile.verificationLevels.level3
  );
  const level4Status = useSelector(
    (state) => state.profile.verificationLevels.level4
  );
  const level5Status = useSelector(
    (state) => state.profile.verificationLevels.level5
  );
  const level6Status = useSelector(
    (state) => state.profile.verificationLevels.level6
  );

  let elClasses = [classes.AccordionBase];

  const [email, setEmail] = useState(user?.Email || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [pendingDots, setPendingDots] = useState("...");
  const [idFiles, setIdFiles] = useState({ frontSide: null, backSide: null });

  const [isLevel1Visible, setLevel1Visible] = useState(false);
  const [isLevel2Visible, setLevel2Visible] = useState(false);
  const [isLevel3Visible, setLevel3Visible] = useState(false);
  const [isLevel4Visible, setLevel4Visible] = useState(false);
  const [isLevel5Visible, setLevel5Visible] = useState(false);
  const [isLevel6Visible, setLevel6Visible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getLevelsVerified(signal));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPendingDots((prev) => (prev.length < 4 ? prev + "." : ""));
    }, 500); // Adjust the duration as needed

    return () => clearInterval(interval);
  }, []);

  // Handle file selection for the front side
  const handleFrontSideChange = (event) => {
    setIdFiles((prevFiles) => ({
      ...prevFiles,
      frontSide: event.target.files[0],
    }));
  };
  // Handle file selection for the back side
  const handleBackSideChange = (event) => {
    setIdFiles((prevFiles) => ({
      ...prevFiles,
      backSide: event.target.files[0],
    }));
  };
  // Handle removing the selected file
  const handleRemoveFile = (side) => {
    setIdFiles((prevFiles) => ({
      ...prevFiles,
      [side]: null,
    }));
    // Optionally clear the input value
    document.getElementById(`${side}Input`).value = null;
  };
  // Handle file submission
  const handleIDSubmit = (event) => {
    event.preventDefault();
    if (idFiles.frontSide && idFiles.backSide) {
      dispatch(uploadKYCFile(idFiles));
    } else {
      console.log("Both sides of the ID are required.");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update email as the user types
  };

  const handleEmailSubmit = (event) => {
    console.log("Email to be submitted: ", email);
  };

  return (
    <motion.div
      className={classes.TabContent}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={classes.Form}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "white",
          }}
        >
          Verify Your Account
        </h1>
        <div className={classes.MailFormGroup}>
          <p className={classes.Title}>{translate("Email Verification")}</p>
          <p className={classes.Text}>
            {translate(
              "A verified email address is required to access some parts of the website."
            )}
          </p>

          <form
            onSubmit={handleEmailSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className={classes.Container}>
              <input
                readOnly={
                  level1Status === 0 || level1Status === 2 ? false : true
                }
                id="useremail"
                onChange={handleEmailChange}
                type="text"
                value={email}
              />
            </div>
            {level1Status === 2 && (
              <div
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "0.5rem",
                  width: "100%",
                  padding: "0.4rem 0.9rem 0rem 0.9rem",
                }}
              >
                <WarningIcon height="20px" width="20px" />
                <p
                  style={{
                    color: "#ec5750d6",
                    textAlign: "center",
                  }}
                >
                  Verification failed. Please try again.
                </p>
              </div>
            )}

            <div style={{ width: "20%", padding: "0.6rem" }}>
              {(level1Status === 0 || level1Status === 2) && (
                <MainButton2 onClick={handleEmailSubmit}>
                  <span>{translate("Verify")}</span>
                </MainButton2>
              )}
              {level1Status === 1 && (
                <MainButton2 disabled>
                  <span>{translate(`Pending${pendingDots}`)}</span>
                </MainButton2>
              )}
              {level1Status === 3 && (
                <MainButton2 disabled>
                  <span>{translate("Successfully Verified!")}</span>
                </MainButton2>
              )}
            </div>
          </form>
        </div>

        {/* Level 2 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel2Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel2Visible(!isLevel2Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Personal Information")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel2Visible && (
            <>
              {level2Status === 0 && (
                <div
                  className={classes.AccordionContent}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "0",
                  }}
                >
                  <div
                    className={classes.PersonalInfo}
                    style={{ width: "100%" }}
                  >
                    <PersonalInfoVerification />
                  </div>
                </div>
              )}
              {level2Status === 1 && (
                <div className={classes.AccordionContent}>
                  <p>{translate(`Verification Pending${pendingDots}`)}</p>
                </div>
              )}
              {level2Status === 2 && (
                <>
                  <div
                    style={{
                      backgroundColor: "#0c2233",
                      display: "flex",
                      flexDirection: "row",
                      columnGap: "0.5rem",
                      width: "100%",
                      padding: "0.4rem 0.9rem 0rem 0.9rem",
                    }}
                  >
                    <WarningIcon height="20px" width="20px" />
                    <p
                      style={{
                        color: "#ec5750d6",
                        textAlign: "center",
                      }}
                    >
                      Your request was rejected. You can resend your information
                      for reevaluation.
                    </p>
                  </div>

                  <div
                    className={classes.AccordionContent}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      paddingTop: "0",
                    }}
                  >
                    <div
                      className={classes.PersonalInfo}
                      style={{ width: "100%" }}
                    >
                      <PersonalInfoVerification />
                    </div>
                  </div>
                </>
              )}
              {level2Status === 3 && (
                <div
                  style={{
                    backgroundColor: "#0c2233",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "0.5rem",
                    width: "100%",
                    padding: "0.4rem 0.9rem 0.4rem 0.9rem",
                  }}
                >
                  <SuccessIcon height="20px" width="20px" />
                  <p
                    style={{
                      color: "#2ea360",
                      textAlign: "center",
                    }}
                  >
                    Your personal information has been successfully verified.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Level 3 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel3Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel3Visible(!isLevel3Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("ID")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel3Visible && (
            <div className={classes.AccordionContent}>
              <p className={classes.AccContentHeader}>
                {translate("Upload Identification")}
              </p>

              <div className={classes.IDForms}>
                <form onSubmit={handleIDSubmit} style={{width:'100%'}}>
                  <div className={classes.FileForms}>
                    <div className={classes.FileInputForm}>
                      <h2>
                        <i>(SIDE 1)</i>
                      </h2>
                      <input
                        id="frontSideInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFrontSideChange}
                        className={classes.FileInput}
                      />
                      {idFiles.frontSide && (
                        <div className={classes.FileInfo}>
                          <span>{idFiles.frontSide.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile("frontSide")}
                            className={classes.RemoveFileButton}
                          >
                            <Trash />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className={classes.FileInputForm}>
                      <h2>
                        <i>(SIDE 2)</i>
                      </h2>
                      <input
                        id="backSideInput"
                        type="file"
                        accept="image/*"
                        onChange={handleBackSideChange}
                        className={classes.FileInput}
                      />
                      {idFiles.backSide && (
                        <div className={classes.FileInfo}>
                          <span>{idFiles.backSide.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile("backSide")}
                            className={classes.RemoveFileButton}
                          >
                            <Trash />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.FileForms}>
                    <button
                      type="submit"
                      className={
                        idFiles.frontSide && idFiles.backSide
                          ? classes.FileSubmitButton
                          : [classes.FileSubmitButton, classes.Disabled].join(
                              " "
                            )
                      }
                    >
                      Upload Both Sides
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Level 4 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel4Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel4Visible(!isLevel4Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Live photo check")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel4Visible && (
            <div className={classes.AccordionContent}>
              {/* <p className={classes.AccContentHeader}>
                {translate("Live photo check")}
              </p> */}
              <p>
                {translate(
                  "Take an interactive selfie and ID picture with liveness check."
                )}
              </p>
              <LivePhotoCheck />
              {/* <form onSubmit={handleSubmit} className={classes.FileInputForm}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={classes.FileInput}
                />
                {selectedFile && (
                  <div className={classes.FileInfo}>
                    <span>{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className={classes.RemoveFileButton}
                    >
                      <Trash />
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className={
                    selectedFile
                      ? classes.FileSubmitButton
                      : [classes.FileSubmitButton, classes.Disabled].join(" ")
                  }
                >
                  Upload
                </button>
              </form> */}
            </div>
          )}
        </div>

        {/* Level 5 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel5Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel5Visible(!isLevel5Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Proof of Address")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel5Visible && (
            <div className={classes.AccordionContent}>
              {/* <p className={classes.AccContentHeader}>
                {translate("Submit proof of your current address.")}
              </p> */}
              <p>{translate("Submit proof of your current address.")}</p>
              <form onSubmit={handleSubmit} className={classes.FileInputForm}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={classes.FileInput}
                />
                {selectedFile && (
                  <div className={classes.FileInfo}>
                    <span>{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className={classes.RemoveFileButton}
                    >
                      <Trash />
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className={
                    selectedFile
                      ? classes.FileSubmitButton
                      : [classes.FileSubmitButton, classes.Disabled].join(" ")
                  }
                >
                  Upload
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Level 6 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel6Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel6Visible(!isLevel6Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Source of funds")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel6Visible && (
            <div className={classes.AccordionContent}>
              {/* <p className={classes.AccContentHeader}>
                {translate("Source of funds")}
              </p> */}
              <p>{translate("Submit proof of source of funds.")}</p>
              <form onSubmit={handleSubmit} className={classes.FileInputForm}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={classes.FileInput}
                />
                {selectedFile && (
                  <div className={classes.FileInfo}>
                    <span>{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className={classes.RemoveFileButton}
                    >
                      <Trash />
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className={
                    selectedFile
                      ? classes.FileSubmitButton
                      : [classes.FileSubmitButton, classes.Disabled].join(" ")
                  }
                >
                  Upload
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Verification;
