import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { gamificationActions } from './userGamificationSlice';
import { appActions } from '../../features/InitApp/appSlice';

export const getHeroes = (signal) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/GetAllHeroes`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const heroes = response.data.Contents.map(hero => ({
                name: hero.Hero.name,
                banner: hero.Hero.metadata.PreviewImage,
                id: hero.Hero.id,
                icon: hero.Hero.metadata.CloseUp,
                description: hero.Hero.description,
                metadata: {
                    HeroName: hero.Hero.metadata.HeroName,
                    HeroSubName: hero.Hero.metadata.HeroSubName,
                    isHero: hero.Hero.metadata.isHero,
                    action: hero.Hero.metadata.action,
                },
                levels: hero.Levels.map(level => ({
                    id: level.Level.id,
                    icon: level.Level.icon,
                    name: level.Level.metadata.Name,
                    description: level.Level.description,
                    milestones: level.Milestones.map(milestone => ({
                        id: milestone.id,
                        icon: milestone.icon,
                        name: milestone.metadata.Name,
                        description: milestone.description,
                      }))
                      .sort((a, b) => a.name.localeCompare(b.name))
                  }))
                  .sort((a, b) => a.name.localeCompare(b.name))
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
           

            console.log("Filtered Heroes:", heroes);
            dispatch(gamificationActions.setHeroes(heroes));
            dispatch(gamificationActions.setDisplayedHero(heroes[0]));
            
            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

export const selectedHero = (displayedHeroAction, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/SelectHero?action=${displayedHeroAction}`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            
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

