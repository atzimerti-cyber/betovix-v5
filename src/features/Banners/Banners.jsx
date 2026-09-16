import { useState } from "react";
import { SwiperSlide } from "swiper/react";

import classes from "./Banners.module.css";
import BigSwiper from "../UI/MainSwiper/BigSwiper";
import LoaderPlaceholder from "../UI/Skeletons/LoaderPlaceholder";
import { getBanners } from "./BannersAsync";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bannersActions } from "./BannersSlice";
import { useMediaQuery } from "react-responsive";

const Banners = ({ onDataNotFound }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const lang = useSelector((state) => state.app.lang);
  const mobileWidth = useSelector((state) => state.layout.mobileWidth) || 768;
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileWidth}px)` });

  const [loadedImages, setLoadedImages] = useState([]);
  const banners = useSelector((state) => state.banners.banners);

  const updateLoadedImages = (index) => {
    setLoadedImages((prevData) => [...prevData, index]);
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoadedImages([]);
    dispatch(getBanners(controller.signal, isMobile ? "mobile" : "desktop"));

    return () => {
      controller.abort();
      dispatch(bannersActions.reset());
    };
  }, [dispatch, isMobile, lang?.id]);

  //Remove Component if no favs found
  useEffect(() => {
    if (Array.isArray(banners) && banners.length === 0) {
      onDataNotFound?.();
    }
  }, [banners, onDataNotFound]);

  if (Array.isArray(banners) && banners.length === 0) return null;

  return (
    <BigSwiper slidesPerView={1} autoplay delay={6000}>
      {banners && banners.length > 0 ? (
        banners.map((banner, index) => {
          const link = banner.ImgLink ? banner.ImgLink : null;

          return (
            <SwiperSlide key={banner.Id}>
              <div
                className={classes.ImageContainer}
                id="bannerImgContainer"
                role={link ? "link" : undefined}
                tabIndex={link ? 0 : undefined}
                onClick={() => {
                  if (link) window.location.href = link;
                }}
                onKeyDown={(event) => {
                  if (link && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    window.location.href = link;
                  }
                }}
              >
                <div
                  className={
                    user
                      ? classes.BannerBackground
                      : [classes.BannerBackground, classes.NoUser].join(" ")
                  }
                >
                  {loadedImages.includes(index) === false && (
                    <LoaderPlaceholder />
                  )}
                  <img
                    src={banner.Img}
                    alt="Banner"
                    onLoad={() => updateLoadedImages(index)}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide>
          <div className={classes.ImageContainer}>
            <div className={classes.BannerBackground}>
              <LoaderPlaceholder />
            </div>
          </div>
        </SwiperSlide>
      )}
    </BigSwiper>
  );
};

export default Banners;
