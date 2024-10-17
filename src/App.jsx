import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import InitApp from "./features/InitApp/InitApp";
import Layout from "./features/Layout/Layout";
import PrivateRoute from "./features/PrivateRoute/PrivateRoute";
import HasPermission from "./features/PrivateRoute/HasPermission";
import PageFallback from "./features/UI/PageFallback/PageFallback";

// Lazy load the other components
const Home = React.lazy(() => import("./pages/Home/Home"));
const Casino = React.lazy(() => import("./pages/Casino/Casino"));
const CasinoGame = React.lazy(() => import("./pages/CasinoGame/CasinoGame"));
const SportsBook = React.lazy(() => import("./pages/SportsBook/SportsBook"));
const SportsMyBets = React.lazy(() =>
  import("./pages/SportsMyBets/SportsMyBets")
);
const Event = React.lazy(() => import("./pages/Event/Event"));
const TournamentPage = React.lazy(() =>
  import("./pages/TournamentPage/TournamentPage")
);
const OutrightsPage = React.lazy(() =>
  import("./pages/Outrights/OutrightsPage")
);
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Crypto = React.lazy(() => import("./pages/Crypto/Crypto"));
const Search = React.lazy(() => import("./pages/Search/Search"));
const SearchSports = React.lazy(() => import("./pages/Search/SearchSports"));
const Leaderboard = React.lazy(() => import("./pages/Leaderboard/Leaderboard"));
const ProgressMap = React.lazy(() =>
  import("./pages/UserGamification.jsx/features/ProgressMap")
);
const Gamification = React.lazy(() =>
  import("./pages/UserGamification.jsx/Gamification")
);
const TermsOfService = React.lazy(() =>
  import("./pages/Footer Pages/TermsOfService")
);
const Aml = React.lazy(() => import("./pages/Footer Pages/AML"));
const ResponsibleGaming = React.lazy(() =>
  import("./pages/Footer Pages/ResponsibleGaming")
);
const PrivacyPolicy = React.lazy(() =>
  import("./pages/Footer Pages/PrivacyPolicy")
);
const ErrorPage = React.lazy(() => import("./pages/Error Page/ErrorPage"));

function App() {
  const router = createBrowserRouter([
    {
      element: <InitApp />,
      //errorElement: <ErrorPage />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              index: true,
              path: "/",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <Home />
                </Suspense>
              ),
            },
            {
              // path: '/casino/game/:type/:id/:brandgameid/:name',
              path: "/casino/game/:type/:providername/:id/:brandgameid/:name",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission
                    checkPermissions={["AllowToCasino", "AllowToSlots"]}
                  >
                    <CasinoGame />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/casino/*",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission
                    checkPermissions={["AllowToCasino", "AllowToSlots"]}
                  >
                    <Casino />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/sportsbook/mybets",
              element: (
                <Suspense fallback={<PageFallback />}>
                  {/* <PrivateRoute roleId={40}> */}
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <SportsMyBets />
                  </HasPermission>
                  {/* </PrivateRoute> */}
                </Suspense>
              ),
            },
            {
              path: "/sportsbook/tournament/:sportid/:categoryid/:tournamentid",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <TournamentPage />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/sportsbook/outrights/:sportname/:sportid/:categoryid/:tournamentid/:eventid",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <OutrightsPage />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/sportsbook/*",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <SportsBook />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/event/:sportname/:sportid/:eventid",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <Event />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/crypto",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <Crypto />
                </Suspense>
              ),
            },
            {
              path: "/search",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission
                    checkPermissions={["AllowToCasino", "AllowToSlots"]}
                  >
                    <Search />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/searchEvent",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <HasPermission checkPermissions={["AllowToSports"]}>
                    <SearchSports />
                  </HasPermission>
                </Suspense>
              ),
            },
            {
              path: "/profile",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <PrivateRoute roleId={40}>
                    <Profile />
                  </PrivateRoute>
                </Suspense>
              ),
            },
            {
              path: "/leaderboard/*",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <Leaderboard />
                </Suspense>
              ),
            },
            {
              path: "/rewards",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <Gamification />
                </Suspense>
              ),
            },
            {
              path: "/hero",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <ProgressMap />
                </Suspense>
              ),
            },
            {
              path: "/terms-and-conditions",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <TermsOfService />
                </Suspense>
              ),
            },
            {
              path: "/aml",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <Aml />
                </Suspense>
              ),
            },
            {
              path: "/privacy-policy",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <PrivacyPolicy />
                </Suspense>
              ),
            },
            {
              path: "/rpg",
              element: (
                <Suspense fallback={<PageFallback />}>
                  <ResponsibleGaming />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
