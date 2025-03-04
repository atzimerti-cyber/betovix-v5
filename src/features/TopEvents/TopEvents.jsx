import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import MainSwiper from "../UI/MainSwiper/MainSwiper";
import TopEventsIcon from "../../assets/svgs/top-events.svg?react";
import classes from "./TopEvents.module.css";
import SkeletonGame from "../../features/UI/Skeletons/SkeletonGame";
import GameCard from "../../features/Game/GameCard";
import { translate } from "../../utils/translations";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";
import { getEventsTop } from "./TopEventsAsync";
import { topEventsActions } from "./TopEventsSlice";
import { useEffect } from "react";

const TopEvents = ({ onDataNotFound }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const eventsTop = useSelector((state) => state.topEvents.topEvents);

  const {
    slidesPerView,
    slidesPerGroup,
    isMobile,
    isTablet,
    isDesktop,
    isBigDesktop,
  } = useSlidesResponsive("match");

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getEventsTop(controller.signal));

    return () => {
      controller.abort();
      dispatch(topEventsActions.reset());
    };
  }, []);

  //Remove Component if no favs found
  useEffect(() => {
    if (eventsTop !== null && eventsTop.length === 0) {
      onDataNotFound();
    }
  }, [eventsTop, onDataNotFound]);

  return (
    <div className={classes.TopSwiper} id="topEventsSwiper">
      <MainSwiper
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        icon={<TopEventsIcon />}
        title={
          <Link to="/sportsbook/home/football">{translate("Top Events")}</Link>
        }
        viewAll="/sportsbook/home/football"
      >
        {eventsTop
          ? eventsTop.map((game, index) => {
              if (index > 9) return null;

              return (
                <SwiperSlide key={game.MatchId}>
                  <div className={classes.SlideContainer}>
                    <GameCard game={game} type="scheduled" />
                  </div>
                </SwiperSlide>
              );
            })
          : Array.from({ length: slidesPerView }, (_, index) => (
              <SwiperSlide key={index}>
                <div
                  className={[classes.SlideContainer, classes.Loading].join(
                    " "
                  )}
                >
                  <Link to="/" className={classes.Card}>
                    <SkeletonGame />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
      </MainSwiper>
    </div>
  );
};

export default TopEvents;
