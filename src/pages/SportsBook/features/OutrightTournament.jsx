import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./OutrightTournament.module.css";
import { getTournamentEvents } from "../sportsbookAsyncActions";
import { sportsbookActions } from "../sportsbookSlice";
import { Link } from "react-router-dom";

const OutrightTournament = (props) => {
  const dispatch = useDispatch();

  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

  const tournamentEvents = useSelector(
    (state) => state[props.slice].tournamentEvents
  )[props.tournament.Id];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const ids = `${selectedSport.Id},${props.tournament.CategoryId},${props.tournament.Id}`;
    dispatch(
      getTournamentEvents(props.tournament.Id, ids, props.slice, signal)
    );

    return () => {
      controller.abort();
      dispatch(sportsbookActions.removeTournamentEvents(props.tournament.Id));
    };
  }, []);

  const getTournamentName = () => {
    const name = props.tournament?.Name?.International.split(". Outright")[0];
    return name;
  };

  const getLink = () => {
    if (!selectedSport) return "";
    if (!props.tournament) return "";
    if (!tournamentEvents) return "";

    return `/sportsbook/outrights/${selectedSport.slug}/${selectedSport.Id}/${props.tournament.CategoryId}/${props.tournament.Id}/${tournamentEvents[0].MatchId}`;
  };

  return (
    <div className={classes.TournamentContent}>
      <div className={classes.Tournament}>
        <Link className={classes.SectionName} to={getLink()}>
          <div className={classes.Row}>
            <div className={classes.OutrightsLink}>
              <span className={classes.SportIcon}>{selectedSport?.icon}</span>
              <span>{getTournamentName()}</span>
            </div>
          </div>
        </Link>

        <Link className={classes.MarketsNum} to={getLink()}>
          <div className={classes.ExtraMarkets}>
            <div className={classes.Row}>
              <div className={classes.ExtraMarketsLink}>
                +{tournamentEvents ? tournamentEvents[0].Markets?.length : "0"}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OutrightTournament;
