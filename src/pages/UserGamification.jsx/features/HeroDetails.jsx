import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./HeroDetails.module.css";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";

const HeroDetails = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const currentLevel = useSelector((state) => state.gamification.currentLevel);

  const [visibleMilestoneIndex, setVisibleMilestoneIndex] = useState(0);

  const milestoneRefs = useRef([]);

  const toggleMilestone = (index, level) => {
    console.log(index);
    console.log(level);
    // setVisibleMilestoneIndex((prevIndex) => {
    //   const newIndex = prevIndex === index ? null : index;
    //   return newIndex;
    // });
  };

  useEffect(() => {
    if (props.levels && props.levels.length > 0) {
      setVisibleMilestoneIndex(0);
    }
  }, [props.levels]);

  return (
    <div className={classes.TimelineContainer}>
      <div className={classes.Menu}>
        {props.levels &&
          props.levels.length > 0 &&
          props.levels.map((level, index) => (
            <div
              key={index}
              className={classes.LevelContainer}
              onClick={() => {
                toggleMilestone(index, level);
              }}
            >
              <div className={classes.ImageContainer}>
                <img src={level.icon} alt={`Level ${index + 1} Icon`} />
              </div>
              <div className={classes.LevelInfo}>
                <span>{level.name}</span>
                <p>{`LEVEL ${index + 1}`}</p>
              </div>
            </div>
          ))}
      </div>
      <div className={classes.Viewport}>
         {/* {visibleMilestone && (

         )} */}
      </div>
    </div>
  );
};

export default HeroDetails;
