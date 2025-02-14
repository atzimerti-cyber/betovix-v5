import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import classes from "./SportsHome.module.css";
import { sportsbookActions } from "../sportsbookSlice";
import sportsHomeSlice, {
  sportsHomeActions,
} from "../subpages/sportsHomeSlice";
import { getPregameData, getLiveStreams } from "../sportsbookAsyncActions";
import SportSelection from "../features/SportSelection";
import TournamentSearch from "../features/TournamentSearch";
import TournamentTimeSelection from "../features/TournamentTimeSelection";
import TournamentSort from "../features/TournamentSort";
import ShimmerIcon from "../../../features/UI/Shimmer/shimmer.svg?react";
import Category from "../features/Category";
import { getSportMarketTree } from "../sportsbookAsyncActions";
import { translate } from "../../../utils/translations";
import EventRow from "../features/EventRow";
import { getCustomDateEvents } from "../sportsbookAsyncActions";

const SportsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const liveState = useSelector((state) => state.live.liveState);
  const addedRemovedEvent = useSelector(
    (state) => state.live.addedRemovedEvent
  );
  const tournamentSearchString = useSelector(
    (state) => state.sportsbook.tournamentSearchString
  );
  const tournamentTimeFilter = useSelector(
    (state) => state.sportsbook.tournamentTimeFilter
  );
  const tournamentSort = useSelector(
    (state) => state.sportsbook.tournamentSort
  );
  const sportMarketTree = useSelector(
    (state) => state.sportsbook.sportMarketTree
  );
  const sportIcons = useSelector((state) => state.app.sportIcons);
  const sportSettings = useSelector((state) => state.app.sportSettings);
  const customDateTournaments = useSelector(
    (state) => state.sportsbook.customDateTournaments
  );
  const customDate = useSelector((state) => state.sportsbook.customDate);
  const categories = useSelector((state) => state.sportsHome.categories);
  const sports = useSelector((state) => state.sportsbook.sports);
  const allSports = useSelector((state) => state.app.allSports);
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const loading = useSelector((state) => state.sportsbook.loading);

  const [categoriesArr, setCategoriesArr] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [axiosController, setAxiosController] = useState(null);

  const sportParam = params["*"].split("/")[1];

  const timePriority = useMemo(() => {
    return {
      "3H": 1,
      "6H": 2,
      "9H": 3,
      "12H": 4,
      "2D": 5,
      "3D": 6,
      "4D": 7,
      "5D": 8,
    };
  }, []);

  useEffect(() => {
    dispatch(sportsbookActions.setSelectedSport(null));
    dispatch(sportsbookActions.setSports(null));

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);

    // if (!tournamentTimeFilter) {
    //   dispatch(sportsbookActions.setTournamentTimeFilter("All"));
    // }
    if (tournamentTimeFilter !== "All") {
      dispatch(sportsbookActions.setTournamentTimeFilter("All"));
    }

    dispatch(getPregameData(sportIcons, signal));
    dispatch(getLiveStreams(signal));

    // Reget the live streams every 1 minute
    const pollingCallback = () => {
      dispatch(getLiveStreams(signal));
    };
    const getLiveStreamsInterval = setInterval(pollingCallback, 60000);

    return () => {
      controller.abort();
      if (getLiveStreamsInterval) clearInterval(getLiveStreamsInterval);
      dispatch(sportsHomeActions.reset());
      dispatch(sportsbookActions.setCustomDate(null));
      dispatch(sportsbookActions.setCustomDateTournaments(null));
    };
  }, []);

  // Get the selected sport from the params
  useEffect(() => {
    if (!sports) return;

    // If did not come from the sportsMenu, select the first sport
    let sport;
    if (!sportParam || sportParam === "undefined") {
      sport = sports[0];
      navigate(
        `/sportsbook/home/${sport.Name?.International.toLowerCase().replace(
          / /g,
          "-"
        )}`,
        { replace: true }
      );
    } else sport = sports.find((s) => s.slug === sportParam);

    if (!sport) sport = allSports.find((s) => s.slug === sportParam);

    dispatch(sportsbookActions.setSelectedSport(sport));
  }, [sports?.length, sportParam]);

  // Get the categories and Tournaments
  useEffect(() => {
    if (!selectedSport) return;
    if (!axiosController) return;

    if (!sportMarketTree[selectedSport.Id])
      dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

    // Check timeframe and get the first timeframe which has events
    let closestTimeframe = "All";
    if (tournamentTimeFilter !== "All" && tournamentTimeFilter !== "24H") {
      /////////ADDED && tournamentTimeFilter !== '24H' for Daily Events
      closestTimeframe = findClosestTimeframe();
      dispatch(sportsbookActions.setTournamentTimeFilter(closestTimeframe));
    }

    if (customDate !== null) {
      let payload;
      payload = {
        ProviderId: 1,
        did: customDate,
        sportid: selectedSport?.Id,
        groupName: null,
        subGroupName: null,
      };

      const stringifiedPayload = JSON.stringify(payload);

      const controller = new AbortController();
      const signal = controller.signal;
      dispatch(getCustomDateEvents(signal, stringifiedPayload));
    }

    setLoadingCategories(true);

    setCategoriesAndTournaments(closestTimeframe);

    setLoadingCategories(false);
  }, [selectedSport?.Id, axiosController]);

  // If a live event was added or removed re-evaluate the categories and tournaments (run after the initial categories where loaded)
  useEffect(() => {
    if (loadingCategories) return;

    setCategoriesAndTournaments(tournamentTimeFilter);
  }, [loadingCategories, addedRemovedEvent]);

  const setCategoriesAndTournaments = (closestTimeframe) => {
    let ca = [];

    selectedSport?.Categories?.forEach((category) => {
      // if (category.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)
      let updatedTournaments = [];

      category.Tournaments.forEach((tournament) => {
        // if (tournament.Counters['5D'] === 0) return; // Don't add categories which don't have any game (5D is the max Counters)
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

    // Add categories and tournaments in live, that are not in pregame
    let withLiveCategories = addLiveCategories(ca);

    dispatch(sportsHomeActions.setCategories(withLiveCategories));

    const subset = getSubset(withLiveCategories, closestTimeframe);
    const sorted = getSorted(subset);

    setCategoriesArr(sorted);
    // dispatch(sportsHomeActions.setCategoryOpen(sorted[0]?.Id));
  };

  const addLiveCategories = (ca) => {
    let newCategories = [];

    Object.values(liveState).forEach((event) => {
      const {
        CategoryId,
        TournamentId,
        TournamentName,
        CategoryName,
        SportId,
      } = event?.Info || {};

      if (SportId !== selectedSport.Id) return;

      const newTournament = {
        CategoryCounters: { "3H": 1 },
        CategoryId: CategoryId,
        CategoryName: CategoryName,
        Count: 0,
        Counters: { "3H": 1 },
        Id: TournamentId,
        Name: TournamentName,
        Tags: "",
      };

      let foundCategory = ca.find((category) => category.Id === CategoryId);
      if (!foundCategory)
        foundCategory = newCategories.find(
          (category) => category.Id === CategoryId
        );

      if (!foundCategory) {
        newCategories.push({
          Count: 0,
          Counters: { "3H": 1 },
          Id: CategoryId,
          Name: CategoryName,
          Tags: "",
          Tournaments: [newTournament],
        });
      } else {
        // If Category found but Tournament not found, add Tournament to existing Category
        let foundTournament = foundCategory.Tournaments.find(
          (tournament) => tournament.Id === TournamentId
        );

        if (!foundTournament) {
          foundCategory.Tournaments.push(newTournament);
        }
      }
    });

    // Combine original Categories with newCategories
    const updatedCategories = ca.concat(newCategories);

    return updatedCategories;
  };

  // Update categories and tournaments when time or search is changed
  useEffect(() => {
    if (!selectedSport) return;
    if (!categories) return;

    const subset = getSubset(categories, tournamentTimeFilter);
    const sorted = getSorted(subset);

    setCategoriesArr(sorted);
  }, [tournamentSearchString, tournamentTimeFilter]);

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

  // Get subset of categories and tournaments, based on searchString and time
  const getSubset = (ca, counter) => {
    if (!tournamentSearchString && counter === "All") return ca;
    else {
      let updatedCategories = [];

      ca.forEach((category) => {
        let updatedCategory = { ...category };
        let categoryTournaments = updatedCategory.Tournaments;

        // If there is a time filter, don't add the categories which have no events during the time period
        if (counter !== "All" && category.Counters[counter] === 0) return;
        else if (counter !== "All" && category.Counters[counter] > 0) {
          categoryTournaments = updatedCategory.Tournaments.filter(
            (t) => t.Counters[counter] > 0
          );
        }

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

  // Find the closest timeframe which has events
  const findClosestTimeframe = () => {
    let closestTimeframe = "All";
    closestTimeframe = Object.keys(selectedSport.Counters).reduce(
      (closest, current) => {
        if (selectedSport.Counters[current] === 0) return closest;
        return timePriority[current] < timePriority[closest] || !closest
          ? current
          : closest;
      }
    );

    if (!closestTimeframe || closestTimeframe.endsWith("D")) return "All";

    return closestTimeframe;
  };

  const getDateOfLastItem = (customDateTournaments) => {
    if (customDateTournaments !== null) {
      const lastItem = customDateTournaments[customDateTournaments.length - 1];
      const lastItemDate = lastItem.Info.DateOfMatch;

      const date = new Date(lastItemDate);

      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      return formattedDate;
    } else {
      return null;
    }
  };

  return (
    <>
      <div id="sportsSelectionMenu">
        <SportSelection
          items={sports}
          selectedSport={selectedSport}
          onSelectSport={(sport) => {
            dispatch(sportsbookActions.setSelectedSport(sport));
            navigate(`/sportsbook/home/${sport.slug}`);
          }}
        />
      </div>

      <div className={classes.TopRowWrapper}>
        {customDateTournaments !== null ? (
          //  Object.keys(customDateTournaments).length > 0 && (
          <TournamentTimeSelection home />
        ) : (
          //   )
          <>
            <div className={classes.Grouped}>
              <TournamentSort />
              <TournamentSearch withMargin={true} />
            </div>
            <TournamentTimeSelection home />
          </>
        )}
      </div>

      {loading ? (
        <div className={classes.Loading}>
          <div className={classes.Spinner}></div>
        </div>
      ) : customDateTournaments !== null ? (
        Object.keys(customDateTournaments).length > 0 ? (
          <>
            <div
              className={classes.Header}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
              }}
            >
              <p
                className={classes.Title}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                {getDateOfLastItem(customDateTournaments)}
              </p>
              {customDateTournaments.length > 0 && (
                <p className={classes.Total}>
                  ({customDateTournaments.length} {translate("Events")})
                </p>
              )}
            </div>

            {customDateTournaments.map((event) => {
              return (
                <EventRow key={event.MatchId} event={event} withTournament />
              );
            })}
          </>
        ) : (
          <div>
            <p style={{ color: "var(--brand-green)" }}>
              {translate(`Νο events are currently available`)}.
            </p>
          </div>
        )
      ) : (
        <div className={classes.TournamentGroup}>
          {selectedSport && !loadingCategories ? (
            categoriesArr.length === 0 ? (
              <span
                className={classes.NoGames}
                style={{ color: "var(--brand-green)" }}
              >
                {translate(`Νο events are currently available`)}.
              </span>
            ) : (
              categoriesArr.map((category, catIndex) => (
                <Category
                  key={category.Id}
                  category={category}
                  initOpen={false}
                  //initOpen={catIndex === 0}
                  slice="sportsHome"
                  includePregame
                  includeLive
                />
              ))
            )
          ) : (
            <div
              style={{
                display: "flex",
                rowGap: "0.3rem",
                flexDirection: "column",
              }}
            >
              <ShimmerIcon className={classes.ShimmerIcon} />
              <ShimmerIcon className={classes.ShimmerIcon} />
              <ShimmerIcon className={classes.ShimmerIcon} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SportsHome;
