import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import TimesIcon from "../../assets/svgs/times.svg?react";
import SearchIcon from "../../assets/svgs/search.svg?react";
import classes from "./CasinoLobbySearch.module.css";
import { searchActions } from "../../pages/Search/searchSlice";
import { translate } from "../../utils/translations";
import { searchCasino } from "../../pages/Search/searchAsyncActions";
import useDebounce from "../../hooks/useDebounce";
import LobbySearchResults from "../../pages/Casino/features/LobbySearchResults";
import { modalActions } from "../ModalRoot/modalSlice";
import zIndex from "@mui/material/styles/zIndex";

const CasinoLobbySearch = (props) => {
  const dispatch = useDispatch();
  const casinoResults = useSelector((state) => state.search.casinoResults);
  const inLobbySearch = useSelector((state) => state.modal.inLobbySearch);
  const sorting = useSelector((state) => state.casino.sorting);
  const [value, setValue] = useState("");
  // const [results, setResults] = useState("");
  const debSearchString = useDebounce(value);
  const searchRef = useRef(null);

  const gamesLoading = useSelector((state) => state.search.loading);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (debSearchString !== "") {
      dispatch(searchActions.setCasinoResults(null));
      dispatch(
        searchCasino(signal, 1, 20, [], debSearchString, "Default", true)
      );
    }

    return () => {
      controller.abort(); // Clean up the request on unmount or when the search string changes
    };
  }, [debSearchString]);

  const handleInputChange = (inputValue) => {
    if (inputValue === "") {
      setValue("");
      dispatch(searchActions.setCasinoResults(null));
      dispatch(searchActions.setLobbySearchString(null));
    } else {
      setValue(inputValue);
      dispatch(searchActions.setLobbySearchString(inputValue));
    }
  };

  const handleClearSearch = () => {
    setValue("");
    dispatch(searchActions.setLobbySearchString(null));
    dispatch(searchActions.setCasinoResults(null));
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      dispatch(searchActions.setCasinoResults(null));
      dispatch(modalActions.setInLobbySearch(false));
      setValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    dispatch(modalActions.setInLobbySearch(false));
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={classes.LobbySearch} id="casinoLobbySearch">
        {inLobbySearch && <div className={classes.BgOverlay}></div>}

        <div
          className={classes.SearchContainer}
          style={{
            zIndex: inLobbySearch && "999999999",
          }}
          ref={searchRef}
        >
          <input
            className={classes.SearchInput}
            name="search"
            autoComplete="off"
            placeholder={translate("Search your game")}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              dispatch(modalActions.setInLobbySearch(true));
            }}
          />

          {value !== "" ? (
            <span
              className={[classes.RightIcon, classes.DeleteIcon].join(" ")}
              onClick={handleClearSearch}
            >
              <TimesIcon />
            </span>
          ) : (
            <span className={classes.RightIcon}>
              <SearchIcon />
            </span>
          )}
          {value !== "" && gamesLoading && (
            <AnimatePresence>
              <motion.div
                className={classes.Overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={classes.Spinner}></div>
              </motion.div>
            </AnimatePresence>
          )}
          {casinoResults && (
            <AnimatePresence>
              <motion.div
                className={classes.Overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  {casinoResults.Data.length !== 0 ? (
                    <LobbySearchResults
                      collection={casinoResults}
                      title={translate("Results")}
                      property="allSlots"
                      searchString={value}
                      viewAllItem={true}
                    />
                  ) : (
                    <p style={{ padding: "1rem", color: "white" }}>
                      {translate("No Results")}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default CasinoLobbySearch;
