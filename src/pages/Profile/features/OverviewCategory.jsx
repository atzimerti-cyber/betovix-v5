import classes from './OverviewCategory.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { formatNumberTo } from '../../../utils/custom';

const OverviewCategory = (props) => {
    return (
        <div className={classes.OverviewCategory}>
            <span className={classes.CategoryProgress} style={{ '--progress': props.percentage }}></span>
            <div className={classes.CategoryContent}>
                <p className={classes.CategoryText}>{props.title}</p>
                <p className={classes.CategoryText}>{props.percentage}</p>
                <CoinsIcon />
                <p className={classes.CategoryBits}>{formatNumberTo(props.bits)}</p>
            </div>
        </div>
    );
};

export default OverviewCategory;
