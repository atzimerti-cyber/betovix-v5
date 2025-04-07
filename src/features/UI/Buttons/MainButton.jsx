import { useRef, useEffect } from "react";

import classes from "./MainButton.module.css";
import Spinner from "../Spinner/Spinner";

const MainButton = (props) => {
  const timeoutRef = useRef(null);

  let elClasses = [classes.MainButton];

  if (props.color === "primary") elClasses.push(classes.Primary);
  else if (props.color === "secondary") elClasses.push(classes.Secondary);
  else if (props.color === "transparent") elClasses.push(classes.Transparent);
  else if (props.color === "dark") elClasses.push(classes.Dark);
  else if (props.color === "bv-light-green") elClasses.push(classes.BVixLGreen);
  else if (props.color === "danger") elClasses.push(classes.Danger);

  if (props.size === "small") elClasses.push(classes.Small);

  if (props.shimmer) elClasses.push(classes.Shimmer);
  if (props.active) elClasses.push(classes.Active);
  if (props.active2) elClasses.push(classes.Active2);
  if (props.active3) elClasses.push(classes.Active3);
  if (props.disabled) elClasses.push(classes.Disabled);
  if (props.loading) {
    elClasses.push(classes.Loading);
    elClasses.push(classes.Disabled);
  }

  if (props.noPad) elClasses.push(classes.noPadding);

  const onClick = (e) => {
    e.preventDefault();
    timeoutRef.current = setTimeout(props.onClick, 150);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const {
    color,
    size,
    active,
    disabled,
    loading,
    dataTooltipId,
    dataTooltipContent,
    children,
    onClick: propsOnClick,
    ...rest
  } = props;

  return (
    <button
      id={props.color ? `MainButton_${props.color}` : null}
      onClick={onClick}
      className={elClasses.join(" ")}
      data-tooltip-id={dataTooltipId}
      data-tooltip-content={dataTooltipContent}
      disabled={disabled}
    >
      {loading ? <Spinner /> : children}
      {/* {props.newBadge && (
        <div className={classes.NewBadge} id="newBadge">
          NEW
        </div>
      )} */}
    </button>
  );
};

export default MainButton;
