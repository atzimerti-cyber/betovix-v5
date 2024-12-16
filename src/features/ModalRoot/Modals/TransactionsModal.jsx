import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./TransactionsModal.module.css";
import { translate } from "../../../utils/translations";
import { getTransactionList } from "../modalAsyncActions";
import ModalHeader from "../features/ModalHeader";
import TransactionsIcon from "../../../assets/svgs/trans-icon.svg?react";
import AngleLeftIcon from "../../../assets/svgs/angle-left.svg?react";
import AngleRightIcon from "../../../assets/svgs/angle-right.svg?react";

const TransactionsModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const transactions = useSelector((state) => state.modal.transactions);

  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [customPeriod, setCustomPeriod] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const count = 5;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const dateQuery = getFilterQuery();

    const filter = {
      count: count,
      page: currentPage,
      sort: "Id_desc",
      filter: {
        AccountId: user.AccountId,
        DateAdded: dateQuery,
        Kind: "( (Kind=1 OR Kind=3 OR Kind=5 OR Kind=7)  OR (Kind=2 OR Kind=4 OR Kind=6 OR Kind=8) )",
        WalletTypeId: 1
      }
    }

    dispatch(
      getTransactionList(signal, filter)
    );
    return () => {
      controller.abort();
    };
  }, [currentPage, user, selectedPeriod, customPeriod, dispatch]);

  useEffect(() => {
    if (transactions && transactions.Rows.length > 0) {
      const pages = Math.ceil(transactions.Total / count);
      setTotalPages(pages);
    }
  }, [transactions]);

  const handlePeriodChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPeriod(selectedValue);
  };

  const handleCustomDateChange = (field, value) => {
    setCustomPeriod((prev) => ({ ...prev, [field]: value }));
  };

  const getFilterQuery = () => {
    const currentDate = new Date();
    let fromDate = "";
    let toDate = "";
  
    // Function to format date in 'YYYY-MM-DD HH:MM:SS' format
    const formatDateForQuery = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    switch (selectedPeriod) {
      case "today":
        // Set fromDate to start of today (00:00:00)
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        fromDate = formatDateForQuery(startOfDay);
  
        // Set toDate to end of today (23:59:59)
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
        toDate = formatDateForQuery(endOfDay);
        break;
  
      case "1week":
        const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
        fromDate = formatDateForQuery(oneWeekAgo);
        toDate = formatDateForQuery(new Date()); // Current date
        break;
  
      case "30days":
        const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));
        fromDate = formatDateForQuery(thirtyDaysAgo);
        toDate = formatDateForQuery(new Date()); // Current date
        break;
  
      case "custom":
        if (customPeriod.from && customPeriod.to) {
          fromDate = formatDateForQuery(new Date(customPeriod.from));
          toDate = formatDateForQuery(new Date(customPeriod.to));
        } else {
          return ""; // Return an empty filter query or a fallback value
        }
        break;
  
      default:
        break;
    }
  
    // Return the query formatted correctly for SQL
    return ` (DateAdded BETWEEN '${fromDate}' AND '${toDate}') `;
  };

  const renderBgColor = (kind) => {
    switch (kind) {
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
      case 6:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #4fb328a3 100%)",
        };
      case 7:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #000000bd 100%)",
        };
      case 8:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #4fb328a3 100%)",
        };
      case 9:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #1f78d1 100%)",
        };
      case 10:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #ffa500 100%)",
        };
      case 11:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #6a1b9a 100%)",
        };
      case 12:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #ffeb3b 100%)",
        };
      case 13:
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #f44336 100%)",
        };
      default:
        return {
          background: "#11385199",
        };
    }
  };

  const renderTransactionType = (type) => {
    switch (type) {
      case 1:
        return translate("Transfer");
      case 2:
        return translate("Sport");
      case 3:
        return translate("Slot");
      case 4:
        return translate("Casino");
      case 5:
        return translate("Bonus");
      case 6:
        return translate("Blockonomics");
      case 7:
        return translate("CoinPayments");
      case 8:
        return translate("NativeTronPayments");
      case 9:
        return translate("Gamification");
      case 10:
        return translate("Chapa");
      case 11:
        return translate("Voucher");
      case 12:
        return translate("Interkassa");
      default:
        return " ";
    }
  };

  const renderTransactionKind = (kind) => {
    switch (kind) {
      case 1:
        return translate("Deposit");
      case 2:
        return translate("Withdraw");
      case 3:
        return translate("Bet");
      case 4:
        return translate("Win");
      case 5:
        return translate("Bet");
      case 6:
        return translate("Win");
      case 7:
        return translate("Bet");
      case 8:
        return translate("Win");
      case 9:
        return translate("Sport");
      case 10:
        return translate("Slot");
      case 11:
        return translate("Casino");
      case 12:
        return translate("Reward");
      case 13:
        return translate("Cancel Withdraw");
      default:
        return " ";
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
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

  return (
    <div className={classes.TransactionsModal}>
      <div className={classes.ModalContent}>
        <ModalHeader icon={<TransactionsIcon />} title={translate("My Transactions")} />

        <div className={classes.TransactionsContent}>
          <div
            className={classes.TransactionsContainer}
            style={{
              justifyContent:
                transactions && transactions.Rows?.length < 1 && "center",
            }}
          >
          <div className={classes.FilterContainer}>
            <div className={classes.Filter}>
              <div>
              <label htmlFor="dateFilter"><i>{translate("Search Period")}:</i></label>
              <select
                id="dateFilter"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className={classes.Select}
              >
                <option value="today">{translate("Today")}</option>
                <option value="1week">{translate("Last 1 Week")}</option>
                <option value="30days">{translate("Last 30 Days")}</option>
                <option value="custom">{translate("Custom")}</option>
              </select>
              </div>
              {selectedPeriod === "custom" && (
                <div className={classes.CustomPeriod}>
                  <div>
                  <label htmlFor="fromFilter"><i>{translate("From")}:</i></label>
                    
                    <input
                      id="fromFilter"
                      type="date"
                      value={customPeriod.from}
                      onChange={(e) => handleCustomDateChange("from", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="toFilter"><i>{translate("To")}:</i></label>
                    
                    <input
                      id="toFilter"
                      type="date"
                      value={customPeriod.to}
                      onChange={(e) => handleCustomDateChange("to", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
            {transactions && transactions.Rows.length > 0 ? (
              <>
                <div className={classes.Transactions}>
                  {transactions.Rows.map((transaction, index) => (
                    <div
                      className={classes.transaction}
                      style={renderBgColor(transaction.Data.Kind)}
                      key={index}
                    >
                      <div className={classes.Left}>
                        <p>
                          <b>
                            {translate(`Id`)} {": "}
                          </b>
                          #{transaction.Data.Id}
                        </p>
                        <p>{formatDate(transaction.Data.DateAdded)}</p>
                        <p style={{ fontSize: "0.8rem", color: "lightblue" }}>
                          <i>
                            {transaction.Account.Username} ({transaction.Account.AccountId})
                          </i>
                        </p>
                      </div>
                      <div className={classes.Center}>
                        <p>
                          {translate(`Amount`)}
                          {": "}
                          <b> {transaction.Data.Amount.toFixed(2)} </b>
                        </p>
                        <p>
                          {translate(`Balance After`)}
                          {": "}
                          <b> {transaction.Data.BalanceAfter.toFixed(2)} </b>
                        </p>
                      </div>
                      <div className={classes.Right}>
                        <p>
                          <b>{renderTransactionType(transaction.Data.Type)}</b>
                        </p> 
                        <p>
                          <b>{renderTransactionKind(transaction.Data.Kind)}</b>
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
              <div className={classes.NoTransactions}>
                <span>{translate(`No transactions`)}.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModal;
