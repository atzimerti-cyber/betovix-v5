import { useSelector, useDispatch } from "react-redux";
import classes from "./ContactUs.module.css";
import ContactUsIcon from "../../assets/svgs/contactus.svg?react";
import { translate } from "../../utils/translations";
import { useState } from "react";
import { contactForm } from "./pagesAsyncActions";
const ContactUs = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    issue: null,
    details: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      Firstname: formData.firstname,
      Lastname: formData.lastname,
      Email: formData.email,
      Details: formData.details,
      Issue: formData.issue,
    };

    console.log("Form Data:", payload);
    dispatch(contactForm(payload));
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
          <label htmlFor="firstname" className={classes.Label}>
            {translate("First Name")}
          </label>
          <input
            onChange={handleChange}
            id="firstname"
            className={classes.Input}
            type="text"
          />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="lastname" className={classes.Label}>
            {translate("Last Name")}
          </label>
          <input
            onChange={handleChange}
            id="lastname"
            className={classes.Input}
            type="text"
          />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="email" className={classes.Label}>
            {translate("Email")}
          </label>
          <input
            onChange={handleChange}
            id="email"
            className={classes.Input}
            type="email"
          />
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="issue" className={classes.Label}>
            {translate("Issue")}
          </label>
          <select id="issue" className={classes.Select} onChange={handleChange}>
            <option value="">{translate("Select an issue")}</option>
            <option value={1}>{translate("Billing")}</option>
            <option value={2}>{translate("Technical Issue")}</option>
            <option value={3}>{translate("General Inquiry")}</option>
          </select>
        </div>

        <div className={classes.FormGroup}>
          <label htmlFor="details" className={classes.Label}>
            {translate("Details")}
          </label>
          <textarea
            id="details"
            onChange={handleChange}
            className={classes.TextArea}
          ></textarea>
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
