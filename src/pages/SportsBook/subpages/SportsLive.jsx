import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import classes from "./SportsHome.module.css";
import { sportsLiveActions } from "../subpages/sportsLiveSlice";
import SportSelection from "../features/SportSelection";
import TournamentSearch from "../features/TournamentSearch";
import TournamentSort from "../features/TournamentSort";
import ShimmerIcon from "../../../features/UI/Shimmer/shimmer.svg?react";
import Category from "../features/Category";
import { getSportMarketTree, getLiveStreams } from "../sportsbookAsyncActions";
import NoImageIcon from "../../../assets/svgs/no-image.svg?react";
import { sportsbookActions } from "../sportsbookSlice";
import { translate } from "../../../utils/translations";

const SportsLive = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const liveState = useSelector((state) => state.live.liveState);
  const addedRemovedEvent = useSelector(
    (state) => state.live.addedRemovedEvent
  );
  const allSports = useSelector((state) => state.app.allSports);
  const sportSettings = useSelector((state) => state.app.sportSettings);

  const tournamentSearchString = useSelector(
    (state) => state.sportsbook.tournamentSearchString
  );
  const tournamentSort = useSelector(
    (state) => state.sportsbook.tournamentSort
  );
  const sportMarketTree = useSelector(
    (state) => state.sportsbook.sportMarketTree
  );
  const sportIcons = useSelector((state) => state.app.sportIcons);

  const categories = useSelector((state) => state.sportsLive.categories);
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

  const [categoriesArr, setCategoriesArr] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [axiosController, setAxiosController] = useState(null);

  const [sports, setSports] = useState(null);

  const sportParam = params["*"].split("/")[1];

  useEffect(() => {
    dispatch(sportsbookActions.setSelectedSport(null));

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);
    dispatch(getLiveStreams(signal));

    // Reget the live streams every 1 minute
    const pollingCallback = () => {
      dispatch(getLiveStreams(signal));
    };
    const getLiveStreamsInterval = setInterval(pollingCallback, 60000);

    return () => {
      controller.abort();
      if (getLiveStreamsInterval) clearInterval(getLiveStreamsInterval);
      dispatch(sportsLiveActions.reset());
    };
  }, []);

  // Get the selected sport from the params
  useEffect(() => {
    if (!sports) return;

    // If did not come from the sportsMenu, select the first sport
    let sport;
    if (!sportParam) {
      sport = sports[0];
      navigate(
        `/sportsbook/live/${sport?.Name?.International.toLowerCase().replace(
          / /g,
          "-"
        )}`,
        { replace: true }
      );
    } else sport = sports.find((s) => s.slug === sportParam);

    if (!sport) {
      sport = sports[0];
      navigate(
        `/sportsbook/live/${sport?.Name?.International.toLowerCase().replace(
          / /g,
          "-"
        )}`,
        { replace: true }
      );
    }
    dispatch(sportsbookActions.setSelectedSport(sport));
  }, [sports?.length, sportParam]);

  // Create the sports with categories and tournaments from liveState. Re-evaluate when a live event is added or removed
  useEffect(() => {
    // if (!liveState) return;
    if (!liveState || Object.keys(liveState).length === 0) return;

    let te = {};
    const result = Object.values(liveState).reduce((acc, match) => {
      if (!match.Info) return acc;
      if (!match.Header) return acc;
      if (!match.Info.SportId) return acc;

      const {
        SportId,
        SportName,
        CategoryId,
        CategoryName,
        TournamentId,
        TournamentName,
      } = match.Info;

      // Create tournament events
      if (!te[TournamentId]) te[TournamentId] = [];
      te[TournamentId].push(match);

      // Ensure sport entry exists
      if (!acc[SportId]) {
        acc[SportId] = {
          Id: SportId,
          Name: SportName,
          slug: SportName?.International.toLowerCase().replace(/ /g, "-"),
          Count: 0,
          Categories: [],
          icon: sportIcons[SportName?.International] || <NoImageIcon />,
        };
      }

      const sportEntry = acc[SportId];
      sportEntry.Count += 1;

      // Ensure category entry exists
      let categoryEntry = sportEntry.Categories.find(
        (c) => c.Id === CategoryId
      );
      if (!categoryEntry) {
        categoryEntry = { Id: CategoryId, Name: CategoryName, Tournaments: [] };
        sportEntry.Categories.push(categoryEntry);
      }

      // Ensure tournament entry exists
      let tournamentExists = categoryEntry.Tournaments.some(
        (t) => t.Id === TournamentId
      );
      if (!tournamentExists) {
        categoryEntry.Tournaments.push({
          Id: TournamentId,
          Name: TournamentName,
        });
      }

      return acc;
    }, {});

    const updatedSports = Object.values(result);

    // Create a mapping from all Sports
    const orderMap = allSports.reduce((acc, item) => {
      acc[item.Id] = item.Order;
      return acc;
    }, {});
    // Sort sports based on the order defined in allSports
    const sortedSports = updatedSports.sort((a, b) => {
      return (orderMap[a.Id] || 999999) - (orderMap[b.Id] || 999999);
    });

    setSports(sortedSports);
  }, [addedRemovedEvent]);

  // Get the categories and Tournaments.
  useEffect(() => {
    if (!selectedSport) return;
    if (!axiosController) return;

    if (!sportMarketTree[selectedSport.Id])
      dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

    setLoadingCategories(true);

    setCategoriesAndTournaments();

    setLoadingCategories(false);
  }, [selectedSport?.Id, axiosController]);

  // When the sports change (because an event was added or removed) re-evaluate
  useEffect(() => {
    if (loadingCategories) return;
    if (!sports) return;

    setCategoriesAndTournaments();
  }, [loadingCategories, sports]);

  const setCategoriesAndTournaments = () => {
    let ca = [];

    const sport = sports.find((s) => s.Id === selectedSport.Id);

    sport?.Categories.forEach((category) => {
      let updatedTournaments = [];

      category.Tournaments.forEach((tournament) => {
        if (
          tournament.Name.International.includes("Outright") ||
          tournament.Name.International.includes("Specials")
        )
          return; // Don' add outright here

        let updatedTournament = { ...tournament };
        updatedTournament.CategoryId = category.Id;
        updatedTournament.CategoryName = category.Name;
        updatedTournament.CategoryCounters = category.Counters;
        updatedTournaments.push(updatedTournament);
      });

      if (updatedTournaments.length) {
        ca.push({
          ...category,
          Tournaments: updatedTournaments,
        });
      }
    });

    dispatch(sportsLiveActions.setCategories(ca));

    const subset = getSubset(ca);
    const sorted = getSorted(subset);

    setCategoriesArr(sorted);
  };

  // Update categories and tournaments when search is changed
  useEffect(() => {
    if (!selectedSport) return;
    if (!categories) return;

    const subset = getSubset(categories);
    const sorted = getSorted(subset);
    setCategoriesArr(sorted);
  }, [tournamentSearchString]);

  // Get subset of categories and tournaments, based on searchString
  const getSubset = (ca) => {
    if (!tournamentSearchString) return ca;
    else {
      let updatedCategories = [];

      ca.forEach((category) => {
        let updatedCategory = { ...category };
        let categoryTournaments = updatedCategory.Tournaments;

        // If there is a search string, don't add the categories which their name does not include the string and they have no tournaments including the string
        if (tournamentSearchString) {
          const categoryNameLower = category.Name.International.toLowerCase();
          const searchStringLower = tournamentSearchString.toLowerCase();

          const tournamentsWithSearchString =
            updatedCategory.Tournaments.filter((t) =>
              t.Name.International.toLowerCase().includes(searchStringLower)
            );

          // Neither category nor tournament with this string
          if (
            !categoryNameLower.includes(searchStringLower) &&
            !tournamentsWithSearchString.length
          )
            return;
          // Only tournaments with this string. Include only these tournaments
          else if (
            !categoryNameLower.includes(searchStringLower) &&
            tournamentsWithSearchString.length > 0
          )
            categoryTournaments = tournamentsWithSearchString;
        }

        updatedCategory.Tournaments = categoryTournaments;
        updatedCategories.push(updatedCategory);
      });

      return updatedCategories;
    }
  };

  const getSorted = (subset) => {
    let ca = _.cloneDeep(subset);
    if (tournamentSort === "Default Sort") {
      const categsOrder = sportSettings.CategsOrder;

      ca.sort((a, b) => {
        // Check if is in tours order first
        if (
          categsOrder[a.Id] &&
          categsOrder[a.Id] < 9999 &&
          !categsOrder[b.Id]
        ) {
          return -1; // a comes first
        } else if (
          categsOrder[b.Id] &&
          categsOrder[b.Id] < 9999 &&
          !categsOrder[a.Id]
        ) {
          return 1; // b comes first
        } else if (
          categsOrder[a.Id] &&
          categsOrder[a.Id] < 9999 &&
          categsOrder[b.Id] &&
          categsOrder[b.Id] < 9999
        ) {
          // Both have order, sort by order
          return categsOrder[a.Id] - categsOrder[b.Id];
        } else {
          // Neither has order, sort alphabetically
          return a.Name.International.localeCompare(b.Name.International);
        }
      });
    } else if (tournamentSort === "A - Z")
      ca.sort((a, b) =>
        a.Name.International.localeCompare(b.Name.International)
      );
    else if (tournamentSort === "Z - A")
      ca.sort((a, b) =>
        b.Name.International.localeCompare(a.Name.International)
      );

    return ca;
  };

  useEffect(() => {
    if (!categoriesArr) return;
    if (!categoriesArr.length) return;

    let ca = getSorted(categoriesArr);

    setCategoriesArr(ca);
  }, [categoriesArr?.length, tournamentSort]);

  return (
    <>
      <SportSelection
        items={sports}
        selectedSport={selectedSport}
        onSelectSport={(sport) => {
          dispatch(sportsbookActions.setSelectedSport(sport));
          navigate(`/sportsbook/live/${sport.slug}`);
        }}
        withCount
      />
      {sports && (
        <div className={classes.TopRowWrapper}>
          <div className={classes.Grouped}>
            {selectedSport?.Name.International !== "Football" && (
              <TournamentSort />
            )}
            <TournamentSearch
              withMargin={selectedSport?.Name.International !== "Football"}
            />
          </div>
        </div>
      )}

      {sports ? (
        <div className={classes.TournamentGroup}>
          {selectedSport && !loadingCategories ? (
            categoriesArr.length === 0 ? (
              <span className={classes.NoGames}>
                {translate("No games where found.")}
              </span>
            ) : (
              categoriesArr.map((category, catIndex) => (
                <Category
                  key={category.Id}
                  category={category}
                  initOpen={catIndex === 0}
                  slice="sportsLive"
                  includeLive
                />
              ))
            )
          ) : (
            <>
              <ShimmerIcon className={classes.ShimmerIcon} />
              <ShimmerIcon className={classes.ShimmerIcon} />
              <ShimmerIcon className={classes.ShimmerIcon} />
            </>
          )}
        </div>
      ) : (
        <div className={classes.TournamentGroup}>
          <p style={{ textAlign: "center", color: "white", margin: "1rem" }}>
            {translate(`No available matches`)}
          </p>
        </div>
      )}
    </>
  );
};

export default SportsLive;
