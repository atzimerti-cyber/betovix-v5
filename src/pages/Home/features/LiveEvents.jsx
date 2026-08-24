import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import MainSwiper from "../../../features/UI/MainSwiper/MainSwiper";
import VideoIcon from "../../../assets/svgs/video.svg?react";
import classes from "./LiveEvents.module.css";
import SkeletonGame from "../../../features/UI/Skeletons/SkeletonGame";
import GameCard from "../../../features/Game/GameCard";
import { translate } from "../../../utils/translations";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";

const LiveEvents = () => {
  const lang = useSelector((state) => state.app.lang);
  const liveState = useSelector((state) => state.live.liveState);
  const addedRemovedEvent = useSelector((state) => state.live.addedRemovedEvent);
  const allSports = useSelector((state) => state.app.allSports) || [];

  const { slidesPerView, slidesPerGroup } = useSlidesResponsive("match");

  const eventKeys = useMemo(() => {
    if (liveState == null) return null;
    if (typeof liveState !== "object") return [];

    const orderMap = allSports.reduce((acc, item) => {
      acc[item.Id] = item.Order;
      return acc;
    }, {});

    return Object.values(liveState)
      .filter((item) => {
        if (!item?.Info?.MatchId) return false;
        if (!item?.Info?.SportId) return false;
        if (!item?.Header) return false;
        if (item.Header.Active === false) return false;
        return true;
      })
      .sort(
        (a, b) =>
          (orderMap[a.Info.SportId] || 999999) -
          (orderMap[b.Info.SportId] || 999999)
      )
      .map((item) => item.Info.MatchId)
      .slice(0, 10);
  }, [liveState, allSports, addedRemovedEvent, lang?.id]);

  // The live websocket/state can exist while containing no renderable events.
  // In that case the Home must not show an empty "Live Events" section.
  if (Array.isArray(eventKeys) && eventKeys.length === 0) return null;

  return (
    <div className={classes.LiveSwiper} id="liveEventsSwiper">
      <MainSwiper
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        icon={<VideoIcon />}
        title={<Link to="/sportsbook/live">{translate("Live Events")}</Link>}
        viewAll="/sportsbook/live"
      >
        {Array.isArray(eventKeys)
          ? eventKeys.map((key) => {
              const game = liveState?.[key];
              if (!game) return null;

              return (
                <SwiperSlide key={game?.Info?.MatchId || key}>
                  <div
                    className={classes.SlideContainer}
                    id="LiveEventsSlideContainer"
                  >
                    <GameCard game={game} type="live" />
                  </div>
                </SwiperSlide>
              );
            })
          : Array.from({ length: slidesPerView }, (_, index) => (
              <SwiperSlide key={index}>
                <div
                  id="LiveEventsSkeleton"
                  className={[classes.SlideContainer, classes.Loading].join(
                    " "
                  )}
                >
                  <Link to="/" className={classes.Card} id="LiveSkeletonCard">
                    <SkeletonGame />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
      </MainSwiper>
    </div>
  );
};

export default LiveEvents;
