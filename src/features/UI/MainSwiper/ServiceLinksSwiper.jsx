import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import MainSwiper from "./MainSwiper";
import classes from "./ServiceLinksSwiper.module.css";
import { getSiteLinks } from "../../../pages/Promotions/promotionsAsyncActions";
import config from "../../../config";

const ServiceLinksSwiper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);

  const currentDomain = "localhost:3000";
  // const currentDomain = window.location.hostname;

  const serviceLinks = useSelector((state) => state.promotions.serviceLinks);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getSiteLinks(signal, "ServiceLinks"));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    serviceLinks && (
      <div className={classes.ServiceLinks}>
        <MainSwiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={13}
          noHeader
        >
          {serviceLinks.map((link, index) => (
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
                className={classes.SlideServiceLinks}
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

export default ServiceLinksSwiper;
