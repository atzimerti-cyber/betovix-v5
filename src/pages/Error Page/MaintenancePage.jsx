import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import classes from "./ErrorPage.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import MaintenanceIcon from "../../assets/svgs/maintenance.svg?react";

const MaintenancePage = () => {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.app.lang);
  const support = useSelector((state) => state.layout.tawkToScript);
  const supportEmail = support?.Email ? support?.Email : "";
  const currentDomain = window.location.hostname;

  return (
    <div className={classes.PageContent}>
      <h1>We're under maintenace right now.</h1>

      <p>Please try refreshing the page, or come back later.</p>
      <br></br>
      <p
        style={{
          fontSize: "1.2rem",
        }}
      >
        You can redirect to {currentDomain}{" "}
        <i>
          <a
            href="/"
            style={{
              color: "var(--brand-green)",
              textDecoration: "underline",
            }}
          >
            here
          </a>
        </i>
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
      {supportEmail && supportEmail !== "" &&
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: "400",
            color: "lightblue",
            textAlign: "start",
            margin: "0.3rem",
          }}
        >
          You can contact us at{" "}
          <i>
            <u>
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </u>
          </i>
        </p>
      }
      <MaintenanceIcon className={classes.ErrorSvg} />
    </div>
  );
};

export default MaintenancePage;
