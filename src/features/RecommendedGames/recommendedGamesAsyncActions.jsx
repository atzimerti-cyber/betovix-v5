import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { recommendedGamesActions } from "./recommendedGamesSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

export const getRecommendedGames = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/MyCasino/GetRecomendetGames?siteId=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
          timeout: 1000,
        }
      );
      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();

      dispatch(
        recommendedGamesActions.setRecommendedGames(response.data.Contents)
      );
    } catch (error) {
      if (!error?.code === "ERR_CANCELED") {
        let toastMessage = translate(`${error?.message}`);
        toast.error(toastMessage);
      }
      dispatch(recommendedGamesActions.setRecommendedGames([]));
    }
  };
};
