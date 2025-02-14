import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import MainSwiper from "./MainSwiper";
import classes from "./MainLinksSwiper.module.css";
import { getSiteLinks } from "../../../pages/Promotions/promotionsAsyncActions";

const MainLinksSwiper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);

  const mainLinks = useSelector((state) => state.promotions.mainLinks);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getSiteLinks(signal, "MainLinks"));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    mainLinks && (
      <div className={classes.MainLinks} id="mainLinks">
        <MainSwiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={10}
          noHeader
        >
          {mainLinks.map((link, index) => (
            <SwiperSlide
              key={index}
              className={classes.Slide}
              onClick={() => {
                link.Target === "_self" || link.Target === ""
                  ? navigate(link.Link)
                  : window.open(
                      link.Link.replace("{domain}", currentDomain),
                      `${link.Target}`
                    );
              }}
            >
              {/* <div
                className={classes.SlideMainLinks}
                style={{ backgroundImage: `url("${link.Image}")` }}
              ></div> */}
              <img src={link.Image} />
            </SwiperSlide>
          ))}
        </MainSwiper>
      </div>
    )
  );
};

export default MainLinksSwiper;
