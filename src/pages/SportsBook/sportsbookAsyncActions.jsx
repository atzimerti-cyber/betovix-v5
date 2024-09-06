import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { sportsbookActions } from './sportsbookSlice';
import { sportsHomeActions } from './subpages/sportsHomeSlice';
import { sportsUpcomingActions } from './subpages/sportsUpcomingSlice';
import { sportsOutrightsActions } from './subpages/sportsOutrightsSlice';
import { sportsLiveActions } from './subpages/sportsLiveSlice';
import { getLang } from '../../utils/storage';
import NoImageIcon from '../../assets/svgs/no-image.svg?react';
import { childsNotExist } from '../../utils/custom';
import config from '../../config';

export const initSportsbook = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`Pregame/getTopLeagues?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
                axiosApi.get(`Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
                axiosApi.get(`Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
            ];

            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();
            });

            // Remove null items...
            const sportBanners = responses[1].data.Banners.filter((d) => d !== null);

            dispatch(sportsbookActions.setTopLeagues(responses[0].data));
            dispatch(
                sportsbookActions.setSportBanners({
                    BannerEvents: responses[1].data.BannerEvents,
                    Banners: sportBanners,
                })
            );
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getPregameData = (sportIcons, signal, isOutrights = false) => {
    return async (dispatch, getState) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`Pregame/getPregameData?providerId=1&h24=false&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
            ];

            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();
            });

            let updatedSports = [];
            responses[0].data?.Sports?.forEach((sport) => {
                let icon = sportIcons[sport.Name?.International] || <NoImageIcon />;
                if (sport.Counters['5D'] > 0 || isOutrights)
                    updatedSports.push({ ...sport, slug: sport.Name?.International.toLowerCase().replace(/ /g, '-'), icon: icon });
            });
            // Step 1: Create a mapping from array1
            const currentState = getState().app;
            const orderMap = currentState.allSports.reduce((acc, item) => {
                acc[item.Id] = item.Order;
                return acc;
            }, {});
            // Step 2: Sort array2 based on the order defined in array1
            const sortedSports = updatedSports.sort((a, b) => {
                return (orderMap[a.Id] || 999999) - (orderMap[b.Id] || 999999);
            });

            dispatch(sportsbookActions.setSports(sortedSports));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getTournamentEvents = (tournamentId, ids, slice, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const isOutright = slice === 'sportsOutrights' ? true : false;

            const response = await axiosApi.post(
                `Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":${isOutright}}` },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }
            );
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();

            if (slice === 'sportsHome') dispatch(sportsHomeActions.addTournamentEvents({ tournamentId: tournamentId, events: response.data.Contents }));
            else if (slice === 'sportsUpcoming')
                dispatch(sportsUpcomingActions.addTournamentEvents({ tournamentId: tournamentId, events: response.data.Contents }));
            else if (slice === 'sportsLive') dispatch(sportsLiveActions.addTournamentEvents({ tournamentId: tournamentId, events: response.data.Contents }));
            else if (slice === 'sportsOutrights')
                dispatch(sportsOutrightsActions.addTournamentEvents({ tournamentId: tournamentId, events: response.data.Contents }));
            else dispatch(sportsbookActions.addTournamentEvents({ tournamentId: tournamentId, events: response.data.Contents }));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getSportMarketTree = (sportId, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: sportId },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }
            );
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const emptyTree = response.data.Contents === 'Not found' || childsNotExist(response.data.Contents) ? true : false;

            if (emptyTree) {
            } else {
                dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: response.data.Contents }));
            }
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getTournament = (sportId, categoryId, tournamentId, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`Pregame/getPregameData?providerId=1&h24=false&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_SPORTS_API_BASE,
            });

            if (response.status && response.status !== 200) throw Error(response.data.Contents);

            const sport = response.data.Sports.find((s) => s.Id === sportId);
            const category = sport.Categories.find((c) => c.Id === categoryId);
            let tournament = category.Tournaments.find((t) => t.Id === tournamentId);
            tournament.CategoryId = category.Id;
            tournament.SportId = sport.Id;

            dispatch(sportsbookActions.setSelectedSport(sport));
            dispatch(sportsbookActions.setSelectedTournament(tournament));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getLiveStreams = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`Administration/sdata?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_WALLET_API_BASE,
            });

            if (response.status !== 200) throw Error(response.data.Contents);

            dispatch(sportsbookActions.setLiveStreams(response.data));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
