import { Link } from "react-router-dom";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

import classes from "./Banners.module.css";
import BigSwiper from "../UI/MainSwiper/BigSwiper";
import LoaderPlaceholder from "../UI/Skeletons/LoaderPlaceholder";
import { getBanners } from "./BannersAsync";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bannersActions } from "./BannersSlice";

const Banners = ({ onDataNotFound }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);

  const [loadedImages, setLoadedImages] = useState([]);
  const banners = useSelector((state) => state.banners.banners);

  const updateLoadedImages = (index) => {
    setLoadedImages((prevData) => [...prevData, index]);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (window.innerWidth <= 600) {
      dispatch(getBanners(controller.signal, "mobile"));
    } else {
      dispatch(getBanners(controller.signal, "desktop"));
    }
    // dispatch(getBanners(controller.signal));

    return () => {
      controller.abort();
      dispatch(bannersActions.reset());
    };
  }, []);

  //Remove Component if no favs found
  useEffect(() => {
    if (banners !== null && (banners === null || banners.length === 0)) {
      onDataNotFound();
    }
  }, [banners, onDataNotFound]);

  return (
    <BigSwiper slidesPerView={1} autoplay delay={6000}>
      {banners && banners.length > 0 ? (
        banners.map((banner, index) => {
          let link = null;

          return (
            <SwiperSlide key={banner.Id}>
              <Link
                to={link}
                className={classes.ImageContainer}
                id="bannerImgContainer"
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
              </Link>
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide>
          <Link to={null}>
            <div className={classes.BannerBackground}>
              <LoaderPlaceholder />
            </div>
          </Link>
        </SwiperSlide>
      )}
    </BigSwiper>
  );
};

export default Banners;
