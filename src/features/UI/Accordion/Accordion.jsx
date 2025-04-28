import { useState, useRef, useEffect } from "react";

import classes from "./Accordion.module.css";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Ripple from "../Ripple/Ripple";
import { useDispatch, useSelector } from "react-redux";
import { sportsHomeActions } from "../../../pages/SportsBook/subpages/sportsHomeSlice";

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

  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(props.initOpen);

  // useEffect(() => {
  //   if (tournamentOpenId === null && openCategoryId) {
  //     setAccordionInViewportTop();
  //   }
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   if (selectedCategoryId !== null && selectedCategoryId === props.catId) {
  //     setAccordionInViewportTop("back");
  //   }
  // }, []);
  // }, [selectedCategoryId, props.catId]);

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
      //dispatch(sportsHomeActions.setCategoryOpen(id));
      // } else {
      //   dispatch(sportsHomeActions.setCategoryOpen(null));
      //   dispatch(sportsHomeActions.setTournamentOpen(null));
    }
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
        ref={ref} // Attach the ref here
      >
        <Ripple type="square" faint />

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
