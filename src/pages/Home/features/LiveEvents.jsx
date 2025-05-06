import { useEffect, useState } from "react";
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
  const addedRemovedEvent = useSelector(
    (state) => state.live.addedRemovedEvent
  );
  const allSports = useSelector((state) => state.app.allSports);

  const {
    slidesPerView,
    slidesPerGroup,
    isMobile,
    isTablet,
    isDesktop,
    isBigDesktop,
  } = useSlidesResponsive("match");

  const [eventKeys, setEventKeys] = useState(null);

  useEffect(() => {
    if (!liveState) return;

    let liveArr = Object.keys(liveState).map((s) => liveState[s]);

    const orderMap = allSports.reduce((acc, item) => {
      acc[item.Id] = item.Order;
      return acc;
    }, {});

    liveArr.sort((a, b) => {
      return (
        (orderMap[a.Info.SportId] || 999999) -
        (orderMap[b.Info.SportId] || 999999)
      );
    });

    let allKeys = [];
    liveArr.forEach((item) => {
      if (!item.Info) return;
      if (!item.Header) return;
      if (!item.Info.SportId) return;

      allKeys.push(item.Info.MatchId);
    });
    setEventKeys(allKeys);
  }, [addedRemovedEvent]);

  return (
    <div className={classes.LiveSwiper} id="liveEventsSwiper">
      <MainSwiper
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        icon={<VideoIcon />}
        title={<Link to="/sportsbook/live">{translate("Live Events")}</Link>}
        viewAll="/sportsbook/live"
      >
        {eventKeys
          ? eventKeys.map((key, index) => {
              const game = liveState[key];

              if (index > 9) return null;
              if (!game?.Header?.Active) return null;

              return (
                <SwiperSlide key={game.MatchId}>
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
