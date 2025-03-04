import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import MainSwiper from "../UI/MainSwiper/MainSwiper";
import PricesIcon from "../../assets/svgs/prices.svg?react";
import classes from "./Crypto.module.css";
import SkeletonCrypto from "../UI/Skeletons/SkeletonCrypto";
import CryptoCard from "./CryptoCard";
import { cryptoActions } from "../../pages/Crypto/cryptoSlice";
import { translate } from "../../utils/translations";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";
import { getCrypto } from "../../pages/Crypto/cryptoAsyncActions";
import { useEffect } from "react";

const Crypto = ({ onDataNotFound }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);
  const crypto = useSelector((state) => state.crypto.cryptoSwiper);
  const user = useSelector((state) => state.login.user);

  const {
    slidesPerView,
    slidesPerGroup,
    isMobile,
    isTablet,
    isDesktop,
    isBigDesktop,
  } = useSlidesResponsive("crypto-line");

  const navigateToModal = (modal, tab, method) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);

    if (method) searchParams.set("method", method);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCrypto(signal));

    return () => {
      controller.abort();
      dispatch(cryptoActions.reset());
    };
  }, []);

  //Remove Component if no favs found
  useEffect(() => {
    if (crypto !== null && crypto.length === 0) {
      onDataNotFound();
    }
  }, [crypto, onDataNotFound]);

  return (
    <div className={classes.CryptoSwiper} id="cryptoSwiper">
      <MainSwiper
        // slidesPerView={slidesPerView}
        slidesPerView={"auto"}
        icon={<PricesIcon />}
        title={<Link to="/crypto">{translate("Crypto Prices")}</Link>}
        viewAll="/crypto"
        spaceBetween={20}
        autoplay={true}
        delay={4000}
        loop={true}
      >
        {crypto && Object.keys(crypto).length > 0
          ? crypto.map((item, index) => {
              return (
                <SwiperSlide
                  key={`${item.Id}-${index}`}
                  style={{ width: "auto", cursor: "none" }}
                >
                  <div className={classes.SlideContainer}>
                    <div className={classes.Slide}>
                      <div className={classes.SlideContent}>
                        <CryptoCard item={item} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : Array.from({ length: 15 }, (_, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <SkeletonCrypto />
              </SwiperSlide>
            ))}
      </MainSwiper>
    </div>
  );
};

export default Crypto;
