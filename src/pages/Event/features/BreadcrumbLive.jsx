import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import classes from "./BreadcrumbLive.module.css";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Arrow2LeftIcon from "../../../assets/svgs/arrow2-left.svg?react";
import Dropdown2 from "../../../features/UI/Dropdown/Dropdown2";
import { translateNameWithLang, translate } from "../../../utils/translations";
import TeamLogo from "../../../features/TeamLogo/TeamLogo";

const BreadcrumbLive = (props) => {
  const navigate = useNavigate();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const liveState = useSelector((state) => state.live.liveState);
  const addedRemovedEvent = useSelector(
    (state) => state.live.addedRemovedEvent
  );

  const [showCategories, setShowCategories] = useState(false);
  const [showTournaments, setShowTournaments] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [allTournaments, setAllTournaments] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!props.event) return;

    setFirstLoad(true);
    setSelectedCategory({
      CategoryId: props.event.Info.CategoryId,
      CategoryName: props.event.Info.CategoryName,
    });
    setSelectedTournament({
      TournamentId: props.event.Info.TournamentId,
      TournamentName: props.event.Info.TournamentName,
      CategoryId: props.event.Info.CategoryId,
      CategoryName: props.event.Info.CategoryName,
    });
    setSelectedEvent(props.event.Info);

    // Get categories, tournaments and events for the current category and tournament
    const categoriesMap = new Map();
    const tournamentsMap = new Map();

    let events = [];

    Object.keys(liveState).forEach((key) => {
      const info = liveState[key].Info;
      if (selectedSport.Id !== info?.SportId) return; // Keep only the categories and tournaments for the current sport

      if (!categoriesMap.has(info.CategoryId)) {
        categoriesMap.set(info.CategoryId, info.CategoryName);
      }

      const mapKey = `${info.TournamentId}-${info.CategoryId}`;
      if (!tournamentsMap.has(mapKey)) {
        tournamentsMap.set(mapKey, {
          TournamentId: info.TournamentId,
          TournamentName: info.TournamentName,
          CategoryId: info.CategoryId,
          CategoryName: info.CategoryName,
        });
      }

      events.push(liveState[key].Info);
    });

    const categories = Array.from(categoriesMap.entries()).map(
      ([CategoryId, CategoryName]) => ({
        CategoryId,
        CategoryName,
      })
    );
    const tournaments = Array.from(tournamentsMap.values());

    const ft = tournaments.filter(
      (t) => t.CategoryId === props.event.Info.CategoryId
    );
    const fe = events.filter(
      (t) => t.TournamentId === props.event.Info.TournamentId
    );

    setAllCategories(categories);
    setAllTournaments(tournaments);
    setFilteredTournaments(ft);
    setAllEvents(events);
    setFilteredEvents(fe);

    setTimeout(() => {
      setFirstLoad(false);
    }, 500);
  }, [props.event?.MatchId, addedRemovedEvent]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const ft = allTournaments.filter(
      (t) => t.CategoryId === selectedCategory.CategoryId
    );
    setFilteredTournaments(ft);
    setSelectedTournament(null);
    setSelectedEvent(null);
    setShowCategories(false);
    setFirstLoad(false);
  }, [selectedCategory?.CategoryId]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (firstLoad) return;

    const fe = allEvents.filter(
      (e) => e.TournamentId === selectedTournament?.TournamentId
    );
    setFilteredEvents(fe);
    setSelectedEvent(null);
    setShowTournaments(false);
    setFirstLoad(false);
  }, [selectedTournament?.TournamentId]);

  return (
    <div className={classes.Breadcrumb}>
      <div
        className={
          showCategories
            ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(" ")
            : classes.NoPaddingCrumb
        }
      >
        <div
          className={classes.Crumb}
          onClick={() => setShowCategories(!showCategories)}
        >
          <div className={classes.SportIcon}>{selectedSport?.icon}</div>
          <div className={classes.SportName}>
            {translateNameWithLang(selectedCategory?.CategoryName)}
          </div>
          <AngleDownIcon className={classes.ArrowIcon} />
        </div>

        <AnimatePresence>
          {showCategories && (
            <Dropdown2 onClickOutside={() => setShowCategories(false)}>
              <div className={classes.DropdownMenu}>
                {allCategories?.map((category) => {
                  return (
                    <div
                      key={category.CategoryId}
                      className={
                        selectedCategory.CategoryId === category.CategoryId
                          ? [classes.DropdownItem, classes.Active].join(" ")
                          : classes.DropdownItem
                      }
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className={classes.SportItemIcon}>
                        {selectedSport?.icon}
                      </div>
                      <div className={classes.SportItemName}>
                        {translateNameWithLang(category.CategoryName)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Dropdown2>
          )}
        </AnimatePresence>
      </div>

      <div
        className={
          showTournaments
            ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(" ")
            : classes.NoPaddingCrumb
        }
      >
        <div
          className={classes.Crumb}
          onClick={() => setShowTournaments(!showTournaments)}
        >
          {selectedTournament && (
            <div className={classes.SportIcon}>{selectedSport?.icon}</div>
          )}
          <div className={classes.SportName}>
            {selectedTournament
              ? translateNameWithLang(selectedTournament?.TournamentName)
              : translate("Tournament")}
          </div>
          <AngleDownIcon className={classes.ArrowIcon} />
        </div>

        <AnimatePresence>
          {showTournaments && (
            <Dropdown2 onClickOutside={() => setShowTournaments(false)}>
              <div className={classes.DropdownMenu}>
                {filteredTournaments?.map((tournament) => {
                  return (
                    <div
                      key={tournament.TournamentId}
                      className={
                        selectedTournament?.TournamentId ===
                        tournament.TournamentId
                          ? [classes.DropdownItem, classes.Active].join(" ")
                          : classes.DropdownItem
                      }
                      // onClick={() => navigate(`/sportsbook/${props.page}/${sport.slug}`)}
                      onClick={() => setSelectedTournament(tournament)}
                    >
                      <div className={classes.SportItemIcon}>
                        {selectedSport?.icon}
                      </div>
                      <div className={classes.SportItemName}>
                        {translateNameWithLang(tournament.TournamentName)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Dropdown2>
          )}
        </AnimatePresence>
      </div>

      <div
        className={
          showEvents
            ? [classes.NoPaddingCrumb, classes.DropdownOpen].join(" ")
            : classes.NoPaddingCrumb
        }
      >
        <div
          className={classes.Crumb}
          onClick={() => setShowEvents(!showEvents)}
        >
          {selectedEvent ? (
            <div className={classes.TeamsContainer}>
              <div className={classes.TeamsContainer}>
                {selectedEvent?.HomeTeamId &&
                  selectedEvent?.SportName?.International && (
                    <TeamLogo
                      teamId={selectedEvent.HomeTeamId}
                      isHome={true}
                      sportName={selectedEvent.SportName.International}
                    />
                  )}
                <div className={[classes.TeamName, classes.First].join(" ")}>
                  {translateNameWithLang(selectedEvent?.HomeTeamName)}
                </div>
              </div>

              {selectedEvent?.AwayTeamName?.International && (
                <>
                  <div className={classes.TeamVersusWord}> vs </div>

                  <div className={classes.TeamsContainer}>
                    <div
                      className={[classes.TeamName, classes.Second].join(" ")}
                    >
                      {translateNameWithLang(selectedEvent?.AwayTeamName)}
                    </div>
                    {selectedEvent?.AwayTeamId &&
                      selectedEvent?.SportName?.International && (
                        <TeamLogo
                          teamId={selectedEvent.AwayTeamId}
                          isHome={false}
                          sportName={selectedEvent.SportName.International}
                        />
                      )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={classes.SportName}>{translate("Match")}</div>
          )}

          <AngleDownIcon className={classes.ArrowIcon} />
        </div>

        <AnimatePresence>
          {showEvents && (
            <Dropdown2 onClickOutside={() => setShowEvents(false)}>
              <div className={classes.DropdownMenu}>
                {filteredEvents?.map((event) => {
                  return (
                    <Link
                      key={event.MatchId}
                      className={
                        selectedEvent?.MatchId === event.MatchId
                          ? [classes.DropdownItem, classes.Active].join(" ")
                          : classes.DropdownItem
                      }
                      to={`/event/${event.SportName.International.toLowerCase().replace(
                        / /g,
                        "-"
                      )}/${event?.SportId}/${event?.MatchId}`}
                      onClick={() => setShowEvents(false)}
                    >
                      <div className={classes.TeamsContainer}>
                        <div className={classes.TeamsContainer}>
                          <TeamLogo
                            teamId={event?.HomeTeamId}
                            isHome={true}
                            sportName={event?.SportName.International}
                          />
                          <div
                            className={[classes.TeamName, classes.First].join(
                              " "
                            )}
                          >
                            {translateNameWithLang(event?.HomeTeamName)}
                          </div>
                        </div>

                        {event?.AwayTeamName?.International && (
                          <>
                            <div className={classes.TeamVersusWord}> vs </div>

                            <div className={classes.TeamsContainer}>
                              <div
                                className={[
                                  classes.TeamName,
                                  classes.Second,
                                ].join(" ")}
                              >
                                {translateNameWithLang(event?.AwayTeamName)}
                              </div>
                              <TeamLogo
                                teamId={event?.AwayTeamId}
                                isHome={false}
                                sportName={event?.SportName.International}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Dropdown2>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BreadcrumbLive;
