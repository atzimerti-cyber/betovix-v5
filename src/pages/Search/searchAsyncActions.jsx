import { toast } from 'react-toastify';
import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { searchActions } from './searchSlice';
import config from '../../config';

export const getSlots = (signal, pageItems, isDesktop) => {
    return async (dispatch, getState) => {
        try {
            dispatch(searchActions.setLoading(true));
            const lang = getLang();

            const response = await axiosApi.post(
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                // { data: `{"Page":1,"PageItems":${pageItems},"Tag":"","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}` },
                { data: `{"Page":1,"PageItems":${pageItems},"Tag":"","Search":""}` },
                { signal: signal, baseURLOverride: config.VITE_CASINO_BASE }
            );
            if (response.data.Status.StatusCode !== 200) throw Error();

            const sortingState = getState().casino.sorting;

            const sortGames = (games, sortOrder) => {
                return games.slice().sort((a, b) => {
                    if (sortOrder === 'Default Sort') return 0;
                    if (sortOrder === 'A - Z') {
                        return a.Data.Name.localeCompare(b.Data.Name);
                    } else if (sortOrder === 'Z - A') {
                        return b.Data.Name.localeCompare(a.Data.Name);
                    }
                    return 0;
                });
            };

            let Data = response.data.Contents.Data;
            console.log(Data);

            let sortedData = [];
            if (Array.isArray(Data)) {
                sortedData = sortGames(Data, sortingState);
            }

            console.log(sortedData);

            // Desktop has load more, so the details are needed
            if (isDesktop) {
                const allGames = {
                    Data: sortedData,
                    Total: response.data.Contents.Total,
                    slotGamesPage: 1,
                    liveGamesPage: 0,
                    slotGamesAdded: 24,
                    liveGamesAdded: 0,
                };
                dispatch(searchActions.setCasinoResults(allGames));
            } else {
                dispatch(searchActions.setCasinoResults(response.data.Contents));
            }

            dispatch(searchActions.setLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(searchActions.setLoading(false));
        }
    };
};

export const getCasinoSearch = (signal, debSearchString) => {
    return async (dispatch) => {
        try {
            dispatch(searchActions.setLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":1,"PageItems":24,"Tag":"","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":1,"PageItems":24,"Tag":"","Search":"${debSearchString}"}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                ),
                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":1,"PageItems":24,"Tag":"live","Search":"${debSearchString}","ProviderId":0,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":1,"PageItems":24,"Tag":"live","Search":"${debSearchString}"}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                ),
            ];

            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error();
            });

            const slotGames = responses[0].data.Contents;
            const liveGames = responses[1].data.Contents;

            const combinedData = [...slotGames.Data, ...liveGames.Data];
            const combinedTotal = slotGames.Total + liveGames.Total;
            const trimmedData = combinedData.slice(0, 24);

            // If only some of the live games were rendered, keep the rest
            const liveGamesAddedNum =
                slotGames.Data.length >= 24 || liveGames.Data.length === 0
                    ? 0
                    : 24 - slotGames.Data.length >= liveGames.Data.length
                    ? liveGames.Data.length
                    : 24 - slotGames.Data.length;
            if (liveGames.Data.length > 0 && slotGames.Data.length > 0 && slotGames.Data.length < 24) {
                const liveGamesLeftOut = liveGames.Data.slice(liveGamesAddedNum);
                dispatch(searchActions.setNotRenderedLiveResults(liveGamesLeftOut));
            }

            const allGames = {
                Data: trimmedData,
                Total: combinedTotal,
                slotGamesPage: 1,
                liveGamesPage: 1,
                slotGamesAdded: slotGames.Data.length,
                liveGamesAdded: liveGamesAddedNum,
            };

            dispatch(searchActions.setCasinoResults(allGames));
            dispatch(searchActions.setLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(searchActions.setLoading(false));
        }
    };
};

export const addToSearchResults = (signal, debSearchString, providers) => {
    return async (dispatch, getState) => {
        try {
            dispatch(searchActions.setMoreLoading(true));
            const lang = getLang();

            const currentState = getState().search;
            const searchResults = currentState.casinoResults;
            //console.log('BEFORE', searchResults);
            const notRenderedLiveResults = currentState.notRenderedLiveResults;

            let slotGames = [];
            // let slotGames = { Data: [] };
            let slotPage = searchResults.slotGamesPage;
            if (searchResults.slotGamesAdded && !searchResults.liveGamesAdded) {
                slotPage = searchResults.slotGamesPage + 1;
                if (providers && providers.length > 0) {
                    for (let provider of providers) {
                        const responseSlots = await axiosApi.post(
                            `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                            {
                                // data: `{"Page":${slotPage},"PageItems":24,"Tag":"","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`,
                                data: `{"Page":${slotPage},"PageItems":24,"Tag":"${provider}","Search":"${debSearchString}"}`,
                            },
                            {
                                signal: signal,
                                baseURLOverride: config.VITE_CASINO_BASE,
                            }
                        );
                        if (responseSlots.status !== 200 || responseSlots.data.Status.StatusCode !== 200) throw Error();
                        // slotGames += responseSlots.data.Contents.Data;
                        slotGames = [...slotGames, ...responseSlots.data.Contents.Data];
                    }
                } else {
                    const responseSlots = await axiosApi.post(
                        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                        {
                            // data: `{"Page":${slotPage},"PageItems":24,"Tag":"","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`,
                            data: `{"Page":${slotPage},"PageItems":24,"Tag":"","Search":"${debSearchString}"}`,
                        },
                        {
                            signal: signal,
                            baseURLOverride: config.VITE_CASINO_BASE,
                        }
                    );
                    if (responseSlots.status !== 200 || responseSlots.data.Status.StatusCode !== 200) throw Error();
                    // slotGames = responseSlots.data.Contents;
                    slotGames = [...slotGames, ...responseSlots.data.Contents.Data];
                }
            }

            let liveGames = { Data: [] };
            let livePage = searchResults.liveGamesPage;
            let pageItems = 24;
            if (searchResults.liveGamesAdded) {
                livePage = livePage + 1;
                // If both slots and live added in the previous iteration, complete the 24 with the notRenderedLiveResults
                if (searchResults.slotGamesAdded && searchResults.liveGamesAdded && notRenderedLiveResults.length) {
                    pageItems = 24 - notRenderedLiveResults.length;
                }

                const responseLive = await axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":${livePage},"PageItems":${pageItems},"Tag":"live","Search":"${debSearchString}","ProviderId":0,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":${livePage},"PageItems":${pageItems},"Tag":"live","Search":"${debSearchString}"}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                );
                if (responseLive.status !== 200 || responseLive.data.Status.StatusCode !== 200) throw Error();
                liveGames = responseLive.data.Contents;

                if (notRenderedLiveResults && notRenderedLiveResults.length > 0) {
                    liveGames.Data = [...liveGames.Data, ...notRenderedLiveResults];
                    dispatch(searchActions.setNotRenderedLiveResults(null));
                }
            }

            const combinedData = [...slotGames, ...liveGames.Data];
            const trimmedData = combinedData.slice(0, 24);

            // If only some of the live games were rendered, keep the rest
            const liveGamesAddedNum =
                slotGames.length >= 24 || liveGames.Data.length === 0
                    ? 0
                    : 24 - slotGames.length >= liveGames.Data.length
                    ? liveGames.Data.length
                    : 24 - slotGames.length;
            if (liveGames.Data.length > 0 && slotGames.length > 0 && slotGames.length < 24) {
                const liveGamesLeftOut = liveGames.Data.slice(liveGamesAddedNum);
                dispatch(searchActions.setNotRenderedLiveResults(liveGamesLeftOut));
            }
            // const liveGamesAddedNum =
            //     slotGames.Data.length >= 24 || liveGames.Data.length === 0
            //         ? 0
            //         : 24 - slotGames.Data.length >= liveGames.Data.length
            //             ? liveGames.Data.length
            //             : 24 - slotGames.Data.length;
            // if (liveGames.Data.length > 0 && slotGames.Data.length > 0 && slotGames.Data.length < 24) {
            //     const liveGamesLeftOut = liveGames.Data.slice(liveGamesAddedNum);
            //     dispatch(searchActions.setNotRenderedLiveResults(liveGamesLeftOut));
            // }

            const casinoRes = {
                Data: trimmedData,
                Total: trimmedData.length ? searchResults.Total : searchResults.Data.length, // Sometimes there is a difference with the Total and the results
                slotGamesPage: slotPage,
                liveGamesPage: livePage,
                slotGamesAdded: slotGames.length,
                liveGamesAdded: liveGamesAddedNum,
            };

            //console.log('AFTER', casinoRes);

            dispatch(searchActions.addToCasinoResults(casinoRes));

            dispatch(searchActions.setMoreLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(searchActions.setMoreLoading(false));
        }
    };
};

export const getCasinoSearchProviders = (signal, pageItems, debSearchString, selectedProviders) => {
    return async (dispatch) => {
        try {
            dispatch(searchActions.setLoading(true));
            const lang = getLang();

            let slotGames = [];
            let totalGames = 0;
            let vendors = [];

            for (let selectedProvider of selectedProviders) {
                const response = await axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":1,"PageItems":24,"Tag":"${selectedProvider}","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":1,"PageItems":"${pageItems}","Tag":"${selectedProvider}","Search":"${debSearchString}"}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                );

                if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error();

                slotGames = [...slotGames, ...response.data.Contents.Data];
                totalGames += response.data.Contents.Total;
                vendors.push(selectedProvider);
                //slotGames = responses[0].data.Contents;
            }

            //const combinedData = [...slotGames.Data, ...liveGames.Data];
            //const combinedTotal = slotGames.Total + liveGames.Total;
            const trimmedData = slotGames.slice(0, 24);

            const allGames = {
                Data: trimmedData,
                Total: totalGames,
                slotGamesPage: 1,
                slotGamesAdded: 24,
                providers: vendors,
            };

            dispatch(searchActions.setCasinoResults(allGames));
            dispatch(searchActions.setLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(searchActions.setLoading(false));
        }
    };
};

//SEARCH SPORTS EVENTS/////////////////////////////////////////////////////////////////////////
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
                throw new Error('Failed to fetch event search data');
            }

            const eventSearchRes = response.data.Contents;
            //console.log(eventSearchRes);

            dispatch(searchActions.setSportsResults(eventSearchRes));
            dispatch(searchActions.setLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error.toString();
            if (error?.code !== 'ERR_CANCELED') {
                toast.error(message);
            }
            dispatch(searchActions.setLoading(false));
        }
    };
};
