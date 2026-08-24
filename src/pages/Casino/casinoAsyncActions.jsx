import { toast } from "react-toastify";
import _ from "lodash";

import axiosApi from "../../axios-api";
import { casinoActions } from "./casinoSlice";
import { getLang } from "../../utils/storage";
import { appActions } from "../../features/InitApp/appSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

const safeMessage = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.message || error?.response?.data?.detail || error?.message || fallback;

const dedupeCasinoVendorsByName = (vendors = []) => {
  const seen = new Set();
  return (Array.isArray(vendors) ? vendors : []).filter((vendor) => {
    const name = String(vendor?.Data?.Name || vendor?.DisplayName || vendor?.displayName || "")
      .trim()
      .toLowerCase();
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });
};

const mapCasinoVendorsForAppState = (vendors = []) =>
  vendors.map((vendor) => ({
    ...vendor,
    id: vendor?.Data?.Id ?? vendor?.VendorId ?? vendor?.vendorId,
    label: vendor?.Data?.Name ?? vendor?.DisplayName ?? vendor?.displayName,
  }));

const normalizeCollection = (section) => ({
  ...section,
  key: section?.key || section?.Key || section?.code || section?.Code,
  title: section?.title || section?.Title || section?.name || section?.Name || section?.key || section?.Key,
  items: section?.items || section?.Items || section?.games || section?.Games || [],
  displayOrder: section?.displayOrder ?? section?.DisplayOrder ?? section?.viewOrder ?? 9999,
  renderPage: section?.renderPage ?? section?.RenderPage,
  renderType: section?.renderType ?? section?.RenderType,
});

const isVisibleOnCasino = (section) => {
  const renderPage = section?.renderPage;
  if (!renderPage) return true;
  if (Array.isArray(renderPage)) return renderPage.some((value) => String(value).toLowerCase().includes("casino"));
  return String(renderPage).toLowerCase().includes("casino");
};

const hydrateCollection = async (section, signal) => {
  const normalized = normalizeCollection(section);
  if (!normalized.key || (Array.isArray(normalized.items) && normalized.items.length)) return normalized;
  try {
    const response = await axiosApi.get(
      `casino/personalization/collections/by-key/${encodeURIComponent(normalized.key)}?siteId=${config.VITE_SITE_ID}`,
      { signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000 }
    );
    const payload = response?.data;
    const detail = Array.isArray(payload) ? payload[0] : payload?.collection || payload?.Collection || payload;
    return normalizeCollection({ ...normalized, ...(detail || {}) });
  } catch (error) {
    if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") {
      console.error(`Casino collection '${normalized.key}' could not be loaded`, error);
    }
    return normalized;
  }
};

export const getCasino = (signal, user) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const [bannersResponse, vendorsResponse] = await Promise.all([
        axiosApi.get(`MyCasino/GetBanners?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
          signal,
          baseURLOverride: config.VITE_CASINO_BASE,
          timeout: 10000,
        }),
        axiosApi.get(`MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
          signal,
          baseURLOverride: config.VITE_CASINO_BASE,
          timeout: 10000,
        }),
      ]);

      const vendors = dedupeCasinoVendorsByName(vendorsResponse?.data?.Contents || []);
      dispatch(casinoActions.setCasinoBanners(bannersResponse?.data?.Contents || []));
      dispatch(casinoActions.setCasinoVendors(vendors));
      dispatch(casinoActions.setTopProviders(vendors.slice(0, 20)));
      dispatch(appActions.setAllCasinoVendors(mapCasinoVendorsForAppState(vendors)));
    } catch (error) {
      if (error?.code === "ERR_CANCELED" || error?.code === "ERR_NETWORK") return;
      if (error?.code === "ECONNABORTED") toast.error(translate("Request timed out, please try again."));
      else toast.error(translate(safeMessage(error)));
    }
  };
};


export const getCasinoHome = (signal, user) => {
  return async (dispatch) => {
    dispatch(casinoActions.setSearchHomeLoading(true));
    try {
      const requests = [
        axiosApi.get(`casino/personalization/collections?siteId=${config.VITE_SITE_ID}`, {
          signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000,
        }),
        axiosApi.get(`MyCasino/GetHomeGames?tags=new&count=20&siteid=${config.VITE_SITE_ID}`, {
          signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000,
        }),
        axiosApi.get(`MyCasino/GetHomeGames?tags=live&count=20&siteid=${config.VITE_SITE_ID}`, {
          signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000,
        }),
      ];
      if (user) {
        const lang = getLang();
        requests.push(axiosApi.get(`casino/personalization/lobby?lang=${lang.id}&siteid=${config.VITE_SITE_ID}&pageSize=50`, {
          signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000,
        }));
      }
      const responses = await Promise.allSettled(requests);
      const collectionPayload = responses[0]?.status === "fulfilled" ? responses[0].value?.data : [];
      const definitions = (Array.isArray(collectionPayload) ? collectionPayload : collectionPayload?.sections || [])
        .map(normalizeCollection)
        .filter((section) => section?.key)
        .filter((section) => !["continue-playing", "continue_playing"].includes(section.key))
        .filter(isVisibleOnCasino);
      const hydrated = await Promise.all(definitions.map((section) => hydrateCollection(section, signal)));
      const sections = hydrated.filter((section) => Array.isArray(section.items) && section.items.length > 0);

      const newGames = responses[1]?.status === "fulfilled" ? responses[1].value?.data?.Contents || [] : [];
      const liveGames = responses[2]?.status === "fulfilled" ? responses[2].value?.data?.Contents || [] : [];
      if (newGames.length) sections.push({ key: "new", title: "New Games", items: newGames, displayOrder: 199, renderPage: "casino" });
      if (liveGames.length) sections.push({ key: "live", title: "Live Games", items: liveGames, displayOrder: 200, renderPage: "casino" });

      if (user && responses[3]?.status === "fulfilled") {
        const personalized = responses[3].value?.data?.sections || [];
        const recent = personalized.find((item) => ["recent", "recently_played", "recently-played"].includes(item?.key));
        if (recent?.items?.length) sections.unshift(normalizeCollection({ ...recent, key: "recent", title: recent.title || "Recently Played", displayOrder: 1 }));
      }

      const unique = Array.from(new Map(sections.map((section) => [section.key, section])).values())
        .sort((a, b) => Number(a?.displayOrder ?? 9999) - Number(b?.displayOrder ?? 9999));
      dispatch(casinoActions.setCasinoHome(unique));
      dispatch(casinoActions.setLobbyCategories(unique));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") console.error("Casino home load failed", error);
    } finally {
      dispatch(casinoActions.setSearchHomeLoading(false));
    }
  };
};

export const getCollectionByKey = (signal, collectionKey, callback) => {
  return async () => {
    try {
      const response = await axiosApi.get(
        `casino/personalization/collections/by-key/${encodeURIComponent(collectionKey)}?siteId=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      callback?.(response?.data);
      return response?.data;
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
      return null;
    }
  };
};

export const addFavoriteCasino = (gameId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=saveFavorite&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"GameId":${gameId}}` },
        {
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(casinoActions.addFavorite(gameId));
    } catch (error) {
      toast.error(translate(error?.message));
    }
  };
};

export const removeFavoriteCasino = (gameId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=deleteFavorite&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"GameId":${gameId}}` },
        {
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(casinoActions.removeFavorite(gameId));
    } catch (error) {
      toast.error(translate(error?.message));
    }
  };
};

export const getVendorGame = (
  providername,
  id,
  brandgameid,
  gameName,
  isDemo,
  signal,
  isBonus
) => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setBarLoading(true));
      const lang = getLang();

      let requests = [];
      var game;
      var gameUrl;
      var urlObj;

      if (isBonus === null) {
        isBonus = false;
      }

      if (providername === "Softion") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${id}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        //game = responses[0].data.Contents;
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Nirvana") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_VEGAS_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            // { signal: signal, baseURLOverride: config.VITE_CASINO_STORETUBE_BASE }
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });

        gameUrl = responses[0].data.Contents;
      } else if (providername === "Vegas") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_VEGAS_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            // { signal: signal, baseURLOverride: config.VITE_CASINO_STORETUBE_BASE }
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });

        urlObj = JSON.parse(responses[0].data.Contents);
        gameUrl = urlObj.url;
      } else if (providername === "Amarix") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            // { signal: signal, baseURLOverride: config.VITE_CASINO_STORETUBE_BASE }
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Aviatrix") {
        requests = [
          axiosApi.get(
            `Casino${providername}/Get${providername}Game?gameid=${id}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        //game = responses[0].data.Contents;
        gameUrl = responses[0].data.Contents;
      } else if (providername === "MultiGames") {
        requests = [
          axiosApi.get(
            `${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        //game = responses[0].data.Contents;
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Barbara Bang") {
        requests = [
          axiosApi.get(
            `CasinoBarbara/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        gameUrl = responses[0].data.Contents;
      } else if (providername === "CP Casino Provider") {
        requests = [
          axiosApi.get(
            `CasinoCp/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(gameName)}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];
        const responses = await Promise.all(requests);
        if (responses[0]?.data?.Status?.StatusCode !== 200) throw Error(responses[0]?.data?.Contents);
        gameUrl = responses[0]?.data?.Contents;
      } else if (providername === "NGK") {
        requests = [
          axiosApi.get(
            `CasinoNgk/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(gameName)}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];
        const responses = await Promise.all(requests);
        if (responses[0]?.data?.Status?.StatusCode !== 200) throw Error(responses[0]?.data?.Contents);
        gameUrl = responses[0]?.data?.Contents;
      } else if (providername === "Hub88") {
        requests = [
          axiosApi.get(
            `CasinoHub/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        gameUrl = responses[0].data.Contents;
      }

      dispatch(casinoActions.setCasinoGame({ game: game, url: gameUrl }));
      dispatch(appActions.setBarLoading(false));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK")
        toast.error(translate(error?.message));
      dispatch(appActions.setBarLoading(false));
    }
  };
};

export const getLiveVendorGame = (
  providername,
  id,
  brandgameid,
  gameName,
  isDemo,
  signal,
  isBonus
) => {
  return async (dispatch) => {
    try {
      dispatch(appActions.setBarLoading(true));
      const lang = getLang();

      let requests = [];
      var game;
      var gameUrl;

      if (isBonus === null) {
        isBonus = false;
      }

      if (providername === "MultiGames") {
        requests = [
          axiosApi.get(
            `${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        //game = responses[0].data.Contents;
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Beter") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Hub88") {
        requests = [
          axiosApi.get(
            `CasinoHub/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });
        gameUrl = responses[0].data.Contents;
      } else if (providername === "Nirvana") {
        requests = [
          axiosApi.get(
            `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${encodeURIComponent(
              gameName
            )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL
            // )}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_VEGAS_HOME_URL
            }/casino&siteid=${config.VITE_SITE_ID}`,
            { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
          ),
        ];

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          if (response.data.Status.StatusCode !== 200) {
            const message = response.data.Contents
              ? translate(response.data.Contents)
              : translate("Error Loading Game");
            toast.error(message);
            throw Error();
          }
        });

        gameUrl = responses[0].data.Contents;
      }

      dispatch(casinoActions.setCasinoGame({ game: game, url: gameUrl }));
      dispatch(appActions.setBarLoading(false));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK")
        toast.error(translate(error?.message));
      dispatch(appActions.setBarLoading(false));
    }
  };
};

export const getAllVendors = (signal, searchStr = "") => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}&search=${encodeURIComponent(searchStr || "")}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      const vendors = dedupeCasinoVendorsByName(response.data.Contents || []);
      dispatch(casinoActions.setCasinoVendors(vendors));
      dispatch(appActions.setAllCasinoVendors(mapCasinoVendorsForAppState(vendors)));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
    }
  };
};


export const getSlotsVendors = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      const vendors = dedupeCasinoVendorsByName(response?.data?.Contents || []);
      const filtered = vendors.filter((vendor) => !String(vendor?.Data?.Tags || vendor?.Tags || "").toLowerCase().includes("live"));
      dispatch(casinoActions.setCasinoVendors(filtered));
      dispatch(appActions.setAllCasinoVendors(mapCasinoVendorsForAppState(vendors)));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
    }
  };
};


export const getLiveVendors = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      const vendors = dedupeCasinoVendorsByName(response?.data?.Contents || []);
      const filtered = vendors.filter((vendor) => String(vendor?.Data?.Tags || vendor?.Tags || "").toLowerCase().includes("live"));
      dispatch(casinoActions.setCasinoVendors(filtered));
      dispatch(appActions.setAllCasinoVendors(mapCasinoVendorsForAppState(vendors)));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
    }
  };
};


export const getFavoritesPage = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const requests = [
        axiosApi.get(
          `MyCasino/LoadFavoriteGame?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            signal: signal,
            baseURLOverride: config.VITE_CASINO_BASE,
          }
        ),
        axiosApi.get(
          `MyCasino/GetVendors?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            signal: signal,
            baseURLOverride: config.VITE_CASINO_BASE,
          }
        ),
      ];
      const responses = await Promise.all(requests);
      responses.forEach((response) => {
        if (response.data.Status.StatusCode !== 200) throw Error();
      });

      dispatch(casinoActions.setCasinoVendors(responses[1].data.Contents));

      const favoriteGames = {
        Data: responses[0].data.Contents,
        Total: responses[0].data.Contents.length,
      };
      dispatch(
        casinoActions.setFilteredGames({
          favoriteGames: favoriteGames,
        })
      );
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(message);
    }
  };
};

export const getGamesWithFilter = (filter, property, signal) => {
  return async (dispatch, getState) => {
    try {
      dispatch(casinoActions.setSearchLoading(true));
      const lang = getLang();
      const response = await axiosApi.post(
        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: filter },
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      const currentState = getState().casino;
      let updatedFilteredGames = { ...currentState.filteredGames };
      updatedFilteredGames[property] = response.data.Contents;
      updatedFilteredGames[property].filter = JSON.parse(filter);

      dispatch(casinoActions.setFilteredGames(updatedFilteredGames));
      dispatch(casinoActions.setSearchLoading(false));
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(message);
      dispatch(casinoActions.setSearchLoading(false));
    }
  };
};

export const addToGamesWithFilter = (property, signal) => {
  return async (dispatch, getState) => {
    try {
      dispatch(casinoActions.setMoreLoading(true));

      const lang = getLang();

      const currentState = getState().casino;
      let updatedFilteredGames = { ...currentState.filteredGames };
      let filter = { ...updatedFilteredGames[property].filter };
      filter.Page = filter.Page + 1;
      const filterStr = `${JSON.stringify(filter)}`;

      const response = await axiosApi.post(
        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: filterStr },
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(
        casinoActions.addToFilteredGames({
          property: property,
          values: response.data.Contents.Data,
        })
      );
      dispatch(casinoActions.setMoreLoading(false));
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(message);
      dispatch(casinoActions.setMoreLoading(false));
    }
  };
};

// export const getFavoriteGamesToFiltered = (signal) => {
//   return async (dispatch, getState) => {
//     try {
//       const lang = getLang();
//       const response = await axiosApi.get(
//         `MyCasino/LoadFavoriteGame?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//         {
//           signal: signal,
//           baseURLOverride: config.VITE_CASINO_BASE,
//         }
//       );
//       if (response.data.Status.StatusCode !== 200) throw Error();

//       const currentState = getState().casino;
//       let updatedFilteredGames = { ...currentState.filteredGames };

//       const slotsFavorites = response.data.Contents.filter(
//         (f) => !f.Data.VendorName.includes("live")
//       );

//       updatedFilteredGames["favoriteGames"] = {
//         Data: slotsFavorites,
//         Total: slotsFavorites.length,
//       };

//       dispatch(casinoActions.setFilteredGames(updatedFilteredGames));
//     } catch (error) {
//       const message = error?.message ? error.message : error;
//       if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(message);
//     }
//   };
// };

// export const getFavoriteGamesLiveToFiltered = (signal) => {
//   return async (dispatch, getState) => {
//     try {
//       const lang = getLang();
//       const response = await axiosApi.get(
//         `MyCasino/LoadFavoriteGame?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//         {
//           signal: signal,
//           baseURLOverride: config.VITE_CASINO_BASE,
//         }
//       );
//       if (response.data.Status.StatusCode !== 200) throw Error();

//       const currentState = getState().casino;
//       let updatedFilteredGames = { ...currentState.filteredGames };

//       const liveFavorites = response.data.Contents.filter((f) =>
//         f.Data.VendorName.includes("live")
//       );

//       updatedFilteredGames["favoriteGames"] = {
//         Data: liveFavorites,
//         Total: liveFavorites.length,
//       };

//       dispatch(casinoActions.setFilteredGames(updatedFilteredGames));
//     } catch (error) {
//       const message = error?.message ? error.message : error;
//       if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(message);
//     }
//   };
// };

//============================         TAGS        =================================//

export const getCasinoTags = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/GetHomeTags?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000, noToken: true }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      dispatch(casinoActions.setCasinoTags(Array.isArray(response?.data?.Contents) ? response.data.Contents : []));
    } catch (error) {
      if (error?.code === "ERR_CANCELED" || error?.code === "ERR_NETWORK") return;
      dispatch(casinoActions.setCasinoTags([]));
    }
  };
};


export const getCasinoByTags = (signal, tag, count = 1000) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get(
        `MyCasino/GetHomeGames?tags=${encodeURIComponent(tag)}&count=${count}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      dispatch(casinoActions.setCasinoByTags({ Contents: response?.data?.Contents || [], Tag: tag }));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
    }
  };
};


export const searchCasino = (signal, page, pageItems, tags = [], searchStr = "", order = "Default") => {
  return async (dispatch) => {
    try {
      dispatch(casinoActions.setSearchLoading(true));
      const normalizedTags = Array.isArray(tags) ? tags.filter(Boolean) : [tags].filter(Boolean);
      const payload = {
        Page: Number(page) > 0 ? Number(page) : 1,
        PageItems: Number(pageItems) > 0 ? Number(pageItems) : 24,
        Tags: normalizedTags,
        Search: searchStr || "",
        Order: order || "Default",
      };
      const response = await axiosApi.post(
        `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,
        payload,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      const contents = response?.data?.Contents || { Data: [], Total: 0 };
      const allGames = {
        Data: contents.Data || [],
        Total: contents.Total || 0,
        casinoSearchPage: payload.Page,
        casinoGamesAdded: (contents.Data || []).length,
        providers: normalizedTags,
      };
      const lowerTags = normalizedTags.map((tag) => String(tag).toLowerCase());
      if (lowerTags.some((tag) => tag.includes("live"))) dispatch(casinoActions.setLiveGames(allGames));
      else if (lowerTags.some((tag) => tag.includes("slot"))) dispatch(casinoActions.setSlotGames(allGames));
      else dispatch(casinoActions.setSearchResults(allGames));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") toast.error(translate(safeMessage(error)));
    } finally {
      dispatch(casinoActions.setSearchLoading(false));
    }
  };
};


export const loadMoreSearch = (signal, pageItems, tags = [], searchStr = "", order = "Default") => {
  return async (dispatch, getState) => {
    try {
      dispatch(casinoActions.setMoreLoading(true));
      const normalizedTags = Array.isArray(tags) ? tags.filter(Boolean) : [tags].filter(Boolean);
      const lowerTags = normalizedTags.map((tag) => String(tag).toLowerCase());
      const currentState = getState().casino;
      const searchResults = lowerTags.some((tag) => tag.includes("live"))
        ? currentState.liveGames
        : lowerTags.some((tag) => tag.includes("slot"))
          ? currentState.slotGames
          : currentState.searchResults;
      if (!searchResults) return;
      const stateTags = searchResults.providers || normalizedTags;
      const searchPage = Number(searchResults.casinoSearchPage || 1) + 1;
      const payload = {
        Page: searchPage,
        PageItems: Number(pageItems) > 0 ? Number(pageItems) : 24,
        Tags: stateTags,
        Search: searchStr || "",
        Order: order || "Default",
      };
      const response = await axiosApi.post(
        `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,
        payload,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      if (response?.data?.Status?.StatusCode !== 200) throw Error();
      const data = response?.data?.Contents?.Data || [];
      const result = {
        Data: data,
        Total: response?.data?.Contents?.Total ?? searchResults.Total ?? 0,
        casinoSearchPage: searchPage,
        casinoGamesAdded: data.length,
        providers: stateTags,
      };
      if (lowerTags.some((tag) => tag.includes("live"))) dispatch(casinoActions.addToAllLives(result));
      else if (lowerTags.some((tag) => tag.includes("slot"))) dispatch(casinoActions.addToAllSlots(result));
      else dispatch(casinoActions.addToSearchResults(result));
      dispatch(casinoActions.loadMoreSuccess(data.length > 0));
    } catch (error) {
      dispatch(casinoActions.loadMoreSuccess(false));
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") console.error("Casino load more failed", error);
    } finally {
      dispatch(casinoActions.setMoreLoading(false));
    }
  };
};


export const getFavoriteGames = (signal) => {
  return async (dispatch) => {
    dispatch(casinoActions.setSearchLoading(true));
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `MyCasino/LoadFavoriteGame?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      const games = response?.data?.Contents || [];
      dispatch(casinoActions.setSearchResults({ Data: games, Total: games.length }));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") {
        toast.error(translate(safeMessage(error)));
      }
    } finally {
      dispatch(casinoActions.setSearchLoading(false));
    }
  };
};

export const getCasinoPlayerStats = (signal) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get(
        `casino/personalization/player-stats?siteId=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE }
      );
      dispatch(casinoActions.setPlayerStats(response?.data || []));
    } catch (error) {
      if (
        error?.response?.status !== 404 &&
        error?.response?.status !== 401 &&
        error?.code !== "ERR_CANCELED" &&
        error?.code !== "ERR_NETWORK"
      ) {
        console.error("Casino player stats failed", error);
      }
      dispatch(casinoActions.setPlayerStats([]));
    }
  };
};

export const getHomeGamesForTag = (signal, tag, count = 20, callback) => {
  return async () => {
    try {
      const response = await axiosApi.get(
        `MyCasino/GetHomeGames?tags=${encodeURIComponent(tag)}&count=${count}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_CASINO_BASE, timeout: 10000 }
      );
      const games = response?.data?.Contents || [];
      callback?.(games);
      return games;
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") {
        toast.error(translate(safeMessage(error)));
      }
      callback?.([]);
      return [];
    }
  };
};

export const getCasinoLandMenu = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `Legacy/Menu/MyMenu?type=casinoland&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { signal, baseURLOverride: config.VITE_WALLET_API_BASE }
      );
      const contents = response?.data?.Contents || {};
      const menu = [...(contents?.Categs || []), ...(contents?.Items || [])].sort(
        (a, b) =>
          Number(a?.Categ?.ViewOrder || a?.ViewOrder || 0) -
          Number(b?.Categ?.ViewOrder || b?.ViewOrder || 0)
      );
      dispatch(casinoActions.setCasinoLandMenu(menu));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") {
        console.error("Casino land menu failed", error);
      }
    }
  };
};
