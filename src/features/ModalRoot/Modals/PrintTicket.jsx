import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import QRCode from "react-qr-code";

import classes from "./PrintTicket.module.css";
import { getTicketWithId } from "../../Betslip/betslipAsyncActions";
import TimesIcon from "../../../assets/svgs/times.svg?react";
import TicketIcon from "../../../assets/svgs/receipt-search.svg?react";
import Spinner from "../../UI/Spinner/Spinner";
import MainButton from "../../UI/Buttons/MainButton";
import { translate } from "../../../utils/translations";
import { formatDate, formatPoint } from "../../../utils/custom";
import Plus18Icon from '../../../assets/svgs/plus-18.svg?react';
import { betslipActions } from "../../Betslip/betslipSlice";
import CircleCheckSolidIcon from "../../../assets/svgs/circle-check-solid.svg?react";
import CircleXmarkSolidIcon from "../../../assets/svgs/circle-xmark-solid.svg?react";

const PrintTicket = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    onBeforeGetContent: () => {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    },
  });

  const timezone = useSelector((state) => state.layout.timezone); // triggers recalc on timezone change
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const ticketToPrint = useSelector((state) => state.betslip.ticketToPrint);
  const loading = useSelector((state) => state.betslip.loading);
  const user = useSelector((state) => state.login.user);
  const selectedOddsFormat = useSelector((state) => state.app.selectedOddsFormat);
  const ticket = useSelector((state) => state.betslip.ticketToPrint);

  const totalOdds = (ticketToPrint) => {
    let totalOdds = 1;
    ticketToPrint.TicketEvents?.map(
      (ticketEvent) => (totalOdds = totalOdds * ticketEvent.Odd)
    );
    return totalOdds.toFixed(2);
  };
  const convertOdds = (decimalOdds) => {
    if (!decimalOdds || decimalOdds === '-' || decimalOdds < 1) {
      return '-';
    }
    if (decimalOdds == 1) {
      return decimalOdds;
    }
    switch (selectedOddsFormat) {
      case 'Decimal':
        return decimalOdds.toFixed(2);
      case 'American':
        return decimalOdds >= 2.0
          ? `+${Math.round((decimalOdds - 1) * 100)}`
          : `-${Math.round(100 / (decimalOdds - 1))}`;
      case 'Fractional':
        const num = Math.round((decimalOdds - 1) * 100);
        const den = 100;
        const gcd = (a, b) => (b ? gcd(b, a % b) : a);
        const div = gcd(num, den);
        return `${num / div}/${den / div}`;
      case 'Hong Kong':
        return (decimalOdds - 1).toFixed(2);
      case 'Indonesian':
        return decimalOdds >= 2.0
          ? (decimalOdds - 1).toFixed(2)
          : (-1 / (decimalOdds - 1)).toFixed(2);
      case 'Malay':
        return decimalOdds >= 2.0
          ? (-1 / (decimalOdds - 1)).toFixed(2)
          : (decimalOdds - 1).toFixed(2);
      default:
        return 'Unknown format';
    }
  };

  useEffect(() => {
    if (!ticket) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("modal");

      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString(),
        },
        { replace: true } // prevents back button reopening modal
      );

      return;
    }
    const controller = new AbortController();

    const ticketId = ticket.TicketCode;

    dispatch(getTicketWithId(controller.signal, ticketId));

    return () => {
      controller?.abort;
      dispatch(betslipActions.setTicketToPrint(null));
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!ticketToPrint) return;

    const query = new URLSearchParams(location.search);
    const autoPrint = query.get("auto-print");
    if (!autoPrint) return;

    reactToPrintFn();
  }, [loading && ticketToPrint]);

  const getStyle = () => {
    return `@page { size: portrait!important; } `;
  };

  const getBarcodeValue = () => {
    const baseUrl = window.location.origin;
    const ticketId = ticketToPrint.Ticket.TicketCode;
    return `${baseUrl}/sports/home?modal=print-ticket&ticketid=${ticketId}`;

  };

  const getStatusClass = (status, cashout) => {
    switch (status) {
      case -1:
        return classes.Pending;
      case 0:
        return classes.Lost;
      case 1:
        return classes.Won;
      case 2:
        return cashout ? classes.Cashout : classes.Cancelled;
      case 3:
        return classes.Review;
      default:
        return "";
    }
  };


  return (
    <div className={classes.PrintTicket}>
      <div className={classes.Header}>
        <div className={classes.Title}>
          <h2>{translate("Ticket Receipt")}</h2>
        </div>
        <div className={classes.CloseButton} onClick={props.onClose}>
          <TimesIcon />
        </div>
      </div>

      <div className={classes.Content}>
        {loading && (
          <div className={classes.Loading}>
            <Spinner />
          </div>
        )}

        <div className={classes.ContentInner}>
          {!loading && ticketToPrint && ticketToPrint.Ticket ? (
            <div
              ref={contentRef}
              className={["componentToPrint", classes.ComponentToPrint].join(
                " "
              )}
            >
              <style>{getStyle()}</style>

              <table>
                <thead>
                  <tr>
                    <td>

                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={classes.Info}>
                        <div className={classes.Left}>
                          <div>{translate("Date")}</div>
                          <div>{translate("Code")}</div>
                          <div>{translate("Bet")}</div>
                          <div>{translate("User Type")}</div>
                          <div>{translate("Print Date")}</div>
                        </div>
                        <div className={classes.Right}>
                          <div>
                            {formatDate(
                              ticketToPrint.Ticket.Placement,
                              "datetime"
                            )}
                          </div>
                          <div>{ticketToPrint.Ticket.TicketCode}</div>
                          <div>
                            {ticketToPrint.Ticket.EventsType === "Pre"
                              ? translate("Prematch")
                              : translate(ticketToPrint.Ticket.EventsType)}
                          </div>
                          <div>{formatDate(new Date(), "datetime")}</div>
                        </div>
                      </div>

                      <div className={classes.TicketBody}>
                        {ticketToPrint.TicketEvents?.map((ticketEvent) => {
                          let eventStatusClass = "";
                          let eventStatusText = "";

                          switch (ticketEvent.Wins) {
                            case "W":
                              eventStatusClass = classes.Won;
                              eventStatusText = translate("Won");
                              break;
                            case "L":
                              eventStatusClass = classes.Lost;
                              eventStatusText = translate("Lost");
                              break;
                            default:
                              eventStatusClass = "";
                              eventStatusText = "";
                          }
                          const isBetBuilder = ticketEvent.BB && ticketEvent.BB.length > 0;

                          if (isBetBuilder) {
                            return (
                              <div
                                key={ticketEvent.TicketId}
                                className={`${classes.TicketEvent} ${eventStatusClass}`}
                              >
                                <div className={classes.EventWrapper}>
                                  <span className={classes.EventName}>
                                    {ticketEvent.Event}
                                  </span>
                                  {eventStatusText && (
                                    <>
                                      {eventStatusText === "Won" && (
                                        <CircleCheckSolidIcon />
                                      )}
                                      {eventStatusText === "Lost" && (
                                        <CircleXmarkSolidIcon />
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className={classes.Row}>
                                  <span className={classes.SportName}>
                                    {ticketEvent.Sport}
                                  </span>
                                  <span className={classes.EventDate}>
                                    {ticketEvent.Live
                                      ? `[${translate("Live")}]`
                                      : formatDate(
                                        ticketEvent.DateOfMatch,
                                        "datetime"
                                      )}
                                  </span>
                                </div>
                                <div className={classes.LastRow}>
                                  <span>
                                    <span>{ticketEvent.MarketName}</span>
                                  </span>
                                  <span>
                                    {translate("Odds")}: {convertOdds(ticketEvent.Odd)}
                                  </span>
                                </div>
                                {ticketEvent.BB.map((market) => (
                                  <div key={market.TicketEventBBId} className={classes.MarketWrapper}>
                                    <div className={classes.badgeNumber}></div>
                                    <div className={classes.LastRowBB}>
                                      <span>
                                        <span>{market.MarketName}</span>
                                        <span>{market.PointName}</span>
                                      </span>
                                      <span>
                                        {convertOdds(market.Odd)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return (
                            <div
                              key={ticketEvent.TicketId}
                              className={`${classes.TicketEvent} ${eventStatusClass}`}
                            >
                              <div className={classes.EventWrapper}>
                                <span className={classes.EventName}>
                                  {ticketEvent.Event}
                                </span>
                                {eventStatusText && (
                                  <>
                                    {eventStatusText === "Won" && (
                                      <CircleCheckSolidIcon />
                                    )}
                                    {eventStatusText === "Lost" && (
                                      <CircleXmarkSolidIcon />
                                    )}
                                  </>
                                )}
                              </div>
                              <div className={classes.Row}>
                                <span className={classes.SportName}>
                                  {ticketEvent.Sport}
                                </span>
                                <span className={classes.EventDate}>
                                  {ticketEvent.Live
                                    ? `[${translate("Live")}]`
                                    : formatDate(
                                      ticketEvent.DateOfMatch,
                                      "datetime"
                                    )}
                                </span>
                              </div>
                              <div className={classes.LastRow}>
                                <span>
                                  <span>{ticketEvent.MarketName}</span>
                                  <span>{ticketEvent.PointName}</span>
                                </span>
                                <span>
                                  {translate("Odds")}: {ticketEvent.Odd}
                                </span>
                              </div>
                            </div>
                          );
                        })}

                      </div>

                      <div className={classes.Info}>
                        <div className={classes.Flexed}>
                          <span>
                            {translate("Type")}:{" "}
                            {ticketToPrint.Ticket.BetType}
                          </span>
                          <span>{ticketToPrint.Ticket.Type}</span>
                        </div>
                      </div>
                      <div className={classes.Info}>
                        <div className={classes.Flexed}>
                          <span>
                            {translate("NR Events")}:{" "}
                            {ticketToPrint.TicketEvents.length}
                          </span>

                          {ticketToPrint.Ticket.BetType === "Multiple" && (
                            <span>
                              {translate("Total Odds")}:{" "}
                              {totalOdds(ticketToPrint)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <div
                          className={[
                            classes.Info,
                            classes.Bold,
                            getStatusClass(
                              ticketToPrint.Ticket.Status,
                              ticketToPrint.Ticket.Cashout
                            ),
                          ].join(" ")}
                        >
                          <div className={classes.Left}>
                            <div>{translate("Bet Amount")}</div>
                            <div>{translate("Net Stake")}</div>
                            <div>{translate("Total Tax")}</div>
                            <div>{translate("Bet Tax")}</div>
                            <div>{translate("Win Tax")}</div>
                            <div>{translate("Bonus")}</div>
                            <div
                              style={{ fontSize: "15px", fontWeight: "700" }}
                            >
                              {translate("Max Wins")}
                            </div>
                            {ticketToPrint.Ticket.TotalWins > 0 && (
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "900",
                                  margin: "1rem 0.5rem 0rem 0",
                                  lineHeight: "1.3rem",
                                  textAlign: "right",
                                }}
                              >
                                {ticketToPrint.Ticket.Cashout
                                  ? translate("Cashout")
                                  : translate("Winnings")}
                              </div>
                            )}
                          </div>
                          <div className={classes.Right}>
                            <div>
                              {formatPoint(ticketToPrint.Ticket?.Stake)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div>
                              {formatPoint(
                                ticketToPrint.Ticket?.Stake -
                                ticketToPrint.Tax?.TotalTax
                              )}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div>
                              {formatPoint(ticketToPrint.Tax?.TotalTax)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div>
                              {formatPoint(ticketToPrint.Tax?.TotalWinTax)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div>
                              {formatPoint(ticketToPrint.Tax?.TotalBetTax)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div>
                              {formatPoint(
                                ticketToPrint.BonusParoli?.WinAmount
                              )}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            <div
                              style={{ fontSize: "15px", fontWeight: "700" }}
                            >
                              {formatPoint(ticketToPrint.Ticket?.MaxWins)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                            {ticketToPrint.Ticket.TotalWins > 0 && (
                              <div
                                style={{
                                  fontSize: "23px",
                                  fontWeight: "900",
                                  margin: "1rem 0rem 0rem 0rem",
                                  lineHeight: "1.3rem",
                                  textAlign: "left",
                                }}
                              >
                                {formatPoint(ticketToPrint.Ticket.TotalWins)}{" "}
                                {ticketToPrint.Ticket?.Currency}
                              </div>
                            )}
                          </div>
                        </div> */}

                      <div
                        className={[
                          classes.Info,
                          classes.Bold,
                          getStatusClass(
                            ticketToPrint.Ticket.Status,
                            ticketToPrint.Ticket.Cashout
                          ),
                        ].join(" ")}
                      >
                        <div className={classes.Left}>
                          <div>{translate("Bet Amount")}</div>
                          <div>{translate("Bet Tax")}</div>
                          <div>{translate("Bonus")}</div>
                          <div>{translate("Winnings")}</div>
                          <div>{translate("Win Tax")}</div>

                          {ticketToPrint.Ticket.TotalWins > 0 && (
                            <div
                              style={{
                                fontSize: "18px",
                                fontWeight: "900",
                                margin: "1rem 0.5rem 0rem 0",
                                lineHeight: "1.3rem",
                                textAlign: "right",
                              }}
                            >
                              {ticketToPrint.Ticket.Cashout
                                ? translate("Cashout")
                                : translate("Payout")}
                            </div>
                          )}
                        </div>
                        <div className={classes.Right}>
                          <div>
                            {formatPoint(ticketToPrint.Ticket?.Stake)}{" "}
                            {ticketToPrint.Ticket?.Currency}
                          </div>
                          <div>
                            {formatPoint(ticketToPrint.Tax?.TotalBetTax)}{" "}
                            {ticketToPrint.Ticket?.Currency}
                          </div>
                          <div>
                            {formatPoint(
                              ticketToPrint.BonusParoli?.WinAmount
                            )}{" "}
                            {ticketToPrint.Ticket?.Currency}
                          </div>
                          <div>
                            {formatPoint(ticketToPrint.Ticket?.MaxWins)}{" "}
                            {ticketToPrint.Ticket?.Currency}
                          </div>
                          <div>
                            {formatPoint(ticketToPrint.Tax?.TotalWinTax)}{" "}
                            {ticketToPrint.Ticket?.Currency}
                          </div>
                          {ticketToPrint.Ticket.TotalWins > 0 && (
                            <div
                              style={{
                                fontSize: "23px",
                                fontWeight: "900",
                                margin: "1rem 0rem 0rem 0rem",
                                lineHeight: "1.3rem",
                                textAlign: "left",
                              }}
                            >
                              {formatPoint(ticketToPrint.Ticket.TotalWins)}{" "}
                              {ticketToPrint.Ticket?.Currency}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={classes.Barcode}>
                        {
                          <QRCode
                            size={150}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                            value={getBarcodeValue()}
                            viewBox={`0 0 150 150`}
                          />
                        }
                      </div>

                      <div className={classes.TopInfo}>
                        {translate("Cashier Code")}:{" "}
                        {ticketToPrint.Ticket.TicketId}
                      </div>

                      {/* <div className={classes.TopInfo}>
                                                    {translate(
                                                        'The Proponent of the game account has accepted and knows the current regulation available on our website. This data transmission receipt is valid only if the transaction process has been carried out exclusively via Internet.'
                                                    )}
                                                </div> */}

                      <div className={classes.Disclaimer}>
                        {/* <img src={plus18} alt='Over 18' /> */}
                        <Plus18Icon />
                        <span>18+ {translate("Play responsibly")}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (!loading && (
            <div className={classes.NoTicket}>
              <div className={classes.NoTicketIcon}>
                <TicketIcon />
              </div>
              <span>{translate("Ticket Not Found")}</span>
            </div>
          )
          )}
        </div>
      </div>

      <div className={classes.Footer}>
        {!loading && ticketToPrint && ticketToPrint.Ticket && (
          <>
            {ticketToPrint.Ticket.Status === -1 && (
              <div className={classes.ButtonsWrapper}>
                <button className={classes.buttonNotFinished}>
                  {translate("Ticket Pending")}
                </button>
              </div>
            )}
            {user && (
              <MainButton onClick={reactToPrintFn}>
                {translate("Print PDF")}
              </MainButton>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PrintTicket;
