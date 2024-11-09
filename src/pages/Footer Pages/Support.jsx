import { useSelector, useDispatch } from "react-redux";
import classes from "./TermsOfService.module.css";

import { translate } from "../../utils/translations";

const Support = () => {
  return (
    <div className={classes.PageContent}>
      <div className={classes.ToS}>
        <div className={classes.ParagraphTitle} style={{ color: "white" }}>
          {translate("Support")}
        </div>
        <div>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "400",
              color: "white",
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
        </div>
      </div>
    </div>
  );
};
export default Support;
