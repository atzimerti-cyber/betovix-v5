import classes from './CloseButton.module.css';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';
import TimesIcon from '../../../assets/svgs/times.svg?react';

const CloseButton = (props) => {
    return (
        <button className={classes.CloseButton} onClick={props.onClick}>
            {props.timesIcon ? <TimesIcon className={classes.TimeIcon} /> : <AngleRightIcon />}
        </button>
    );
};

export default CloseButton;
