import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { eventActions } from './eventSlice';
import { sportsbookActions } from '../SportsBook/sportsbookSlice';
import { appActions } from '../../features/InitApp/appSlice';
import { getLang } from '../../utils/storage';
import { getSportMarketTreeObj, getSportMarketTreeObjFromMarkets, childsNotExist } from '../../utils/custom';
import config from '../../config';

export const getEvent = (sportId, eventId, signal) => {
    return async (dispatch, getState) => {
        const liveState = getState().live.liveState;
        const eventIdInt = parseInt(eventId);
        const isLive = liveState[eventIdInt] ? true : false;

        if (isLive) {
            dispatch(getLiveEvent(sportId, eventId, signal));
        } else {
            dispatch(getPregameEvent(sportId, eventId, signal));
        }
    };
};

export const getPregameEvent = (sportId, eventId, signal) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.post(
                    `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: sportId },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                ),
                axiosApi.post(
                    `Pregame/PostData?action=get_event&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: `{"ProviderId":1,"Value":${eventId},"H24":false}` },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                ),
            ];
            const responses = await Promise.all(requests);
            if (responses[1].data && responses[1].data.Status && responses[1].data.Status.StatusCode !== 200) throw Error();

            const sports = getState().app.allSports;
            dispatch(eventActions.setSports(sports));
            let selectedSport = sports.find((s) => s.Id === sportId);
            if (!selectedSport) selectedSport = sports.find((s) => s.Id === 1);
            dispatch(sportsbookActions.setSelectedSport(selectedSport));

            // Check if empty tree
            const emptyTree = responses[0].data.Contents === 'Not found' || childsNotExist(responses[0].data.Contents) ? true : false;

            let sportMarketTreeObj;
            // let marketsList;
            if (emptyTree) {
                sportMarketTreeObj = getSportMarketTreeObjFromMarkets(responses[1].data.Contents.Markets);
                if (sportMarketTreeObj) dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
            } else {
                sportMarketTreeObj = getSportMarketTreeObj(responses[0].data.Contents);
                dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
                dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: responses[0].data.Contents }));
            }

            dispatch(eventActions.setEvent(responses[1].data.Contents));
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const getLiveEvent = (sportId, eventId, signal) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.post(
                    `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: sportId },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                ),
                axiosApi.get(`LiveCluster/getLiveEvent?eventid=${eventId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
            ];
            const responses = await Promise.all(requests);
            if (responses[1].data && responses[1].data.Status && responses[1].data.Status.StatusCode !== 200) throw Error();

            const sports = getState().app.allSports;
            dispatch(eventActions.setSports(sports));
            let selectedSport = sports.find((s) => s.Id === sportId);
            if (!selectedSport) selectedSport = sports.find((s) => s.Id === 1);
            dispatch(sportsbookActions.setSelectedSport(selectedSport));

            // Check if empty tree
            const emptyTree = responses[0].data.Contents === 'Not found' || childsNotExist(responses[0].data.Contents) ? true : false;
            // const emptyTree =
            //     responses[0].data.Contents === 'Not found' || responses[0].data.Contents?.childs[0]?.childs[0]?.childs?.length === 0 ? true : false;

            let sportMarketTreeObj;
            if (emptyTree) {
                sportMarketTreeObj = getSportMarketTreeObjFromMarkets(responses[1].data.Contents.Markets);
                if (sportMarketTreeObj) dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
            } else {
                sportMarketTreeObj = getSportMarketTreeObj(responses[0].data.Contents);
                dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
                dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: responses[0].data.Contents }));
            }

            dispatch(eventActions.setSelectedMarketCategoryIndex(0));
            dispatch(eventActions.setLiveEvent(responses[1].data.Contents));
            dispatch(eventActions.setShowingLiveEvent(true));
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const getBreadcrumbData = (selectedSportId, categoryId, tournamentId, isOutright, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`Pregame/getPregameData?providerId=1&h24=false&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_SPORTS_API_BASE,
            });
            if (response.status !== 200) throw Error();

            const sport = response.data.Sports.find((s) => s.Id === selectedSportId);
            const sportCategories = sport ? sport.Categories : [];

            dispatch(eventActions.setSportPregameCategories(sportCategories));

            if (isOutright) {
                dispatch(getOutrightEvents(selectedSportId, categoryId, sportCategories, signal));
            } else {
                dispatch(getTournamentEvents(selectedSportId, categoryId, tournamentId, isOutright, signal));
            }
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getTournamentEvents = (sportId, categoryId, tournamentId, isOutright, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const ids = `${sportId},${categoryId},${tournamentId}`;

            const response = await axiosApi.post(
                `Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":${isOutright}}` },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }
            );
            if (response.status !== 200) throw Error();

            dispatch(eventActions.setTournamentevents(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getOutrightEvents = (sportId, categoryId, sportCategories, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const category = sportCategories.find((c) => c.Id === categoryId);
            if (!category) return;

            const outrightTournaments = category.Tournaments.filter(
                (t) => t.Name.International.includes('Outright') || t.Name.International.includes('Specials')
            );

            let events = [];

            for (let i = 0; i < outrightTournaments.length; i++) {
                const outrightTournament = outrightTournaments[i];

                const ids = `${sportId},${categoryId},${outrightTournament.Id}`;

                const response = await axiosApi.post(
                    `Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":true}` },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                );

                if (response.status !== 200) continue;
                events = [...events, ...response.data.Contents];

                dispatch(eventActions.setTournamentevents(events));
            }
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
