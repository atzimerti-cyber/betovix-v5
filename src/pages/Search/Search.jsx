
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Search.module.css";
import { searchCasino } from "./searchAsyncActions";
import FilterBar from "../Casino/features/FilterBar";
import useDebounce from "../../hooks/useDebounce";
import { searchActions } from "../Search/searchSlice";
import CasinoGames from "./features/CasinoGames";
import { appActions } from "../../features/InitApp/appSlice";

import { AnimatePresence } from "framer-motion";

import BarLoading from "../../features/UI/BarLoading/BarLoading";
import { useNavigate } from "react-router-dom";

import { translate } from "../../utils/translations";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.search.loading);
  const casinoResults = useSelector((state) => state.search.casinoResults);
  const sorting = useSelector((state) => state.casino.sorting);
  const searchString = useSelector((state) => state.search.searchString);
  const debSearchString = useDebounce(searchString);
  const [axiosController, setAxiosController] = useState(null);

  const barLoading = useSelector((state) => state.app.barLoading);
  const searchPageImg = useSelector((state) => state.app.siteSettings?.SearchPageImg);

  useEffect(() => {
    const controller = new AbortController();
    setAxiosController(controller);

    return () => {
      controller.abort();
      dispatch(searchActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!axiosController) return;
    dispatch(appActions.setBarLoading(true));

    dispatch(searchActions.setCasinoResults(null));

    // if (!isMobile) {
    dispatch(
      searchCasino(
        axiosController.signal,
        1,
        24,
        [],
        debSearchString,
        sorting
      )
    );
    // }
  }, [axiosController, debSearchString, sorting]);

  useEffect(() => {
    dispatch(appActions.setBarLoading(false));
  }, [casinoResults]);

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>
      <div
        className={classes.Content}
        style={searchPageImg ? { "--search-page-bg": `url(${searchPageImg})` } : undefined}
      >
        <div className={classes.PageContent}>
          <div className={classes.Search}>
            <FilterBar
              searchString={searchString}
              onChangeSearch={(value) =>
                dispatch(searchActions.setSearchString(value))
              }
              placeholder="Search by game or provider"
              searchPage
              onToggleProviders={() => navigate("/casino/providers")}
            />

            {casinoResults ? (
              casinoResults.Data.length !== 0 ? (
                <CasinoGames
                  collection={casinoResults}
                  title={debSearchString ? "Search results" : "Often searched"}
                  loading={loading}
                  searchString={debSearchString}
                  providers={casinoResults?.providers}
                  sorting={sorting}
                  searchPage
                />
              ) : (
                <p className={classes.NoResults}>{translate("No Results")}</p>
              )
            ) : (
              <p className={classes.NoResults}>{translate("No Results")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
