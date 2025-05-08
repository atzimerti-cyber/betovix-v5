import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, React } from "react";
import Barcode from "react-barcode";

import CloseButton from "../../UI/Buttons/CloseButton";
import { translate } from "../../../utils/translations";
import { getTicket } from "../modalAsyncActions";
import { modalActions } from "../modalSlice";
import { betslipActions } from "../../Betslip/betslipSlice";
import classes from "./TicketReceiptModal.module.css";
import Plus18Icon from "../../../assets/svgs/plus-18.svg?react";

import {
  formatDateTime,
  formatPoint,
  getTimeUntil,
} from "../../../utils/custom";

const TicketReceipt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.betslip.ticketId) || null;
  const ticket = useSelector((state) => state.modal.ticketToPrint) || null;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (id && id !== null) {
      dispatch(getTicket(signal, id));
      dispatch(betslipActions.setTriggerPlaceBet(false));
    }

    return () => dispatch(modalActions.setTicket(null));
  }, [id]);

  const printPdf = () => {
    window.print();
  };

  return (
    <div className={classes.TicketReceipt}>
      <div className={classes.ModalContent}>
        <header>
          <span className={classes.Center}>
            <h1>{translate("Ticket Receipt")}</h1>
          </span>
          <span className={classes.Right}>
            <CloseButton
              timesIcon
              color="transparent"
              onClick={() => navigate(location.pathname)}
            />
          </span>
        </header>

        <div className={classes.TicketReceiptContent}>
          <div className={classes.printOddsGeneratedFile}>
            <div id="divToBePrinted" className={classes.divToBePrinted}>
              <div className={classes.bodyPrint}>
                <div className={classes.info}>
                  <div className={classes.left}>
                    <div>{translate("Date")}</div>
                    <div>{translate("Code")}</div>
                    <div>{translate("Bet")}</div>
                    <div>{translate("User type")}</div>
                    <div>{translate("Print Date")}</div>
                  </div>
                  <div className={classes.right}>
                    <div id="date">
                      {formatDateTime(ticket?.Ticket?.Placement)}
                    </div>
                    <div id="idticket">{ticket?.Ticket?.TicketCode}</div>
                    <div id="type">
                      {ticket?.Ticket?.isLive ? "Live" : "Prematch"}
                    </div>
                    <div id="usertype">{translate("Player")}</div>
                    <div id="printdate">{formatDateTime(new Date())}</div>
                  </div>
                </div>

                <div className={classes.ticketBody}>
                  {ticket?.Ticket?.TicketEvents?.length > 0
                    ? ticket.Ticket.TicketEvents.map((event, index) => (
                        <div
                          key={index}
                          className={classes.row}
                          style={{ padding: "5px 0" }}
                        >
                          <div className={classes.eventContainer}>
                            <div className={classes.fullWidth}>
                              <span
                                className={`${classes.twoThirds} ${classes.matchName}`}
                              >
                                {event.Event}
                              </span>
                              <span className={classes.right}></span>
                            </div>
                            <div
                              className={`${classes.fullWidth} ${classes.matchInfos}`}
                            >
                              <span
                                className={`${classes.oneThird} ${classes.matchSport}`}
                              >
                                {event.Sport}
                              </span>
                              <span
                                className={`${classes.right} ${classes.matchDate}`}
                                style={{ marginBottom: "3px" }}
                              >
                                {event.Live
                                  ? "Live"
                                  : formatDateTime(event.DateOfMatch)}
                              </span>
                            </div>
                            <div className={classes.fullWidth}>
                              {/* <span className={classes.twoThirds}> */}
                              {event.BB && event.BB.length > 0 ? (
                                event.BB.map((bbmarket) => (
                                  <span className={classes.twoThirds}>
                                    <span className={classes.matchMarket}>
                                      {bbmarket.MarketName}
                                    </span>
                                    <span
                                      className={`${classes.right} ${classes.matchPoint}`}
                                      style={{ marginRight: "0px" }}
                                    >
                                      {bbmarket.PointName}
                                    </span>
                                  </span>
                                ))
                              ) : (
                                <span className={classes.twoThirds}>
                                  <span className={classes.matchMarket}>
                                    {event.MarketName}
                                  </span>
                                  <span
                                    className={`${classes.right} ${classes.matchPoint}`}
                                    style={{ marginRight: "0px" }}
                                  >
                                    {" "}
                                    {event.PointName}
                                  </span>
                                </span>
                              )}
                              {/* {event.BB && event.BB.length > 0 ? (
                                event.BB.map((bbpoint) => (
                                  <span
                                    className={`${classes.right} ${classes.matchPoint}`}
                                    style={{ marginRight: "0px" }}
                                  >
                                    {bbpoint.PointName}
                                  </span>
                                ))
                              ) : (
                                <span
                                  className={`${classes.right} ${classes.matchPoint}`}
                                  style={{ marginRight: "0px" }}
                                >
                                  {" "}
                                  {event.PointName}
                                </span>
                              )} */}
                              {/* </span> */}
                              <span className={classes.right}>
                                {translate("Odds")}:{" "}
                                <span className={classes.matchOdd}>
                                  {formatPoint(event.Odd)}
                                </span>
                              </span>
                            </div>
                            <div className={classes.fullWidth}></div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>

                <div className={classes.info}>
                  <div className={`${classes.title} ${classes.noboder}`}>
                    <div className={classes.half}>
                      {translate("NR Events")}:{" "}
                      <span id="eventi" className={classes.metricsNumofbets}>
                        {ticket?.Ticket?.Type}
                      </span>
                    </div>
                    <div
                      className={classes.half}
                      style={{ textAlign: "right" }}
                    >
                      <span className={classes.metricsTotalodds}>
                        {ticket?.Ticket?.BetType}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={classes.info}
                  style={{ marginTop: "4px", borderWidth: "3px", gap: "2px" }}
                >
                  <div className={classes.left}>
                    <div>{translate("BET AMOUNT")}</div>
                    <div>{translate("NET STAKE")}</div>
                    <div>{translate("TOTAL TAX")}</div>
                    <div
                    // style={{ padding: "0 8px", fontSize: "11px" }}
                    >
                      {translate("BET TAX")}
                    </div>
                    <div
                    // style={{ padding: "0 8px", fontSize: "11px" }}
                    >
                      {translate("WIN TAX")}
                    </div>
                    <div>{translate("BONUS")}</div>
                    <div>{translate("MAX WINS")}</div>
                  </div>
                  <div className={classes.right}>
                    <div>
                      <span className={classes.betAmount}>
                        {ticket?.Ticket?.Stake
                          ? ticket.Ticket.Stake.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div>
                      <span className={classes.netStake}>
                        {ticket?.Tax?.StakeNet
                          ? ticket.Tax.StakeNet.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div>
                      <span className={classes.totalTax}>
                        {ticket?.Tax?.TotalTax
                          ? ticket.Tax.TotalTax.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div style={{ padding: "0", fontSize: "11px" }}>
                      <span className={classes.betTax}>
                        {ticket?.Tax?.TotalBetTax
                          ? ticket.Tax.TotalBetTax.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div style={{ padding: "0", fontSize: "11px" }}>
                      <span className={classes.winTax}>
                        {ticket?.Tax?.TotalWinTax
                          ? ticket.Tax.TotalWinTax.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div>
                      <span className={classes.bonus}>
                        {ticket?.BonusParoli?.WinAmount
                          ? ticket.BonusParoli.WinAmount.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div>
                      <span className={classes.maxWins}>
                        {ticket?.Ticket?.MaxWins
                          ? ticket.Ticket.MaxWins.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={classes.barcode} style={{ marginTop: "4px" }}>
                  {ticket?.Ticket?.TicketId ? (
                    <Barcode
                      value={ticket?.Ticket?.TicketId?.toString().padStart(
                        11,
                        "0"
                      )}
                      format="codabar"
                      width={2}
                      height={80}
                      displayValue={true}
                      background="#84d0e5"
                      lineColor="#000000"
                    />
                  ) : null}
                </div>

                <div className={classes.topinfo}>
                  <strong>{translate("Cashier Code")} : </strong>
                  <span className="casherCode">{ticket?.Ticket?.TicketId}</span>
                </div>

                <div
                  className={classes.topinfo}
                  style={{ padding: "0", lineHeight: "12px" }}
                >
                  {translate(
                    "The Proponent of the game account has accepted and knows the current regulation available on our website. This data transmission receipt is valid only if the transaction process has been carried out exclusively via Internet."
                  )}
                </div>

                <div
                  className={classes.topinfo}
                  style={{ padding: "0", lineHeight: "12px" }}
                ></div>

                <div
                  className={classes.disclaimer}
                  style={{ padding: "0", paddingTop: "15px" }}
                >
                  <Plus18Icon
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: "205px",
                      verticalAlign: "top",
                      fontSize: "10px",
                      lineHeight: "12px",
                    }}
                  >
                    {translate(
                      "Gaming can cause addiction. Gaming is forbidden for anyone under 18 years"
                    )}
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.footerPrintOdds} onClick={printPdf}>
            <div className={classes.pdfExport}>{translate("Print  PDF")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketReceipt;
