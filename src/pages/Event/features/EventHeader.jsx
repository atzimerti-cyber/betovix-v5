import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import classes from "./EventHeader.module.css";
import { translateNameWithLang, translate } from "../../../utils/translations";
import TeamBigLogo from "../../../features/TeamLogo/TeamBigLogo";

const EventHeader = (props) => {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!props.event) return;
    if (!props.event.Header || !props.event.Info) navigate(`/sportsbook/home`);

    setSelectedEvent(props.event.Info);

  }, [props.event]);

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
    <div className={classes.EventHeader}>
    <div>
        {selectedEvent ? (
          <div
            className={classes.DateContainer}
            style={{ pointerEvents: "none" }}
          >
            {formatUserFriendlyDate(`${selectedEvent.DateOfMatch}`)}
          </div>
        ) : null}
      </div> 

        <div>
          {selectedEvent ? (
            <div className={classes.TeamsContainer}>
              <div className={classes.TeamsContainer}>
                <TeamBigLogo
                  teamId={selectedEvent?.HomeTeamId}
                  isHome={true}
                  sportName={selectedEvent?.SportName.International}
                  directionLeft={true}
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
                    <TeamBigLogo
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

        </div>

    </div>
  );
};

export default EventHeader;
