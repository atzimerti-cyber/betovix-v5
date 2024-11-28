import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { casinoFavoritesActions } from "./CasinoFavoritesSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

export const getCasinoFavs = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();

      dispatch(casinoFavoritesActions.setCasinoFavs(response.data.Contents));
    } catch (error) {
      if (!error?.code === "ERR_CANCELED") {
        let toastMessage = translate(`${error?.message}`);
        toast.error(toastMessage);
      }
      dispatch(casinoFavoritesActions.setCasinoFavs([]));
    }
  };
};

export const addCasinoFav = (gameId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=saveFavorite&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"GameId":${gameId}}` },
        {
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );

      // Check if response has expected structure
      if (
        !response.data ||
        !response.data.Status ||
        response.data.Status.StatusCode !== 200
      ) {
        throw new Error(
          "Failed to add favorite, unexpected response structure"
        );
      }

      dispatch(casinoFavoritesActions.addCasinoFavorite(gameId));
    } catch (error) {
      // Improved error handling with specific message
      const errorMessage =
        translate(`${error.response?.data?.message}`) ||
        translate(`${error.message}`) ||
        translate("An unexpected error occurred");
      toast.error(errorMessage);
      console.error("Error in addCasinoFav:", errorMessage);
    }
  };
};

export const removeCasinoFav = (gameId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=deleteFavorite&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"GameId":${gameId}}` },
        {
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(casinoFavoritesActions.removeCasinoFavorite(gameId));
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      toast.error(toastMessage);
    }
  };
};
