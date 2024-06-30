import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { casinoActions } from './casinoSlice';
import { getLang } from '../../utils/storage';
import { appActions } from '../../features/InitApp/appSlice';

export const getCasino = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/GetHome?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),
                axiosApi.get(`MyCasino/GetBanners?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),
                axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),

                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                    {
                        data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                    }
                ),
                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                    {
                        data: `{"Page":1,"PageItems":24,"Tag":"live","Search":"","ProviderId":0,"BrandId":0,"VendorId":0}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                    }
                ),
            ];
            const responses = await Promise.all(requests);

            responses.forEach((response) => {
                if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error();
            });

            const favoriteGames = responses[0].data.Contents['Favorites'];
            const newGames = responses[0].data.Contents['New Games'];
            const recentGames = responses[0].data.Contents['Recently Played'];

            const home = {
                recentGames: recentGames,
                newGames: newGames,
                favoriteGames: favoriteGames,
                allSlots: responses[3].data.Contents,
                allLive: responses[4].data.Contents,
            };

            dispatch(casinoActions.setFilteredGames(home));
            dispatch(casinoActions.setCasinoBanners(responses[1].data.Contents));
            dispatch(casinoActions.setCasinoVendors(responses[2].data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const addFavoriteCasino = (gameId) => {
    return async (dispatch) => {
        try {
            const lang = getLang();
            const response = await axiosApi.post(
                `MyCasino/PostData?action=saveFavorite&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: `{"GameId":${gameId}}` },
                {
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
                `MyCasino/PostData?action=deleteFavorite&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: `{"GameId":${gameId}}` },
                {
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }
            );
            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(casinoActions.removeFavorite(gameId));
        } catch (error) {
            toast.error(error?.message);
        }
    };
};

export const getVendorGame = (id, brandgameid, gameName, isDemo, signal) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/GetGame?id=${id}&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),
                axiosApi.get(
                    `CasinoVegas/GetGame?gameid=${brandgameid}&gamename=${gameName}&demo=${isDemo}&IsBonus=false&lang=${lang.id}&lobbyUrl=${
                        import.meta.env.VITE_HOME_URL
                    }/casino&siteid=${import.meta.env.VITE_SITE_ID}`,
                    { signal: signal, baseURLOverride: import.meta.env.VITE_CASINO_BASE }
                ),
            ];
            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.data.Status.StatusCode !== 200) throw Error();
            });

            const game = responses[0].data.Contents;
            const urlObj = JSON.parse(responses[1].data.Contents);
            const gameUrl = urlObj.url;

            dispatch(casinoActions.setCasinoGame({ game: game, url: gameUrl }));
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const getLiveVendorGame = (id, gameId, gameName, isDemo, signal) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/GetGame?id=${id}&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),
                axiosApi.get(
                    `MultiGames/GetGame?gameid=${gameId}&gamename=${gameName}&demo=${isDemo}&IsBonus=false&lang=${lang.id}&lobbyUrl=${
                        import.meta.env.VITE_HOME_URL
                    }&siteid=${import.meta.env.VITE_SITE_ID}`,
                    { signal: signal, baseURLOverride: import.meta.env.VITE_CASINO_BASE }
                ),
            ];
            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.data.Status.StatusCode !== 200) throw Error();
            });

            const game = responses[0].data.Contents;
            const gameUrl = responses[1].data.Contents;

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

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
            });

            if (response.data.Status.StatusCode !== 200) throw Error();

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

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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

            const response = await axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
                axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }),
                axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: filter },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: filterStr },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
            const response = await axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
            const response = await axiosApi.get(`MyCasino/LoadFavoriteGame?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_CASINO_BASE,
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
