import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import MainSwiper from "./MainSwiper";
import classes from "./CategorySwiper.module.css";
import LoaderPlaceholder from "../../UI/Skeletons/LoaderPlaceholder";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";
import TestImage from "../../../assets/testimg/testimg.jpeg";
import TestImage1 from "../../../assets/testimg/s1.png";
import TestImage2 from "../../../assets/testimg/s2.png";
import TestImage3 from "../../../assets/testimg/s3.png";
import TestImage4 from "../../../assets/testimg/s4.png";
import TestImage5 from "../../../assets/testimg/s5.png";
import TestImage6 from "../../../assets/testimg/s6.png";
import TestImage7 from "../../../assets/testimg/s7.png";
import Image1 from "../../../assets/testimg/1.png";
import Image2 from "../../../assets/testimg/2.png";
import Image3 from "../../../assets/testimg/3.png";

const CategorySwiper = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);

  const [items, setItems] = useState(props.items);
  const { slidesPerView, slidesPerGroup } = useSlidesResponsive(
    "SERVICE-LINKS"
  );

  useEffect(() => {
    if (!props.items) return;
    setItems(props.items); // Update local state when props.items changes
  }, [props.items]);

  useEffect(() => {
    if (!props.tag) return;
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCasinoByTags(signal, props.tag));

    return () => {
      controller.abort();
    };
  }, [props.tag]);

  //   const openGameModal = (game) => {
  //     dispatch(casinoActions.setGameOptionsModal(game));
  //     addParamsToUrl("game-options");
  //   };

  //   const addParamsToUrl = (modal, tab) => {
  //     const searchParams = new URLSearchParams(location.search);
  //     searchParams.set("modal", modal);
  //     if (tab) searchParams.set("tab", tab);

  //     navigate(`${location.pathname}?${searchParams.toString()}`, {
  //       replace: true,
  //     });
  //   };

  return items && items.length > 0 ? (
    <MainSwiper
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      title={props.title}
      spaceBetween={20}
    >
      {items
        ? items.length === 0
          ? null
          : items.map((item, index) => {
              return (
                <SwiperSlide key={item.Data.Id}>
                  <div className={classes.SlideContainer}>
                    <img src={TestImage} />
                  </div>
                </SwiperSlide>
              );
            })
        : Array.from({ length: 15 }, (_, index) => (
            <SwiperSlide key={index}>
              <div
                className={[classes.SlideContainer, classes.Loading].join(" ")}
              >
                <Link to={null}>
                  <article className={classes.Card}>
                    <div className={classes.ImageContainer}>
                      <LoaderPlaceholder />
                    </div>
                  </article>
                </Link>
              </div>
            </SwiperSlide>
          ))}
    </MainSwiper>
  ) : (
    <MainSwiper
      slidesPerView={props.slidesPerView ? props.slidesPerView : slidesPerView}
      slidesPerGroup={slidesPerGroup}
      title={props.title}
      spaceBetween={15}
      noHeader
    >
      {/* HOME LINKS HORIZONTAL*/}

      <SwiperSlide>
        <div
          className={classes.SlideServiceLinksHorizontal}
          style={{ backgroundImage: `url(${Image2})` }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={classes.SlideServiceLinksHorizontal}
          style={{ backgroundImage: `url(${Image3})` }}
        ></div>
      </SwiperSlide>

      {/* HOME LINKS VERTICAL*/}

      <SwiperSlide>
        <div
          className={classes.SlideHomeLinksVertical}
          style={{ backgroundImage: `url(${TestImage})` }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={classes.SlideHomeLinksVertical}
          style={{ backgroundImage: `url(${TestImage})` }}
        ></div>
      </SwiperSlide>

      {/* SERVICE LINKS */}

      <SwiperSlide>
        <div
          className={classes.SlideServiceLinks}
          style={{ backgroundImage: `url(${TestImage6})` }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className={classes.SlideServiceLinks}
          style={{ backgroundImage: `url(${TestImage7})` }}
        ></div>
      </SwiperSlide>
    </MainSwiper>
  );
};

export default CategorySwiper;
