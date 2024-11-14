import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import classes from "./MainSwiper.module.css";
import ArrowButton from "../Buttons/ArrowButton";
import AngleLeftIcon from "../../../assets/svgs/angle-left.svg?react";
import AngleRightIcon from "../../../assets/svgs/angle-right.svg?react";
import AngleRight2Icon from "../../../assets/svgs/arrowright2.svg?react";

import { translate } from "../../../utils/translations";

const MainSwiper = (props) => {
  const swiperRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  let modules = [];
  if (props.autoplay) modules.push(Autoplay);
  if (props.pagination) modules.push(Pagination);
  if (props.grid) modules.push(Grid);

  const alterState = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperUpdate = (swiper) => {
    timeoutRef.current = setTimeout(() => alterState(swiper), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  let elClasses = [classes.MainSwiperWrapper];
  if (props.pagination) elClasses.push(classes.WithPagination);
  if (props.scrolling) elClasses.push(classes.scrolling);

  let delay = 6000;
  if (props.delay) {
    delay = props.delay;
  }

  return (
    <div className={elClasses.join(" ")}>
      {props.noHeader ? null : (
        <div className={classes.SwiperHeader}>
          <div
            className={classes.Title}
            style={{ cursor: props.clickOnTitle && "pointer" }}
            onClick={props.clickOnTitle ? props.clickOnTitle : null}
          >
            {props.icon && props.icon}
            {props.thIcon && <i className={`${props.thIcon}`}></i>}
            {props.title && props.title}
            {props.clickOnTitle && (
              <div className={classes.GoToSVG}>
                <AngleRight2Icon />
              </div>
            )}
          </div>
          <div className={classes.NavButtons}>
            {props.viewAll && (
              <>
                <Link to={props.viewAll} className={classes.ViewAllLink}>
                  {translate(`View all`)} <AngleRight2Icon />
                </Link>
              </>
            )}
            {props.viewText && (
              <a
                className={classes.ViewAllLink}
                onClick={props.onTask ? props.onTask : null}
              >
                {props.viewText}
              </a>
            )}

            {!props.hideArrows ? (
              <>
                <ArrowButton
                  disabled={isBeginning}
                  onClick={() => swiperRef.current.slidePrev()}
                >
                  <AngleLeftIcon />
                </ArrowButton>
                <ArrowButton
                  disabled={
                    isEnd ||
                    props.children.length <= props.slidesPerView ||
                    Array.isArray(props.children) === false
                  }
                  onClick={() => swiperRef.current.slideNext()}
                >
                  <AngleRightIcon />
                </ArrowButton>
              </>
            ) : null}
          </div>
        </div>
      )}

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        grid={{
          rows: props.gridRows || null,
          fill: props.gridFill || null,
        }}
        onSlideChange={handleSwiperUpdate}
        slidesPerView={props.slidesPerView}
        slidesPerGroup={props.slidesPerGroup}
        spaceBetween={props.spaceBetween ? props.spaceBetween : 16}
        autoplay={
          props.autoplay
            ? {
                delay: delay,
                disableOnInteraction: false,
              }
            : null
        }
        pagination={{
          clickable: true,
        }}
        modules={modules}
        loop={props.loop && true}
        className={classes.MainSwiper}
      >
        {props.children}
      </Swiper>
    </div>
  );
};

export default MainSwiper;
