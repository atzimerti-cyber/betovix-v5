import { useSelector, useDispatch } from "react-redux";
import classes from "./ErrorPage.module.css";

import ErrorIcon from "../../assets/svgs/errorsvg.svg?react";

import { translate } from "../../utils/translations";

const ErrorPage = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);

  return (
    <div className={classes.PageContent}>
      <h1>Oh no, something went wrong!</h1>
      <br></br>

      <p>Please try refreshing the page, or come back later.</p>
      <p
        style={{
          fontSize: "1rem",
          fontWeight: "400",
          color: "lightblue",
          textAlign: "start",
          margin: "0.3rem",
        }}
      >
        We’re sorry for the inconvenience.
      </p>
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: "400",
          color: "lightblue",
          textAlign: "start",
          margin: "0.3rem",
        }}
      >
        Contact us at <i>support@betovix.com</i>
      </p>
      <ErrorIcon />
    </div>
  );
};

export default ErrorPage;
