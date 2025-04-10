import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

import { casinoActions } from "../../../pages/Casino/casinoSlice";

import MainSwiper from "./MainSwiper";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import LockedIcon from "../../../assets/svgs/locked-region.svg?react";
import ArrowRight from "../../../assets/svgs/open-arrow-right.svg?react";
import PlayButton from "../../../assets/svgs/playbutton.svg?react";
import classes from "./Cat3Swiper.module.css";
import LoaderPlaceholder from "../../UI/Skeletons/LoaderPlaceholder";
import { getCasinoByTags } from "../../../pages/Casino/casinoAsyncActions";
import { translate } from "../../../utils/translations";
import _ from "lodash";

import { useMediaQuery } from "react-responsive";
import useTouchScreen from "../../../hooks/useTouchScreen";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";

const Cat3Swiper = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const notGridSwiper = useMediaQuery({ query: "(max-width: 700px)" });

  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const casinoByTags = useSelector((state) => state.casino.casinoByTags);
  const [items, setItems] = useState(props.items); // Add state for items
  const { slidesPerView, slidesPerGroup } = useSlidesResponsive("Cat3Swiper");

  const gridSwiper = useMediaQuery({ query: "(min-width: 700px)" });
  const isTouchScreen = useTouchScreen();
  const [isIOS, setIsIOS] = useState(null);

  useEffect(() => {
    if (!props.items) return;
    setItems(props.items);
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

  useEffect(() => {
    if (!props.tag) return;
    if (casinoByTags[props.tag]) {
      setItems(casinoByTags[props.tag]);
    }
  }, [casinoByTags]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  //CHECK IF DEVICE IS IOS AND MOBILE TO OPEN IFRAME
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    setIsIOS(isIOSDevice);
  }, []);

  const GoToCategory = (tag, name) => {
    if (tag === "favs" || tag === "rec" || tag === "shows") {
      if (tag === "favs") {
        navigate(`/casino/favorites`);
      } else if (tag === "rec") {
        navigate(`/casino/slots`);
      } else if (tag === "shows") {
        navigate(`/casino/gameshows`);
      }
    } else {
      navigate(`/casino/menu?tag=${tag}`, {
        state: { label: name },
      });
    }
  };

  const openGameModal = (game) => {
    dispatch(casinoActions.setGameOptionsModal(game));
    addParamsToUrl("game-options");
  };

  return (
    <>
      {items && items.length > 0 && (
        <div
          id={`category3swiper${props.id}`}
          className={classes.Cat3Container}
          style={{
            ...(notGridSwiper ? { flexDirection: "column" } : {}),
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundAttachment: isIOS ? "local" : "fixed",
          }}
        >
          <div
            className={classes.SwiperImage}
            style={{
              ...(notGridSwiper ? { flexDirection: "column" } : {}),
            }}
          >
            {notGridSwiper ? (
              <div
                className={classes.SwiperTitleMob}
                onClick={() => GoToCategory(props.tag, props.title)}
              >
                <span>{translate(`${props.title}`)}</span>
                <ArrowRight width="33px" height="33px" />
              </div>
            ) : (
              <div
                className={classes.SwiperTitleDesk}
                onClick={() => GoToCategory(props.tag, props.title)}
              >
                <span>{translate(`${props.title}`)}</span>
                <ArrowRight width="39px" height="38px" />
              </div>
            )}
            <div
              className={classes.SmallImageContainer}
              style={{ backgroundImage: `url(${props.frontImage})` }}
            ></div>
          </div>
          <div
            className={classes.SwiperContainer}
            style={{
              ...(notGridSwiper ? { width: "100%" } : {}),
            }}
          >
            <MainSwiper
              grid={gridSwiper && true}
              slidesPerView={slidesPerView}
              slidesPerGroup={slidesPerGroup}
              gridRows={gridSwiper && 2}
              gridFill={gridSwiper && "row"}
              spaceBetween={7}
              title={false}
              viewText={props.text}
              onTask={props.task}
              icon={false}
              thIcon={false}
              noHeader
            >
              {items ? (
                items.length === 0 ? (
                  <p className={classes.NoResults}>No {props.title}</p>
                ) : (
                  items.map((item, index) => {
                    if (props.max && index > props.max + 1) return null;
                    const gameType = item.Data.Tags.toLowerCase().includes(
                      "live"
                    )
                      ? "live"
                      : "slots";

                    return (
                      <SwiperSlide key={item.Data.Id}>
                        <div
                          className={classes.SlideContainer}
                          style={item.isLocked ? { pointerEvents: "none" } : {}}
                          onClick={() => {
                            item.isLocked
                              ? null
                              : isTouchScreen && openGameModal(item);
                          }}
                        >
                          <div className={classes.BackgroundContainer}>
                            {item.isLocked && (
                              <div className={classes.NotAvailable}>
                                <div className={classes.IconWrapper}>
                                  <LockedIcon />
                                </div>
                              </div>
                            )}
                            <article className={classes.Card}>
                              <div className={classes.ImageContainer}>
                                <div
                                  style={{
                                    backgroundImage: `url(${item.Data.ImageUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "100%",
                                  }}
                                ></div>
                              </div>
                            </article>
                          </div>
                          {!isTouchScreen && !item.isLocked && (
                            <div className={classes.OverlayContainer}>
                              <div className={classes.InfoContainer}>
                                <div>
                                  <p className={classes.BgGameName}>
                                    {item.Data.Name}
                                  </p>
                                </div>
                              </div>
                              <div className={classes.ButtonsContainer}>
                                <Link
                                  to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=false`}
                                >
                                  <div className={classes.PlayBtnContainer}>
                                    <button className={classes.PlayBtn}>
                                      <PlayButton />
                                    </button>
                                  </div>
                                </Link>
                                {bonusBalance > 0 && item.allowBonus && (
                                  <Link
                                    to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=true`}
                                  >
                                    <div className={classes.isBonus}>
                                      <button
                                        className={classes.bonusContainer}
                                      >
                                        <GiftIcon />
                                      </button>
                                    </div>
                                  </Link>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })
                )
              ) : (
                Array.from({ length: 15 }, (_, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={[classes.SlideContainer, classes.Loading].join(
                        " "
                      )}
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
                ))
              )}
            </MainSwiper>
          </div>
        </div>
      )}
    </>
  );
};

export default Cat3Swiper;
