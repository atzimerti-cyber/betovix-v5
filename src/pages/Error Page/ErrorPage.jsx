import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import classes from "./ErrorPage.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import ErrorIcon from "../../assets/svgs/errorsvg.svg?react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.app.lang);

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className={classes.PageContent}>
      <h1>Oh no, something went wrong!</h1>

      <p>Please try refreshing the page, or come back later.</p>
      <br></br>
      <p
        style={{
          fontSize: "1.2rem",
        }}
      >
        Redirecting to{" "}
        <i>
          <a href="/" style={{color:'var(--db-brand-green)', textDecoration:'underline'}}>betovix.com</a>
        </i>{" "}
        in {countdown} seconds...
      </p>
      <br></br>
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
          fontSize: "0.85rem",
          fontWeight: "400",
          color: "lightblue",
          textAlign: "start",
          margin: "0.3rem",
        }}
      >
        Contact us at{" "}
        <i>
          <u>
            <a href="mailto:support@betovix.com">support@betovix.com</a>
          </u>
        </i>
      </p>
      <ErrorIcon className={classes.ErrorSvg} />
    </div>
  );
};

export default ErrorPage;
