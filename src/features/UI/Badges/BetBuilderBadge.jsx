import classes from "./BetBuilderBadge.module.css";

const BetBuilderBadge = (props) => {
  let elClasses = [classes.BBBadge];
  if (props.floating) elClasses.push(classes.Floating);
  if (props.justifyRight) elClasses.push(classes.JustifyRight);
  if (true) elClasses.push(classes.HoverExpand);

  return (
    <div className={elClasses.join(" ")}>
      <span className={classes.ShortText}>BB</span>
      <span className={classes.FullText}>Bet Builder</span>
    </div>
  );
};

export default BetBuilderBadge;
