import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { gamificationActions } from './userGamificationSlice';
import { appActions } from '../../features/InitApp/appSlice';
import config from '../../config';

////To get all heroes, levels, milestones (to display in profile?tab=horoes)(whether user has a hero or not)////
export const getHeroes = (signal) => {
    return async (dispatch) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const response = await axiosApi.get(`/ModuleGamification/GetAllHeroes`, {
                signal: signal,
                baseURLOverride: config.VITE_GAMIFICATION_STORETUBE,
            });

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const heroes = response.data.Contents.map((hero) => ({
                name: hero.Hero.Achievement?.Name,
                banner: hero.Hero.Achievement?.Banner,
                id: hero.Hero.Achievement?.AchievementID,
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
                    milestones: level.MileStones?.map((milestone) => ({
                        id: milestone.Achievement?.AchievementID,
                        icon: milestone.Achievement?.Icon,
                        name: milestone.MetaData?.Name,
                        description: milestone.Achievement?.TermsAndConditions,
                    }))
                        .sort((a, b) => a.name.localeCompare(b.name))
                }))
                    .sort((a, b) => a.sortName.localeCompare(b.sortName))
            }))
                .sort((a, b) => a.name.localeCompare(b.name));


            console.log("Get All Heroes:", heroes[0].levels);
            dispatch(gamificationActions.setHeroes(heroes));
            dispatch(gamificationActions.setDisplayedHero(heroes[0]));
            dispatch(gamificationActions.setEricLevels(heroes[0].levels));

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
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            setTimeout(() => {
                dispatch(getUserAchievements());
            }, 5000);
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
                    progress: milestone.AchievementEntrand?.Progress,
                    points: milestone.AchievementEntrand?.ScoreBoard,
                    pointsValue: milestone.PointStrategy?.BasePoints,
                    rewardType: milestone.Rewards?.RewardType,
                    rewardValue: milestone.Rewards?.RewardValue,
                    icon: milestone.Achievement?.Icon,
                })).sort((a, b) => a.name.localeCompare(b.name));

                return {
                    id: level.Level.Achievement.AchievementID,
                    name: level.Level.MetaData.Name,
                    completed: level.Level.AchievementEntrand?.Completed,
                    milestones: milestones,
                    scoreboard: level.Level.AchievementEntrand?.ScoreBoard,
                    basePoints: level.Level.PointStrategy?.BasePoints,
                    progress: level.Level.AchievementEntrand?.Progress,
                    icon: level.Level.Achievement?.Icon,
                };
            }).sort((a, b) => {
                const levelANumber = parseInt(a.name.replace(/\D/g, ''), 10);
                const levelBNumber = parseInt(b.name.replace(/\D/g, ''), 10);
                return levelANumber - levelBNumber;
            });

            // DAILY, WEEKLY, MONTHLY REWARDS //
            // const dailyRewards = {
            //     id: response.data.Contents.Daily?.id,
            //     name: response.data.Contents.Daily?.metadata.Name,
            //     description: response.data.Contents.Daily?.description,
            //     progress: response.data.Contents.Daily?.optInStatus.percentageComplete,
            //     rewardType: response.data.Contents.Daily?.reward?.RewardType?.Key,
            //     rewardValue: response.data.Contents.Daily?.reward?.RewardValue,
            //     rewardSymbol: response.data.Contents.Daily?.reward?.RewardType?.UomSymbol
            // }
            // const weeklyRewards = {
            //     id: response.data.Contents.Weekly?.id,
            //     name: response.data.Contents.Weekly?.metadata.Name,
            //     description: response.data.Contents.Weekly?.description,
            //     progress: response.data.Contents.Weekly?.optInStatus.percentageComplete,
            //     rewardType: response.data.Contents.Weekly?.reward?.RewardType?.Key,
            //     rewardValue: response.data.Contents.Weekly?.reward?.RewardValue,
            //     rewardSymbol: response.data.Contents.Weekly?.reward?.RewardType?.UomSymbol
            // }
            // const monthlyRewards = {
            //     id: response.data.Contents.Monthly?.id,
            //     name: response.data.Contents.Monthly?.metadata.Name,
            //     description: response.data.Contents.Monthly?.description,
            //     progress: response.data.Contents.Monthly?.optInStatus.percentageComplete,
            //     rewardType: response.data.Contents.Monthly?.reward?.RewardType?.Key,
            //     rewardValue: response.data.Contents.Monthly?.reward?.RewardValue,
            //     rewardSymbol: response.data.Contents.Monthly?.reward?.RewardType?.UomSymbol
            // }

            // const manualRewards = {
            //     dailyRewards: dailyRewards,
            //     weeklyRewards: weeklyRewards,
            //     monthlyRewards: monthlyRewards
            // }

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
            //console.log("Manual Rewards: ", manualRewards);

            dispatch(gamificationActions.setSelectedHero(selectedHero));
            dispatch(gamificationActions.setHeroLevels(heroLevels));
            dispatch(gamificationActions.setCurrentLevel(currentLevel));
            //dispatch(gamificationActions.setManualRewards(manualRewards));
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
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
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
                name: response.data.Contents.Level
            }
            const progress = response.data.Contents.Progress;
            //const progressFixed = progress.toFixed(2);
            const selectedHero = response.data.Contents.Hero;

            //console.log(currentLevel);
            //console.log(progress);
            //console.log(selectedHero);

            dispatch(gamificationActions.setCurrentLevel(currentLevel));
            dispatch(gamificationActions.setProgressBar(progress));
            dispatch(gamificationActions.setSelectedHero(selectedHero));

        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};


