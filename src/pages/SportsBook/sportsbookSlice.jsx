import { createSlice } from '@reduxjs/toolkit';
import footballField from '../../assets/images/liveFields/football.avif';
import basketballField from '../../assets/images/liveFields/basketball.avif';
import tennisField from '../../assets/images/liveFields/tennis.avif';
import volleyballField from '../../assets/images/liveFields/volleyball.avif';
import baseballField from '../../assets/images/liveFields/baseball.avif';
import tableTennisField from '../../assets/images/liveFields/table-tennis.avif';
import iceHockeyField from '../../assets/images/liveFields/ice-hockey.avif';
import badmintonField from '../../assets/images/liveFields/badminton.avif';
import rugbyField from '../../assets/images/liveFields/rugby.avif';
import aussieRulesField from '../../assets/images/liveFields/aussie-rules.avif';
import esports from '../../assets/images/liveFields/esports.jpg';
import cricket from '../../assets/images/liveFields/cricket.avif';
import snooker from '../../assets/images/liveFields/snooker.jpeg';

const initialState = {
    tournamentSearchString: null,
    tournamentSort: 'Default Sort',
    tournamentTimeFilter: 'All',
    allSportsCategories: {},
    showStatsFor: null,
    showVideoFor: null,
    sportMarketTree: {},
    sportBanners: null,
    selectedTournament: null,
    sports: null,
    selectedSport: null,
    tournamentEvents: {},
    liveStreams: null,
    sportsStatusParams: {
        Football: { scoreType: 'score', board: 'football', fieldImage: footballField },
        Basketball: { scoreType: 'score', board: 'basketball', fieldImage: basketballField },
        Tennis: { scoreType: 'games', board: 'tennis', fieldImage: tennisField },
        Volleyball: { scoreType: 'games', board: 'tennis', fieldImage: volleyballField },
        Badminton: { scoreType: 'games', fieldImage: badmintonField },
        Baseball: { scoreType: 'score', fieldImage: baseballField },
        Cricket: { scoreType: 'games', fieldImage: cricket },
        'Counter-Strike: GO (CS:GO)': { scoreType: 'games', fieldImage: esports },
        'Table Tennis': { scoreType: 'games', board: 'tennis', fieldImage: tableTennisField },
        'Ice Hockey': { scoreType: 'score', fieldImage: iceHockeyField },
        'Rugby Union': { scoreType: 'score', fieldImage: footballField },
        'Dota 2': { scoreType: 'score', fieldImage: esports },
        'E-Basketball': { scoreType: 'score', fieldImage: esports },
        'E-Football': { scoreType: 'score', fieldImage: esports },
        'League of Legends (LoL)': { scoreType: 'score', fieldImage: esports },
        Valorant: { scoreType: 'score', fieldImage: esports },
        CrossFire: { scoreType: 'score', fieldImage: esports },
        Snooker: { scoreType: 'score', fieldImage: snooker },
    },

    categories: null,
};

export const sportsbookSlice = createSlice({
    name: 'sportsbook',
    initialState,
    reducers: {
        reset: (state) => {
            state.tournamentSearchString = null;
            state.tournamentSort = 'Default Sort';
            state.tournamentTimeFilter = 'All';
            state.allSportsCategories = {};
            state.showStatsFor = null;
            state.showVideoFor = null;
            state.sportBanners = null;
            state.selectedTournament = null;
            state.sports = null;
            state.selectedSport = null;
            state.tournamentEvents = {};
            state.liveStreams = null;

            state.categories = null;
        },
        resetHome: (state) => {
            state.allSportsCategories = {};
            state.sports = null;
            state.selectedSport = null;
            state.tournamentEvents = {};
            state.liveStreams = null;
        },

        setTournamentSearchString: (state, action) => {
            state.tournamentSearchString = action.payload;
        },
        setTournamentSort: (state, action) => {
            state.tournamentSort = action.payload;
        },
        setTournamentTimeFilter: (state, action) => {
            state.tournamentTimeFilter = action.payload;
        },
        addSportCategories: (state, action) => {
            state.allSportsCategories[action.payload.sportId] = action.payload.categories;
        },
        setSportCategories: (state, action) => {
            state.allSportsCategories = action.payload.sportId;
        },
        setShowStatsFor: (state, action) => {
            state.showStatsFor = action.payload;
        },
        setShowVideoFor: (state, action) => {
            state.showVideoFor = action.payload;
        },
        setSportMarketTree: (state, action) => {
            state.sportMarketTree[action.payload.sportId] = action.payload.value;
        },
        setSportBanners: (state, action) => {
            state.sportBanners = action.payload;
        },
        setSports: (state, action) => {
            state.sports = action.payload;
        },
        setSelectedSport: (state, action) => {
            state.selectedSport = action.payload;
        },
        setTournamentEvents: (state, action) => {
            state.tournamentEvents = action.payload;
        },
        addTournamentEvents: (state, action) => {
            state.tournamentEvents[action.payload.tournamentId] = action.payload.events;
        },
        removeTournamentEvents: (state, action) => {
            delete state.tournamentEvents[action.payload];
        },
        setSelectedTournament: (state, action) => {
            state.selectedTournament = action.payload;
        },
        setLiveStreams: (state, action) => {
            state.liveStreams = action.payload;
        },

        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const sportsbookActions = sportsbookSlice.actions;

export default sportsbookSlice;
