import { toast } from "react-toastify";

import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { leaderboardActions } from "./leaderboardSlice";
import { translate } from "../../utils/translations";

//import leaderboard from '../../dummyData/leaderboard';

export const getLeaderboard = (signal) => {
  return async (dispatch) => {
    try {
      dispatch(leaderboardActions.setLoadingLeaderboard(true));

      const lang = getLang();

      const response = await axiosApi.get(
        `MyTicket/GetTopWins?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        // `MyTicket/GetTopWins?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      const leaderboard = {
        standings: {
          daily: {
            standings: response.data.Contents.map((top) => ({
              ticket: {
                id: top.TicketId,
                winnings: top.Wins,
                date: top.Settlement,
                stake: top.Stake,
              },
            })),
          },
        },
      };
      console.log(leaderboard);

      // TODO:
      setTimeout(() => {
        dispatch(leaderboardActions.setLeaderboard(leaderboard));
        dispatch(leaderboardActions.setLoadingLeaderboard(false));
      }, 1000);
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
      dispatch(leaderboardActions.setLoadingLeaderboard(false));
    }
  };
};
