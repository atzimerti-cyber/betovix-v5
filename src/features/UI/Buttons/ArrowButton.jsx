import classes from './ArrowButton.module.css';

const ArrowButton = (props) => {
    let elClasses = [classes.ArrowButton];
    if (props.disabled) elClasses.push(classes.Disabled);
    if (props.showArrows) elClasses.push(classes.showArrows);

    return (
        <button className={elClasses.join(' ')} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default ArrowButton;
