import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { casinoFavoritesActions } from "./CasinoFavoritesSlice";
import { getFavoritesPage } from "../../pages/Casino/casinoAsyncActions";
import config from "../../config";

const errorMessage = (error) =>
  error?.response?.data?.message || error?.response?.data?.detail || error?.message || "An error occurred";

export const getCasinoFavs = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/LoadFavoriteGame?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      dispatch(casinoFavoritesActions.setCasinoFavs(response?.data?.Contents || []));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(errorMessage(error));
      dispatch(casinoFavoritesActions.setCasinoFavs([]));
    }
  };
};

export const addCasinoFav = (gameId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=saveFavorite&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: JSON.stringify({ GameId: gameId }) },
        { baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw new Error("Failed to add favorite");
      dispatch(casinoFavoritesActions.addCasinoFavorite(gameId));
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };
};

export const removeCasinoFav = (gameId) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=deleteFavorite&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: JSON.stringify({ GameId: gameId }) },
        { baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      dispatch(casinoFavoritesActions.removeCasinoFavorite(gameId));
      if (getState().casino.filteredGames?.favoriteGames) dispatch(getFavoritesPage());
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };
};
