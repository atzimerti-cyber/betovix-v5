import classes from './NumberBadge.module.css';

const NumberBudge = (props) => {
    let elClasses = [classes.NumberBadge];
    if (props.floating) elClasses.push(classes.Floating);
    if (props.justifyRight) elClasses.push(classes.JustifyRight);

    return <div className={elClasses.join(' ')}>{props.number}</div>;
};

export default NumberBudge;
