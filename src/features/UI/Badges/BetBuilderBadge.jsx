import classes from "./BetBuilderBadge.module.css";

const BetBuilderBadge = (props) => {
  let elClasses = [classes.BBBadge];
  if (props.floating) elClasses.push(classes.Floating);
  if (props.justifyRight) elClasses.push(classes.JustifyRight);

  return <div className={elClasses.join(" ")}>BB</div>;
};

export default BetBuilderBadge;
