import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DsButton from "../../../features/UI/Buttons/DsButton";
import classes from "./WithdrawRequests.module.css";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import NoReqs from "../../../assets/svgs/no-withdraw-reqs.svg?react";
import { translate } from "../../../utils/translations";
import { getWithrawalReqs, cancelWithdrawRequest } from "../cryptoAsyncActions";
import MainButton from "../../../features/UI/Buttons/MainButton";
import AngleLeftIcon from "../../../assets/svgs/angle-left.svg?react";
import AngleRightIcon from "../../../assets/svgs/angle-right.svg?react";
import UpArrowIcon from "../../../assets/svgs/up.svg?react";
import DownArrowIcon from "../../../assets/svgs/down.svg?react";
import { formatDate } from "../../../utils/custom";

const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const withdrawReqs = useSelector((state) => state.crypto.withdrawals);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("DateAdded_desc");
  const [amountSortOrder, setAmountSortOrder] = useState("Amount_asc");
  const [dateSortOrder, setDateSortOrder] = useState("DateAdded_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const count = 10;
  const [ongoingCancellations, setOngoingCancellations] = useState(new Set());

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(
      getWithrawalReqs(signal, currentPage, count, sortOrder, selectedStatus)
    );
    return () => {
      controller.abort();
    };
  }, [currentPage, sortOrder, selectedStatus, dispatch]);

  const refreshData = (reqid) => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(
      getWithrawalReqs(signal, currentPage, count, sortOrder, selectedStatus)
    );

    setOngoingCancellations((prev) => {
      const updated = new Set(prev);
      updated.delete(reqid); // Remove reqId from the set after response
      return updated;
    });
  };

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
      setSelectedStatus(""); // Include all statuses in the filter
    } else {
      setSelectedStatus(selectedValue); // For a single status, use its value directly
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleAmountSortOrder = () => {
    const newOrder =
      amountSortOrder === "Amount_asc" ? "Amount_desc" : "Amount_asc";
    setAmountSortOrder(newOrder);
    setSortOrder(newOrder);
  };

  const toggleDateSortOrder = () => {
    const newOrder =
      dateSortOrder === "DateAdded_asc" ? "DateAdded_desc" : "DateAdded_asc";
    setSortOrder(newOrder);
    setDateSortOrder(newOrder);
  };

  const renderBgColor = (status) => {
    switch (status) {
      case 0:
        // return {
        //   background:
        //     "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #0e5685 100%)",
        // };
        return {
          background: "var(--wr-pending)",
        };
      case 1:
        // return {
        //   background:
        //     "linear-gradient(161deg, #10324b 0%, #1c405d 30%,  #2a9995cf 100%)",
        //     "linear-gradient(161deg, #10324b 0%, #1c405d 30%,  #2a9995cf 100%)",
        // };
        return {
          background: "var(--wr-approved)",
        };
      case 2:
        return {
          background:
            // "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #71190afa 100%)",
            "var(--wr-not-approved)",
        };
      case 3:
        return {
          background:
            // "linear-gradient(161deg,rgba(16, 50, 75, 0.92) 0%,rgba(93, 28, 28, 0.5) 40%,rgba(153, 30, 30, 0.74) 100%)",
            "var(--wr-cancelled)",
        };
      case 4:
        return {
          background: "var(--wr-payed)",
        };
      case 5:
        return {
          background: "var(--wr-confirmed)",
          // "linear-gradient(161deg, #10324b 0%, #1c405d 30%, rgba(141, 239, 75, 0.47) 100%)",
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

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     fractionalSecondDigits: 2,
  //     hour12: false,
  //   });
  // };

  const handleCancelRequest = (reqid) => {
    if (ongoingCancellations.has(reqid)) return; // Prevent multiple clicks

    setOngoingCancellations((prev) => new Set(prev).add(reqid)); // Add reqId to the set

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(
      cancelWithdrawRequest(signal, reqid, () => {
        refreshData(reqid);
      })
    ).catch(() => {
      setOngoingCancellations((prev) => {
        const updated = new Set(prev);
        updated.delete(reqid); // Ensure removal on error
        return updated;
      });
    });
  };

  const uniqueStatuses = [0, 1, 2, 3, 4, 5];

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
            <label htmlFor="statusFilter">{translate("Status")}:</label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={handleStatusChange}
              className={classes.Select}
            >
              <option value="">{translate("All")}</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {translate(renderReqStatus(status))}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.Filter}>
            <div className={classes.FilterSort}>
              <label htmlFor="amountSort" className={classes.SortLabel}>
                {translate("Amount")}
              </label>
              <button
                id="amountSort"
                onClick={toggleAmountSortOrder}
                className={classes.SortButton}
              >
                {amountSortOrder === "Amount_asc" ? (
                  <>
                    <UpArrowIcon fill="#ffffff" />
                    <DownArrowIcon fill="#494949" />
                  </>
                ) : (
                  <>
                    <UpArrowIcon fill="#494949" />
                    <DownArrowIcon fill="#ffffff" />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className={classes.Filter}>
            <div className={classes.FilterSort}>
              <label htmlFor="dateSort" className={classes.SortLabel}>
                {translate("Date")}
              </label>
              <button
                id="dateSort"
                onClick={toggleDateSortOrder}
                className={classes.SortButton}
              >
                {dateSortOrder === "DateAdded_asc" ? (
                  <>
                    <UpArrowIcon fill="#ffffff" />
                    <DownArrowIcon fill="#494949" />
                  </>
                ) : (
                  <>
                    <UpArrowIcon fill="#494949" />
                    <DownArrowIcon fill="#ffffff" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {withdrawReqs && withdrawReqs.requests.length > 0 ? (
          <>
            <div className={classes.Requests}>
              {withdrawReqs.requests.map((req, index) => (
                <div
                  className={classes.Req}
                  style={renderBgColor(req.status)}
                  key={index}
                >
                  <div className={classes.Left}>
                    <p>
                      <b>
                        {translate(`Request Id`)} {": "}
                      </b>
                      #{req.reqId}
                    </p>
                    <p>{formatDate(req.dateAdded, "datetime")}</p>
                    <p style={{ fontSize: "0.8rem", color: "lightblue" }}>
                      <i>
                        {translate(`Account Id`)}
                        {": "}
                        {req.accountid}
                      </i>
                    </p>
                  </div>
                  <div className={classes.Center}>
                    <p>
                      {translate(`Amount`)}
                      {": "}
                      <b> {req.amount} </b>
                      <b> {req.currency}</b>
                    </p>
                  </div>
                  <div className={classes.Right}>
                    <p>
                      <b>{renderReqStatus(req.status)}</b>
                    </p>
                    {req.status === 0 && ( // Show Cancel button only if status is Pending
                      <MainButton
                        color="danger"
                        onClick={() => handleCancelRequest(req.reqId)}
                        className={classes.CancelButton}
                        disabled={ongoingCancellations.has(req.reqId)} // Disable button during cancellation
                      >
                        {ongoingCancellations.has(req.reqId)
                          ? translate("Cancelling...")
                          : translate("Cancel Request")}
                      </MainButton>
                    )}
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
            <span>{translate(`No withdrawal requests`)}.</span>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawRequests;
