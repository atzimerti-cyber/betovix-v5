import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getNames, getCode } from "country-list"; // getCode to map country name to ISO code
import PhoneInput from "react-phone-input-2"; // New import for phone input
import "react-phone-input-2/lib/style.css"; // Default styling
import Select from "react-select";
import classes from "../../Login/Login.module.css";
import MainInput from "../../../features/UI/Inputs/MainInput";
import MainButton from "../../../features/UI/Buttons/MainButton";
import { translate } from "../../../utils/translations";

import { submitPersonalInfo } from "../profileAsyncActions";

const PersonalInfoVerification = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const [loading, setLoading] = useState(false);
  const [validInputs, setValidInputs] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: null,
    mobile: "",
    address: "",
    city: "",
    postCode: "",
  });
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);

  useEffect(() => {
    if (
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.dateOfBirth &&
      personalInfo.country &&
      personalInfo.mobile &&
      personalInfo.address &&
      personalInfo.city &&
      personalInfo.postCode
    ) {
      setValidInputs(true);
      setIsVerifyDisabled(false);
    } else {
      setIsVerifyDisabled(true);
    }
  }, [
    personalInfo.firstName,
    personalInfo.lastName,
    personalInfo.dateOfBirth,
    personalInfo.country,
    personalInfo.mobile,
    personalInfo.address,
    personalInfo.city,
    personalInfo.postCode,
  ]);

  const updatePersonalInfo = (property, value) => {
    setPersonalInfo({ ...personalInfo, [property]: value });
  };

  const countryOptions = getNames().map((country) => ({
    label: country,
    value: country,
  }));

  const handleSumbit = () => {
    if (validInputs) {
      const controller = new AbortController();
      const signal = controller.signal;

      const info = {
        FirstName: personalInfo.firstName,
        LastName: personalInfo.lastName,
        DateOfBirth: personalInfo.dateOfBirth,
        Country: personalInfo.country,
        Address: personalInfo.address,
        City: personalInfo.city,
        PostCode: personalInfo.postCode,
        Mobile: personalInfo.mobile,
      };

      dispatch(submitPersonalInfo(info, signal));
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.Loading}>
          <div className={classes.Spinner}></div>
        </div>
      ) : (
        <>
          <form className={classes.Form}>
            <label htmlFor="firstName">
              {translate("First Name")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="firstName"
                name="firstName"
                placeholder={translate("Type your First Name")}
                value={personalInfo.firstName}
                onChange={(value) => updatePersonalInfo("firstName", value)}
              />
            </div>

            <label htmlFor="lastName">
              {translate("Last Name")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="lastName"
                name="lastName"
                placeholder={translate("Type your Last Name")}
                value={personalInfo.lastName}
                onChange={(value) => updatePersonalInfo("lastName", value)}
              />
            </div>

            <label htmlFor="dateOfBirth">
              {translate("Date of Birth")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={personalInfo.dateOfBirth}
                onChange={(value) => updatePersonalInfo("dateOfBirth", value)}
              />
            </div>

            <label htmlFor="country">
              {translate("Country")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuterCountry}>
              <Select
                className={classes.InputOuterCountrySelect}
                options={countryOptions}
                onChange={(option) =>
                  updatePersonalInfo("country", option.value)
                }
                placeholder={translate("Select your country")}
              />
            </div>

            <label htmlFor="mobile">
              {translate("Mobile")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.PhoneInput} id="mobile">
              <PhoneInput
                country={
                  personalInfo.country
                    ? getCode(personalInfo.country).toLowerCase()
                    : "us"
                }
                value={personalInfo.mobile}
                onChange={(value) => updatePersonalInfo("mobile", value)}
                placeholder={translate("Mobile Phone")}
                inputClass={classes.InputOuterPhone}
              />
            </div>

            <label htmlFor="address">
              {translate("Address")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="address"
                name="address"
                placeholder={translate("Your Address")}
                value={personalInfo.address}
                onChange={(value) => updatePersonalInfo("address", value)}
              />
            </div>

            <label htmlFor="city">
              {translate("City")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="city"
                name="city"
                placeholder={translate("Your City")}
                value={personalInfo.city}
                onChange={(value) => updatePersonalInfo("city", value)}
              />
            </div>

            <label htmlFor="postCode">
              {translate("Post Code")}
              <span className={classes.Required}>∗</span>
            </label>
            <div className={classes.InputOuter}>
              <MainInput
                role="textbox"
                type="text"
                id="postCode"
                name="postCode"
                placeholder={translate("Your Post Code")}
                value={personalInfo.postCode}
                onChange={(value) => updatePersonalInfo("postCode", value)}
              />
            </div>

            <MainButton
              loading={loading}
              color="primary"
              disabled={isVerifyDisabled}
              onClick={() => {
                handleSumbit();
              }}
            >
              {translate("Verify")}
            </MainButton>
          </form>
        </>
      )}
    </>
  );
};

export default PersonalInfoVerification;
