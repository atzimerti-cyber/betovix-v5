import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { gamificationActions } from './userGamificationSlice';

export const getHeroes = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/GetAllHeroes`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            // if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
           
            console.log(response.data.Contents);
            response.data.Contents.sort((a, b) => a.name.localeCompare(b.name));

            const heroes = response.data.Contents.map(hero => ({
                banner: hero.metadata.PreviewImage,
                id: hero.id,
                icon: hero.metadata.CloseUp,
                description: hero.description,
                metadata: {
                    HeroName: hero.metadata.HeroName,
                    HeroSubName: hero.metadata.HeroSubName,
                    isHero: hero.metadata.isHero
                }
            }));

            console.log("Filtered Heroes:", heroes);
            dispatch(gamificationActions.setHeroes(heroes));
            dispatch(gamificationActions.setSelectedHero(heroes[0]));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

// export const getHeroes = (signal) => {
//     return async (dispatch) => {
//         try {
//             const lang = getLang();

//             const response = await axiosApi.get(
//                 `/Gamification/GetAllHeroes`,
//                 {
//                     signal: signal,
//                     baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
//                 }
//             );

//             // if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
//             if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
           
//             const heroes = response.data.Contents;
//             console.log("All Heroes:", heroes);
//             dispatch(gamificationActions.setHeroes(heroes));
//         } catch (error) {
//             const message = error?.message ? error.message : error;
//             if (!error?.code === 'ERR_CANCELED') toast.error(message);
//         }
//     };
// };

// export const getLevels = (signal) => {
//     return async (dispatch) => {
//         try {
//             const lang = getLang();

//             const response = await axiosApi.post(
//                 `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
//                 {
//                     data: `{"Id":""}`,
//                 },
//                 {
//                     signal: signal,
//                     baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
//                 }
//             );

//             if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
           
//             const levels = response.data.Contents;
//             console.log("All Levels:", levels);
//             dispatch(profileActions.setHeroes(levels));
//         } catch (error) {
//             const message = error?.message ? error.message : error;
//             if (!error?.code === 'ERR_CANCELED') toast.error(message);
//         }
//     };
// };

