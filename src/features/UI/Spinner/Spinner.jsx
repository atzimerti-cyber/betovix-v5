import SpinnerIcon from '../../../assets/svgs/spinner.svg?react';
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.Spinner}>
            <SpinnerIcon />
        </div>
    );
};

export default Spinner;
