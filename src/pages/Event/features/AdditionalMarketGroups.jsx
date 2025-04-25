import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosApi from "../../../axios-api";
import _ from "lodash";

import AdditionalMarketGroup from "./AdditionalMarketGroup";
import { storageGetLang } from "../../../utils/storage";
import config from "../../../config";

const AdditionalMarketGroups = () => {
  const liveState = useSelector((state) => state.live.liveState);
  const event = useSelector((state) => state.event.event);
  const addedRemovedEvent = useSelector(
    (state) => state.live.addedRemovedEvent
  );
  const specialGroups = useSelector((state) => state.eventLive.specialGroups);

  const [existingSpecialGroups, setExistingSpecialGroups] = useState({});

  // Find if there are any Cards and Corners, Player Statistics and Fouls and Shots on Goal Tournaments
  useEffect(() => {
    if (!event) return;
    if (event.Info?.SportName?.International !== "Football") return; // Only for football

    const fetchSpecialGroups = async () => {
      let sg = {};

      const eventTournament = event.Info?.TournamentName?.International;
      const eventIdentification =
        event.Info?.HomeTeamName?.International +
        " " +
        event.Info?.AwayTeamName?.International;

      for (const liveMatch of Object.values(liveState)) {
        if (liveMatch.Info?.SportName?.International !== "Football") continue;

        const liveTournament = liveMatch.Info?.TournamentName?.International;

        // Find if there is a tournament with the same name which includes a special group
        if (liveTournament.includes(eventTournament)) {
          const foundSpecialGroup = specialGroups.find((s) =>
            liveTournament.includes(s.name)
          );

          // Find if the match is the one currently showing
          if (foundSpecialGroup) {
            const liveMatchIdentification =
              liveMatch.Info?.HomeTeamName?.International +
              " " +
              liveMatch.Info?.AwayTeamName?.International;
            if (liveMatchIdentification === eventIdentification) {
              const updatedEvent = await getEvent(liveMatch.MatchId);
              if (updatedEvent) {
                sg[foundSpecialGroup.Id] = {
                  Id: foundSpecialGroup.Id,
                  name: foundSpecialGroup.name,
                  event: updatedEvent,
                };
              }
            }
          }
        }
      }

      if (!_.isEmpty(sg)) {
        setExistingSpecialGroups(sg);
      }
    };

    fetchSpecialGroups();
  }, [addedRemovedEvent]);

  const getEvent = async (matchId) => {
    const lang = storageGetLang();

    try {
      const response = await axiosApi.get(
        `LiveCluster/getLiveEvent?eventid=${matchId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );

      if (response.data?.Status?.StatusCode !== 200) return null;

      return response.data.Contents;
    } catch (error) {
      return null;
    }
  };

  return Object.values(existingSpecialGroups).map((specialGroup) => {
    if (!specialGroup.event) return null;

    return <AdditionalMarketGroup key={specialGroup.Id} group={specialGroup} />;
  });
};

export default AdditionalMarketGroups;
