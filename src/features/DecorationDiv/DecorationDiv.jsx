import classes from './DecorationDiv.module.css';

const DecorationDiv = (props) => {
    let elClasses = [classes.DecorationDiv];
    if (props.color === 'secondary') elClasses.push(classes.Secondary);
    else elClasses.push(classes.Primary);

    return (
        <div className={elClasses.join(' ')}>
            <div className={classes.Container}>{props.children}</div>
        </div>
    );
};

export default DecorationDiv;
