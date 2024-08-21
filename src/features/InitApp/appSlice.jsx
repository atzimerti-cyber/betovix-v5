import { createSlice, current } from '@reduxjs/toolkit';

import { storageSetOddsFormat } from '../../utils/storage';

import SoccerIcon from '../../assets/sportIcons/soccer.svg?react';
import BasketballIcon from '../../assets/sportIcons/basketball.svg?react';
import TennisIcon from '../../assets/sportIcons/tennis.svg?react';
import CricketIcon from '../../assets/sportIcons/cricket.svg?react';
import MMAIcon from '../../assets/sportIcons/mma.svg?react';
import FootballIcon from '../../assets/sportIcons/football.svg?react';
import BaseballIcon from '../../assets/sportIcons/baseball.svg?react';
import IceHockeyIcon from '../../assets/sportIcons/ice-hockey.svg?react';
import HandballIcon from '../../assets/sportIcons/handball.svg?react';
import AmericanFootballIcon from '../../assets/sportIcons/american-football.svg?react';
import TableTennisIcon from '../../assets/sportIcons/table-tennis.svg?react';
import VolleyballIcon from '../../assets/sportIcons/volleyball.svg?react';
import BoxingIcon from '../../assets/sportIcons/boxing.svg?react';
import SnookerIcon from '../../assets/sportIcons/snooker.svg?react';
import WaterpoloIcon from '../../assets/sportIcons/waterpolo.svg?react';
import Starcraft1Icon from '../../assets/sportIcons/starcraft-1.svg?react';
import Starcraft2Icon from '../../assets/sportIcons/starcraft-2.svg?react';
import CounterStrike2Icon from '../../assets/sportIcons/counter-strike-2.svg?react';
import ValorantIcon from '../../assets/sportIcons/valorant.svg?react';
import Dota2Icon from '../../assets/sportIcons/dota-2.svg?react';
import KingOfGloryIcon from '../../assets/sportIcons/king-of-glory.svg?react';
import DartsIcon from '../../assets/sportIcons/darts.svg?react';
import GaelicHurlingIcon from '../../assets/sportIcons/gaelic-hurling.svg?react';
import OverwatchIcon from '../../assets/sportIcons/overwatch.svg?react';
import RugbyUnionIcon from '../../assets/sportIcons/rugby-union.svg?react';
import MobileLegendsIcon from '../../assets/sportIcons/mobile-legends.svg?react';
import LeagueOfLegendsIcon from '../../assets/sportIcons/league-of-legends.svg?react';
import RainbowSixIcon from '../../assets/sportIcons/rainbow-six.svg?react';
import Warcraft3Icon from '../../assets/sportIcons/warcraft-3.svg?react';

import Amatic from '../../assets/casinoIcons/amatic.svg?react'
import Aristocrat from '../../assets/casinoIcons/aristocrat-logo.svg?react';
import Egt from '../../assets/casinoIcons/egt-logo.svg?react';
import Egyptian from '../../assets/casinoIcons/egyptian.svg?react';
import Evolution from '../../assets/casinoIcons/evolution-logo.svg?react';
import Netent from '../../assets/casinoIcons/netent-logo.svg?react';
import New from '../../assets/casinoIcons/new.svg?react';
import Novomatic from '../../assets/casinoIcons/novomatic.svg?react';
import PlayNGo from '../../assets/casinoIcons/playngo-logo.svg?react';
import Playtech from '../../assets/casinoIcons/playtech-logo.svg?react';
import Pragmatic from '../../assets/casinoIcons/pragmatic-logo.svg?react';
import RedTiger from '../../assets/casinoIcons/redtiger-logo.svg?react';
import Yggdrasil from '../../assets/casinoIcons/yggdrasil-logo.svg?react';
import Providers from '../../assets/casinoIcons/providers.svg?react';
import Favorites from '../../assets/svgs/heart.svg?react';


const initialState = {
    unreadNotifications: 0,
    initDataLoaded: false,
    barLoading: false,
    availableLangs: [
        {
            id: 'en',
            label: 'English',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/gb.svg',
        },
        {
            id: 'el',
            label: 'Ελληνικά',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/gr.svg',
        },
        {
            id: 'es',
            label: 'Español',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/es.svg',
        },
        {
            id: 'de',
            label: 'Deutsch',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/de.svg',
        },
        {
            id: 'br',
            label: 'Português',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/br.svg',
        },
        {
            id: 'fr',
            label: 'Français',
            flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/fr.svg',
        },
    ],
    lang: { id: 'en', label: 'English', flag: 'https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/gb.svg' },
    translations: null,
    menuItems: [],
    //////////////////
    casinoMenuItems: [],
    sportsMenuItems: [],
    //////////////////
    selectedOddsFormat: 'Decimal',
    oddsFormatOptions: ['Decimal', 'American', 'Fractional', 'Indonesian', 'Malay', 'Hong Kong'],
    settings: {
        usernameMinLength: 3,
        passwordMinLength: 8,
        minStake: 0.05,
    },
    allCasinoVendors: null,
    allSports: null,
    topSports: null,
    topTournaments: null,
    sportIcons: {
        Cricket: <CricketIcon />,
        Badminton: <CricketIcon />,
        Soccer: <SoccerIcon />,
        Basketball: <BasketballIcon />,
        Tennis: <TennisIcon />,
        MMA: <MMAIcon />,
        Football: <SoccerIcon />,
        Baseball: <BaseballIcon />,
        'Ice Hockey': <IceHockeyIcon />,
        Handball: <HandballIcon />,
        'American Football': <AmericanFootballIcon />,
        'Table Tennis': <TableTennisIcon />,
        Volleyball: <VolleyballIcon />,
        Boxing: <BoxingIcon />,
        Snooker: <SnookerIcon />,
        Waterpolo: <WaterpoloIcon />,
        'Starcraft 1': <Starcraft1Icon />,
        'Starcraft 2': <Starcraft2Icon />,
        'Gaelic Football': <VolleyballIcon />,
        Futsal: <SoccerIcon />,
        'Counter-Strike 2': <CounterStrike2Icon />,
        'Counter-Strike: GO (CS:GO)': <CounterStrike2Icon />,
        Valorant: <ValorantIcon />,
        'Dota 2': <Dota2Icon />,
        eSoccer: <FootballIcon />,
        'King of Glory': <KingOfGloryIcon />,
        'Aussie Rules': <AmericanFootballIcon />,
        Darts: <DartsIcon />,
        'Gaelic Hurling': <GaelicHurlingIcon />,
        Overwatch: <OverwatchIcon />,
        'Rugby Union': <RugbyUnionIcon />,
        'Rugby League': <RugbyUnionIcon />,
        'Mobile Legends': <MobileLegendsIcon />,
        'League of Legends': <LeagueOfLegendsIcon />,
        'Rainbow Six': <RainbowSixIcon />,
        'Warcraft 3': <Warcraft3Icon />,
    },
    casinoIcons: {
        Slots : <CricketIcon />,
        Favorites : <Favorites />,
        Popular : <CricketIcon />,
        AllGames :<New />,
        Vegas : <CricketIcon />,
        Amatic : <Amatic />,
        Egyptian : <Egyptian />,
        Megaways : <CricketIcon />,
        Halloween : <CricketIcon />,
        Classic : <CricketIcon />,
        Book : <CricketIcon />,
        Greek : <CricketIcon />,
        Aristocrat : <Aristocrat />,
        Egt : <Egt />,
        Evolution : <Evolution />,
        Netent : <Netent />,
        Novomatic : <Novomatic />,
        PlayNGo : <PlayNGo />,
        Playtech : <Playtech />,
        Pragmatic : <Pragmatic />,
        RedTiger : <RedTiger />,
        Yggdrasil : <Yggdrasil />,
        Providers : <Providers />,
        
    },
    sportSettings: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUnreadNotifications: (state, action) => {
            state.unreadNotifications = action.payload;
        },
        setInitDataLoaded: (state, action) => {
            state.initDataLoaded = action.payload;
        },
        setAvailableLangs: (state, action) => {
            state.availableLangs = action.payload;
        },
        setLang: (state, action) => {
            state.lang = action.payload;
        },
        setMenuItems: (state, action) => {
            state.menuItems = action.payload;
        },
        ///////////////////
        setCasinoMenuItems: (state, action) => {
            state.casinoMenuItems = action.payload;
        },
        setSportsMenuItems: (state, action) => {
            state.sportsMenuItems = action.payload;
        },
        ///////////////////
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setAllCasinoVendors: (state, action) => {
            state.allCasinoVendors = action.payload;
        },
        setAllSports: (state, action) => {
            state.allSports = action.payload;
        },
        setTopSports: (state, action) => {
            state.topSports = action.payload;
        },
        setTopTournaments: (state, action) => {
            state.topTournaments = action.payload;
        },
        setBarLoading: (state, action) => {
            state.barLoading = action.payload;
        },
        setOddsFormat: (state, action) => {
            state.selectedOddsFormat = action.payload;
            storageSetOddsFormat(action.payload);
        },
        setTranslations: (state, action) => {
            state.translations = action.payload;
        },
        setSportSettings: (state, action) => {
            state.sportSettings = action.payload;
        },
    },
});

export const appActions = appSlice.actions;

export default appSlice;
