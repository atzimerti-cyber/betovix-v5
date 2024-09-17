import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { gamificationActions } from './userGamificationSlice';
import { appActions } from '../../features/InitApp/appSlice';
import { progressActions } from '../Home/features/ProgressSlice';
import config from '../../config';

////To get all heroes, levels, milestones (to display in profile?tab=horoes && GamificationBanner.jsx)(whether user has a hero or not)////
export const getHeroes = (signal) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const response = await axiosApi.get(`/ModuleGamification/GetAllHeroes`, {
                signal: signal,
                baseURLOverride: config.VITE_GAMIFICATION_STORETUBE,
            });

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const canSelect = response.data.Contents.CanSelect;
            dispatch(gamificationActions.setCanSelect(canSelect));

            const heroes = response.data.Contents.Heroes?.map((hero) => ({
                name: hero.Hero.Achievement?.Name,
                id: hero.Hero.Achievement?.AchievementID,
                banner: hero.Hero.Achievement?.Banner,
                cropped: hero.Hero.Achievement?.BannerHighResolution,
                icon: hero.Hero.Achievement?.Icon,
                description: hero.Hero.Achievement?.TermsAndConditions,
                metadata: {
                    HeroName: hero.Hero.MetaData?.Name,
                    HeroSubName: hero.Hero.MetaData?.SubName,
                    action: hero.Hero.MetaData.Action,
                    lvlAction: hero.Hero.MetaData.LevelAction,
                },
                levels: hero.Levels?.map((level) => ({
                    id: level.Level.Achievement?.AchievementID,
                    sortName: level.Level.Achievement?.Name,
                    icon: level.Level.Achievement?.Icon,
                    name: level.Level.MetaData?.Name,
                    description: level.Level.Achievement?.TermsAndConditions,
                    reward: level.Level.Rewards?.map((reward) => ({
                        id: reward?.RewardID,
                        description: reward?.Name,
                    })),
                    milestones: level.MileStones?.map((milestone) => ({
                        id: milestone.Achievement?.AchievementID,
                        icon: milestone.Achievement?.Icon,
                        name: milestone.MetaData?.Name,
                        sortName: milestone.Achievement?.Name,
                        description: milestone.Achievement?.TermsAndConditions,
                        reward: milestone.Rewards?.map((reward) => ({
                            id: reward?.RewardID,
                            description: reward?.Name,
                        })),
                    }))
                        .sort((a, b) => a?.sortName.localeCompare(b?.sortName))
                }))
                    .sort((a, b) => a?.sortName.localeCompare(b?.sortName))
            }))
                .sort((a, b) => a?.name.localeCompare(b?.name));

            dispatch(gamificationActions.setHeroes(heroes));

            const state = getState();
            if (Object.keys(state.gamification.displayedHero).length == 0 && heroes.length > 0) {
                dispatch(gamificationActions.setDisplayedHero(heroes[0]));
            }

            dispatch(appActions.setBarLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(appActions.setBarLoading(false));
        }
    };
};

////To select the hero////
export const selectedHero = (displayedHeroAction, lvlAction, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`/ModuleGamification/SelectHero?action=${displayedHeroAction}&levelAction=${lvlAction}`, {
                signal: signal,
                baseURLOverride: config.VITE_GAMIFICATION_STORETUBE,
            });
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
                dispatch(gamificationActions.setSelectedHeroError(true));
                throw Error(response.data.Contents);
            } 

            dispatch(gamificationActions.setSelectedHeroError(false));

            setTimeout(() => {
                dispatch(getUserAchievements());
            }, 1000 * 10);
            setTimeout(() => {
                dispatch(getUserAchievements());
                dispatch(heroProgress());
            }, 1000 * 20);
            setTimeout(() => {
                dispatch(getUserAchievements());
                dispatch(heroProgress());
            }, 1000 * 30);
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const BuyHeroLevel = (hero, level, signal) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`/ModuleGamification/BuyHeroLevel?heroId=${hero}&levelId=${level}`, {
                signal: signal,
                baseURLOverride: config.VITE_GAMIFICATION_STORETUBE,
            });
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
           
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

////To get the hero, levels, milestones of SELECTED hero////
export const getUserAchievements = () => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/ModuleGamification/GetMembersSelectedHero`,
                {
                    baseURLOverride: import.meta.env.VITE_GAMIFICATION_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200 || response.data.Contents == null) {
                dispatch(gamificationActions.setSelectedHero(null));
                dispatch(gamificationActions.setHeroLevels(null));
                dispatch(gamificationActions.setCurrentLevel(null));
                //dispatch(gamificationActions.setManualRewards(null));
                throw Error(response.data.Contents);
            };

            //SELECTED HERO
            const selectedHero = {
                id: response.data.Contents.Hero.Achievement.AchievementID,
                name: response.data.Contents.Hero.MetaData.Name,
                subName: response.data.Contents.Hero.MetaData.SubName,
                banner: response.data.Contents.Hero.Achievement?.Banner,
                cropped: response.data.Contents.Hero.Achievement?.BannerHighResolution,
                icon: response.data.Contents.Hero.Achievement?.Icon,
                description: response.data.Contents.Hero.Achievement?.TermsAndConditions,
                action: response.data.Contents.Hero.MetaData?.Action,
                lvlAction: response.data.Contents.Hero.MetaData?.LevelAction,
            };

            //LEVELS AND MILESTONES
            const heroLevels = response.data.Contents.Levels.map(level => {
                const milestones = level.MileStones.map(milestone => ({
                    id: milestone.Achievement.AchievementID,
                    name: milestone.MetaData?.Name,
                    sortName: milestone.Achievement?.Name,
                    progress: milestone.AchievementEntrand?.Progress,
                    points: milestone.AchievementEntrand?.ScoreBoard,
                    pointsValue: milestone.PointStrategy?.BasePoints,
                    icon: milestone.Achievement?.Icon,
                    reward: milestone.Rewards?.map((reward) => ({
                        id: reward?.RewardID,
                        description: reward?.Name,
                    }))
                })).sort((a, b) => a.sortName.localeCompare(b.sortName));

                return {
                    id: level.Level.Achievement.AchievementID,
                    name: level.Level.MetaData.Name,
                    sortName: level.Level.Achievement?.Name,
                    completed: level.Level.AchievementEntrand?.Completed,
                    milestones: milestones,
                    scoreboard: level.Level.AchievementEntrand?.ScoreBoard,
                    basePoints: level.Level.PointStrategy?.BasePoints,
                    progress: level.Level.AchievementEntrand?.Progress,
                    icon: level.Level.Achievement?.Icon,
                    reward: level.Level.Rewards?.map((reward) => ({
                        id: reward?.RewardID,
                        description: reward?.Name,
                    }))
                };
            }).sort((a, b) => a.sortName.localeCompare(b.sortName));

            const currentLevel = {
                id: response.data.Contents.CurrentLevel.AchievementID,
                name: response.data.Contents.CurrentLevel.LevelName,
                completed: response.data.Contents.CurrentLevel.Completed,
                scoreboard: response.data.Contents.CurrentLevel.ScoreBoard,
                progress: response.data.Contents.CurrentLevel.Progress,
            }

            //console.log("Hero: ", selectedHero);
            //console.log("Hero Levels: ", heroLevels);
            //console.log("Current Level: ", currentLevel);

            dispatch(gamificationActions.setSelectedHero(selectedHero));
            dispatch(gamificationActions.setHeroLevels(heroLevels));
            dispatch(gamificationActions.setCurrentLevel(currentLevel));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

////To get available rewards////
export const getRewards = (isViewed, isClaimed, daily, weekly, monthly) => {
    return async (dispatch) => {
        try {

            const response = await axiosApi.post(
                `/Gamification/GetRewards`,
                {
                    page: '1',
                    count: '100',
                    filter: {
                        IsViewed: isViewed,
                        IsClaimed: isClaimed,
                        TodaysRewards: daily,
                        WeeklyRewards: weekly,
                        MonthlyRewards: monthly,
                    },
                    sort: '',
                },
                {
                    baseURLOverride: config.VITE_WALLET_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const allRewards = response.data.Contents.Rows;
            let popupRewards = [];
            let viewedRewards = [];
            let claimedRewards = [];

            allRewards.map((reward) => {
                if (!reward.Data.Viewed) {
                    popupRewards.push(reward.Data);
                }
                if (reward.Data.Viewed && !reward.Data.Claimed) {
                    viewedRewards.push(reward.Data);
                }
                if (reward.Data.Claimed) {
                    claimedRewards.push(reward.Data);
                }
            })

            dispatch(gamificationActions.setPopupRewards(popupRewards));
            dispatch(gamificationActions.setNewRewards(viewedRewards));
            dispatch(gamificationActions.setClaimedRewards(claimedRewards));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

////To claim a reward/////
export const claimReward = (Id) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`/Gamification/ClaimReward?rewardId=${Id}`, {
                baseURLOverride: config.VITE_WALLET_STORETUBE,
            });
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw toast.error(response.data.Contents);
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

////To set isViewed in reward (in Reward Swiper)//////
export const rewardViewed = (rewardId) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`/Gamification/RewardViewed?rewardId=${rewardId}`, {
                baseURLOverride: config.VITE_WALLET_STORETUBE,
            });
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

//To get hero progress (for Minibar)/////
export const heroProgress = () => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/ModuleGamification/GetHeroProgress`,
                {
                    baseURLOverride: import.meta.env.VITE_GAMIFICATION_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200 || response.data.Contents == null) throw Error(response.data.Contents);

            const currentLevel = {
                name: response.data.Contents.Level,
                icon: response.data.Contents.LevelIcon
            }
            const progress = response.data.Contents.Progress;
            const progressFixed = !isNaN(parseFloat(progress)) ? parseFloat(progress).toFixed(2) : progress;
            const selectedHero = response.data.Contents.Hero;
            const nextLevel = {
                name: response.data.Contents.NextLevel,
                icon: response.data.Contents.NextIcon
            }

            //console.log(currentLevel);
            //console.log(progress);
            //console.log(selectedHero);
            //console.log('Nxt Level', nextLevel);

            dispatch(progressActions.setCurrentLevel(currentLevel));
            dispatch(progressActions.setProgressBar(progressFixed));
            dispatch(progressActions.setSelectedHero(selectedHero));
            dispatch(progressActions.setNextLevel(nextLevel));

            dispatch(gamificationActions.setCurrentLevel(currentLevel));
            dispatch(gamificationActions.setProgressBar(progressFixed));
            dispatch(gamificationActions.setSelectedHero(selectedHero));
            dispatch(gamificationActions.setNextLevel(nextLevel));

        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

//To get Recurrent Rewards/////
export const recRewards = () => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/ModuleGamification/GetRecurrentRewards`,
                {
                    baseURLOverride: import.meta.env.VITE_GAMIFICATION_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200 || response.data.Contents == null) throw Error(response.data.Contents);

            const instantRewards = {
                id: response.data.Contents.instant?.AchievementId,
                name: response.data.Contents.instant?.Name,
                description: response.data.Contents.instant?.Description,
                progress: response.data.Contents.instant?.Progress,
                completed: response.data.Contents.instant?.Completed,
                icon: response.data.Contents.instant?.Icon,
                resetDate: response.data.Contents.instant?.ResetDate
            }
            const dailyRewards = {
                id: response.data.Contents.daily?.AchievementId,
                name: response.data.Contents.daily?.Name,
                description: response.data.Contents.daily?.Description,
                progress: response.data.Contents.daily?.Progress,
                completed: response.data.Contents.daily?.Completed,
                icon: response.data.Contents.daily?.Icon,
                resetDate: response.data.Contents.daily?.ResetDate
            }
            const weeklyRewards = {
                id: response.data.Contents.weekly?.AchievementId,
                name: response.data.Contents.weekly?.Name,
                description: response.data.Contents.weekly?.Description,
                progress: response.data.Contents.weekly?.Progress,
                completed: response.data.Contents.weekly?.Completed,
                icon: response.data.Contents.weekly?.Icon,
                resetDate: response.data.Contents.weekly?.ResetDate
            }
            const monthlyRewards = {
                id: response.data.Contents.monthly?.AchievementId,
                name: response.data.Contents.monthly?.Name,
                description: response.data.Contents.monthly?.Description,
                progress: response.data.Contents.monthly?.Progress,
                completed: response.data.Contents.monthly?.Completed,
                icon: response.data.Contents.monthly?.Icon,
                resetDate: response.data.Contents.monthly?.ResetDate
            }

            const manualRewards = {
                instantRewards: instantRewards,
                dailyRewards: dailyRewards,
                weeklyRewards: weeklyRewards,
                monthlyRewards: monthlyRewards
            }

            //console.log(manualRewards);

            dispatch(gamificationActions.setManualRewards(manualRewards));

        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
