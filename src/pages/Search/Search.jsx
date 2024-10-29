
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import classes from "./Search.module.css";
import CherriesIcon from "../../assets/svgs/cherries.svg?react";
import { getAllVendors } from "../Casino/casinoAsyncActions";
import { searchCasino } from "./searchAsyncActions";
import FilterBar from "../Casino/features/FilterBar";
import useDebounce from "../../hooks/useDebounce";
import { searchActions } from "../Search/searchSlice";
import { casinoActions } from "../Casino/casinoSlice";
import CasinoGames from "./features/CasinoGames";
import CasinoMenu from "../Casino/features/CasinoMenu";
import { appActions } from "../../features/InitApp/appSlice";

import { AnimatePresence } from "framer-motion";

import BarLoading from "../../features/UI/BarLoading/BarLoading";
import { useNavigate, useLocation } from "react-router-dom";

import { translate } from "../../utils/translations";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const loading = useSelector((state) => state.search.loading);
  const casinoResults = useSelector((state) => state.search.casinoResults);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const sorting = useSelector((state) => state.casino.sorting);
  const searchString = useSelector((state) => state.search.searchString);
  const debSearchString = useDebounce(searchString);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [axiosController, setAxiosController] = useState(null);

  const barLoading = useSelector((state) => state.app.barLoading);

  useEffect(() => {
    // if (isMobile) {
    //     navigate('/casino/lobby?modal=search');
    //     return;
    // };

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);

    dispatch(getAllVendors(signal));

    return () => {
      controller?.abort();
      dispatch(casinoActions.setCasinoVendors(null));
      dispatch(searchActions.reset());
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const provider = searchParams.get("provider");
    if (provider) {
      const providerArray = provider.split(",");
      setSelectedProviders(providerArray);
      dispatch(searchActions.setSearchSelectedProviders(providerArray));
    }
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (selectedProviders.length > 0) {
      searchParams.set("provider", selectedProviders);
    } else {
      searchParams.delete("provider");
    }
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [selectedProviders, location]);

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
        selectedProviders,
        debSearchString,
        sorting,
        true
      )
    );
    // }
  }, [axiosController, debSearchString, selectedProviders, sorting]);

  useEffect(() => {
    dispatch(appActions.setBarLoading(false));
  }, [casinoResults]);

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>
      <div className={classes.Content}>
        <CasinoMenu />
        <div className={classes.PageContent}>
          <div className={classes.Search}>
            <FilterBar
              searchString={searchString}
              onChangeSearch={(value) =>
                dispatch(searchActions.setSearchString(value))
              }
              onChangeProviders={(value) => setSelectedProviders(value)}
              placeholder="Search Casino"
            />

            {casinoResults ? (
              casinoResults.Data.length !== 0 ? (
                selectedProviders.length === 0 ? (
                  <CasinoGames
                    collection={casinoResults}
                    icon={<CherriesIcon />}
                    title="Search results"
                    loading={loading}
                    searchString={debSearchString}
                    sorting={sorting}
                  />
                ) : (
                  <CasinoGames
                    collection={casinoResults}
                    icon={<CherriesIcon />}
                    title={selectedProviders.join(", ")}
                    loading={loading}
                    searchString={debSearchString}
                    providers={casinoResults?.providers}
                    sorting={sorting}
                  />
                )
              ) : (
                <p> {translate("No Results")}</p>
              )
            ) : (
              <p> {translate("No Results")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
