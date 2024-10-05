import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./HeroTimeline.module.css";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";

const HeroTimeline = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const currentLevel = useSelector((state) => state.gamification.currentLevel);

  const [visibleMilestoneIndex, setVisibleMilestoneIndex] = useState(0);

  // Refs to store each SubTimelineItem element
  const milestoneRefs = useRef([]);

  const toggleMilestone = (index) => {
    let timer;
    setVisibleMilestoneIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;

      timer = setTimeout(() => {
        // Scroll into view when the SubTimelineItems are shown
        if (newIndex !== null && milestoneRefs.current[index]) {
          milestoneRefs.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 800);

      return newIndex;
    });
    return clearTimeout(timer);
  };

  return (
    <div className={classes.TimelineContainer}>
      <div className={classes.TimelineTitle}>
        <span>
          {props.hero.name} {props.hero.subName}
        </span>
      </div>

      <div className={classes.TimelineTree}>
        {props.levels && Object.keys(props.levels).length > 0
          ? props.levels.map((level, index) => (
              <div className={classes.Entity} key={index}>
                <div
                  className={`${classes.TimelineItem} ${classes.Left}`}
                  onClick={() => toggleMilestone(index)}
                >
                  <div className={classes.TimelineContent}>
                    <span>{level.name}</span>
                    <p>{`LEVEL ${index + 1}`}</p>
                  </div>
                  <div className={classes.MainSeparator}>
                    <div className={classes.Connector}></div>
                    <div
                      // className={classes.Dot}
                      className={
                        level.id == currentLevel.id
                          ? [`${classes.Dot}`, `${classes.DotAnimation}`].join(
                              " "
                            )
                          : `${classes.Dot}`
                      }
                    >
                      <div className={classes.MainSVG}>
                        {/* <Logo /> */}
                        <img src={level.icon} />
                      </div>
                    </div>
                    <div className={classes.SubConnector}></div>
                  </div>
                  <div className={classes.OppositeContent}></div>
                </div>

                {level.milestones &&
                  level.milestones.map((milestone, milestoneIndex) => (
                    <div
                      className={`${classes.SubTimelineItem} ${
                        visibleMilestoneIndex === index
                          ? classes.SubTimelineItemVisible
                          : ""
                      }`}
                      key={`${index}-${milestoneIndex}`}
                      ref={(el) => (milestoneRefs.current[index] = el)}
                    >
                      <div
                        className={classes.SubOppositeContent}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.5em",
                          }}
                        >
                          {milestone.reward[0].description &&
                            milestone.reward[0].description
                              .split("?")
                              .map((part, index) => (
                                <React.Fragment key={index}>
                                  {index === 0 ? (
                                    <>{part}</>
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CoinsIcon
                                        style={{ margin: "0 0.2rem" }}
                                      />
                                      {part}
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                        </div>
                      </div>
                      <div className={classes.MainSeparator}>
                        <div className={classes.SubConnector}></div>
                        <div className={classes.SubDot}>
                          <div className={classes.SubSVG}>{/* <Logo /> */}</div>
                        </div>
                        <div className={classes.SubConnector}></div>
                      </div>
                      <div className={classes.SubTimelineContent}>
                        <span>{milestone.name}</span>
                        <p>
                          {milestone.progress === 0
                            ? "Locked"
                            : `${milestone.progress}%`}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HeroTimeline;
