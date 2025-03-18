import { toast } from "react-toastify";

import axiosApi from "../../axios-api";
import { myBetsActions } from "./myBetsSlice";
import { getLang } from "../../utils/storage";
import config from "../../config";
import { translate } from "../../utils/translations";

export const getTicketCashouts = (type, page, signal, isActive) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      // CashoutTypes: 1: in course, 2: Live, 3: Closed
      // CashoutPeriods 1: Day, 2: Week, 3: All
      const response = await axiosApi.post(
        `Betting/PostData?action=ticket_cashouts&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"type":${type},"period":3,"page":${page}}` },
        {
          signal: signal,
          baseURLOverride: config.VITE_BETS_API,
        }
      );
      if (
        response.data &&
        response.data.Status &&
        response.data.Status.StatusCode !== 200
      )
        throw Error();

      const allTickets = {
        Data: response.data.Contents.tickets || [],
        Total: response.data.Contents.total,
      };

      dispatch(myBetsActions.setTicketsTable(allTickets));
      dispatch(myBetsActions.setTicketsLoading(false));
      if (isActive) dispatch(getTicketCashoutsUpdates(page, signal));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getTicketCashoutsUpdates = (page, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      // CashoutTypes: 1: in course, 2: Live, 3: Closed
      // CashoutPeriods 1: Day, 2: Week, 3: All
      const response = await axiosApi.post(
        `Betting/PostData?action=ticket_cashouts_updates&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"type":1,"period":3,"page":${page}}` },
        {
          signal: signal,
          baseURLOverride: config.VITE_BETS_API,
        }
      );
      if (
        response.data &&
        response.data.Status &&
        response.data.Status.StatusCode !== 200
      )
        throw Error();

      dispatch(myBetsActions.setTicketCashouts(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const cashout = (ticketId, cashoutAmount, signal) => {
  return async (dispatch) => {
    try {
      dispatch(
        myBetsActions.updateCashedOutResult({
          ticketId: ticketId,
          value: "loading",
        })
      );
      const lang = getLang();

      const response = await axiosApi.post(
        `Betting/PostData?action=make_cashout&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"ticketId":${ticketId},"cashoutAmount":${cashoutAmount},"providerId":1}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_BETS_API,
        }
      );
      if (
        response.data &&
        response.data.Status &&
        response.data.Status.StatusCode !== 200
      )
        throw Error();

      if (
        response.data.Contents.info &&
        response.data.Contents.info.BreakReason
      ) {
        toast.error(
          translate(response.data.Contents.info.BreakReason) +
            "." +
            translate("Try again") +
            "!"
        );
        dispatch(getTicketCashoutsUpdates(1, 1, 1, signal));
        dispatch(myBetsActions.deleteCashedOutResult(ticketId));
      } else {
        toast.success(translate("Cashout successful!"));
        dispatch(
          myBetsActions.updateCashedOutResult({
            ticketId: ticketId,
            value: "success",
          })
        );
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
      dispatch(myBetsActions.deleteCashedOutResult(ticketId));
    }
  };
};
