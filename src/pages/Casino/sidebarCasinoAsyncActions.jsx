import axiosApi from "../../axios-api";
import config from "../../config";
import { getLang } from "../../utils/storage";
import { casinoActions } from "./casinoSlice";

const getSectionItems = (payload) => {
  const section = Array.isArray(payload) ? payload[0] : payload;
  const items = section?.items || section?.Items || [];
  return Array.isArray(items) ? items : [];
};

const getLanguageCode = () => String(getLang()?.id || "en").trim() || "en";

const getPublicCollection = async (key, signal) => {
  const response = await axiosApi.get(
    `casino/personalization/collections/by-key/${encodeURIComponent(key)}?siteId=${config.VITE_SITE_ID}&limit=3&languageCode=${encodeURIComponent(getLanguageCode())}`,
    {
      signal,
      baseURLOverride: config.VITE_CASINO_BASE,
      timeout: 10000,
      noToken: true,
    }
  );

  return getSectionItems(response?.data);
};

export const getSidebarFeaturedGames = (signal, isLoggedIn) => {
  return async (dispatch) => {
    try {
      let games = [];

      if (isLoggedIn) {
        const response = await axiosApi.get(
          `casino/personalization/recent?siteId=${config.VITE_SITE_ID}&limit=3&languageCode=${encodeURIComponent(getLanguageCode())}`,
          {
            signal,
            baseURLOverride: config.VITE_CASINO_BASE,
            timeout: 10000,
          }
        );

        games = Array.isArray(response?.data)
          ? response.data
          : getSectionItems(response?.data);
      } else {
        try {
          games = await getPublicCollection("pop", signal);
        } catch (error) {
          if (error?.code === "ERR_CANCELED") throw error;
          if (error?.response?.status !== 404) throw error;
          games = await getPublicCollection("popular", signal);
        }
      }

      dispatch(casinoActions.setSidebarFeaturedGames(games.slice(0, 3)));
    } catch (error) {
      if (error?.code === "ERR_CANCELED") return;
      console.error("Sidebar casino games could not be loaded", error);
      dispatch(casinoActions.setSidebarFeaturedGames([]));
    }
  };
};
