import classes from './SkeletonGameCardRow.module.css';
import Shimmer from '../Shimmer/Shimmer';

const SkeletonGameCardRow = () => {
    return (
        <div className={classes.SkeletonGameCardRow}>
            <Shimmer />

            <div className={classes.Part1}></div>
            <div className={classes.Grouped}>
                <div className={classes.Part2}></div>
                <div className={classes.Part3}></div>
            </div>
        </div>
    );
};

export default SkeletonGameCardRow;
