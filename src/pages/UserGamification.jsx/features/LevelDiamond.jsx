import classes from './LevelDiamond.module.css';

const LevelDiamond = (props) => {
    return (
        <div className={classes.DiamondPosition}>
            <div className={props.complete ? [classes.Diamond, classes.Complete].join(' ') : classes.Diamond}>
                <span>{props.index}</span>
            </div>
        </div>
    );
};

export default LevelDiamond;
