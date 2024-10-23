import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/grid"; // Ensure grid CSS is included

import { casinoActions } from "../../../pages/Casino/casinoSlice";

import MainSwiper from "./MainSwiper";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import PlayButton from "../../../assets/svgs/playbutton.svg?react";
import classes from "./Cat3Swiper.module.css";
import LoaderPlaceholder from "../../UI/Skeletons/LoaderPlaceholder";
import { getCasinoByTags } from "../../../pages/Casino/casinoAsyncActions";
import {
  addCasinoFav,
  removeCasinoFav,
} from "../../../features/CasinoFavorites/CasinoFavoritesAsync";
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

  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const casinoByTags = useSelector((state) => state.casino.casinoByTags);
  const [items, setItems] = useState(props.items); // Add state for items
  const { slidesPerView, slidesPerGroup } = useSlidesResponsive("Cat3Swiper");

  const gridSwiper = useMediaQuery({ query: "(min-width: 700px)" });
  const isTouchScreen = useTouchScreen(); // Detect if the device has a touchscreen

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

  // const onToggleFavorite = (item) => {
  //   if (item.isFav) {
  //     dispatch(removeCasinoFav(item.Data.Id)).then(() => {
  //       let newItems = _.cloneDeep(items);
  //       for (let i = 0; i < newItems.length; i++) {
  //         if (newItems[i].Data.Id === item.Data.Id) {
  //           newItems[i].isFav = false;
  //           break;
  //         }
  //       }
  //       setItems(newItems);
  //     });
  //   } else {
  //     dispatch(addCasinoFav(item.Data.Id)).then(() => {
  //       let newItems = _.cloneDeep(items);
  //       for (let i = 0; i < newItems.length; i++) {
  //         if (newItems[i].Data.Id === item.Data.Id) {
  //           newItems[i].isFav = true;
  //           break;
  //         }
  //       }
  //       setItems(newItems);
  //     });
  //   }
  // };

  const openGameModal = (game) => {
    dispatch(casinoActions.setGameOptionsModal(game));
    addParamsToUrl("game-options");
  };

  return (
    <>
      {items && items.length > 0 && (
        <MainSwiper
          grid={gridSwiper && true}
          slidesPerView={slidesPerView}
          slidesPerGroup={slidesPerGroup}
          gridRows={gridSwiper && 2}
          gridFill={gridSwiper && "row"}
          spaceBetween={7}
          title={
            props.link ? (
              <Link to={props.link}>{props.title}</Link>
            ) : props.task ? (
              <a onClick={props.task}>{props.title}</a>
            ) : (
              props.title
            )
          }
          viewText={props.text}
          onTask={props.task}
          icon={props.icon}
          thIcon={props.thIcon}
        >
          {items ? (
            items.length === 0 ? (
              <p className={classes.NoResults}>No {props.title}</p>
            ) : (
              items.map((item, index) => {
                if (props.max && index > props.max + 1) return null;
                const gameType = item.Data.Tags.toLowerCase().includes("live")
                  ? "live"
                  : "slots";

                return (
                  <SwiperSlide key={item.Data.Id}>
                    <div
                      className={classes.SlideContainer}
                      onClick={() => {
                        if (isTouchScreen) {
                          openGameModal(item);
                        }
                      }}
                    >
                      <div className={classes.BackgroundContainer}>
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
                      {!isTouchScreen && (
                        <div className={classes.OverlayContainer}>
                          <div className={classes.InfoContainer}>
                            <div>
                              <p className={classes.BgGameName}>
                                {item.Data.Name}
                              </p>
                              {/* <p className={classes.BgVendor}>
                              {item.Data.VendorName}
                            </p> */}
                            </div>
                          </div>
                          <div className={classes.ButtonsContainer}>
                            {/* <div className={classes.FavContainer}>
                            <HeartIcon
                              className={
                                item.isFav ? classes.FavoriteIcon : null
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (user) {
                                  onToggleFavorite(item);
                                } else {
                                  toast.warning("Login to access this feature");
                                }
                              }}
                            />
                          </div> */}
                            <Link
                              to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=false`}
                            >
                              <div className={classes.PlayBtnContainer}>
                                <button className={classes.PlayBtn}>
                                  <PlayButton />
                                </button>
                              </div>
                            </Link>
                            {bonusBalance > 0 && (
                              <Link
                                to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=true`}
                              >
                                <div className={classes.isBonus}>
                                  <button className={classes.bonusContainer}>
                                    <GiftIcon />
                                    {/* <span>{translate("With Bonus")}</span> */}
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
      )}
    </>
  );
};

export default Cat3Swiper;
