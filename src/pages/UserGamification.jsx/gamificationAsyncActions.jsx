import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { gamificationActions } from './userGamificationSlice';
import { appActions } from '../../features/InitApp/appSlice';
import { current } from '@reduxjs/toolkit';

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

export const getUserAchievements = () => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/GetMembersSelectedHero`,
                {
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);

            const selectedHero = {
                id: response.data.Contents.SelectedHero.id,
                name: response.data.Contents.SelectedHero.metadata.HeroName,
                subName: response.data.Contents.SelectedHero.metadata.HeroSubName,
                banner: response.data.Contents.SelectedHero.metadata.PreviewImage,
                icon: response.data.Contents.SelectedHero.metadata.CloseUp,
                description: response.data.Contents.SelectedHero.description,
                action: response.data.Contents.SelectedHero.metadata.action,
            }

            let forCurrentLevel = [];
            let progress = 0;
            const levelProgress = (level) => {
                const mL = level.Milestones.length;
                const progressSection = 100 / (mL + 1);

                level.Milestones.forEach(milestone => {
                    const mP = milestone.optInStatus.percentageComplete;
                    progress += (mP / 100) * progressSection;
                });

                return progress;
            }

            const heroLevels = response.data.Contents.HeroLevels.map(level => {
                const milestones = level.Milestones.map(milestone => ({
                    id: milestone.id,
                    name: milestone.metadata.Name,
                    percentageComplete: milestone.optInStatus.percentageComplete,
                    points: milestone.optInStatus.points > milestone.strategies.pointsStrategy.pointsValue ? milestone.strategies.pointsStrategy.pointsValue : milestone.optInStatus.points,
                    pointsValue: milestone.strategies.pointsStrategy.pointsValue,
                    rewardType: milestone.reward ? milestone.reward.RewardType.Key : null,
                    rewardValue: milestone.reward ? milestone.reward.RewardValue : null,
                })).sort((a, b) => a.name.localeCompare(b.name));
                
                // const isCurrentLevel = milestones.find(milestone =>
                //     milestone.percentageComplete >= 0 && milestone.percentageComplete < 100
                // ) !== undefined;
                // if (isCurrentLevel){
                //     forCurrentLevel.push(level.Level);
                // }

                return {
                    id: level.Level.id,
                    name: level.Level.metadata.Name,
                    statusCode: level.Level.optInStatus.statusCode,
                    milestones: milestones,
                    points: level.Level.optInStatus.points > level.Level.strategies.pointsStrategy.pointsValue ? level.Level.strategies.pointsStrategy.pointsValue : level.Level.optInStatus.points,
                    percentageComplete: level.Level.optInStatus.percentageComplete,
                    pointsValue: level.Level.strategies.pointsStrategy.pointsValue,
                    progress: levelProgress(level),
                };
            }).sort((a, b) => a.name.localeCompare(b.name));

            heroLevels.map(heroLevel => {
                const isCurrentLevel = heroLevel.milestones.find(milestone =>
                    milestone.percentageComplete >= 0 && milestone.percentageComplete < 100
                ) !== undefined;
                if (isCurrentLevel){
                    forCurrentLevel.push(heroLevel);
                }
            })

            const currentLevel = forCurrentLevel[0];

            // console.log("Hero: ",selectedHero);
            console.log("Hero Levels: ",heroLevels);
            // console.log("Current Level: ",currentLevel);

            dispatch(gamificationActions.setSelectedHero(selectedHero));
            dispatch(gamificationActions.setHeroLevels(heroLevels));
            dispatch(gamificationActions.setCurrentLevel(currentLevel));

        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getRewards = (isViewed, isClaimed, daily, weekly, monthly) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `/Gamification/GetRewards`,
                {
                    page: "1",
                    count: "100",
                    filter: {
                        IsViewed: isViewed,
                        IsClaimed: isClaimed,
                        TodaysRewards: daily,
                        WeeklyRewards: weekly,
                        MonthlyRewards: monthly,
                    },
                    sort: "",
                },
                {
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
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

export const claimReward = (Id) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/ClaimReward?rewardId=${Id}`,
                {
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

export const rewardViewed = (rewardId) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/RewardViewed?rewardId=${rewardId}`,
                {
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


