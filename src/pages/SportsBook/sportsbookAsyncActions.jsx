import { toast } from "react-toastify";

import axiosApi from "../../axios-api";
import { sportsbookActions } from "./sportsbookSlice";
import { sportsHomeActions } from "./subpages/sportsHomeSlice";
import { sportsUpcomingActions } from "./subpages/sportsUpcomingSlice";
import { sportsOutrightsActions } from "./subpages/sportsOutrightsSlice";
import { sportsLiveActions } from "./subpages/sportsLiveSlice";
import { getLang } from "../../utils/storage";
import NoImageIcon from "../../assets/svgs/no-image.svg?react";
import { childsNotExist } from "../../utils/custom";
import config from "../../config";
import { translate } from "../../utils/translations";

const getSportsFromResponse = (data) => {
  if (Array.isArray(data?.Contents?.Sports)) return data.Contents.Sports;
  if (Array.isArray(data?.Sports)) return data.Sports;
  if (Array.isArray(data?.Contents)) return data.Contents;
  return [];
};

const getEventsFromResponse = (data) => {
  if (Array.isArray(data?.Contents?.Events)) return data.Contents.Events;
  if (Array.isArray(data?.Events)) return data.Events;
  return [];
};

const isRequestCanceled = (error) =>
  error?.code === "ERR_CANCELED" || error?.name === "CanceledError";

export const initSportsbook = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const requests = [
        axiosApi.get(
          `Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            signal: signal,
            baseURLOverride: config.VITE_SPORTS_API_BASE,
          }
        ),
      ];

      const responses = await Promise.all(requests);
      responses.forEach((response) => {
        if (
          response.data &&
          response.data.Status &&
          response.data.Status.StatusCode !== 200
        )
          throw Error();
      });

      // Remove null items...
      const banners = (responses[0]?.data?.Banners || []).filter((d) => d !== null);
      const bannerEvents = responses[0]?.data?.BannerEvents || {};

      const sportsBanners = banners.map((banner) => {
        const correspondingEvent = bannerEvents[banner.EventId];
        return {
          ...banner,
          event: correspondingEvent ? correspondingEvent : null, // Match event if found, otherwise null
        };
      });

      dispatch(sportsbookActions.setSportBanners(sportsBanners));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getPregameData = (sportIcons, signal, isOutrights = false) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const requests = [
        axiosApi.get(
          `Pregame/getPregameData?providerId=1&h24=false&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            signal: signal,
            baseURLOverride: config.VITE_SPORTS_API_BASE,
          }
        ),
      ];

      const responses = await Promise.all(requests);
      responses.forEach((response) => {
        if (
          response.data &&
          response.data.Status &&
          response.data.Status.StatusCode !== 200
        )
          throw Error();
      });

      const sportsFromApi = getSportsFromResponse(responses[0]?.data);
      let updatedSports = sportsFromApi
        .filter((sport) => {
          if (isOutrights) return true;
          if (typeof sport?.Count === "number") return sport.Count > 0;
          if (sport?.Counters && typeof sport.Counters["5D"] === "number") {
            return sport.Counters["5D"] > 0;
          }
          return Array.isArray(sport?.Categories) && sport.Categories.length > 0;
        })
        .map((sport) => ({
          ...sport,
          Categories: (sport?.Categories || [])
            .map((category) => ({
              ...category,
              Tournaments: (category?.Tournaments || []).filter((tournament) => {
                if (isOutrights) return true;
                if (typeof tournament?.Count === "number") return tournament.Count > 0;
                return true;
              }),
            }))
            .filter((category) => isOutrights || category.Tournaments.length > 0),
          slug: sport?.Name?.International?.toLowerCase().replace(/ /g, "-") || String(sport?.Id || ""),
          icon: sportIcons?.[sport?.Name?.International] || <NoImageIcon />,
        }))
        .filter((sport) => isOutrights || sport.Categories.length > 0);

      const currentState = getState().app;
      const orderMap = (Array.isArray(currentState.allSports) ? currentState.allSports : []).reduce((acc, item) => {
        acc[item.Id] = item.Order;
        return acc;
      }, {});
      // Step 2: Sort array2 based on the order defined in array1
      const sortedSports = updatedSports.sort((a, b) => {
        return (orderMap[a.Id] || 999999) - (orderMap[b.Id] || 999999);
      });

      dispatch(sportsbookActions.setSports(sortedSports));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getTournamentEvents = (tournamentId, ids, slice, signal) => {
  return async (dispatch) => {
    try {
      // dispatch(sportsbookActions.setTournamentEventsLoading(true));
      dispatch(
        sportsHomeActions.setTournamentLoading({
          tournamentId,
          isLoading: true,
        })
      );
      const lang = getLang();

      const isOutright = slice === "sportsOutrights" ? true : false;

      const response = await axiosApi.post(
        //`Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        `Pregame/PostData?action=marketsTreeEventsTable&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          // data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":${isOutright}}`,
          data: `{"ProviderId":1,"tournId":"${ids}","filter":"All","groupName":null,"subGroupName":null}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );
      if (
        response.data &&
        response.data.Status &&
        response.data.Status.StatusCode !== 200
      )
        throw Error();

      if (slice === "sportsHome")
        dispatch(
          sportsHomeActions.addTournamentEvents({
            tournamentId: tournamentId,
            //events: response.data.Contents,
            events: getEventsFromResponse(response.data),
          })
        );
      else if (slice === "sportsUpcoming")
        dispatch(
          sportsUpcomingActions.addTournamentEvents({
            tournamentId: tournamentId,
            //events: response.data.Contents,
            events: getEventsFromResponse(response.data),
          })
        );
      else if (slice === "sportsLive")
        dispatch(
          sportsLiveActions.addTournamentEvents({
            tournamentId: tournamentId,
            //events: response.data.Contents,
            events: getEventsFromResponse(response.data),
          })
        );
      else if (slice === "sportsOutrights")
        dispatch(
          sportsOutrightsActions.addTournamentEvents({
            tournamentId: tournamentId,
            //events: response.data.Contents,
            events: getEventsFromResponse(response.data),
          })
        );
      else
        dispatch(
          sportsbookActions.addTournamentEvents({
            tournamentId: tournamentId,
            //events: response.data.Contents,
            events: getEventsFromResponse(response.data),
          })
        );
      dispatch(
        sportsHomeActions.setTournamentLoading({
          tournamentId,
          isLoading: false,
        })
      );
    } catch (error) {
      dispatch(
        sportsHomeActions.setTournamentLoading({
          tournamentId,
          isLoading: false,
        })
      );
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getSportMarketTree = (sportId, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: sportId },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );
      if (
        response.data &&
        response.data.Status &&
        response.data.Status.StatusCode !== 200
      )
        throw Error(response.data.Contents);

      const emptyTree =
        response.data.Contents === "Not found" ||
        childsNotExist(response.data.Contents)
          ? true
          : false;

      if (emptyTree) {
      } else {
        dispatch(
          sportsbookActions.setSportMarketTree({
            sportId: sportId,
            value: response.data.Contents,
          })
        );
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getTournament = (sportId, categoryId, tournamentId, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `Pregame/getPregameData?providerId=1&h24=false&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );

      if (response.status && response.status !== 200)
        throw Error(response.data.Contents);

      const sports = getSportsFromResponse(response.data);
      const sport = sports.find((s) => String(s.Id) === String(sportId));
      const category = sport?.Categories?.find((c) => String(c.Id) === String(categoryId));
      const foundTournament = category?.Tournaments?.find((t) => String(t.Id) === String(tournamentId));
      if (!sport || !category || !foundTournament) return;

      const tournament = {
        ...foundTournament,
        CategoryId: category.Id,
        SportId: sport.Id,
      };

      dispatch(sportsbookActions.setSelectedSport({
        ...sport,
        slug: sport?.Name?.International?.toLowerCase().replace(/ /g, "-"),
      }));
      dispatch(sportsbookActions.setSelectedTournament(tournament));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getLiveStreams = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `Administration/sdata?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200) throw Error(response.data.Contents);

      dispatch(sportsbookActions.setLiveStreams(response.data));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};

export const getCustomDateEvents = (signal, payload) => {
  return async (dispatch) => {
    try {
      dispatch(sportsbookActions.setLoading(true));
      const lang = getLang();

      const response = await axiosApi.post(
        `Pregame/PostData/?action=marketsTreeCalendarTable&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: payload },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );

      if (response.status !== 200) throw Error(response.data.Contents);

      let events;
      if (response.data.Contents !== null) {
        events = getEventsFromResponse(response.data);

        // Filter out events where either AwayTeamName.International or HomeTeamName.International is an empty string
        events = events.filter((event) => {
          const awayTeamInternational = event.Info.AwayTeamName.International;
          const homeTeamInternational = event.Info.HomeTeamName.International;
          return awayTeamInternational !== "" && homeTeamInternational !== "";
        });

        // Sort the events by DateOfMatch in ascending order
        events.sort((a, b) => {
          const dateA = new Date(a.Info.DateOfMatch);
          const dateB = new Date(b.Info.DateOfMatch);
          return dateA - dateB; // Ascending order (earliest date first)
        });
      } else {
        events = [];
      }

      // Dispatch the sorted events
      dispatch(sportsbookActions.setCustomDateTournaments(events));
      dispatch(sportsbookActions.setLoading(false));
    } catch (error) {
      dispatch(sportsbookActions.setLoading(false));
      const message = error?.message ? error.message : error;
      if (!isRequestCanceled(error) && error?.code !== "ERR_NETWORK") toast.error(translate(message));
    }
  };
};
