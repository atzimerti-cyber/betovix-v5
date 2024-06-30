import classes from './RewardsCategory.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { formatNumberTo } from '../../../utils/custom';

const RewardsCategory = (props) => {
    return (
        <div className={classes.Category}>
            <span className={classes.CategoryProgress} style={{ '--progress': `${props.progress}%` }}></span>
            <div className={classes.CategoryContent}>
                <p className={classes.CategoryText}>{props.label}</p>
                <p className={classes.CategoryText}>{props.progress}%</p>
                <CoinsIcon />
                <p className={classes.CategoryBits}>{formatNumberTo(props.bits)}</p>
            </div>
        </div>
    );
};

export default RewardsCategory;
