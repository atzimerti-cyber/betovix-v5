import { useState, useRef, useEffect } from "react";
import classes from "./AccordionSmall.module.css";
import AngleDownIcon from "../../../assets/svgs/angle-down.svg?react";
import Ripple from "../Ripple/Ripple";
import { useDispatch, useSelector } from "react-redux";
import { sportsHomeActions } from "../../../pages/SportsBook/subpages/sportsHomeSlice";

const AccordionSmall = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(props.initOpen);
  const ref = useRef(null);

  const tournamentOpenId = useSelector(
    (state) => state.sportsHome.tournamentOpen
  );
  const selectedTournamentId = useSelector(
    (state) => state.sportsHome.selectedTournament
  );

  useEffect(() => {
    if (selectedTournamentId !== null && selectedTournamentId === props.catId) {
      setAccordionInViewportTop("back");
    }
    return () => {};
  }, []);
  // }, [selectedTournamentId, , props.catId]);

  // useEffect(() => {
  //   if (selectedTournamentId !== null && selectedTournamentId === props.catId) {
  //     setAccordionInViewportTop("back");
  //   }
  // }, []);
  // }, [selectedTournamentId, props.catId]);

  const setAccordionInViewportTop = (origin) => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: origin === "back" ? "instant" : "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 0);
    }
  };

  const handleClick = (id) => {
    if (id !== tournamentOpenId) {
      if (!isOpen) {
        setAccordionInViewportTop();
      }
      setIsOpen(!isOpen);
      //   dispatch(sportsHomeActions.setTournamentOpen(id));
      // } else {
      //   dispatch(sportsHomeActions.setTournamentOpen(null));
    }
  };

  return (
    <section
      data-accordion="sportsAccordionSmall"
      className={
        selectedTournamentId && props.catId
          ? props.catId === selectedTournamentId
            ? [classes.Accordion, classes.Open].join(" ")
            : classes.Accordion
          : isOpen
          ? [classes.Accordion, classes.Open].join(" ")
          : classes.Accordion
      }
    >
      <div className={classes.AccordionBase}>
        <div
          className={classes.AccordionHeader}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen && props.onOpen) props.onOpen();

            if (props.catId) {
              handleClick(props.catId);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          ref={ref} // Attach the ref here
        >
          <Ripple type="square" faint />

          {props.icon && (
            <span className={classes.IconWrapper}>{props.icon}</span>
          )}
          <span className={classes.HeaderContent}>{props.title}</span>
          <AngleDownIcon />
        </div>

        {tournamentOpenId && props.catId
          ? props.catId === tournamentOpenId && (
              <div className={classes.AccordionBody}>{props.children}</div>
            )
          : isOpen && (
              <div className={classes.AccordionBody}>{props.children}</div>
            )}
      </div>
    </section>
  );
};

export default AccordionSmall;
