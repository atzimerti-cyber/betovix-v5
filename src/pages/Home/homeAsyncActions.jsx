import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { homeActions } from './homeSlice';
// import { appActions } from '../../features/InitApp/appSlice';
import { getLang } from '../../utils/storage';
import { casinoActions } from '../Casino/casinoSlice';
import config from '../../config';

// import levels from '../../dummyData/levels';

export const getHome = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.get(`MyCasino/GetBanners?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }),
                axiosApi.get(`Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }),
                axiosApi.get(`MyCasino/GetHome?lang=${lang.label}&siteid=${config.VITE_SITE_ID}`, {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }),
                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                ),
                axiosApi.post(
                    `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
                    {
                        // data: `{"Page":1,"PageItems":24,"Tag":"live","Search":"","ProviderId":0,"BrandId":0,"VendorId":0}`,
                        data: `{"Page":1,"PageItems":24,"Tag":"live","Search":""}`,
                    },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_CASINO_BASE,
                    }
                ),
            ];
            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();
            });

            const favoriteGames = responses[2].data.Contents['Favorites'];
            const newGames = responses[2].data.Contents['New Games'];
            const recentGames = responses[2].data.Contents['Recently Played'];
            const slots = responses[3].data.Contents;
            const live = responses[4].data.Contents;

            const home = {
                recentGames: recentGames,
                newGames: newGames,
                favoriteGames: favoriteGames,
                allSlots: slots,
                allLive: live,
            };

            const sportBanners = responses[1].data.Banners.filter((d) => d !== null);

            dispatch(homeActions.setCasinoBanners(responses[0].data.Contents));
            // dispatch(homeActions.setSportBanners(responses[1].data.Banners));
            dispatch(casinoActions.setFilteredGames(home));
            dispatch(
                homeActions.setSportBanners({
                    BannerEvents: responses[1].data.BannerEvents,
                    Banners: sportBanners,
                })
            );

            // TODO:
            // dispatch(homeActions.setLevels(levels));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};

// export const getEventsLive = (signal) => {
//     return async (dispatch) => {
//         try {
//             const lang = getLang();

//             const response = await axiosApi.get(`LiveCluster/getLiveStateJson2?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
//                 signal: signal,
//                 baseURLOverride: config.VITE_SPORTS_API_BASE,
//             });
//             if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();

//             dispatch(appActions.setLiveState(response.data.Matches));
//         } catch (error) {
//             if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
//         }
//     };
// };

export const getEventsTop = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Pregame/PostData/?action=coupon&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: `{"providerId":1,"coupon":"top"}` },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_SPORTS_API_BASE,
                }
            );
            if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();

            dispatch(homeActions.setEventsTop(response.data.Contents));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};
