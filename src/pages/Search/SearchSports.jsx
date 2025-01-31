import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./SearchSports.module.css";
import { getAllVendors } from "../Casino/casinoAsyncActions";
import FilterBar from "../Casino/features/FilterBar";
import useDebounce from "../../hooks/useDebounce";
import { searchActions } from "../Search/searchSlice";
import EventRow from "../SportsBook/features/EventRow";
import { getEventSearch } from "./searchAsyncActions";
import SportsIcon from "../../assets/svgs/sports.svg?react";
import { translate } from "../../utils/translations";
import { getEventsTop } from "../../features/TopEvents/TopEventsAsync";
import topEventsSlice from "../../features/TopEvents/TopEventsSlice";

const SearchSports = () => {
  const dispatch = useDispatch();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change

  const loading = useSelector((state) => state.search.loading);
  const moreLoading = useSelector((state) => state.search.moreLoading);

  const searchString = useSelector((state) => state.search.searchString);
  const events = useSelector((state) => state.search.sportsResults);
  const debSearchString = useDebounce(searchString);
  const topEvents = useSelector((state) => state.topEvents.topEvents);

  const [axiosController, setAxiosController] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);

    if (!topEvents) {
      dispatch(getEventsTop(controller.signal));
    }

    return () => {
      controller?.abort();
      dispatch(searchActions.reset());
    };
  }, []);

  useEffect(() => {
    if (!axiosController) return;

    dispatch(searchActions.setSportsResults(null));

    if (debSearchString.trim() !== "" && debSearchString.length >= 3) {
      dispatch(getEventSearch(axiosController.signal, 1, searchString));
    }
  }, [axiosController, debSearchString]);

  return (
    <div className={classes.PageContent}>
      <div className={classes.Search}>
        <FilterBar
          searchString={searchString}
          onChangeSearch={(value) =>
            dispatch(searchActions.setSearchString(value))
          }
          placeholder="Search Event"
          noFilters
        />
        {loading ? (
          <div className={classes.Loading}>
            <div className={classes.Spinner}></div>
          </div>
        ) : events ? (
          events.length > 0 ? (
            <>
              <div className={classes.Header}>
                <SportsIcon height="20px" width="20px" />
                <p className={classes.Title}>{translate(`Search Results`)}</p>
                {events.length > 0 && (
                  <p className={classes.Total}>
                    {events.length} {translate("Events")}
                  </p>
                )}
              </div>

              {events.map((event) => {
                // Uncomment the following line if you want to skip live events
                // if (liveState[event.MatchId]) return null;

                return <EventRow key={event.MatchId} event={event} />;
              })}
            </>
          ) : (
            <p> {translate(`No Events were found`)}.</p>
          )
        ) : (
          <div>
            <p style={{ color: "var(--brand-green)" }}>
              {" "}
              {translate(`Type 3 or more characters to search for an event`)}.
            </p>
            {topEvents && topEvents.length > 0 && (
              <div className={classes.TopEventsContainer}>
                <>
                  <div className={classes.Header}>
                    <SportsIcon height="20px" width="20px" />
                    <p className={classes.Title} style={{ fontSize: "1.2rem" }}>
                      {translate(`Top Events`)}
                    </p>
                    {/* {topEvents.length > 0 && (
                      <p className={classes.Total}>
                        {topEvents.length} {translate("Events")}
                      </p>
                    )} */}
                  </div>

                  {topEvents.map((event) => {
                    return <EventRow key={event.MatchId} event={event} />;
                  })}
                </>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSports;
