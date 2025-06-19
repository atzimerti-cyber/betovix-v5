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
import { formatDate } from "../../../utils/custom";

const TransactionsModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);

  const transactions = useSelector((state) => state.modal.transactions);

  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [customPeriod, setCustomPeriod] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [includeCasino, setIncludeCasino] = useState(false);

  const count = 5;

  useEffect(() => {
    if (includeCasino && selectedPeriod !== "today" && selectedPeriod !== "custom") return;

    const controller = new AbortController();
    const signal = controller.signal;
    const dateQuery = getFilterQuery();

    if (!dateQuery) return;

    const filter = {
      count: count,
      page: currentPage,
      sort: "Id_desc",
      filter: {
        AccountId: user.AccountId,
        DateAdded: dateQuery,
        WalletTypeId: 1,
        JoinCasino: includeCasino,
      },
    };

    dispatch(getTransactionList(signal, filter));
    return () => {
      controller.abort();
    };
  }, [currentPage, user, selectedPeriod, customPeriod, includeCasino, dispatch]);

  useEffect(() => {
    if (transactions && transactions.Rows.length > 0) {
      const pages = Math.ceil(transactions.Total / count);
      setTotalPages(pages);
    }
  }, [transactions]);

  const handlePeriodChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPeriod(selectedValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (includeCasino && selectedPeriod !== "today" && selectedPeriod !== "custom") {
      setSelectedPeriod("today");
      setCustomPeriod({ from: "", to: "" }); // clear custom fields if needed
    }
  }, [includeCasino]);


  const handleCustomDateChange = (field, value) => {
    setCustomPeriod((prev) => ({ ...prev, [field]: value }));
  };

  const getFilterQuery = () => {
    const formatDateForQuery = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const now = new Date();

    if (selectedPeriod === "today") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      return ` (DateAdded BETWEEN '${formatDateForQuery(startOfDay)}' AND '${formatDateForQuery(endOfDay)}') `;
    }

    if (selectedPeriod === "1week" && !includeCasino) {
      const from = new Date(now);
      from.setDate(now.getDate() - 7);
      const to = new Date();

      return ` (DateAdded BETWEEN '${formatDateForQuery(from)}' AND '${formatDateForQuery(to)}') `;
    }

    if (selectedPeriod === "30days" && !includeCasino) {
      const from = new Date(now);
      from.setDate(now.getDate() - 30);
      const to = new Date();

      return ` (DateAdded BETWEEN '${formatDateForQuery(from)}' AND '${formatDateForQuery(to)}') `;
    }

    if (selectedPeriod === "custom" && customPeriod.from && customPeriod.to) {
      if (includeCasino && customPeriod.from !== customPeriod.to) return "";

      const from = new Date(customPeriod.from);
      from.setHours(0, 0, 0, 0);

      const to = new Date(customPeriod.to);
      to.setHours(23, 59, 59, 999);

      return ` (DateAdded BETWEEN '${formatDateForQuery(from)}' AND '${formatDateForQuery(to)}') `;
    }

    return ""; // fallback for invalid state
  };


  const renderBgColor = (kind) => {
    switch (kind) {
      case 'Deposit':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%,  #2a9995cf 100%)",
        };
      case 'Withdraw':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #71190afa 100%)",
        };
      case 'Bet':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #000000bd 100%)",
        };
      case 'Win':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #4fb328a3 100%)",
        };
      case 'BonusWin':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #007d8b 100%)",
        };
      case 'Sport':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #1f78d1 100%)",
        };
      case 'Slot':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #ffa500 100%)",
        };
      case 'Casino':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #6a1b9a 100%)",
        };
      case 'Reward':
        return {
          background:
            "linear-gradient(161deg, #10324b 0%, #1c405d 30%, #ffeb3b 100%)",
        };
      case 'Cancel Withdraw':
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
      case 13:
        return translate("GambPay");
      case 14:
        return translate("PayNora");
      case 15:
        return translate("GambPays Bank Transfer");
      case 16:
        return translate("GambPays Credit Card");
      case 17:
        return translate("PaPaRa");
      case 18:
        return translate("PayFix");
      case 19:
        return translate("PayCo");
      case 20:
        return translate("VouchStar_Skrill");
      case 21:
        return translate("VouchStar_Sofort");
      case 22:
        return translate("VouchStar_Bancontact");
      case 23:
        return translate("VouchStar");
      case 24:
        return translate("PayCo");
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

  return (
    <div className={classes.TransactionsModal}>
      <div className={classes.ModalContent}>
        <ModalHeader
          icon={<TransactionsIcon />}
          title={translate("My Transactions")}
        />

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
                  <label htmlFor="dateFilter">
                    <i>{translate("Search Period")}:</i>
                  </label>
                  <select
                    id="dateFilter"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    className={classes.Select}
                  >
                    <option value="today">{translate("Today")}</option>
                    <option value="1week" disabled={includeCasino}>{translate("Last 1 Week")}</option>
                    <option value="30days" disabled={includeCasino}>{translate("Last 30 Days")}</option>
                    <option value="custom">{translate("Custom")}</option>
                  </select>
                </div>
                {selectedPeriod === "custom" && (
                  <div className={classes.CustomPeriod}>
                    <div>
                      <label htmlFor="fromFilter">
                        <i>{translate("From")}:</i>
                      </label>

                      <input
                        id="fromFilter"
                        type="date"
                        value={customPeriod.from}
                        onChange={(e) =>
                          handleCustomDateChange("from", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="toFilter">
                        <i>{translate("To")}:</i>
                      </label>

                      <input
                        id="toFilter"
                        type="date"
                        value={customPeriod.to}
                        onChange={(e) =>
                          handleCustomDateChange("to", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
                <div className={classes.CheckboxContainer}>
                  <label>
                    <input
                      type="checkbox"
                      checked={includeCasino}
                      onChange={(e) => setIncludeCasino(e.target.checked)}
                    />
                    {translate("Include Casino")}
                  </label>
                </div>
                {includeCasino && selectedPeriod === "custom" && customPeriod.from && customPeriod.to && customPeriod.from !== customPeriod.to && (
                  <p style={{ color: "orange", fontSize: "0.75rem" }}>
                    **{" "} {translate("When including Casino, custom date range must be one day only")}.
                  </p>
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
                        <p>
                          {formatDate(transaction.Data.DateAdded, "datetime")}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "lightblue" }}>
                          <i>
                            {transaction.Account.Username} (
                            {transaction.Account.AccountId})
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
                          <b>{transaction.Data.Type}</b>
                        </p>
                        <p>
                          <b>{transaction.Data.Kind}</b>
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
                    {translate("Page")} {currentPage} {translate("of")}{" "}
                    {totalPages}
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
