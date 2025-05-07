import { useState, useRef, useEffect } from "react";

import classes from "./Accordion.module.css";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Ripple from "../Ripple/Ripple";
import { useDispatch, useSelector } from "react-redux";
import { sportsHomeActions } from "../../../pages/SportsBook/subpages/sportsHomeSlice";
import {
  storageAddFavMarket,
  storageGetFavMarkets,
  storageRemoveFavMarket,
} from "../../../utils/storage";
import StarIcon from "../../../assets/svgs/star.svg?react";
import { eventActions } from "../../../pages/Event/eventSlice";

const Accordion = (props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const openCategoryId = useSelector((state) => state.sportsHome.categoryOpen);
  const tournamentOpenId = useSelector(
    (state) => state.sportsHome.tournamentOpen
  );
  const selectedCategoryId = useSelector(
    (state) => state.sportsHome.selectedCategory
  );

  const [isOpen, setIsOpen] = useState(props.initOpen);
  const [isFavorite, setIsFavorite] = useState(false);

  // useEffect(() => {
  //   if (!props.marketGroup) return;
  //   const favMarkets = storageGetFavMarkets();
  //   if (
  //     favMarkets &&
  //     favMarkets[props.sportName] &&
  //     favMarkets[props.sportName].includes(props.groupName)
  //   )
  //     setIsFavorite(true);
  // }, []);

  useEffect(() => {
    if (!props.marketGroup) return;

    const favMarkets = storageGetFavMarkets();

    if (favMarkets && favMarkets[props.sportName]) {
      props.group.forEach((market) => {
        if (
          favMarkets[props.sportName].includes(market.MarketName?.International)
        ) {
          setIsFavorite(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId === props.catId) {
      setIsOpen(true);
      setAccordionInViewportTop("back");
    }
  }, []);

  const setAccordionInViewportTop = () => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 0);
    }
  };

  const handleClick = (id) => {
    if (id !== openCategoryId) {
      if (!isOpen) {
        setAccordionInViewportTop();
      }
      setIsOpen(!isOpen);
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();

    props.group.map((market, i) => {
      if (isFavorite) {
        // storageRemoveFavMarket(props.sportName, props.groupName);
        storageRemoveFavMarket(
          props.sportName,
          market.MarketName?.International
        );
      } else {
        // storageAddFavMarket(props.sportName, props.groupName);
        storageAddFavMarket(props.sportName, market.MarketName?.International);
      }
    });

    const favMarkets = storageGetFavMarkets();
    dispatch(eventActions.setFavMarkets(favMarkets));

    setIsFavorite(!isFavorite);
  };

  return (
    <section
      data-accordion="sportsAccordionBig"
      className={
        openCategoryId && props.catId
          ? props.catId === openCategoryId
            ? [classes.Accordion, classes.Open].join(" ")
            : classes.Accordion
          : isOpen
          ? [classes.Accordion, classes.Open].join(" ")
          : classes.Accordion
      }
    >
      <div
        className={classes.AccordionHeader}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen && props.onOpen) props.onOpen();

          {
            props.catId ? handleClick(props.catId) : setIsOpen(!isOpen);
          }
        }}
        ref={ref}
      >
        <Ripple type="square" faint />
        {/* {props.marketGroup && (
          <div className={classes.StarIcon} onClick={toggleFavorite}>
            {isFavorite ? (
              <StarIcon fill="#ffd000d1" />
            ) : (
              <StarIcon fill="#ffffff45" />
            )}
          </div>
        )} */}
        {props.icon && (
          <span className={classes.IconWrapper}>{props.icon}</span>
        )}
        {props.catIcon && (
          <div className={classes.CatIconWrapper}>
            <div
              className={classes.CatIcon}
              style={{ backgroundImage: `${props.catIcon}` }}
            ></div>
          </div>
        )}
        <span className={classes.HeaderContent}>{props.title}</span>
        {props.marketGroup && (
          <div className={classes.StarIcon} onClick={toggleFavorite}>
            {isFavorite ? (
              <StarIcon fill="#ffd000d1" />
            ) : (
              <StarIcon fill="#ffffff45" />
            )}
          </div>
        )}
        <AngleDownIcon />
      </div>

      {openCategoryId && props.catId
        ? props.catId === openCategoryId && (
            <div className={classes.AccordionBody}>{props.children}</div>
          )
        : isOpen && (
            <div className={classes.AccordionBody}>{props.children}</div>
          )}
    </section>
  );
};

export default Accordion;
