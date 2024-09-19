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

import CallOfDutyIcon from '../../assets/sportIcons/cod.svg?react';
import CyclingIcon from '../../assets/sportIcons/cycling.svg?react';
import GolfIcon from '../../assets/sportIcons/golf.svg?react';
import MotorbikesIcon from '../../assets/sportIcons/motor.svg?react';
import NASCARIcon from '../../assets/sportIcons/nascar.svg?react';
import PesapalloIcon from '../../assets/sportIcons/pesapallo.svg?react';
import PoliticsIcon from '../../assets/sportIcons/politics.svg?react';
import RallyIcon from '../../assets/sportIcons/rally.svg?react';
import RocketLeagueIcon from '../../assets/sportIcons/rocket-league.svg?react';
import SailingIcon from '../../assets/sportIcons/sailing.svg?react';
import SumoIcon from '../../assets/sportIcons/sumo.svg?react';
import GaelicFootballIcon from '../../assets/sportIcons/gaelic-football.svg?react';
import FloorballIcon from '../../assets/sportIcons/floorball.svg?react';
import FutsalIcon from '../../assets/sportIcons/futsal.svg?react';
import CrossFireIcon from '../../assets/sportIcons/crossfire.svg?react';
import eSoccerIcon from '../../assets/sportIcons/esoccer.svg?react';
import RugbyLeagueIcon from '../../assets/sportIcons/rugby.svg?react';
import BeachVolleyIcon from '../../assets/sportIcons/beach-volley.svg?react';
import SquashIcon from '../../assets/sportIcons/squash.svg?react';
import WarcraftIcon from '../../assets/sportIcons/warcraft.svg?react';
import StarcraftIcon from '../../assets/sportIcons/starcraft.svg?react';
import CsgoIcon from '../../assets/sportIcons/csgo.svg?react';
import ChessIcon from '../../assets/sportIcons/chess.svg?react';
import BandyIcon from '../../assets/sportIcons/bandy.svg?react';
import TvIcon from '../../assets/sportIcons/tv.svg?react';
import FormulaIcon from '../../assets/sportIcons/formula.svg?react';
import HurlingIcon from '../../assets/sportIcons/hurling.svg?react';


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
import Popular from '../../assets/casinoIcons/popular.svg?react';
import Slots from '../../assets/casinoIcons/slots.svg?react';
import AllGames from '../../assets/casinoIcons/allgames.svg?react';
import Crash from '../../assets/casinoIcons/crash.svg?react';
import Amarix from '../../assets/casinoIcons/amarix.svg?react';
import Megaways from '../../assets/casinoIcons/megaways.svg?react';
import Halloween from '../../assets/casinoIcons/halloween.svg?react';
import Classic from '../../assets/casinoIcons/classic.svg?react';
import Book from '../../assets/casinoIcons/book.svg?react';
import Greek from '../../assets/casinoIcons/greek.svg?react';
import GameArt from '../../assets/casinoIcons/gameart.svg?react';
import Beter from '../../assets/casinoIcons/beter.svg?react';
import Aviator from '../../assets/casinoIcons/aviator.svg?react';
import Aviatrix from '../../assets/casinoIcons/aviatrix.svg?react';
import CrazyTooth from '../../assets/casinoIcons/crazytooth.svg?react';
import Top20 from '../../assets/casinoIcons/top20.svg?react';
import Premium from '../../assets/casinoIcons/premium.svg?react';
import TrendingNow from '../../assets/casinoIcons/trendingnow.svg?react';
import BuffaloSlots from '../../assets/casinoIcons/buffaloslots.svg?react';
import Roulette from '../../assets/casinoIcons/roulette.svg?react';
import CardGames from '../../assets/casinoIcons/cardgames.svg?react';
import BTG from '../../assets/casinoIcons/btg.svg?react';

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
        '3x3 Basketball': <BasketballIcon />,
        Tennis: <TennisIcon />,
        MMA: <MMAIcon />,
        Football: <SoccerIcon />,
        Baseball: <BaseballIcon />,
        'Ice Hockey': <IceHockeyIcon />,
        Handball: <HandballIcon />,
        'American Football': <AmericanFootballIcon />,
        'Table Tennis': <TableTennisIcon />,
        Volleyball: <VolleyballIcon />,
        'Beach Volleyball': <BeachVolleyIcon />,
        Boxing: <BoxingIcon />,
        Snooker: <SnookerIcon />,
        Waterpolo: <WaterpoloIcon />,
        'Starcraft 1': <Starcraft1Icon />,
        'Starcraft 2': <Starcraft2Icon />,
        'Gaelic Football': <VolleyballIcon />,
        Futsal: <FutsalIcon />,
        CrossFire: <CrossFireIcon />,
        'Counter-Strike 2': <CounterStrike2Icon />,
        'Call of Duty (COD)': <CallOfDutyIcon />,
        Cycling: <CyclingIcon />,
        'Field hockey': <IceHockeyIcon />,
        Floorball: <FloorballIcon />,
        'Gaelic football': <GaelicFootballIcon />,
        Golf: <GolfIcon />,
        'King of Glory (KoG)': <KingOfGloryIcon />,
        'League of Legends (LoL)': <LeagueOfLegendsIcon />,
        Motorbikes: <MotorbikesIcon />,
        NASCAR: <NASCARIcon />,
        'Overwatch (Owatch)': <OverwatchIcon />,
        Pesapallo: <PesapalloIcon />,
        Politics: <PoliticsIcon />,
        'Rainbow Six (R6)': <RainbowSixIcon />,
        Rally: <RallyIcon />,
        Valorant: <ValorantIcon />,
        'Dota 2': <Dota2Icon />,
        eSoccer: <eSoccerIcon />,
        'King of Glory': <KingOfGloryIcon />,
        'Aussie Rules': <AmericanFootballIcon />,
        Darts: <DartsIcon />,
        'Gaelic Hurling': <GaelicHurlingIcon />,
        Overwatch: <OverwatchIcon />,
        'Rugby Union': <RugbyUnionIcon />,
        'Rugby League': <RugbyLeagueIcon />,
        'Mobile Legends': <MobileLegendsIcon />,
        'League of Legends': <LeagueOfLegendsIcon />,
        'Rainbow Six': <RainbowSixIcon />,
        'Warcraft 3': <Warcraft3Icon />,
        'Rocket League (Rocket L)': <RocketLeagueIcon />,
        Sailing: <SailingIcon />,
        Speedway: <RallyIcon />,
        Sumo: <SumoIcon />,
        Squash: <SquashIcon />,
        'Water Polo': <WaterpoloIcon />,
        'Warcraft III (W3:TFT)': <WarcraftIcon />,
        'StarCraft (SC)': <StarcraftIcon />,
        'StarCraft 2 (SC2)': <StarcraftIcon />,
        StarCraft: <StarcraftIcon />,
        'Counter-Strike: GO (CS:GO)': <CsgoIcon />,
        Chess: <ChessIcon />,
        Bandy: <BandyIcon />,
        Hurling: <HurlingIcon />,
        'TV Shows and Movies': <TvIcon />,
        'Formula 1': <FormulaIcon />,
    },
    casinoIcons: {
        Slots : <Slots />,
        Favorites : <Favorites />,
        Popular : <Popular />,
        'All Games' :<AllGames />,
        Amatic : <Amatic />,
        Egyptian : <Egyptian />,
        Egypt : <Egyptian />,
        Megaways : <Megaways />,
        Halloween : <Halloween />,
        Classic : <Classic />,
        Book : <Book />,
        Greek : <Greek />,
        Aristocrat : <Aristocrat />,
        Egt : <Egt />,
        EGT : <Egt />,
        Evolution : <Evolution />,
        Netent : <Netent />,
        Novomatic : <Novomatic />,
        PlayNGo : <PlayNGo />,
        "Play'n Go" : <PlayNGo />,
        Playtech : <Playtech />,
        Pragmatic : <Pragmatic />,
        RedTiger : <RedTiger />,
        'Red Tiger' : <RedTiger />,
        Yggdrasil : <Yggdrasil />,
        Providers : <Providers />,
        'New Games' : <New/>,
        New : <New/>,
        NewGames : <New/>,
        'Crash Games' : <Crash/>,
        Amarix : <Amarix/>,
        'Big Time Gaming' : <BTG/>,
        'Game Art' : <GameArt/>,
        Beter : <Beter/>,
        Aviator : <Aviator/>,
        Aviatrix : <Aviatrix/>,
        'Crazy Tooth' : <CrazyTooth/>,
        'Top 20' : <Top20/>,
        'Trending Now' : <TrendingNow/>,
        'Buffalo Slots' : <BuffaloSlots/>,
        Roulette : <Roulette/>,
        'Card Games' : <CardGames/>,
        Premium : <Premium/>
    },
    sportSettings: null,
    siteSettings: null,
    socialMedia: null,
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
        setSiteSettings: (state, action) => {
            state.siteSettings = action.payload;
        },
        setSocialMedia: (state, action) => {
            state.socialMedia = action.payload;
        },
    },
});

export const appActions = appSlice.actions;

export default appSlice;
