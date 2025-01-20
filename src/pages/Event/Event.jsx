import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";

import classes from "./Event.module.css";
import SportsBookMenu from "../SportsBook/features/SportsBookMenu";
import { getEvent } from "./eventAsyncActions";
import { eventActions } from "./eventSlice";
import Breadcrumb from "./features/Breadcrumb";
import EventHeader from "./features/EventHeader";
import BreadcrumbLive from "./features/BreadcrumbLive";
import MarketsMenu from "./features/MarketsMenu";
import MarketGroup from "./features/MarketGroup";
import Board from "./features/Board";
import BarLoading from "../../features/UI/BarLoading/BarLoading";
import { appActions } from "../../features/InitApp/appSlice";
import lzString from "lz-string";
import { getUpdatedMarkets } from "../../utils/liveUpdates";
import { translate, translateNameWithLang } from "../../utils/translations";
import { betslipActions } from "../../features/Betslip/betslipSlice";
import { layoutActions } from "../../features/Layout/layoutSlice";

import Arrow2LeftIcon from "../../assets/svgs/arrow2-left.svg?react";
import config from "../../config";

const Event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sportname, sportid, eventid } = useParams();

  const liveConnection = useSelector((state) => state.live.liveConnection);
  const selectedMarketCategory = useSelector(
    (state) => state.event.selectedMarketCategory
  );
  const selectedMarketCategoryIndex = useSelector(
    (state) => state.event.selectedMarketCategoryIndex
  );
  const changedMarkets = useSelector((state) => state.event.changedMarkets);

  const event = useSelector((state) => state.event.event);
  const barLoading = useSelector((state) => state.app.barLoading);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const sports = useSelector((state) => state.event.sports);
  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
  const sportsStatusParams = useSelector(
    (state) => state.sportsbook.sportsStatusParams
  );

  const sportMarketTreeObj = useSelector(
    (state) => state.event.sportMarketTreeObj
  );
  const sportMarketTree = useSelector(
    (state) => state.sportsbook.sportMarketTree
  );

  const [marketGroups, setMarketGroups] = useState(null);
  const [marketGroupsChanged, setMarketGroupsChanged] = useState(1);
  const [height, setHeight] = useState();
  const [showTab, setShowTab] = useState("tab1");
  const [previousMatchId, setPreviousMatchId] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const showStats = useMediaQuery({ query: "(max-width: 1145px)" });

  useEffect(() => {
    return () => {
      dispatch(eventActions.reset());
      dispatch(appActions.setBarLoading(false));
      dispatch(layoutActions.setShowLiveListContainer(false));

      if (liveConnection && liveConnection.state === "Connected") {
        liveConnection
          .invoke("SubscribeToEvent", eventid, 0)
          .then(() => {
            console.log(`Unsubscribed from ${eventid}`);
          })
          .catch((err) => {
            console.error(`Unsubscribe from ${eventid} failed :`, err);
          });
      }
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const sportIdInt = parseInt(sportid);
    const eventIdInt = parseInt(eventid);

    dispatch(getEvent(sportIdInt, eventIdInt, signal));

    return () => {
      controller.abort();
    };
  }, [eventid]);

  useEffect(() => {
    if (event && event?.type === "live") {
      window.SCAW("setMatchID", `${event.Info.ExtraInfo.ExternalFixtureId}`);
      window.SCAW("setLanguage", `${langCodeToThree(lang.id)}` || "en");
      // window.SCAW("setLanguage", `${lang.id}` || "en");
      window.SCAW("setActiveThemeByName", " ");
      if (!showStats) {
        window.SCAW("setConfiguration", {
          settings: {
            position: "bottom",
            sports: [
              {
                header: {
                  score: true,
                  team_names: true,
                  team_logos: true,
                },
                statistic: {
                  standings: true,
                  line_up: true,
                  previous_games: true,
                  calendar: true,
                  news: true,
                  bet_booster: true,
                  play2play: true,
                  h2h: true,
                  season_tree: true,
                },
                other: {
                  timer: true,
                },
              },
            ],
          },
        });
        window.SCAW("useClientConfiguration", true);
      }
    }

    return () => {};
  }, []);

  const langCodeToThree = (iso) => {
    switch (iso) {
      case "en":
        return "eng";
      case "tr":
        return "tur";
      case "de":
        return "ger";
      case "ar":
        return "arb";
      case "el":
        return "gre";
      case "it":
        return "eng";
      case "am":
        return "eng";
    }
  };

  useEffect(() => {
    if (!event) return;

    let handleResizeMessage = null;

    if (event.type === "live") {
      // For the field
      handleResizeMessage = (ev) => {
        if (ev.origin === "https://widget.feedmaker.live") {
          const message = ev.data ? JSON.parse(ev.data) : null;
          let h = message ? message["body-height"] : null;
          h = h ? h : 330;
          setHeight(h);
        }
      };
      window.addEventListener("message", handleResizeMessage);

      if (!isMobile) {
        dispatch(layoutActions.setShowLiveListContainer(true));
        dispatch(layoutActions.setFullLeftContainer(true));
      }
    }

    return () => {
      if (handleResizeMessage)
        window.removeEventListener("message", handleResizeMessage);
    };
  }, [isMobile, event?.MatchId]);

  const handleOnOddsUpdate = (message) => {
    if (!event) return;
    if (event.type !== "live") return;

    const decompressedString = lzString.decompressFromUTF16(message);
    const updateObj = JSON.parse(decompressedString);

    if (!updateObj) return;

    if (updateObj.Id === event.MatchId) {
      const updatedMarkets = getUpdatedMarkets(updateObj, event.Markets);
      dispatch(eventActions.updateLiveMarkets(updatedMarkets));
      dispatch(
        betslipActions.updateLiveSlipOdds({
          matchId: updateObj.Id,
          markets: updatedMarkets,
        })
      );
    }
  };

  const handleOnHeadersUpdate = (message) => {
    if (!event) return;

    const decompressedString = lzString.decompressFromUTF16(message);
    const updateObj = JSON.parse(decompressedString);

    if (!updateObj) return;

    const found = updateObj.find((e) => e.MatchId == event.MatchId);
    if (found) {
      dispatch(eventActions.updateLiveEventHeader(found));
    }
  };

  // If Live, subscribe to live event
  useEffect(() => {
    if (!event) return;
    if (event.type !== "live") return;
    if (!liveConnection) return;
    if (liveConnection.state !== "Connected") return;

    const prevMatchId = previousMatchId === 0 ? event.MatchId : previousMatchId;

    //Subscribe
    liveConnection
      .invoke("SubscribeToEvent", prevMatchId, event.MatchId)
      .then(() => {
        console.log(`Unsubscribed from ${previousMatchId}`);
        console.log(`Subscribed to ${event.MatchId}`);
        setPreviousMatchId(event.MatchId);
      })
      .catch((err) => {
        console.error(`Subscription to ${event.MatchId} failed :`, err);
      });

    liveConnection.on("onOddsUpdate", handleOnOddsUpdate);
    liveConnection.on("onHeadersList", handleOnHeadersUpdate);

    return () => {
      if (liveConnection) {
        liveConnection.off("onOddsUpdate", handleOnOddsUpdate);
        liveConnection.off("onHeadersList", handleOnHeadersUpdate);
      }
    };
  }, [event?.MatchId, liveConnection?.state]);

  // Create the market groups, based on event markets
  useEffect(() => {
    if (!event) return;
    if (!event.Markets) return;
    if (!sportMarketTreeObj) return;

    let groupsObj = {};

    event.Markets.forEach((market) => {
      if (!sportMarketTreeObj[market.MarketTypeId]) {
        const groupIndex = 9999;
        groupsObj[groupIndex] = { Id: groupIndex, name: "Other" };
      } else {
        sportMarketTreeObj[market.MarketTypeId].groups.forEach((group) => {
          const groupName = group.name;
          const groupIndex = group.groupIndex;
          groupsObj[groupIndex] = { Id: groupIndex, name: groupName };
        });
      }
    });
    const allMarketsId = `rand-${Math.random().toString(36).slice(2, 11)}`;
    groupsObj[allMarketsId] = { Id: allMarketsId, name: "All Markets" };

    let groups = Object.values(groupsObj);
    groups.sort((a, b) => a.Id - b.Id); // maybe not needed

    // Move the "All markets" object to the first position
    const allMarketsObj = groups.find((group) => group.Id === allMarketsId);
    if (allMarketsObj) {
      groups = [
        allMarketsObj,
        ...groups.filter((group) => group.Id !== allMarketsId),
      ];
    }

    // Get auto...
    const marketTree =
      sportMarketTree && sportid ? sportMarketTree[sportid] : null;
    if (marketTree && marketTree.childs) {
      groups.forEach((group) => {
        const marketTreeGroup = marketTree.childs[group.Id];

        if (!marketTreeGroup) return;
        if (!marketTreeGroup.childs) return;

        const lastMarket =
          marketTreeGroup.childs[marketTreeGroup.childs.length - 1];
        if (lastMarket.name.includes("Auto||")) group.Auto = lastMarket.name;
      });
    }

    setMarketGroups(groups);
    setMarketGroupsChanged((prev) => prev + 1);
  }, [changedMarkets, sportMarketTreeObj]);

  // Update selected market group, if the showing market group is removed
  useEffect(() => {
    if (!marketGroups) return;
    if (!selectedMarketCategory) return;
    if (selectedMarketCategoryIndex === null) return;

    // const marketGroupExists = marketGroups.find((g) => g.Id === selectedMarketCategory.Id);
    const marketGroupExists = marketGroups[selectedMarketCategoryIndex];
    if (!marketGroupExists) {
      dispatch(eventActions.setSelectedMarketCategory(marketGroups[0]));
      dispatch(eventActions.setSelectedMarketCategoryIndex(0));
    }
  }, [marketGroupsChanged]);

  const getBackgroundImage = () => {
    if (!selectedSport) return null;

    const sportParams = sportsStatusParams[selectedSport.Name.International];
    if (sportParams && sportParams.fieldImage) return sportParams.fieldImage;
  };

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

      <div className={classes.PageContent}>
        <div className={classes.Event}>
          <div className={classes.MenuWrapper}>
            <SportsBookMenu />
          </div>

          <div className={classes.Content}>
            <div className={classes.TopArea}>
              {sports &&
                selectedSport &&
                event &&
                (event.type === "live" ? (
                  <>
                    <div className={classes.SelectTabArea}>
                      <div
                        className={classes.BackButton}
                        onClick={() =>
                          navigate(`/sportsbook/live/${selectedSport.slug}`)
                        }
                      >
                        <Arrow2LeftIcon className={classes.BackIcon} />
                        {translate("Back")}
                      </div>
                      <div className={classes.Tabs}>
                        <div
                          className={
                            showTab === "tab1"
                              ? [classes.Tab, classes.Active].join(" ")
                              : classes.Tab
                          }
                          onClick={() => setShowTab("tab1")}
                        >
                          {translate("Tracker")}
                        </div>
                        <div
                          className={
                            showTab === "tab2"
                              ? [classes.Tab, classes.Active].join(" ")
                              : classes.Tab
                          }
                          onClick={() => setShowTab("tab2")}
                        >
                          {translate("Score")}
                        </div>
                      </div>
                    </div>

                    <div className={classes.BreadcrumbLiveWrapper}>
                      <BreadcrumbLive
                        event={event}
                        page={event.type === "live" ? "live" : "home"}
                        slice="event"
                      />
                    </div>

                    <div
                      className={
                        showTab !== "tab2"
                          ? [classes.Box, classes.Hide].join(" ")
                          : classes.Box
                      }
                      style={{
                        backgroundImage: `url(${getBackgroundImage()})`,
                      }}
                    >
                      {event && <Board event={event} />}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.SelectTabArea}>
                      <div
                        className={classes.BackButton}
                        onClick={() =>
                          navigate(`/sportsbook/home/${selectedSport.slug}`)
                        }
                      >
                        <Arrow2LeftIcon className={classes.BackIcon} />
                        {translate("Back")}
                      </div>
                      <div className={classes.Tabs}>
                        <div
                          className={
                            showTab === "tab1"
                              ? [classes.Tab, classes.Active].join(" ")
                              : classes.Tab
                          }
                          onClick={() => setShowTab("tab1")}
                        >
                          {translate("Markets")}
                        </div>
                        <div
                          className={
                            showTab === "tab2"
                              ? [classes.Tab, classes.Active].join(" ")
                              : classes.Tab
                          }
                          onClick={() => setShowTab("tab2")}
                        >
                          {translate("Statistics")}
                        </div>
                      </div>
                    </div>

                    <div className={classes.BreadcrumbLiveWrapper}>
                      <Breadcrumb event={event} page="home" slice="event" />
                    </div>
                  </>
                ))}
            </div>

            {!event && !barLoading ? (
              <span>{translate("Event not found or has ended")}</span>
            ) : (
              <div className={classes.EventPage}>
                {/* <h1 className={classes.EventTitle}>
                                    {event?.Info?.AwayTeamName
                                        ? `${translateNameWithLang(event?.Info?.HomeTeamName)} vs ${translateNameWithLang(event?.Info?.AwayTeamName)}`
                                        : translateNameWithLang(event?.Info?.HomeTeamName)}
                                </h1> */}

                <aside
                  className={
                    event?.type === "live"
                      ? classes.Side
                      : [classes.Side, classes.Pregame].join(" ")
                  }
                >
                  <div
                    className={
                      (event?.type === "live" && showTab !== "tab1") ||
                      (event?.type !== "live" && showTab !== "tab2")
                        ? [classes.EventTracker, classes.Hide].join(" ")
                        : classes.EventTracker
                    }
                    style={height ? { height: height + "px" } : null}
                  >
                    {event && event?.type === "live" && (
                      // <iframe
                      //   id="FMTracker"
                      //   run="iLive.initTracker"
                      //   src={`https://widget.feedmaker.live/?event=${event.MatchId}&amp;lang=${lang.id}`}
                      // />
                      <sc-animation-component></sc-animation-component>
                    )}
                    {event && event?.type !== "live" && (
                      <iframe
                        src={`/stats/Stats.html?styles=${config.VITE_STATS_THEME}#${lang.id}/external/page/h2h/${event.Info?.HomeTeamId}/${event.Info?.AwayTeamId}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        title="Stats"
                      />
                    )}
                  </div>
                </aside>

                {marketGroups &&
                  (event?.type === "live" || showTab === "tab1") && (
                    <div className={classes.Main}>
                      {event?.type !== "live" && <EventHeader event={event} />}

                      {marketGroups.length > 0 && (
                        <MarketsMenu marketGroups={marketGroups} />
                      )}

                      <div>
                        <MarketGroup
                          marketGroups={marketGroups}
                          event={event}
                          marketGroupsChanged={marketGroupsChanged}
                        />
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
