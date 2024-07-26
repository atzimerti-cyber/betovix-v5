import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { layoutActions } from '../Layout/layoutSlice';
import { appActions } from './appSlice';
import {
    getLang,
    storageGetOddsFormat,
    storageSetOddsFormat,
    getLeftbar,
    getRightbar,
    getTicketChangesSettings,
    getTicketFromStorage,
} from '../../utils/storage';
import NoImageIcon from '../../assets/svgs/no-image.svg?react';
import HomeIcon from '../../assets/svgs/home.svg?react';
import SlotsIcon from '../../assets/svgs/slots.svg?react';
import BlackjackIcon from '../../assets/svgs/blackjack.svg?react';
import HeartIcon from '../../assets/svgs/heart.svg?react';
import LeaderIcon from '../../assets/svgs/leader.svg?react';
import PaperIcon from '../../assets/svgs/paper.svg?react';
import PricesIcon from '../../assets/svgs/prices.svg?react';
import StarOutlineIcon from '../../assets/svgs/star-outline.svg?react';
import AlphaIcon from '../../assets/svgs/alpha.svg?react';
import LogoSmall from '../../assets/svgs/logo-small.svg?react';
import LogoSmall1C from '../../assets/svgs/logo-small-oneColor.svg?react';
import RewardsIcon from '../../assets/svgs/rewards.svg?react';

import { getAccessToken } from '../../utils/auth';
import { loginActions } from '../../pages/Login/loginSlice';
import { cryptoActions } from '../../pages/Crypto/cryptoSlice';
import { liveActions } from './liveSlice';
import { setLang } from '../../utils/storage';
import { ticketActions } from '../Ticket/ticketSlice';
import { betslipActions } from '../Betslip/betslipSlice';

import { getCrypto } from '../../pages/Crypto/cryptoAsyncActions';
import { getUserAchievements } from '../../pages/UserGamification.jsx/gamificationAsyncActions';

export const loadInitData = (isMobile) => {
    return async (dispatch, getState) => {
        try {
            // Init menu
            let casinoMenuItems = [];
            let sportsMenuItems = [];
            let allMenuItems = [];

            // Storage items
            // -------------------------------------
            const isLeftOpen = getLeftbar();
            if (isMobile) dispatch(layoutActions.setFullLeftContainer(false));
            else dispatch(layoutActions.setFullLeftContainer(isLeftOpen));

            const isRightOpen = getRightbar();
            if (isMobile) dispatch(layoutActions.setShowRightContainer(false));
            else dispatch(layoutActions.setShowRightContainer(isRightOpen));

            const ticketChangesSettings = getTicketChangesSettings();
            dispatch(ticketActions.setTicketChangesSettings(ticketChangesSettings));

            const storageTicket = getTicketFromStorage();
            if (storageTicket && storageTicket.type) dispatch(betslipActions.setBetType(storageTicket.type));

            const lang = getLang();
            dispatch(appActions.setLang(lang));

            let oddsFormat = storageGetOddsFormat();
            if (!oddsFormat) {
                oddsFormat = 'Decimal';
                storageSetOddsFormat('Decimal');
            }
            dispatch(appActions.setOddsFormat(oddsFormat));

            // User. TODO: get settings (CORS issue)? And remove them from the .env file?
            // -------------------------------------
            // const responseSettings = await axios.get(`https://pick777.net/customer/settings.js?v=2023.09.17.1437`, {
            //     responseType: 'text/plain',
            // });
            // console.log(responseSettings);

            const token = getAccessToken();
            let user = null;
            if (token) {
                const response = await axiosApi.get(`login/State/?lang=en&siteid=${import.meta.env.VITE_SITE_ID}`, {
                    // baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                    baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
                });
                if (response.data.Status.StatusCode !== 200) dispatch(loginActions.logout());
                else {
                    // TODO: The rest should come from the backend
                    user = {
                        ...response.data.Contents,

                        // profileHidden: false,
                        // marketingEmails: true,
                        // level: 0,
                        // wagered: 500,
                        // registered: 1712505696754,
                    };
                    dispatch(loginActions.setUser(user));
                    dispatch(layoutActions.setAvailableBonus(user));
                    dispatch(layoutActions.setAvailableBonusBalance(user));
                }
            }


            // Necessary
            // -------------------------------------
            const requestsNecessary = [
                axiosApi.get(`Translation/MyTranslations?type=Sportsbook&lang=${lang.id}`, {
                    baseURLOverride: import.meta.env.VITE_SPORTS_API_BASE,
                }),
            ];
            const responsesNecessary = await Promise.all(requestsNecessary);
            responsesNecessary.forEach((response) => {
                if (response.status !== 200) throw Error();
            });
            dispatch(appActions.setTranslations(responsesNecessary[0].data.Contents));
            //dispatch(cryptoActions.setCryptoPrices(cryptoPrices)); // TODO: Get the prices from the api
            /////////////////////////////////////////////////////
            const controller = new AbortController();
            const signal = controller.signal;
            dispatch(getCrypto(signal));

            //Get user achievements
            dispatch(getUserAchievements(signal));

            // Get permissions after setting user
            const currentLoginState = getState().login;
            const permissions = currentLoginState.permissions;

            // Casino
            // -------------------------------------
            if (permissions.AllowToCasino || permissions.AllowToSlots) {
                const requestsCasino = [
                    axiosApi.get(`MyCasino/GetVendors?lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                        baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                    }),
                ];
                const responsesCasino = await Promise.all(requestsCasino);
                responsesCasino.forEach((response) => {
                    if (response.status !== 200) throw Error();
                });

                if (Array.isArray(responsesCasino[0].data.Contents)) dispatch(appActions.setAllCasinoVendors(responsesCasino[0].data.Contents));


                casinoMenuItems.push({
                    category: { id: 1, label: 'Casino', visible: true },
                    items: [
                        {
                            id: 1,
                            label: 'Lobby',
                            icon: <HomeIcon />,
                            page: 'casino/lobby',
                        },
                        {
                            id: 2,
                            label: 'Slots',
                            icon: <SlotsIcon />,
                            page: 'casino/slots',
                        },
                        {
                            id: 3,
                            label: 'Live Casino',
                            icon: <BlackjackIcon />,
                            page: 'casino/live',
                        },
                        {
                            id: 4,
                            label: 'Favorites',
                            icon: <HeartIcon />,
                            page: 'casino/favorites',
                        },
                    ],
                });

                // allMenuItems.push({
                //     category: { id: 1, label: 'Casino', visible: true },
                //     items: [
                //         {
                //             id: 1,
                //             label: 'Lobby',
                //             icon: <HomeIcon />,
                //             page: 'casino/lobby',
                //         },
                //         {
                //             id: 2,
                //             label: 'Slots',
                //             icon: <SlotsIcon />,
                //             page: 'casino/slots',
                //         },
                //         {
                //             id: 3,
                //             label: 'Live Casino',
                //             icon: <BlackjackIcon />,
                //             page: 'casino/live',
                //         },
                //         {
                //             id: 4,
                //             label: 'Favorites',
                //             icon: <HeartIcon />,
                //             page: 'casino/favorites',
                //         },
                //     ],
                // });
            }

            // Sports
            // -------------------------------------
            if (permissions.AllowToSports) {
                const requestsSports = [
                    axiosApi.post(
                        `Pregame/PostData?action=sports&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                        { data: `{"ProviderId":1,"Value":"","H24":false}` },
                        { baseURLOverride: import.meta.env.VITE_SPORTS_API_BASE }
                    ),
                    axiosApi.get(`Pregame/getTopLeagues?lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                        baseURLOverride: import.meta.env.VITE_SPORTS_API_BASE,
                    }),
                    axiosApi.get(`LiveCluster/getLiveStateJson2?lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                        baseURLOverride: import.meta.env.VITE_SPORTS_API_BASE,
                    }),
                ];

                const responsesSports = await Promise.all(requestsSports);
                responsesSports.forEach((response) => {
                    if (response.status !== 200) throw Error();
                });

                const currentState = getState().app;
                const sportIcons = currentState.sportIcons;
                let updatedSports = [];
                responsesSports[0].data.Contents.forEach((sport) => {
                    let icon = sportIcons[sport.Name?.International] || <NoImageIcon />;
                    updatedSports.push({ ...sport, slug: sport.Name?.International.toLowerCase().replace(/ /g, '-'), icon: icon });
                });

                const topSports = updatedSports.slice(0, 5);
                const topTournaments = responsesSports[1].data;
                const matchesObj = responsesSports[2].data.Matches.reduce((acc, match) => {
                    acc[match.MatchId] = match;
                    return acc;
                }, {});

                dispatch(appActions.setAllSports(updatedSports));
                dispatch(appActions.setTopSports(topSports));
                dispatch(appActions.setTopTournaments(topTournaments));
                dispatch(liveActions.setLiveState(matchesObj));

                // For menu
                let topTournamentsMenu = { category: { id: 2, label: 'Top Tournaments', visible: true }, items: [] };
                topTournaments.SubCategs[0].Items.forEach((topTournament) => {
                    const value = topTournament.Value.split(',');
                    topTournamentsMenu.items.push({
                        id: topTournament.Value,
                        label: topTournament.Par2 + ' ' + topTournament.Name,
                        icon: sportIcons[topTournaments.SubCategs[0].SubCateg.Name],
                        page: `sportsbook/tournament/${value[0]}/${value[1]}/${value[2]}`,
                    });
                });
                sportsMenuItems.push(topTournamentsMenu);

                let topSportsMenu = { category: { id: 3, label: 'Top Sports', visible: true }, items: [] };
                topSports.forEach((topSport) => {
                    topSportsMenu.items.push({
                        id: topSport.Id,
                        label: topSport.Name.International,
                        icon: topSport.icon,
                        page: `sportsbook/home/${topSport.slug}`,
                    });
                });
                sportsMenuItems.push(topSportsMenu);

                let alphabeticalAllSports = [...updatedSports];
                alphabeticalAllSports.sort((a, b) => a.Name.International.localeCompare(b.Name.International));
                let allSportsMenu = { category: { id: 4, label: 'All Sports', visible: false }, items: [] };
                alphabeticalAllSports.forEach((sport) => {
                    allSportsMenu.items.push({
                        id: sport.Id,
                        label: sport.Name.International,
                        icon: sport.icon,
                        page: `sportsbook/home/${sport.slug}`,
                    });
                });
                sportsMenuItems.push(allSportsMenu);

                // // For menu
                // let topTournamentsMenu = { category: { id: 2, label: 'Top Tournaments', visible: true }, items: [] };
                // topTournaments.SubCategs[0].Items.forEach((topTournament) => {
                //     const value = topTournament.Value.split(',');
                //     topTournamentsMenu.items.push({
                //         id: topTournament.Value,
                //         label: topTournament.Par2 + ' ' + topTournament.Name,
                //         icon: sportIcons[topTournaments.SubCategs[0].SubCateg.Name],
                //         page: `sportsbook/tournament/${value[0]}/${value[1]}/${value[2]}`,
                //     });
                // });
                // allMenuItems.push(topTournamentsMenu);

                // let topSportsMenu = { category: { id: 3, label: 'Top Sports', visible: true }, items: [] };
                // topSports.forEach((topSport) => {
                //     topSportsMenu.items.push({
                //         id: topSport.Id,
                //         label: topSport.Name.International,
                //         icon: topSport.icon,
                //         page: `sportsbook/home/${topSport.slug}`,
                //     });
                // });
                // allMenuItems.push(topSportsMenu);

                // let alphabeticalAllSports = [...updatedSports];
                // alphabeticalAllSports.sort((a, b) => a.Name.International.localeCompare(b.Name.International));
                // let allSportsMenu = { category: { id: 4, label: 'All Sports', visible: false }, items: [] };
                // alphabeticalAllSports.forEach((sport) => {
                //     allSportsMenu.items.push({
                //         id: sport.Id,
                //         label: sport.Name.International,
                //         icon: sport.icon,
                //         page: `sportsbook/home/${sport.slug}`,
                //     });
                // });
                // allMenuItems.push(allSportsMenu);
            }

            // Rest of menu items
            allMenuItems.push({
                category: { id: 5, label: 'Gamification', visible: false },
                items: [
                    {
                        id: 1,
                        label: `Your Progress`,
                        icon: <LogoSmall1C color="#FF0000" />,
                        modal: 'your-progress',
                    },
                    {
                        id: 2,
                        label: `My Rewards`,
                        icon: <RewardsIcon color="#FF0000" />,
                        page: 'rewards',
                    },
                ],
            });
            allMenuItems.push({
                category: { id: 6, label: 'More', visible: false },
                items: [
                    {
                        id: 1,
                        label: 'Crypto Prices',
                        icon: <PricesIcon />,
                        page: 'crypto',
                    },
                    {
                        id: 2,
                        label: 'My Bets',
                        icon: <PaperIcon />,
                        page: 'sportsbook/mybets',
                    },
                    {
                        id: 3,
                        label: 'Leaderboard',
                        icon: <LeaderIcon />,
                        page: 'leaderboard',
                    },
                ],
            });

            dispatch(appActions.setCasinoMenuItems(casinoMenuItems));
            dispatch(appActions.setSportsMenuItems(sportsMenuItems));
            dispatch(appActions.setMenuItems(allMenuItems));
            dispatch(appActions.setInitDataLoaded(true));
        } catch (error) {
            toast.error(error?.message);
            dispatch(appActions.setInitDataLoaded(true));
        }
    };
};

export const getTranslations = (lang) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`Translation/MyTranslations?type=Sportsbook&lang=${lang.id}`, {
                baseURLOverride: import.meta.env.VITE_SPORTS_API_BASE,
            });

            if (response.status !== 200) throw Error();

            dispatch(appActions.setTranslations(response.data.Contents));
            dispatch(appActions.setLang(lang));
            setLang(lang);
        } catch (error) {
            toast.error(error?.message);
        }
    };
};
