import { useEffect, useState, useRef } from "react";
import { Swiper } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import classes from "./SwiperMenu.module.css";

const SwiperMenu = (props) => {
  const swiperRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const alterState = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperUpdate = (swiper) => {
    timeoutRef.current = setTimeout(() => alterState(swiper), 200);
  };

  const handleSwiperInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true); // Set the interaction flag to true after the first interaction
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Swiper
      modules={[Scrollbar]}
      scrollbar={{
        draggable: true,
        dragSize: "70px",
        hide: hasInteracted, // Hide the scrollbar after the first interaction
      }}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={handleSwiperUpdate}
      onTouchStart={handleSwiperInteraction} // Track first interaction (touch or drag)
      slidesPerView={"auto"}
      slidesPerGroup={props.slidesPerGroup}
      spaceBetween={10}
      className={classes.SwiperMenu}
    >
      {props.children}
    </Swiper>
  );
};

export default SwiperMenu;
