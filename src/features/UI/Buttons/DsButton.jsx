import classes from './DsButton.module.css';

const DsButton = (props) => {
    let elClasses = [classes.DsButton];

    if (props.active) elClasses.push(classes.Active);
    if (props.locked) elClasses.push(classes.Locked);
    if (props.disabled) elClasses.push(classes.Disabled);

    return (
        <button onClick={props.onClick} className={elClasses.join(' ')}>
            {props.children}
        </button>
    );
};

export default DsButton;
