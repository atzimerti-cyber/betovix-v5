import { toast } from "react-toastify";

import axiosApi from "../../axios-api";
import { eventActions } from "./eventSlice";
import { sportsbookActions } from "../SportsBook/sportsbookSlice";
import { appActions } from "../../features/InitApp/appSlice";
import { getLang } from "../../utils/storage";
import {
  getSportMarketTreeObj,
  getSportMarketTreeObjFromMarkets,
  childsNotExist,
} from "../../utils/custom";
import config from "../../config";
import { translate } from "../../utils/translations";
import { betslipActions } from "../../features/Betslip/betslipSlice";
import { layoutActions } from "../../features/Layout/layoutSlice";
import { translateNameWithLang } from "../../utils/translations";

export const getEvent = (sportId, eventId, signal, silent) => {
  return async (dispatch, getState) => {
    try {
      if (!silent) dispatch(appActions.setBarLoading(true));

      const liveState = getState().live.liveState;
      const eventIdInt = parseInt(eventId);
      const isLive = liveState[eventIdInt] ? true : false;
      const lang = getLang();

      let requests = [
        axiosApi.post(
          `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          { data: sportId },
          {
            signal: signal,
            baseURLOverride: config.VITE_SPORTS_API_BASE,
          }
        ),
      ];

      if (isLive) {
        requests.push(
          axiosApi.get(
            `LiveCluster/getLiveEvent?eventid=${eventId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            {
              signal: signal,
              baseURLOverride: config.VITE_SPORTS_API_BASE,
            }
          )
        );

        //dispatch(getLiveEvent(sportId, eventId, signal));
      } else {
        requests.push(
          axiosApi.post(
            `Pregame/PostData?action=get_event&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            { data: `{"ProviderId":1,"Value":${eventId},"H24":false}` },
            {
              signal: signal,
              baseURLOverride: config.VITE_SPORTS_API_BASE,
            }
          )
        );

        //dispatch(getPregameEvent(sportId, eventId, signal));
      }

      const responses = await Promise.all(requests);
      if (
        responses[1].data &&
        responses[1].data.Status &&
        responses[1].data.Status.StatusCode !== 200
      )
        throw Error();

      const sports = getState().app.allSports;
      dispatch(eventActions.setSports(sports));
      let selectedSport = sports.find((s) => s.Id === sportId);
      if (!selectedSport) selectedSport = sports.find((s) => s.Id === 1);
      dispatch(sportsbookActions.setSelectedSport(selectedSport));

      // Check if empty tree
      const emptyTree =
        responses[0].data.Contents === "Not found" ||
        childsNotExist(responses[0].data.Contents)
          ? true
          : false;

      let sportMarketTreeObj;
      if (emptyTree) {
        sportMarketTreeObj = getSportMarketTreeObjFromMarkets(
          responses[1].data.Contents.Markets
        );
        if (sportMarketTreeObj)
          dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
      } else {
        sportMarketTreeObj = getSportMarketTreeObj(responses[0].data.Contents);
        dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
        dispatch(
          sportsbookActions.setSportMarketTree({
            sportId: sportId,
            value: responses[0].data.Contents,
          })
        );
      }

      dispatch(eventActions.setSelectedMarketCategoryIndex(0));

      let type = "pregame";
      if (isLive) {
        dispatch(eventActions.setShowingLiveEvent(true));
        type = "live";
      }
      const event = { ...responses[1].data.Contents, type: type };

      dispatch(eventActions.setEvent(event));
      dispatch(appActions.setBarLoading(false));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
      dispatch(appActions.setBarLoading(false));
    }
  };
};

// export const getPregameEvent = (sportId, eventId, signal) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(appActions.setBarLoading(true));
//             const lang = getLang();

//             const requests = [
//                 axiosApi.post(
//                     `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//                     { data: sportId },
//                     {
//                         signal: signal,
//                         baseURLOverride: config.VITE_SPORTS_API_BASE,
//                     }
//                 ),
//                 axiosApi.post(
//                     `Pregame/PostData?action=get_event&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//                     { data: `{"ProviderId":1,"Value":${eventId},"H24":false}` },
//                     {
//                         signal: signal,
//                         baseURLOverride: config.VITE_SPORTS_API_BASE,
//                     }
//                 ),
//             ];
//             const responses = await Promise.all(requests);
//             if (responses[1].data && responses[1].data.Status && responses[1].data.Status.StatusCode !== 200) throw Error();

//             const sports = getState().app.allSports;
//             dispatch(eventActions.setSports(sports));
//             let selectedSport = sports.find((s) => s.Id === sportId);
//             if (!selectedSport) selectedSport = sports.find((s) => s.Id === 1);
//             dispatch(sportsbookActions.setSelectedSport(selectedSport));

//             // Check if empty tree
//             const emptyTree = responses[0].data.Contents === 'Not found' || childsNotExist(responses[0].data.Contents) ? true : false;

//             let sportMarketTreeObj;
//             // let marketsList;
//             if (emptyTree) {
//                 sportMarketTreeObj = getSportMarketTreeObjFromMarkets(responses[1].data.Contents.Markets);
//                 if (sportMarketTreeObj) dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
//             } else {
//                 sportMarketTreeObj = getSportMarketTreeObj(responses[0].data.Contents);
//                 dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
//                 dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: responses[0].data.Contents }));
//             }
//             dispatch(eventActions.setSelectedMarketCategoryIndex(0));

//             const pregameEvent = { ...responses[1].data.Contents, type: 'pregame' };
//             dispatch(eventActions.setEvent(pregameEvent));
//             dispatch(appActions.setBarLoading(false));
//         } catch (error) {
//             const message = error?.message ? error.message : error;
//             if (!error?.code === 'ERR_CANCELED') toast.error(message);
//             dispatch(appActions.setBarLoading(false));
//         }
//     };
// };

// export const getLiveEvent = (sportId, eventId, signal) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(appActions.setBarLoading(true));
//             const lang = getLang();

//             const requests = [
//                 axiosApi.post(
//                     `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
//                     { data: sportId },
//                     {
//                         signal: signal,
//                         baseURLOverride: config.VITE_SPORTS_API_BASE,
//                     }
//                 ),
//                 axiosApi.get(`LiveCluster/getLiveEvent?eventid=${eventId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
//                     signal: signal,
//                     baseURLOverride: config.VITE_SPORTS_API_BASE,
//                 }),
//             ];
//             const responses = await Promise.all(requests);
//             if (responses[1].data && responses[1].data.Status && responses[1].data.Status.StatusCode !== 200) throw Error();

//             const sports = getState().app.allSports;
//             dispatch(eventActions.setSports(sports));
//             let selectedSport = sports.find((s) => s.Id === sportId);
//             if (!selectedSport) selectedSport = sports.find((s) => s.Id === 1);
//             dispatch(sportsbookActions.setSelectedSport(selectedSport));

//             // Check if empty tree
//             const emptyTree = responses[0].data.Contents === 'Not found' || childsNotExist(responses[0].data.Contents) ? true : false;

//             let sportMarketTreeObj;
//             if (emptyTree) {
//                 sportMarketTreeObj = getSportMarketTreeObjFromMarkets(responses[1].data.Contents.Markets);
//                 if (sportMarketTreeObj) dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
//             } else {
//                 sportMarketTreeObj = getSportMarketTreeObj(responses[0].data.Contents);
//                 dispatch(eventActions.setSportMarketTreeObj(sportMarketTreeObj));
//                 dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: responses[0].data.Contents }));
//             }

//             dispatch(eventActions.setSelectedMarketCategoryIndex(0));

//             const liveEvent = { ...responses[1].data.Contents, type: 'live' };
//             dispatch(eventActions.setLiveEvent(liveEvent));
//             dispatch(eventActions.setShowingLiveEvent(true));
//             dispatch(appActions.setBarLoading(false));
//         } catch (error) {
//             const message = error?.message ? error.message : error;
//             if (!error?.code === 'ERR_CANCELED') toast.error(message);
//             dispatch(appActions.setBarLoading(false));
//         }
//     };
// };

export const getBreadcrumbData = (
  selectedSportId,
  categoryId,
  tournamentId,
  isOutright,
  signal
) => {
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
      if (response.status !== 200) throw Error();

      const sport = response.data.Sports.find((s) => s.Id === selectedSportId);
      const sportCategories = sport ? sport.Categories : [];

      dispatch(eventActions.setSportPregameCategories(sportCategories));

      if (isOutright) {
        dispatch(
          getOutrightEvents(
            selectedSportId,
            categoryId,
            sportCategories,
            signal
          )
        );
      } else {
        dispatch(
          getTournamentEvents(
            selectedSportId,
            categoryId,
            tournamentId,
            isOutright,
            signal
          )
        );
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getTournamentEvents = (
  sportId,
  categoryId,
  tournamentId,
  isOutright,
  signal
) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const ids = `${sportId},${categoryId},${tournamentId}`;

      const response = await axiosApi.post(
        //`Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        `Pregame/PostData?action=marketsTreeEventsTable&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          //data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":${isOutright}}`,
          data: `{"ProviderId":1,"tournId":"${ids}","filter":"All","groupName":null,"subGroupName":null}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );
      if (response.status !== 200) throw Error();

      dispatch(eventActions.setTournamentevents(response.data.Contents.Events));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getOutrightEvents = (
  sportId,
  categoryId,
  sportCategories,
  signal
) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const category = sportCategories.find((c) => c.Id === categoryId);
      if (!category) return;

      const outrightTournaments = category.Tournaments.filter(
        (t) =>
          t.Name.International.includes("Outright") ||
          t.Name.International.includes("Specials")
      );

      let events = [];

      for (let i = 0; i < outrightTournaments.length; i++) {
        const outrightTournament = outrightTournaments[i];

        const ids = `${sportId},${categoryId},${outrightTournament.Id}`;

        const response = await axiosApi.post(
          `Pregame/PostData?action=events_per_league&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            data: `{"ProviderId":1,"Value":"${ids}","H24":false,"IsOutright":true}`,
          },
          {
            signal: signal,
            baseURLOverride: config.VITE_SPORTS_API_BASE,
          }
        );

        if (response.status !== 200) continue;
        events = [...events, ...response.data.Contents];

        dispatch(eventActions.setTournamentevents(events));
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

//////////////////BET BUILDER//////////////////////////
export const getBBComboMap = (eventId, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      if (!eventId) return;

      const response = await axiosApi.get(
        `Betting/getCombinationMap?eventId=${eventId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_BETS_API,
        }
      );

      if (response.status !== 200) throw Error();

      dispatch(eventActions.setCombinationMap(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      // if (!error?.code === "ERR_CANCELED")
      toast.error(translate(message));
    }
  };
};

export const bbOdd = (
  event,
  market,
  marketField,
  odds,
  isLive,
  isMobile,
  signal,
  action
) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const slips = getState().betslip.slips;

      let bbpoints = [];
      let point;

      slips.map((slip) => {
        if (slip.MarketTypeId == -10 && slip.MatchId == event.MatchId) {
          if (slip.BB.length > 11) {
            throw Error(
              translate(
                `You've reached the maximum number of selections for this Bet Builder`
              )
            );
          } else {
            bbpoints = slip.BB;
          }
        }
      });

      if (action !== "RemoveFromBB") {
        point = {
          MatchId: event.MatchId,
          MarketTypeId: market.MarketTypeId,
          Line: marketField.Line || market.MainLine || "",
          FieldId: marketField.FieldId,
          Odd: odds,
          Live: isLive,
        };
      }

      const response = await axiosApi.post(
        `Betting/BBValidation?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          BBPoints: bbpoints,
          Point: action === "RemoveFromBB" ? null : point,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_BETS_API,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      let found = slips.filter((s) => {
        return s.MarketTypeId === -10 && s.MatchId === event.MatchId;
      });

      if (action === "RemoveFromBB") {
        if (found.length > 0) {
          dispatch(
            betslipActions.updateSlipOdds({
              fieldId: found[0].FieldId,
              newOdd: response.data.Contents.ParentOdd,
            })
          );
        }

        return;
      }

      let bbslip;
      if (found.length === 0) {
        bbslip = {
          Active: market.Active,
          amount: 0,
          AwayTeamId: event.Info.AwayTeamId,
          AwayTeamName: event.Info.AwayTeamName,
          CategoryId: event.Info.CategoryId,
          CategoryName: event.Info.CategoryName,
          DateOfMatch: event.Info.DateOfMatch,
          FieldId: `-10${event.MatchId}`,
          FieldName: "Bet Builder Field",
          FieldTypeId: -10,
          HomeTeamId: event.Info.HomeTeamId,
          HomeTeamName: event.Info.HomeTeamName,
          Line: "",
          Live: isLive,
          MarketName: "Bet Builder",
          MarketTypeId: -10,
          MatchId: event.MatchId,
          Odd: response.data.Contents.ParentOdd,
          SportId: event.Info.SportId,
          SportName: event.Info.SportId,
          TournamentId: event.Info.TournamentId,
          TournamentName: event.Info.TournamentName,
          BB: [],
        };
        response.data.Contents.MarketName = translateNameWithLang(
          market.MarketName
        );
        response.data.Contents.FieldName = translateNameWithLang(
          marketField.FieldName
        );
        delete response.data.Contents.ParentOdd;
        bbslip.BB.push(response.data.Contents);
        dispatch(betslipActions.addToSlips(bbslip));
      } else {
        response.data.Contents.MarketName = translateNameWithLang(
          market.MarketName
        );
        response.data.Contents.FieldName = translateNameWithLang(
          marketField.FieldName
        );

        dispatch(
          betslipActions.addBBSlipToSlips({
            found,
            responseData: response.data,
            market,
            marketField,
          })
        );

        // let clone = JSON.parse(JSON.stringify(found[0]));
        // response.data.Contents.MarketName = translateNameWithLang(
        //   market.MarketName
        // );
        // response.data.Contents.FieldName = translateNameWithLang(
        //   marketField.FieldName
        // );
        // clone.Odd = response.data.Contents.ParentOdd;
        // delete response.data.Contents.ParentOdd;
        // clone.BB.push(response.data.Contents);

        // bbslip = clone;
        // dispatch(betslipActions.addToSlips(bbslip));
        // dispatch(betslipActions.removeFromSlips(found[0].FieldId));
      }

      if (!isMobile) {
        dispatch(layoutActions.setShowRight("betslip"));
        dispatch(layoutActions.setShowRightContainer(true));
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      toast.error(translate(message));
    }
  };
};
