import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

import classes from "./Verification.module.css";
import MainButton2 from "../../../features/UI/Buttons/MainButton2";
import PersonalInfoVerification from "./PersonalInfoVerification";
import { translate } from "../../../utils/translations";

import AngleUpIcon from "../../../assets/svgs/angle-up.svg?react";
import Trash from "../../../assets/svgs/trash.svg?react";

const Verification = () => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const [selectedFile, setSelectedFile] = useState(null);
  const infoVerified = false;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Clear the input value (optional)
    document.getElementById("fileInput").value = null;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle your file upload logic here
  };

  const [isLevel1Visible, setLevel1Visible] = useState(false);
  const [isLevel2Visible, setLevel2Visible] = useState(false);
  const [isLevel3Visible, setLevel3Visible] = useState(false);
  const [isLevel4Visible, setLevel4Visible] = useState(false);
  const [isLevel5Visible, setLevel5Visible] = useState(false);

  let elClasses = [classes.AccordionBase];

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

          <div className={classes.Container}>
            <input id="useremail" readOnly type="text" value={user?.Email} />
          </div>

          <MainButton2 onClick={() => console.log("VERIFY")}>
            <span>{translate("Verify")}</span>
          </MainButton2>
        </div>

        {/* Level 1 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel1Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel1Visible(!isLevel1Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Personal Information")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel1Visible &&
            (infoVerified ? (
              <div className={classes.AccordionContent}>
                <p>Personal Info Verified</p>
              </div>
            ) : (
              <div className={classes.AccordionContent} style={{display:"flex", width:"100%", justifyContent:"center"}}>
                {/* <p className={classes.AccContentHeader}>
                  {translate("Verify Your Personal Information")}
                </p> */}
                <div
                  className={classes.PersonalInfo}
                  style={{ width: "100%" }}
                >
                  <PersonalInfoVerification />
                </div>
              </div>
            ))}
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
              <p>{translate("ID")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel2Visible && (
            <div className={classes.AccordionContent}>
              <p className={classes.AccContentHeader}>
                {translate("Upload Identification")}
              </p>

              <div className={classes.FileForms}>
                <form onSubmit={handleSubmit} className={classes.FileInputForm}>
                  <h2>
                    <i>(SIDE 1)</i>
                  </h2>
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

                <form onSubmit={handleSubmit} className={classes.FileInputForm}>
                  <h2>
                    <i>(SIDE 2)</i>
                  </h2>
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
            </div>
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
              <p>{translate("Live photo check")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel3Visible && (
            <div className={classes.AccordionContent}>
              {/* <p className={classes.AccContentHeader}>
                {translate("Live photo check")}
              </p> */}
              <p>
                {translate(
                  "Take an interactive selfie and ID picture with liveness check."
                )}
              </p>
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

        {/* Level 4 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel4Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel4Visible(!isLevel4Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Proof of Address")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel4Visible && (
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

        {/* Level 5 Accordion */}
        <div className={classes.FormGroup}>
          <div
            className={`${classes.AccordionBase} ${
              !isLevel5Visible ? classes.Closed : ""
            }`}
            onClick={() => setLevel5Visible(!isLevel5Visible)}
          >
            <div className={classes.AccTitle}>
              <p>{translate("Source of funds")}</p>
              <AngleUpIcon />
            </div>
          </div>
          {isLevel5Visible && (
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
