import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lzString from "lz-string";
import _ from "lodash";
import config from "../../../config";
import axiosApi from "../../../axios-api";

import classes from "./AdditionalMarketGroup.module.css";
import { translate } from "../../../utils/translations";
import { getUpdatedMarkets } from "../../../utils/liveUpdates";
import { liveActions } from "../../../features/InitApp/liveSlice";
import { eventActions } from "../eventSlice";

const AdditionalMarketGroup = (props) => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const liveConnection = useSelector((state) => state.live.liveConnection);
  const selectedMarketCategory = useSelector(
    (state) => state.event.selectedMarketCategory
  );
  const subscribeTo = useSelector((state) => state.event.subscribeTo);
  const subscribedTo = useSelector((state) => state.event.subscribedTo);

  const eventRef = useRef(selectedMarketCategory?.event);

  useEffect(() => {
    eventRef.current = selectedMarketCategory?.event;
  }, [selectedMarketCategory?.event]); // Update the ref whenever props.group changes

  const handleOnOddsUpdate = (message) => {
    if (!eventRef.current) return;

    const decompressedString = lzString.decompressFromUTF16(message);
    const updateObj = JSON.parse(decompressedString);

    if (!updateObj) return;

    if (updateObj.Id === eventRef.current.MatchId) {
      const updatedMarkets = getUpdatedMarkets(
        updateObj,
        eventRef.current.Markets
      );

      if (!_.isEqual(eventRef.current.Markets, updatedMarkets)) {
        const updatedEvent = _.cloneDeep(eventRef.current);
        const previousMarkets = [...updatedEvent.Markets];
        updatedEvent.PreviousMarkets = previousMarkets;
        updatedEvent.Markets = updatedMarkets;

        dispatch(
          eventActions.setSelectedMarketCategory({
            ...selectedMarketCategory,
            event: updatedEvent,
          })
        );
        dispatch(eventActions.setChangedMarkets());
      }
    }
  };

  useEffect(() => {
    if (!subscribeTo) return;
    if (!subscribeTo.isSpecial) return;
    if (selectedMarketCategory?.event?.MatchId !== props.group?.event?.MatchId)
      return;
    if (subscribeTo === subscribedTo) return;

    const previousMatchId = subscribedTo?.matchId || 0;
    const matchId = subscribeTo.matchId;

    liveConnection
      .invoke("SubscribeToEvent", previousMatchId, matchId)
      .then(() => {
        dispatch(
          liveActions.setSubscribedTo({
            matchId: matchId,
            isSpecial: true,
          })
        );
        console.log(`Unsubscribed from ${previousMatchId}`);
        console.log(`Subscribed to ${matchId}`);
      })
      .catch((err) => {
        console.error(`Subscription to ${matchId} failed :`, err);
      });

    liveConnection.on("onOddsUpdate", handleOnOddsUpdate);

    return () => {
      liveConnection.off("onOddsUpdate", handleOnOddsUpdate);
    };
  }, [selectedMarketCategory?.event?.MatchId]);

  useEffect(() => {
    if (!subscribeTo) return;
    if (!subscribeTo.isSpecial) return;
    if (subscribeTo.matchId !== props.group?.event?.MatchId) return;
    if (subscribeTo === subscribedTo) return;

    const fetchUpdatedEvent = async () => {
      const updatedEvent = await getEvent(subscribeTo.matchId);
      if (updatedEvent) {
        dispatch(
          eventActions.setSelectedMarketCategory({
            ...selectedMarketCategory,
            event: updatedEvent,
          })
        );
        dispatch(eventActions.setChangedMarkets());
      }
    };

    fetchUpdatedEvent();
  }, [subscribeTo]);

  const getEvent = async (matchId) => {
    try {
      const response = await axiosApi.get(
        `LiveCluster/getLiveEvent?eventid=${matchId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );

      if (response.data?.Status?.StatusCode !== 200) return null;

      if (response.data?.Contents?.Markets?.length)
        return response.data.Contents;

      return null;
    } catch (error) {
      return null;
    }
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      className={
        selectedMarketCategory?.Id === props.group.Id
          ? [classes.MarketGroup, classes.Active].join(" ")
          : classes.MarketGroup
      }
      onClick={() => {
        dispatch(eventActions.setSelectedMarketCategory(props.group));
        dispatch(
          liveActions.setSubscribeTo({
            matchId: props.group.event?.MatchId,
            isSpecial: true,
          })
        );
      }}
    >
      <span>{translate(props.group.name)}</span>
    </div>
  );
};

export default AdditionalMarketGroup;
