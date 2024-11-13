import { useSelector, useDispatch } from "react-redux";
import classes from "./ContactUs.module.css";
import InfoIcon from "../../assets/svgs/info-circle.svg?react";
import ContactUsIcon from "../../assets/svgs/contactus.svg?react";
import { translate } from "../../utils/translations";
import { LeftArrow } from "../../features/UI/HorizontalMenu/Arrows";

const ContactUs = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for form submission, e.g., dispatching a Redux action or API call
    console.log("Form submitted");
  };

  return (
    <div className={classes.PageContent} style={{ padding: "0px 1rem 40px" }}>
      <div className={classes.ToS}>
        <div
          className={classes.Context}
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "700",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <ContactUsIcon fill="white" />
          {translate("Contact Us")}
        </div>
      </div>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        <div className={classes.FormGroup}>
          <label htmlFor="firstName" className={classes.Label}>
            {translate("First Name")}
          </label>
          <input id="firstName" className={classes.Input} type="text" />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="lastName" className={classes.Label}>
            {translate("Last Name")}
          </label>
          <input id="lastName" className={classes.Input} type="text" />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="email" className={classes.Label}>
            {translate("Email")}
          </label>
          <input id="email" className={classes.Input} type="email" />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="issue" className={classes.Label}>
            {translate("Issue")}
          </label>
          <select id="issue" className={classes.Select}>
            <option value="">{translate("Select an issue")}</option>
            <option value="billing">{translate("Billing")}</option>
            <option value="technical">{translate("Technical Issue")}</option>
            <option value="general">{translate("General Inquiry")}</option>
          </select>
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="details" className={classes.Label}>
            {translate("Details")}
          </label>
          <textarea id="details" className={classes.TextArea}></textarea>
        </div>

        <div className={classes.FormGroup}>
          <button type="submit" className={classes.SubmitButton}>
            {translate("Submit")}
          </button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          paddingLeft: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "300",
            color: "white",
            textAlign: "start",
            margin: "0.3rem",
          }}
        >
          {translate("or contact us at ")}{" "}
          <i>
            <u>
              <a href="mailto:support@betovix.com">support@betovix.com</a>
            </u>
          </i>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
