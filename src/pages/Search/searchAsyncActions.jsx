import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { searchActions } from "./searchSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

////////////////////////////         SEARCH SPORTS EVENTS       ///////////////////////////////////////////////////////

export const getEventSearch = (signal, providerId, value) => {
  return async (dispatch) => {
    try {
      dispatch(searchActions.setLoading(true));
      const lang = getLang();

      const response = await axiosApi.post(
        `Pregame/PostData?action=searchpregamedata&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"ProviderId":${providerId},"Value":"${value}"}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error("Failed to fetch event search data");
      }

      const eventSearchRes = response.data.Contents;
      //console.log(eventSearchRes);

      dispatch(searchActions.setSportsResults(eventSearchRes));
      dispatch(searchActions.setLoading(false));
    } catch (error) {
      const message = error?.message ? error.message : error.toString();
      if (error?.code !== "ERR_CANCELED") {
        toast.error(translate(message));
      }
      dispatch(searchActions.setLoading(false));
    }
  };
};

///////////////////////////////          CASINO SEARCH            ///////////////////////////////////////////////////////

export const searchCasino = (
  signal,
  page,
  pageItems,
  tags,
  searchStr,
  order,
  isDesktop
) => {
  return async (dispatch) => {
    try {
      dispatch(searchActions.setLoading(true));
      const lang = getLang();

      const payload = {
        Page: 1,
        PageItems: pageItems,
        Tags: tags,
        Search: searchStr,
        Order: order,
      };

      const response = await axiosApi.post(
        `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,

        payload,

        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200) throw Error();

      if (isDesktop) {
        const allGames = {
          Data: response.data.Contents.Data,
          Total: response.data.Contents.Total,
          casinoSearchPage: 1,
          casinoGamesAdded: pageItems,
          //   casinoGamesAdded: 24,
          providers: tags,
        };
        dispatch(searchActions.setCasinoResults(allGames));
      } else {
        const allGames = {
          Data: response.data.Contents.Data,
          Total: response.data.Contents.Total,
          casinoSearchPage: 1,
          casinoGamesAdded: pageItems,
          //   casinoGamesAdded: 24,
          providers: tags,
        };
        dispatch(searchActions.setCasinoResults(allGames));
      }

      dispatch(searchActions.setLoading(false));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
      dispatch(searchActions.setLoading(false));
    }
  };
};

export const loadMoreSearch = (signal, pageItems, tags, searchStr, order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(searchActions.setMoreLoading(true));
      const lang = getLang();

      const currentState = getState().search;
      const searchResults = currentState.casinoResults;

      let casinoGames = [];

      let searchPage = searchResults.casinoSearchPage;
      searchPage = searchResults.casinoSearchPage + 1;

      let stateTags = searchResults.providers;

      const payload = {
        Page: searchPage,
        PageItems: pageItems,
        Tags: stateTags,
        Search: searchStr,
        Order: order,
      };

      const response = await axiosApi.post(
        `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,

        payload,

        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error();

      casinoGames = [...casinoGames, ...response.data.Contents.Data];

      const casinoRes = {
        Data: casinoGames,
        Total: casinoGames.length
          ? searchResults.Total
          : searchResults.Data.length,
        casinoSearchPage: searchPage,
        casinoGamesAdded: casinoGames.length,
        providers: stateTags,
      };

      dispatch(searchActions.addToCasinoResults(casinoRes));

      dispatch(searchActions.setMoreLoading(false));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
      dispatch(searchActions.setMoreLoading(false));
    }
  };
};
