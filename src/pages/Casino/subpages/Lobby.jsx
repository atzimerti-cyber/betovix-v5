import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";

import classes from "./Lobby.module.css";
import { casinoActions } from "../casinoSlice";
import { getCasino, getCasinoTags } from "../casinoAsyncActions";
import SwiperWithOverlay from "../../../features/UI/MainSwiper/SwiperWithOverlay";
import Cat2Swiper from "../../../features/UI/MainSwiper/Cat2Swiper";
import Cat3Swiper from "../../../features/UI/MainSwiper/Cat3Swiper";

import VendorSwiper from "../../../features/UI/MainSwiper/VendorSwiper";

import BigSwiper2 from "../../../features/UI/MainSwiper/BigSwiper2";
import ProvidersIcon from "../../../assets/casinoIcons/providers.svg?react";
import { translate } from "../../../utils/translations";

import TESTIMAGE from "../../../assets/images/pragmatic-logo3d.png";

const Lobby = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const notGridSwiper = useMediaQuery({ query: "(max-width: 700px)" });

  const casinoBanners = useSelector((state) => state.casino.casinoBanners);
  const casinoVendors = useSelector((state) => state.casino.casinoVendors);
  const user = useSelector((state) => state.login.user);
  const tags = useSelector((state) => state.casino.casinoTags);
  const [filteredTags, setFilteredTags] = useState([]);
  const [allProviders, setAllProviders] = useState([]);
  const loadMoreRef = useRef(null);

  const {
    slidesPerView,
    slidesPerGroup,
    isMobile,
    isTablet,
    isDesktop,
    isBigDesktop,
  } = useSlidesResponsive("casino");
  let specials = ["recent", "favs"];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getCasino(signal));
    dispatch(getCasinoTags(signal));

    return () => {
      controller.abort();
      dispatch(casinoActions.resetLobby());
    };
  }, [user?.AccountId]);

  useEffect(() => {
    if (!casinoVendors) return;

    const po = casinoVendors
      .map((v) => {
        return v;
      })
      .sort((a, b) => a.Data.Name.localeCompare(b.Data.Name));

    setAllProviders(po);
  }, [casinoVendors]);

  useEffect(() => {
    if (!casinoBanners) return;
  }, [casinoBanners]);

  useEffect(() => {
    // Callback function to execute when observed element is in view
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems(); // Load more items when the observed element comes into view
      }
    };

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the container
      rootMargin: "0px",
      threshold: 0.3, // Trigger when 70% of the target is in view
    });

    // Start observing the target element
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [tags]);

  // Function to load more items
  const loadMoreItems = () => {
    if (tags) {
      let availableTags = tags;

      // If there's no user, filter out the special tags
      if (!user) {
        availableTags = tags.filter((tag) => !specials.includes(tag.Tags));
      }

      let slidesCount = parseInt(window.innerHeight / 215);
      if (slidesCount < 1) {
        slidesCount = 1;
      }

      setFilteredTags((filteredTags) => {
        let nextTags = availableTags.slice(
          filteredTags.length,
          filteredTags.length + slidesCount
        );
        let newTags = [...filteredTags, ...nextTags];
        return newTags;
      });
    }
  };

  return (
    <>
      <BigSwiper2 items={casinoBanners} autoplay />

      <VendorSwiper
        title={translate("Our Vendors")}
        icon={<ProvidersIcon />}
        link="/search"
        items={allProviders}
      />

      {filteredTags.map((tag, index) => {
        return (
          <React.Fragment key={tag.Tags}>
            {tag && tag.Category === "1" && (
              <SwiperWithOverlay
                title={`${translate(tag.Name)}`}
                icon={""}
                thIcon={tag.Icon}
                tag={tag.Tags}
                max={20}
                slidesPerView={slidesPerView}
              />
            )}
            {tag && tag.Category === "2" && (
              <Cat2Swiper
                title={`${translate(tag.Name)}`}
                icon={""}
                thIcon={tag.Icon}
                tag={tag.Tags}
                max={20}
              />
            )}
            {tag && tag.Category === "3" && (
              <div
                className={classes.Cat3Container}
                style={{
                  ...(notGridSwiper ? { flexDirection: "column" } : {}),
                  backgroundImage: `url(${tag.BgImage})`,
                }}
              >
                <div
                  className={classes.SwiperImage}
                  // style={{
                  //   ...(notGridSwiper
                  //     ? { height: "30vh", flexDirection: "column" }
                  //     : {}),
                  // }}
                  style={{
                    ...(notGridSwiper ? { flexDirection: "column" } : {}),
                  }}
                >
                  {notGridSwiper && (
                    <div className={classes.SwiperTitle}>
                      <span>{translate(tag.Name)}</span>
                    </div>
                  )}
                  <div
                    className={classes.SmallImageContainer}
                    style={{ backgroundImage: `url(${tag.Image})` }}
                    // style={{ backgroundImage: `url(${TESTIMAGE})` }}
                  ></div>
                  {/* <div
                    className={classes.SwiperContainer}
                    style={{
                      ...(notGridSwiper ? { width: "100%" } : {}),
                    }}
                  >
                    <Cat3Swiper
                      title={`${translate(tag.Name)}`}
                      icon={""}
                      thIcon={tag.Icon}
                      tag={tag.Tags}
                      max={20}
                    />
                  </div> */}
                </div>
                <div
                  className={classes.SwiperContainer}
                  style={{
                    ...(notGridSwiper ? { width: "100%" } : {}),
                  }}
                >
                  <Cat3Swiper
                    title={!notGridSwiper && `${translate(tag.Name)}`}
                    icon={""}
                    thIcon={!notGridSwiper && tag.Icon}
                    tag={tag.Tags}
                    max={20}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      <div
        ref={loadMoreRef}
        style={{
          height: "20px",
          backgroundColor: "lightgray",
          margin: "20px 0",
          visibility: "hidden",
          //   background: "red",
        }}
      >
        Loading more items...
      </div>
    </>
  );
};

export default Lobby;
