import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./WithdrawRequests.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import NoReqs from "../../../assets/svgs/no-withdraw-reqs.svg?react";
import { translate } from "../../../utils/translations";
import { getWithrawalReqs } from "../cryptoAsyncActions";

const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const withdrawReqs = useSelector((state) => state.crypto.withdrawals);

  const navigateToWithdraw = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("stage");
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const renderBgColor = (status) => {
    switch (status) {
      case 0: // Pending
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #0e5685 100%)",
        };
      case 1: // Approved
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      case 2: // NotApproved
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      case 3: // Cancelled
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      case 4: // Payed
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      case 5: // Confirmed
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      default:
        return {
          background: "#11385199",
        }; // Default color if status doesn't match
    }
  };

  const renderReqStatus = (status) => {
    switch (status) {
      case 0: // Pending
        return "Pending";
      case 1: // Approved
        return "Pending";
      case 2: // NotApproved
        return "Approved";
      case 3: // Cancelled
        return "Cancelled";
      case 4: // Payed
        return "Payed";
      case 5: // Confirmed
        return "Confirmed";
      default:
        return " ";
    }
  };

  return (
    <>
      <div className={classes.ReturnContainer}>
        <div className={classes.ReturnButtonWrapper}>
          <DsButton color="transparent" onClick={navigateToWithdraw}>
            <AngleLeft2Icon />
            <span>{translate("Return to Withdraw Methods")}</span>
          </DsButton>
        </div>
      </div>
      <div
        className={classes.RequestsContainer}
        style={{
          justifyContent:
            withdrawReqs && withdrawReqs.length > 0 ? "flex-start" : "center",
        }}
      >
        {withdrawReqs && withdrawReqs.length > 0 ? (
          withdrawReqs.map((req, index) => (
            <div
              className={classes.Req}
              style={renderBgColor(req.status)}
              key={index}
            >
              <div className={classes.Left}>
                <p>
                  {translate(`Request Id: `)}
                  {req.reqId}
                </p>
                <p>
                  {translate(`Account Id: `)}
                  {req.accountid}
                </p>
              </div>
              <div className={classes.Center}>
                <p>
                  {translate(`Amount: `)}
                  {req.amount}
                  {req.currency}
                </p>
                <p>
                  {translate(`Date of Request: `)}
                  {req.dateAdded}
                </p>
              </div>
              <div className={classes.Right}>
                <p>{renderReqStatus(req.status)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.NoReqs}>
            <NoReqs height="150px" width="150px" />
            <span>{translate(`No withdrawal requests.`)}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawRequests;
