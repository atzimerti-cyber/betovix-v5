import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./WithdrawRequests.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import NoReqs from "../../../assets/svgs/no-withdraw-reqs.svg?react";
import { translate } from "../../../utils/translations";
import { getWithrawalReqs } from "../cryptoAsyncActions";
import AngleLeftIcon from "../../../assets/svgs/angle-left.svg?react";
import AngleRightIcon from "../../../assets/svgs/angle-right.svg?react";

const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const withdrawReqs = useSelector((state) => state.crypto.withdrawals);

  const [selectedStatus, setSelectedStatus] = useState("0,1,2,3,4,5");
  const [sortOrder, setSortOrder] = useState("AccountId_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const count = 10;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(
      getWithrawalReqs(signal, currentPage, count, sortOrder, selectedStatus)
    );
  }, [currentPage, sortOrder, selectedStatus]);

  useEffect(() => {
    if (withdrawReqs && withdrawReqs.requests.length > 0) {
      const pages = Math.ceil(withdrawReqs.total / count);
      setTotalPages(pages);
    }
  }, [withdrawReqs]);

  const navigateToWithdraw = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("stage");
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      setSelectedStatus("0,1,2,3,4,5"); // Include all statuses in the filter
    } else {
      setSelectedStatus(selectedValue); // For a single status, use its value directly
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderBgColor = (status) => {
    switch (status) {
      case 0:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #0e5685 100%)",
        };
      case 1:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%,  #2a9995cf 100%)",
        };
      case 2:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #71190afa 100%)",
        };
      case 3:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #000000bd 100%)",
        };
      case 4:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #4fb328a3 100%)",
        };
      case 5:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgb(0, 0, 0) 100%)",
        };
      default:
        return {
          background: "#11385199",
        };
    }
  };

  const renderReqStatus = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Not Approved";
      case 3:
        return "Cancelled";
      case 4:
        return "Payed";
      case 5:
        return "Confirmed";
      default:
        return " ";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 2,
      hour12: false,
    });
  };

  // Get unique statuses from withdrawReqs if it's not empty
  const uniqueStatuses =
    withdrawReqs && withdrawReqs.requests.length > 0
      ? [...new Set(withdrawReqs.requests.map((req) => req.status))].sort()
      : [];

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

      <div className={classes.RequestsContainer}>
        <div className={classes.FilterContainer}>
          <div className={classes.Filter}>
            <label htmlFor="statusFilter">{translate("Status:")}</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={handleStatusChange}
              className={classes.Select}
            >
              <option value="0,1,2,3,4,5">{translate("All")}</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {translate(renderReqStatus(status))}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.Filter}>
            <label htmlFor="sortOrder" className={classes.SortLabel}>
              {translate("Sort By:")}
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className={classes.Select}
            >
              <option value="Amount_asc">
                {translate("Ascending Amount")}
              </option>
              <option value="Amount_desc">
                {translate("Descending Amount")}
              </option>
              <option value="DateAdded_asc">
                {translate("Ascending Date")}
              </option>
              <option value="DateAdded_desc">
                {translate("Descending Date")}
              </option>
            </select>
          </div>
        </div>
        {/* {filteredRequests && filteredRequests.length > 0 ? ( */}
        {withdrawReqs && withdrawReqs.requests.length > 0 ? (
          <>
            {/* <div className={classes.FilterContainer}>
              <div className={classes.Filter}>
                <label htmlFor="statusFilter">{translate("Status:")}</label>
                <select
                  id="statusFilter"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className={classes.Select}
                >
                  <option value="0,1,2,3,4,5">{translate("All")}</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {translate(renderReqStatus(status))}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.Filter}>
                <label htmlFor="sortOrder" className={classes.SortLabel}>
                  {translate("Sort By:")}
                </label>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  className={classes.Select}
                >
                  <option value="Amount_asc">
                    {translate("Ascending Amount")}
                  </option>
                  <option value="Amount_desc">
                    {translate("Descending Amount")}
                  </option>
                  <option value="Date_desc">
                    {translate("Ascending Date")}
                  </option>
                  <option value="Date_desc">
                    {translate("Descending Date")}
                  </option>
                </select>
              </div>
            </div> */}
            <div className={classes.Requests}>
              {/* {filteredRequests.map((req, index) => ( */}
              {withdrawReqs.requests.map((req, index) => (
                <div
                  className={classes.Req}
                  style={renderBgColor(req.status)}
                  key={index}
                >
                  <div className={classes.Left}>
                    <p>
                      <b>{translate(`Request Id: `)} </b>#{req.reqId}
                    </p>
                    <p>{formatDate(req.dateAdded)}</p>
                    <p style={{ fontSize: "0.8rem", color: "lightblue" }}>
                      <i>
                        {translate(`Account Id: `)}
                        {req.accountid}
                      </i>
                    </p>
                  </div>
                  <div className={classes.Center}>
                    <p>
                      {translate(`Amount: `)}
                      <b> {req.amount} </b>
                      <b> {req.currency}</b>
                    </p>
                  </div>
                  <div className={classes.Right}>
                    <p>
                      <b>{renderReqStatus(req.status)}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className={classes.Pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <AngleLeftIcon />
              </button>
              <span>
                {translate("Page")} {currentPage} {translate("of")} {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <AngleRightIcon />
              </button>
            </div>
          </>
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
