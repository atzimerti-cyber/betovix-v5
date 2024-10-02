import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import useSlidesResponsive from "../../../hooks/useSlidesResponsive";

import classes from "./Lobby.module.css";
import { casinoActions } from "../casinoSlice";
import { getCasino, getCasinoTags } from "../casinoAsyncActions";
import SwiperWithOverlay from "../../../features/UI/MainSwiper/SwiperWithOverlay";

import VendorSwiper from "../../../features/UI/MainSwiper/VendorSwiper";

import BigSwiper2 from "../../../features/UI/MainSwiper/BigSwiper2";
import ProvidersIcon from "../../../assets/casinoIcons/providers.svg?react";
import { translate } from "../../../utils/translations";

const Lobby = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

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
  //let specials = ['recent', 'favs', 'new']

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
      let slidesCount = parseInt(window.innerHeight / 215);
      if (slidesCount < 1) {
        slidesCount = 1;
      }
      setFilteredTags((filteredTags) => {
        let nextTags = tags.slice(
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
      <VendorSwiper
        title={translate("Our Vendors")}
        icon={<ProvidersIcon />}
        link="/search"
        items={allProviders}
      />

      <BigSwiper2 items={casinoBanners} autoplay />

      {filteredTags.map((tag, index) => {
        return (
          // !specials.includes(tag) &&
          <SwiperWithOverlay
            key={tag.Tags}
            title={`${translate(tag.Name)}`}
            icon={""}
            thIcon={tag.Icon}
            tag={tag.Tags}
            max={20}
            slidesPerView={slidesPerView}
          />
        );
      })}

      {/* <div ref={loadMoreRef} style={{ height: '200px', backgroundColor: 'lightgray', margin: '20px 0', visibility: 'hidden' }}>
                Loading more items...
            </div> */}
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
