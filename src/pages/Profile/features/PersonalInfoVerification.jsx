import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import classes from "../../Login/Login.module.css";
import MainInput from "../../../features/UI/Inputs/MainInput";
import MainButton from "../../../features/UI/Buttons/MainButton";
import React from "react";
import { translate } from "../../../utils/translations";

import Select from "react-select";
import { getNames } from "country-list";

const PersonalInfoVerification = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const [loading, setLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: null,
    address: "",
    city: "",
    postCode: null,
  });
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);

  useEffect(() => {
    if (
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.dateOfBirth &&
      personalInfo.country &&
      personalInfo.address &&
      personalInfo.city &&
      personalInfo.postCode
    )
      setIsVerifyDisabled(false);
    else setIsVerifyDisabled(true);
  }, [
    personalInfo.firstName,
    personalInfo.lastName,
    personalInfo.dateOfBirth,
    personalInfo.country,
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
                // placeholder={translate("mm/dd/yyyy")}
                value={personalInfo.dateOfBirth}
                onChange={(value) =>
                  updatePersonalInfo("dateOfBirth", value)
                }
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
                // dispatch(login(loginInfo, navigate, location.pathname));
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
