import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import classes from "./BreadcrumbLive.module.css";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Arrow2LeftIcon from "../../../assets/svgs/arrow2-left.svg?react";
import Dropdown2 from "../../../features/UI/Dropdown/Dropdown2";
import { translateNameWithLang, translate } from "../../../utils/translations";
import TeamLogo from "../../../features/TeamLogo/TeamLogo";
import { getBreadcrumbData, getTournamentEvents } from "../eventAsyncActions";
import { eventActions } from "../eventSlice";

const Breadcrumb = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const sportPregameCategories = useSelector(
    (state) => state.event.sportPregameCategories
  );
  const tournamentEvents = useSelector((state) => state.event.tournamentEvents);

  const [showCategories, setShowCategories] = useState(false);
  const [showTournaments, setShowTournaments] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [allTournaments, setAllTournaments] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!selectedSport?.Id) return;
    if (!props.event) return;
    if (!props.event.Header || !props.event.Info) navigate(`/sportsbook/home`);

    setFirstLoad(true);
    setSelectedCategory({
      CategoryId: props.event.Info.CategoryId,
      CategoryName: props.event.Info?.CategoryName,
    });
    setSelectedTournament({
      TournamentId: props.event.Info.TournamentId,
      TournamentName: props.event.Info?.TournamentName,
      CategoryId: props.event.Info.CategoryId,
      CategoryName: props.event.Info?.CategoryName,
    });
    setSelectedEvent(props.event.Info);

    const controller = new AbortController();
    const signal = controller.signal;

    const isOutright = props.slice === "outrights" ? true : false;
    dispatch(
      getBreadcrumbData(
        selectedSport.Id,
        props.event.Info.CategoryId,
        props.event.Info.TournamentId,
        isOutright,
        signal
      )
    );

    return () => {
      controller.abort();
      dispatch(eventActions.setSportPregameCategories(null));
    };
  }, [selectedSport?.Id]);

  useEffect(() => {
    if (!props.event) return;
    if (!sportPregameCategories) return;

    let categories = [];
    let tournaments = [];

    sportPregameCategories.forEach((category) => {
      if (category.Tournaments.length === 0) return;

      let hasTournaments = false;

      category.Tournaments.forEach((tournament) => {
        if (
          props.slice !== "outrights" &&
          (tournament.Name.International.includes("Outright") ||
            tournament.Name.International.includes("Specials"))
        )
          return; // Don' add outright here
        else if (
          props.slice === "outrights" &&
          !tournament.Name.International.includes("Outright") &&
          !tournament.Name.International.includes("Specials")
        )
          return;

        tournaments.push({
          CategoryId: category.Id,
          CategoryName: category.Name,
          TournamentId: tournament.Id,
          TournamentName: tournament.Name,
        });

        hasTournaments = true;
      });

      if (hasTournaments)
        categories.push({
          CategoryId: category.Id,
          CategoryName: category.Name,
        });
    });

    categories.sort((a, b) =>
      a.CategoryName.International.localeCompare(b.CategoryName.International)
    );
    tournaments.sort((a, b) =>
      a.TournamentName.International.localeCompare(
        b.TournamentName.International
      )
    );

    const ft = tournaments.filter(
      (t) => t.CategoryId === props.event.Info.CategoryId
    );

    setAllCategories(categories);
    setAllTournaments(tournaments);
    setFilteredTournaments(ft);

    setFirstLoad(false);
  }, [sportPregameCategories]);

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
    dispatch(eventActions.setTournamentevents(null));
    setShowCategories(false);
  }, [selectedCategory?.CategoryId]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (!selectedTournament) return;
    if (firstLoad) return;

    const controller = new AbortController();
    const signal = controller.signal;
    const isOutright = props.slice === "outrights" ? true : false;
    dispatch(
      getTournamentEvents(
        selectedSport.Id,
        selectedCategory.CategoryId,
        selectedTournament.TournamentId,
        isOutright,
        signal
      )
    );

    setSelectedEvent(null);
    setShowTournaments(false);
  }, [selectedTournament?.TournamentId]);

  function formatUserFriendlyDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className={classes.Breadcrumb}>
      {/* <div className={[classes.Crumb, classes.BackButton].join(' ')} onClick={() => navigate(`/sportsbook/${props.page}/${selectedSport.slug}`)}>
                <Arrow2LeftIcon className={classes.BackIcon} />
                {translate('Back')}
            </div> */}

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
                <TeamLogo
                  teamId={selectedEvent?.HomeTeamId}
                  isHome={true}
                  sportName={selectedEvent?.SportName.International}
                />
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
                    <TeamLogo
                      teamId={selectedEvent?.AwayTeamId}
                      isHome={false}
                      sportName={selectedEvent?.SportName.International}
                    />
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
                {tournamentEvents?.map((event) => {
                  return (
                    <Link
                      key={event.MatchId}
                      className={
                        selectedEvent?.MatchId === event.Info.MatchId
                          ? [classes.DropdownItem, classes.Active].join(" ")
                          : classes.DropdownItem
                      }
                      to={`/event/${event.Info.SportName.International.toLowerCase().replace(
                        / /g,
                        "-"
                      )}/${event.Info.SportId}/${event.MatchId}`}
                      onClick={() => {
                        setSelectedEvent(event.Info);
                        setShowEvents(false);
                      }}
                    >
                      <div className={classes.TeamsContainer}>
                        <div className={classes.TeamsContainer}>
                          <TeamLogo
                            teamId={event.Info.HomeTeamId}
                            isHome={true}
                            sportName={event.Info.SportName.International}
                          />
                          <div
                            className={[classes.TeamName, classes.First].join(
                              " "
                            )}
                          >
                            {translateNameWithLang(event.Info.HomeTeamName)}
                          </div>
                        </div>

                        {event.Info.AwayTeamName?.International && (
                          <>
                            <div className={classes.TeamVersusWord}> vs </div>

                            <div className={classes.TeamsContainer}>
                              <div
                                className={[
                                  classes.TeamName,
                                  classes.Second,
                                ].join(" ")}
                              >
                                {translateNameWithLang(event.Info.AwayTeamName)}
                              </div>
                              <TeamLogo
                                teamId={event.Info.AwayTeamId}
                                isHome={false}
                                sportName={event.Info.SportName.International}
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
      <div className={classes.NoPaddingCrumb}>
        {selectedEvent ? (
          <div
            className={classes.DateContainer}
            style={{ pointerEvents: "none" }}
          >
            {formatUserFriendlyDate(`${selectedEvent.DateOfMatch}`)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Breadcrumb;
