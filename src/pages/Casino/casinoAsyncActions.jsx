import { toast } from 'react-toastify';
import _ from 'lodash';

import axiosApi from '../../axios-api';
import { casinoActions } from './casinoSlice';
import { getLang } from '../../utils/storage';
import { appActions } from '../../features/InitApp/appSlice';
import config from '../../config';

export const getCasino = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/GetBanners?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                    timeout: 10000,
                }),
                axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                    timeout: 10000,
                }),
            ];
            const responses = await Promise.all(requests);

            responses.forEach((response) => {
                if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error();
            });

            dispatch(casinoActions.setCasinoBanners(responses[0].data.Contents));
            dispatch(casinoActions.setCasinoVendors(responses[1].data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (error?.code === 'ERR_CANCELED') {
                // Handle request cancellation (e.g., user navigated away)
                console.log("Request was cancelled", message);
            } else if (error?.code === 'ECONNABORTED') {
                // Handle timeout error specifically
                toast.error("Request timed out, please try again.");
            } else {
                toast.error(message);
            }
        }
    };
};

export const addFavoriteCasino = (gameId) => {
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
            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(casinoActions.addFavorite(gameId));
        } catch (error) {
            toast.error(error?.message);
        }
    };
};

export const removeFavoriteCasino = (gameId) => {
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

            dispatch(casinoActions.removeFavorite(gameId));
        } catch (error) {
            toast.error(error?.message);
        }
    };
};

export const getVendorGame = (providername, id, brandgameid, gameName, isDemo, signal, isBonus) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            let requests = [];
            var game;
            var gameUrl;
            var urlObj;

            if (providername === 'Softion') {
                requests = [
                    axiosApi.get(
                        `Casino${providername}/GetGame?gameid=${id}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                //game = responses[0].data.Contents;
                gameUrl = responses[0].data.Contents;
            } else if (providername === 'Vegas' || providername === 'Amarix') {
                requests = [
                    axiosApi.get(
                        `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        // { signal: signal, baseURLOverride: config.VITE_CASINO_STORETUBE_BASE }
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });

                if (providername === 'Amarix') {
                    gameUrl = responses[0].data.Contents;
                } else if (providername === 'Vegas') {
                    urlObj = JSON.parse(responses[0].data.Contents);
                    gameUrl = urlObj.url;
                }
                //game = responses[0].data.Contents;
            } else if (providername === 'Aviatrix') {
                requests = [
                    axiosApi.get(
                        `Casino${providername}/Get${providername}Game?gameid=${id}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                //game = responses[0].data.Contents;
                gameUrl = responses[0].data.Contents;
            } else if (providername === 'MultiGames') {
                requests = [
                    axiosApi.get(
                        `${providername}/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                //game = responses[0].data.Contents;
                gameUrl = responses[0].data.Contents;
            } else if (providername === 'Barbara Bang') {
                requests = [
                    axiosApi.get(
                        `CasinoBarbara/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                //game = responses[0].data.Contents;
                gameUrl = responses[0].data.Contents;
            }

            dispatch(casinoActions.setCasinoGame({ game: game, url: gameUrl }));
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const getLiveVendorGame = (providername, id, brandgameid, gameName, isDemo, signal, isBonus) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            let requests = [];
            var game;
            var gameUrl;
            //var urlObj;

            if (providername === 'MultiGames') {
                requests = [
                    axiosApi.get(
                        `${providername}/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                //game = responses[0].data.Contents;
                gameUrl = responses[0].data.Contents;
            } else if (providername === 'Beter') {
                requests = [
                    axiosApi.get(
                        `Casino${providername}/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=${isBonus}&lang=${lang.id}&lobbyUrl=${config.VITE_HOME_URL}/casino&siteid=${config.VITE_SITE_ID}`,
                        { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
                    ),
                ];

                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    if (response.data.Status.StatusCode !== 200) throw Error();
                });
                gameUrl = responses[0].data.Contents;
            }

            dispatch(casinoActions.setCasinoGame({ game: game, url: gameUrl }));
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const getAllVendors = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();
            //console.log("Vendors(getAllVendors)", response.data.Contents);
            dispatch(casinoActions.setCasinoVendors(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getSlotsVendors = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();

            const filteredVendors = response.data.Contents.filter((v) => !v.Data.Name.includes('live'));

            dispatch(casinoActions.setCasinoVendors(filteredVendors));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getLiveVendors = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();

            const filteredVendors = response.data.Contents.filter((v) => v.Data.Name.includes('live'));

            dispatch(casinoActions.setCasinoVendors(filteredVendors));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getFavoritesPage = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }),
                axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }),
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
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getGamesWithFilter = (filter, property, signal) => {
    return async (dispatch, getState) => {
        try {
            dispatch(casinoActions.setSearchLoading(true));
            const lang = getLang();
            const response = await axiosApi.post(
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
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
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
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
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                { data: filterStr },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }
            );
            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(casinoActions.addToFilteredGames({ property: property, values: response.data.Contents.Data }));
            dispatch(casinoActions.setMoreLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(casinoActions.setMoreLoading(false));
        }
    };
};

export const getFavoriteGamesToFiltered = (signal) => {
    return async (dispatch, getState) => {
        try {
            const lang = getLang();
            const response = await axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });
            if (response.data.Status.StatusCode !== 200) throw Error();

            const currentState = getState().casino;
            let updatedFilteredGames = { ...currentState.filteredGames };

            const slotsFavorites = response.data.Contents.filter((f) => !f.Data.VendorName.includes('live'));

            updatedFilteredGames['favoriteGames'] = {
                Data: slotsFavorites,
                Total: slotsFavorites.length,
            };

            dispatch(casinoActions.setFilteredGames(updatedFilteredGames));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getFavoriteGamesLiveToFiltered = (signal) => {
    return async (dispatch, getState) => {
        try {
            const lang = getLang();
            const response = await axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });
            if (response.data.Status.StatusCode !== 200) throw Error();

            const currentState = getState().casino;
            let updatedFilteredGames = { ...currentState.filteredGames };

            const liveFavorites = response.data.Contents.filter((f) => f.Data.VendorName.includes('live'));

            updatedFilteredGames['favoriteGames'] = {
                Data: liveFavorites,
                Total: liveFavorites.length,
            };

            dispatch(casinoActions.setFilteredGames(updatedFilteredGames));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};


//============================         TAGS        =================================//

export const getCasinoTags = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`MyCasino/GetHomeTags?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
                timeout: 10000,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(casinoActions.setCasinoTags(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
export const getCasinoByTags = (signal, tag) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`MyCasino/GetHomeGames?tags=${tag}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_CASINO_BASE,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(casinoActions.setCasinoByTags({ Contents: response.data.Contents, Tag: tag }));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

///////////////////////////////////      SEARCH CASINO        ////////////////////////////////////

export const searchCasino = (signal, page, pageItems, tags, searchStr, order) => {
    return async (dispatch) => {
        try {
            dispatch(casinoActions.setSearchLoading(true));
            const lang = getLang();

            const payload = {
                Page: 1,
                PageItems: pageItems,
                Tags: tags,
                Search: searchStr,
                Order: order
            }

            const response = await axiosApi.post(
                `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,

                payload,

                {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE
                }
            );

            if (response.data.Status.StatusCode !== 200) throw Error();

            const allGames = {
                Data: response.data.Contents.Data,
                Total: response.data.Contents.Total,
                casinoSearchPage: 1,
                casinoGamesAdded: 24,
                providers: tags,
            };

            if (tags.includes('slot')) {
                dispatch(casinoActions.setSlotGames(allGames));
            } else if (tags.includes('live')) {
                dispatch(casinoActions.setLiveGames(allGames));
            }

            dispatch(casinoActions.setSlotGames(allGames));
            dispatch(casinoActions.setSearchLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(casinoActions.setSearchLoading(false));
        }
    };
};

export const loadMoreSearch = (signal, pageItems, tags, searchStr, order) => {
    return async (dispatch, getState) => {
        try {
            dispatch(casinoActions.setMoreLoading(true));
            const lang = getLang();

            const currentState = getState().casino;
            const searchResults = currentState.slotGames;

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
            }

            const response = await axiosApi.post(
                `MyCasino/SearchGames?siteid=${config.VITE_SITE_ID}`,

                payload,

                {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error();

            casinoGames = [...casinoGames, ...response.data.Contents.Data];

            const casinoRes = {
                Data: casinoGames,
                Total: casinoGames.length ? searchResults.Total : searchResults.Data.length,
                casinoSearchPage: searchPage,
                casinoGamesAdded: casinoGames.length,
                providers: stateTags,
            };

            if (stateTags.includes('slot')) {
                dispatch(casinoActions.addToAllSlots(casinoRes));
            } else if (stateTags.includes('live')) {
                dispatch(casinoActions.addToAllLives(casinoRes));
            }

            dispatch(casinoActions.setMoreLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(casinoActions.setMoreLoading(false));
        }
    };
};