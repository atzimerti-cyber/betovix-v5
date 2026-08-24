import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import classes from "./SportsHome.module.css";
import SportSelection from "../features/SportSelection";
import TournamentSearch from "../features/TournamentSearch";
import TournamentSort from "../features/TournamentSort";
import { sportsbookActions } from "../sportsbookSlice";
import { sportsOutrightsActions } from "../subpages/sportsOutrightsSlice";
import { getPregameData } from "../sportsbookAsyncActions";
import { getSportMarketTree } from "../sportsbookAsyncActions";
import ShimmerIcon from "../../../features/UI/Shimmer/shimmer.svg?react";
import OutrightCategory from "../features/OutrightCategory";
import OutrightCategoriesTournaments from "../features/OutrightCategoriesTournaments";
import { translate } from "../../../utils/translations";

const SportsOutrights = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const tournamentSearchString = useSelector(
    (state) => state.sportsbook.tournamentSearchString
  );
  const categories = useSelector((state) => state.sportsOutrights.categories);
  const sports = useSelector((state) => state.sportsbook.sports);
  const allSports = useSelector((state) => state.app.allSports);
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const sportIcons = useSelector((state) => state.app.sportIcons);
  const sportMarketTree = useSelector(
    (state) => state.sportsbook.sportMarketTree
  );
  const sportSettings = useSelector((state) => state.app.sportSettings);
  const tournamentSort = useSelector(
    (state) => state.sportsbook.tournamentSort
  );

  const sportsWithCategories = ["Football", "Tennis"];
  const sportParam = params["*"].split("/")[1];

  const [categoriesArr, setCategoriesArr] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [axiosController, setAxiosController] = useState(null);

  useEffect(() => {
    dispatch(sportsbookActions.setSelectedSport(null));
    dispatch(sportsbookActions.setSports(null));

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);
    dispatch(getPregameData(sportIcons, signal, true));

    return () => {
      controller.abort();
      dispatch(sportsOutrightsActions.reset());
    };
  }, []);

  // Get the selected sport from the params
  useEffect(() => {
    if (!Array.isArray(sports) || sports.length === 0) return;

    // If did not come from the sportsMenu, select the first sport
    let sport;
    if (!sportParam) {
      sport = sports[0];
      navigate(
        `/sportsbook/outrights/${sport.Name?.International.toLowerCase().replace(
          / /g,
          "-"
        )}`,
        { replace: true }
      );
    } else sport = sports.find((s) => s.slug === sportParam);

    if (!sport) sport = (Array.isArray(allSports) ? allSports : []).find((s) => s.slug === sportParam);

    dispatch(sportsbookActions.setSelectedSport(sport));
  }, [sports?.length, sportParam]);

  useEffect(() => {
    if (!selectedSport) return;
    if (!axiosController) return;

    if (!sportMarketTree[selectedSport.Id])
      dispatch(getSportMarketTree(selectedSport.Id, axiosController.signal));

    setLoadingCategories(true);

    let ca = [];

    selectedSport?.Categories?.forEach((category) => {
      let updatedTournaments = [];

      category.Tournaments.forEach((tournament) => {
        if (
          !tournament.Name.International.includes("Outright") &&
          !tournament.Name.International.includes("Specials")
        )
          return; // Add only outright here

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

    dispatch(sportsOutrightsActions.setCategories(ca));

    const subset = getSubset(ca);
    const sorted = getSorted(subset);

    setCategoriesArr(sorted);

    setLoadingCategories(false);
  }, [selectedSport?.Id, axiosController]);

  useEffect(() => {
    if (!selectedSport) return;
    if (!categories) return;

    const subset = getSubset(categories);
    const sorted = getSorted(subset);
    setCategoriesArr(sorted);
  }, [tournamentSearchString]);

  const getSubset = (ca) => {
    let updatedCategories = [];

    if (!tournamentSearchString) updatedCategories = ca;
    else {
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
    }

    return updatedCategories;
  };

  const getSorted = (subset) => {
    let ca = _.cloneDeep(subset);
    if (tournamentSort === "Default Sort") {
      const categsOrder = sportSettings?.CategsOrder || {};

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
          navigate(`/sportsbook/outrights/${sport.slug}`);
        }}
      />

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

      <div className={classes.TournamentGroup}>
        {selectedSport && !loadingCategories ? (
          categoriesArr.length === 0 ? (
            <span className={classes.NoGames}>
              {translate("No games where found.")}
            </span>
          ) : (
            categoriesArr.map((category, catIndex) => (
              <OutrightCategory
                key={category.Id}
                category={category}
                initOpen={catIndex === 0}
                slice="sportsOutrights"
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
    </>
  );
};

export default SportsOutrights;
