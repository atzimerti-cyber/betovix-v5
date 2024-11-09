import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SwiperWithOverlay from "../UI/MainSwiper/SwiperWithOverlay";
import NewIcon from "../../assets/svgs/crash-games.svg?react";
import { getCasinoSwiperByTag } from "./CasinoTagAsyncActions";
import { casinoTagActions } from "./CasinoTagSlice";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";
import { translate } from "../../utils/translations";

const CasinoTagSwiper = ({ onDataNotFound, tag, title }) => {
  // const games = useSelector((state) => state.casinoTag.casinobytag);
  const games = useSelector(
    (state) => state.casinoTag.casinobytag[tag] || null
  );
  const slidesPerView = useSlidesResponsive().slidesPerView;
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getCasinoSwiperByTag(controller.signal, tag));

    return () => {
      controller.abort();
      dispatch(casinoTagActions.reset());
    };
  }, [tag]);

  //Remove Component if no favs found
  useEffect(() => {
    if (games !== null && games.Contents.length === 0) {
      onDataNotFound();
    }
  }, [games, onDataNotFound]);

  return (
    <SwiperWithOverlay
      title={translate(title)}
      icon={<NewIcon />}
      // link='/casino/new-games'
      items={games?.Contents}
      slidesPerView={slidesPerView}
    />
  );
};

export default CasinoTagSwiper;
