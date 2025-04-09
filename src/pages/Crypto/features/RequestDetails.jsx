import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./RequestDetails.module.css";
import CloseButton from "../../../features/UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import { formatDate } from "../../../utils/custom";

const RequestDetails = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const renderReqStatus = (status) => {
    switch (status) {
      case 0:
        return translate("Pending");
      case 1:
        return translate("Approved");
      case 2:
        return translate("Not Approved");
      case 3:
        return translate("Cancelled");
      case 4:
        return translate("Payed");
      case 5:
        return translate("Confirmed");
      default:
        return " ";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={classes.Overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={classes.Close} onClick={props.onClose}></div>

        <div className={classes.Content}>
          <div className={classes.Header}>
            <div className={classes.Title}>{translate(`Details`)}</div>
            <div className={classes.CloseButton}>
              <CloseButton
                timesIcon
                color="transparent"
                onClick={props.onClose}
              />
            </div>
          </div>
          <div className={classes.DetailsBody}>
            <div className={classes.Row}>
              <div className={classes.Label}> {translate("Request ID")}:</div>
              <div className={classes.Value}> {props.req.reqId}</div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}>
                {translate("Request Status")}:
              </div>
              <div className={classes.Value}>
                {" "}
                {renderReqStatus(props.req.status)}{" "}
              </div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}> {translate("Amount")}:</div>
              <div className={classes.Value}>
                {" "}
                {props.req.amount}{" "}
                <span style={{ fontSize: "12px" }}>
                  {props.req.provider === "CoinPayments"
                    ? Object.keys(JSON.parse(props.req.currency))[0]
                    : props.req.currency}
                </span>
              </div>
            </div>
            {props.req.crAddress !== "-" && (
              <div className={classes.Row}>
                <div className={classes.Label}>
                  {" "}
                  {translate("Wallet Address")}:
                </div>
                <div className={classes.Value}> {props.req.crAddress}</div>
              </div>
            )}
            {/* <div className={classes.Row}>
              <div className={classes.Label}> {translate("Currency")}:</div>
              <div className={classes.Value}> {props.req.currency}</div>
            </div> */}

            <div className={classes.Row}>
              <div className={classes.Label}>
                {" "}
                {translate("Date of Request")}:
              </div>
              <div className={classes.Value}>
                {" "}
                {formatDate(props.req.dateAdded, "datetime")}
              </div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}> {translate("Last Update")}:</div>
              <div className={classes.Value}>
                {props.req.dateUpdated
                  ? formatDate(props.req.dateUpdated, "datetime")
                  : "-"}
              </div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}>
                {" "}
                {translate("Completion Date")}:
              </div>
              <div className={classes.Value}>
                {props.req.dateCompleted
                  ? formatDate(props.req.dateCompleted, "datetime")
                  : "-"}
              </div>
            </div>
            {/* <div className={classes.Row}>
              <div className={classes.Label}> {translate("Request Id")}:</div>
              <div className={classes.Value}> {props.req.dateUpdated}</div>
            </div> */}

            <div className={classes.Row}>
              <div className={classes.Label}>
                {" "}
                {translate("Payment Provider")}:
              </div>
              <div className={classes.Value}> {props.req.provider}</div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}> {translate("Notes")}:</div>
              <div className={classes.Value}>
                {" "}
                {props.req.note ? translate(`${props.req.note}`) : "-"}
              </div>
            </div>
            <div className={classes.Row}>
              <div className={classes.Label}> {translate("Account ID")}:</div>
              <div className={classes.Value}> {props.req.accountid}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestDetails;
