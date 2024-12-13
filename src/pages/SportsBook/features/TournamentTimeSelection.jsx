import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "framer-motion";

import classes from "./TournamentTimeSelection.module.css";
import Dropdown2 from "../../../features/UI/Dropdown/Dropdown2";
import FilterIcon from "../../../assets/svgs/filter.svg?react";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Calendar from "../../../assets/svgs/calendar.svg?react";
import MenuButton from "../../../features/UI/Buttons/MenuButton";
import TimesIcon from "../../../assets/svgs/times.svg?react";
import { sportsbookActions } from "../sportsbookSlice";
import { translate } from "../../../utils/translations";
import { useNavigate } from "react-router-dom";

const TournamentTimeSelection = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const tournamentTimeFilter = useSelector(
    (state) => state.sportsbook.tournamentTimeFilter
  );
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const customDate = useSelector((state) => state.sportsbook.customDate);
  const customDateTournaments = useSelector(
    (state) => state.sportsbook.customDateTournaments
  );
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const addParamsToUrl = (modal) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const getDateOfLastItem = (customDateTournaments, customDate) => {
    if (
      customDateTournaments !== null &&
      Object.keys(customDateTournaments).length > 0
    ) {
      const lastItem = customDateTournaments[customDateTournaments.length - 1];
      const lastItemDate = lastItem.Info.DateOfMatch;

      const date = new Date(lastItemDate);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    } else {
      if (customDate !== null) {
        // Extract day and month from the string
        const day = customDate.slice(2, 4);
        const month = customDate.slice(0, 2);

        // Format as DD/MM
        return `${day}/${month}`;
      } else {
        return "Selected Date";
      }
    }
  };

  const removeCustomDate = () => {
    dispatch(sportsbookActions.setCustomDate(null));
    dispatch(sportsbookActions.setCustomDateTournaments(null));
  };

  return isMobile ? (
    <>
      {customDateTournaments === null && (
        <div
          className={
            showDropdown
              ? [classes.DropdownWrapper, classes.Show].join(" ")
              : classes.DropdownWrapper
          }
        >
          <MenuButton
            color="transparent"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FilterIcon />
            <span>{translate(tournamentTimeFilter)}</span>
            <AngleDownIcon />
          </MenuButton>

          <AnimatePresence>
            {showDropdown && (
              <Dropdown2 onClickOutside={() => setShowDropdown(false)}>
                <div className={classes.DropdownMenu}>
                  <div
                    className={
                      tournamentTimeFilter === "All"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(
                        sportsbookActions.setTournamentTimeFilter("All")
                      );
                      setShowDropdown(false);
                    }}
                  >
                    {translate("All")}
                  </div>
                  <div
                    className={
                      tournamentTimeFilter === "3H"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(sportsbookActions.setTournamentTimeFilter("3H"));
                      setShowDropdown(false);
                    }}
                    disabled={
                      selectedSport?.Counters &&
                      selectedSport?.Counters["3H"] === 0
                    }
                  >
                    {translate("Next 3 Hours")}
                  </div>
                  <div
                    className={
                      tournamentTimeFilter === "6H"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(sportsbookActions.setTournamentTimeFilter("6H"));
                      setShowDropdown(false);
                    }}
                    disabled={
                      selectedSport?.Counters &&
                      selectedSport?.Counters["6H"] === 0
                    }
                  >
                    {translate("Next 6 Hours")}
                  </div>
                  <div
                    className={
                      tournamentTimeFilter === "9H"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(sportsbookActions.setTournamentTimeFilter("9H"));
                      setShowDropdown(false);
                    }}
                    disabled={
                      selectedSport?.Counters &&
                      selectedSport?.Counters["9H"] === 0
                    }
                  >
                    {translate("Next 9 Hours")}
                  </div>
                  <div
                    className={
                      tournamentTimeFilter === "12H"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(
                        sportsbookActions.setTournamentTimeFilter("12H")
                      );
                      setShowDropdown(false);
                    }}
                    disabled={
                      selectedSport?.Counters &&
                      selectedSport?.Counters["12H"] === 0
                    }
                  >
                    {translate("Next 12 Hours")}
                  </div>
                  <div
                    className={
                      tournamentTimeFilter === "24H"
                        ? [classes.DropdownItem, classes.Active].join(" ")
                        : classes.DropdownItem
                    }
                    onClick={() => {
                      dispatch(
                        sportsbookActions.setTournamentTimeFilter("24H")
                      );
                      setShowDropdown(false);
                    }}
                    disabled={
                      selectedSport?.Counters &&
                      selectedSport?.Counters["24H"] === 0
                    }
                  >
                    {translate("Next 24 Hours")}
                  </div>
                </div>
              </Dropdown2>
            )}
          </AnimatePresence>
        </div>
      )}

      {props.home && (
        <div
          className={classes.TournamentTimeSelection}
          style={{
            columnGap: "1rem",
            display: "flex",
            alignItems: "center",
            width: "max-content",
          }}
        >
          <button
            className={
              customDate !== null
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => addParamsToUrl("calendar")}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["24H"] === 0
            }
            style={{ gap: "0.5rem", borderRadius: "6px" }}
          >
            <span>{translate("Calendar")}</span>
            <Calendar />
          </button>
          {customDateTournaments !== null && (
            <button className={classes.RemoveDateBtn}>
              <div
                onClick={() => {
                  removeCustomDate();
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TimesIcon />
              </div>

              <p>{getDateOfLastItem(customDateTournaments, customDate)}</p>
            </button>
          )}
        </div>
      )}
    </>
  ) : (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      {props.home && (
        <div
          className={classes.TournamentTimeSelection}
          style={{
            columnGap: "1rem",
            display: "flex",
            alignItems: "center",
            width: "max-content",
          }}
        >
          <button
            className={
              customDate !== null
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => addParamsToUrl("calendar")}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["24H"] === 0
            }
            style={{ gap: "0.5rem", borderRadius: "6px" }}
          >
            <span>{translate("Calendar")}</span>
            <Calendar />
          </button>
          {customDateTournaments !== null && (
            <button className={classes.RemoveDateBtn}>
              <div
                onClick={() => {
                  removeCustomDate();
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.2rem 0 0 0",
                }}
              >
                <TimesIcon />
              </div>
              <p>{getDateOfLastItem(customDateTournaments, customDate)}</p>
            </button>
          )}
        </div>
      )}

      {customDateTournaments === null && (
        <div className={classes.TournamentTimeSelection}>
          <button
            className={
              !customDate && tournamentTimeFilter === "All"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("All"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
          >
            <span>{translate("All")}</span>
          </button>
          <button
            className={
              !customDate && tournamentTimeFilter === "3H"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("3H"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["3H"] === 0
            }
          >
            <span>{translate("3h")}</span>
          </button>
          <button
            className={
              !customDate && tournamentTimeFilter === "6H"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("6H"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["6H"] === 0
            }
          >
            <span>{translate("6h")}</span>
          </button>
          <button
            className={
              !customDate && tournamentTimeFilter === "9H"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("9H"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["9H"] === 0
            }
          >
            <span>{translate("9h")}</span>
          </button>
          <button
            className={
              !customDate && tournamentTimeFilter === "12H"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("12H"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["12H"] === 0
            }
          >
            <span>{translate("12h")}</span>
          </button>
          <button
            className={
              !customDate && tournamentTimeFilter === "24H"
                ? [classes.TimeSelectionButton, classes.Active].join(" ")
                : classes.TimeSelectionButton
            }
            onClick={() => {
              dispatch(sportsbookActions.setTournamentTimeFilter("24H"));
              dispatch(sportsbookActions.setCustomDate(null));
              dispatch(sportsbookActions.setCustomDateTournaments(null));
            }}
            disabled={
              selectedSport?.Counters && selectedSport?.Counters["24H"] === 0
            }
          >
            <span>{translate("24h")}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TournamentTimeSelection;
