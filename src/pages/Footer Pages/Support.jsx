import { useSelector, useDispatch } from "react-redux";
import classes from "./Support.module.css";
import InfoIcon from "../../assets/svgs/info-circle.svg?react";
import SupportIcon from "../../assets/svgs/livesupportbtn.svg?react";
import { translate } from "../../utils/translations";

const Support = () => {
  // Determine the iframe height based on window width
  const iframeHeight = window.innerWidth <= 670 ? "550px" : "500px";
  const lang = useSelector((state) => state.app.lang);
  const support = useSelector((state) => state.layout.tawkToScript);
  const supportEmail = support?.Email ? support?.Email : "support@betovix.com";

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
          <SupportIcon />
          {translate("Customer Support")}
        </div>
      </div>
      <iframe
        src={support.Source}
        title="Support Chat"
        style={{
          width: "100%",
          height: iframeHeight,
          border: "none",
          marginTop: "1rem",
          overflow: "hidden",
        }}
        scrolling="no"
      ></iframe>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <InfoIcon />
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "300",
            color: "white",
            textAlign: "start",
            margin: "0.3rem",
          }}
        >
          {translate(
            "If our live chat is not working for you, please contact us at"
          )}{" "}
          <i>
            <u>
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
               {/* support@betovix.com */}
            </u>
          </i>
        </p>
      </div>
    </div>
  );
};

export default Support;
