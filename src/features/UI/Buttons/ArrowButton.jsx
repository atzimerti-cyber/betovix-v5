import classes from './ArrowButton.module.css';

const ArrowButton = (props) => {
    let elClasses = [classes.ArrowButton];
    if (props.disabled) elClasses.push(classes.Disabled);

    return (
        <button className={elClasses.join(' ')} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default ArrowButton;
