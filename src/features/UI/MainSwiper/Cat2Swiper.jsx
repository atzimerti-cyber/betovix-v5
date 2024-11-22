import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import MainSwiper from "./MainSwiper";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import GiftIcon from "../../../assets/svgs/gift.svg?react";
import classes from "./Cat2Swiper.module.css";
import LoaderPlaceholder from "../../UI/Skeletons/LoaderPlaceholder";
import {
  addFavoriteCasino,
  getCasinoByTags,
  removeFavoriteCasino,
} from "../../../pages/Casino/casinoAsyncActions";
import {
  addCasinoFav,
  removeCasinoFav,
} from "../../../features/CasinoFavorites/CasinoFavoritesAsync";
import { translate } from "../../../utils/translations";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";
import _ from "lodash";

const Cat2Swiper = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);

  const user = useSelector((state) => state.login.user);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const casinoByTags = useSelector((state) => state.casino.casinoByTags);
  const [items, setItems] = useState(props.items); // Add state for items
  const { slidesPerView, slidesPerGroup } = useSlidesResponsive("Cat2Swiper");

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

  useEffect(() => {
    if (!props.tag) return;
    if (casinoByTags[props.tag]) {
      setItems(casinoByTags[props.tag]); // Update local state when props.items changes
    }
  }, [casinoByTags]);

  const onToggleFavorite = (item) => {
    if (item.isFav) {
      dispatch(removeCasinoFav(item.Data.Id)).then(() => {
        let newItems = _.cloneDeep(items);
        for (let i = 0; i < newItems.length; i++) {
          if (newItems[i].Data.Id === item.Data.Id) {
            newItems[i].isFav = false;
            break;
          }
        }
        setItems(newItems);
      });
    } else {
      dispatch(addCasinoFav(item.Data.Id)).then(() => {
        let newItems = _.cloneDeep(items);
        for (let i = 0; i < newItems.length; i++) {
          if (newItems[i].Data.Id === item.Data.Id) {
            newItems[i].isFav = true;
            break;
          }
        }
        setItems(newItems);
      });
    }
  };

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

  return (
    items &&
    items.length > 0 && (
      <MainSwiper
        slidesPerView={
          props.slidesPerView ? props.slidesPerView : slidesPerView
        }
        slidesPerGroup={slidesPerGroup}
        title={props.title}
        viewText={props.text}
        onTask={props.task}
        icon={props.icon}
        thIcon={props.thIcon}
        spaceBetween={7}
        clickOnTitle={() => GoToCategory(props.tag, props.title)}
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
                    style={
                      bonusBalance > 0
                        ? { minHeight: "213px" }
                        : { minHeight: "178px" }
                    }
                  >
                    <div className={classes.BackgroundContainer}>
                      <article className={classes.Card}>
                        <div className={classes.ImageContainer}>
                          <div
                            style={{
                              backgroundImage:
                                item.Data.BackImageUrl !== "-"
                                  ? `url(${item.Data.BackImageUrl})`
                                  : `url(${item.Data.ImageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              height: "100%",
                              aspectRatio: "7/4",
                            }}
                            onLoad={() => updateLoadedImages(index)}
                          ></div>
                        </div>
                      </article>
                    </div>
                    <div className={classes.OverlayContainer}>
                      <div className={classes.InfoContainer}>
                        <div>
                          <p className={classes.BgGameName}>{item.Data.Name}</p>
                          <p className={classes.BgVendor}>
                            {item.Data.VendorName}
                          </p>
                        </div>
                      </div>
                      <div className={classes.ButtonsContainer}>
                        <div className={classes.FavContainer}>
                          <HeartIcon
                            className={item.isFav ? classes.FavoriteIcon : null}
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
                        </div>
                        <Link
                          to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=false`}
                        >
                          <div className={classes.PlayBtnContainer}>
                            <button className={classes.PlayBtn}>
                              {translate("Play Game")}
                            </button>
                          </div>
                        </Link>
                        {bonusBalance > 0 && item.allowBonus && (
                          <Link
                            to={`/casino/game/${gameType}/${item.Data.ProviderName}/${item.Data.Id}/${item.Data.BrandGameId}/${item.Data.Name}?isBonus=true`}
                          >
                            <div className={classes.isBonus}>
                              <button className={classes.bonusContainer}>
                                <GiftIcon />
                                {translate("Play With Bonus")}
                              </button>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )
        ) : (
          Array.from({ length: 15 }, (_, index) => (
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
          ))
        )}
      </MainSwiper>
    )
  );
};

export default Cat2Swiper;
