import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { forwardRef } from "react";

import classes from "./BigSwiper.module.css";

const BigSwiper = forwardRef((props, ref) => {
  let modules = [Pagination];
  if (props.autoplay) modules.push(Autoplay);

  return (
    <div className={classes.MainSwiperWrapper}>
      <Swiper
        ref={ref}
        slidesPerView={props.slidesPerView}
        spaceBetween={props.spaceBetween ? props.spaceBetween : 30}
        // spaceBetween={30}
        autoplay={
          props.autoplay
            ? {
                delay: props.delay || 6000,
                disableOnInteraction: false,
              }
            : null
        }
        pagination={
          props.noPagination
            ? false
            : {
                clickable: true,
              }
        }
        modules={modules}
        className={classes.MainSwiper}
        loop={props.loop ? true : false}
        allowTouchMove={props.noTouchMove ? false : true}
        onSlideChange={props.onSlideChange}
      >
        {props.children}
      </Swiper>
    </div>
  );
});

export default BigSwiper;
