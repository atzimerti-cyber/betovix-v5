import { useRef, useEffect } from "react";

import classes from "./InteractiveButton.module.css";
import Spinner from "../Spinner/Spinner";

const InteractiveButton = (props) => {
  const timeoutRef = useRef(null);

  let elClasses = [classes.InteractiveButton];

  if (props.color === "primary") elClasses.push(classes.Primary);
  else if (props.color === "secondary") elClasses.push(classes.Secondary);
  else if (props.color === "transparent") elClasses.push(classes.Transparent);
  else if (props.color === "dark") elClasses.push(classes.Dark);
  else if (props.color === "bv-light-green") elClasses.push(classes.BVixLGreen);
  else if (props.color === "danger") elClasses.push(classes.Danger);
  else if (props.color === "yellow") elClasses.push(classes.Yellow);

  if (props.size === "small") elClasses.push(classes.Small);

  if (props.active) elClasses.push(classes.Active);
  if (props.disabled) elClasses.push(classes.Disabled);
  if (props.loading) {
    elClasses.push(classes.Loading);
    elClasses.push(classes.Disabled);
  }

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
      onClick={onClick}
      className={elClasses.join(" ")}
      data-tooltip-id={dataTooltipId}
      data-tooltip-content={dataTooltipContent}
      disabled={disabled}
    >
      <div className={classes.ImgWrapper}>
        {props.image && (
          <img className={classes.StaticImg} src={props.image} alt="" />
        )}
        {props.gif && <img className={classes.Gif} src={props.gif} alt="" />}
      </div>
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default InteractiveButton;
