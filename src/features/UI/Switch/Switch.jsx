import classes from './Switch.module.css';

const Switch = (props) => {
    let elClasses = [classes.Switch];
    if (props.active) elClasses.push(classes.Active);

    return (
        <div className={elClasses.join(' ')} onClick={props.onClick}>
            <div className={classes.SwitchIcon}>
                <div className={classes.SwitchHandle}></div>
            </div>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type='checkbox' role='switch' className={classes.Hidden} ></input>
        </div>
    );
};

export default Switch;
