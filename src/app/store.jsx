import { configureStore } from "@reduxjs/toolkit";

import appSlice from "../features/InitApp/appSlice";
import liveSlice from "../features/InitApp/liveSlice";
import layoutSlice from "../features/Layout/layoutSlice";
import loginSlice from "../pages/Login/loginSlice";
import casinoSlice from "../pages/Casino/casinoSlice";
import sportsbookSlice from "../pages/SportsBook/sportsbookSlice";
import sportsHomeSlice from "../pages/SportsBook/subpages/sportsHomeSlice";
import sportsUpcomingSlice from "../pages/SportsBook/subpages/sportsUpcomingSlice";
import sportsLiveSlice from "../pages/SportsBook/subpages/sportsLiveSlice";
import sportsOutrightsSlice from "../pages/SportsBook/subpages/sportsOutrightsSlice";
import outrightsSlice from "../pages/Outrights/outrightsSlice";
import eventSlice from "../pages/Event/eventSlice";
import betslipSlice from "../features/Betslip/betslipSlice";
import profileSlice from "../pages/Profile/profileSlice";
import modalSlice from "../features/ModalRoot/modalSlice";
import cryptoSlice from "../pages/Crypto/cryptoSlice";
import searchSlice from "../pages/Search/searchSlice";
import ticketSlice from "../features/Ticket/ticketSlice";
import leaderboardSlice from "../pages/Leaderboard/leaderboardSlice";
import myBetsSlice from "../pages/SportsMyBets/myBetsSlice";
import userGamificationSlice from "../pages/UserGamification.jsx/userGamificationSlice";
import casinoFavoritesSlice from "../features/CasinoFavorites/CasinoFavoritesSlice";
import bannersSlice from "../features/Banners/BannersSlice";
import topEventsSlice from "../features/TopEvents/TopEventsSlice";
import casinoNewSlice from "../features/NewGames/CasinoNewGamesSlice";
import crashGamesSlice from "../features/CrashGames/crashGamesSlice";
import recommendedGamesSlice from "../features/RecommendedGames/recommendedGamesSlice";
import progressSlice from "../pages/Home/features/ProgressSlice";
import promotionsSlice from "../pages/Promotions/promotionsSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    live: liveSlice.reducer,
    layout: layoutSlice.reducer,
    login: loginSlice.reducer,
    casino: casinoSlice.reducer,
    sportsbook: sportsbookSlice.reducer,
    sportsHome: sportsHomeSlice.reducer,
    sportsUpcoming: sportsUpcomingSlice.reducer,
    sportsLive: sportsLiveSlice.reducer,
    sportsOutrights: sportsOutrightsSlice.reducer,
    outrights: outrightsSlice.reducer,
    event: eventSlice.reducer,
    betslip: betslipSlice.reducer,
    ticket: ticketSlice.reducer,
    profile: profileSlice.reducer,
    modal: modalSlice.reducer,
    crypto: cryptoSlice.reducer,
    search: searchSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
    myBets: myBetsSlice.reducer,
    gamification: userGamificationSlice.reducer,
    casinoFavorites: casinoFavoritesSlice.reducer,
    banners: bannersSlice.reducer,
    topEvents: topEventsSlice.reducer,
    casinoNew: casinoNewSlice.reducer,
    crashGames: crashGamesSlice.reducer,
    recommendedGames: recommendedGamesSlice.reducer,
    progress: progressSlice.reducer,
    promotions: promotionsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
