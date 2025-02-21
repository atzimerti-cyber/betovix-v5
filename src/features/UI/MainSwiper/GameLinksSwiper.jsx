import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import MainSwiper from "./MainSwiper";
import classes from "./GameLinksSwiper.module.css";
import { getSiteLinks } from "../../../pages/Promotions/promotionsAsyncActions";
import GameLinksSwiperByCateg from "./GameLinksSwiperByCateg";

const GameLinksSwiper = ({ onDataNotFound, tag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);

  // const gameLinks = useSelector((state) => state.promotions.gameLinks);
  const gameLinks = useSelector(
    (state) => state.promotions.gameLinks[tag] || null
  );

  useEffect(() => {
    if (tag) {
      dispatch(getSiteLinks(null, tag));
    }
    // const controller = new AbortController();
    // const signal = controller.signal;

    // dispatch(getSiteLinks(signal, "GameLinks"));

    return () => {};
  }, [tag]);

  useEffect(() => {
    if (gameLinks !== null && gameLinks.length === 0) {
      onDataNotFound();
    }
  }, [gameLinks, onDataNotFound]);

  return (
    <GameLinksSwiperByCateg items={gameLinks} />
    // gameLinks &&
    // (
    //   <div className={classes.GameLinks} id="gameLinks">
    //     <MainSwiper
    //       slidesPerView="auto"
    //       slidesPerGroup={1}
    //       spaceBetween={13}
    //       noHeader
    //     >
    //       {gameLinks.map((link, index) => (
    //         <SwiperSlide
    //           key={index}
    //           className={classes.Slide}
    //           onClick={() => {
    //             link.Target === "_self" || link.Target === ""
    //               ? navigate(link.Link)
    //               : window.open(
    //                   link.Link.replace("{domain}", currentDomain),
    //                   `${link.Target}`
    //                 );
    //           }}
    //         >
    //           {/* <div
    //             className={classes.SlideGameLinks}
    //             style={{ backgroundImage: `url("${link.Image}")` }}
    //           ></div> */}
    //           <img src={link.Image} />
    //         </SwiperSlide>
    //       ))}
    //     </MainSwiper>
    //   </div>
    // )
  );
};

export default GameLinksSwiper;
