import classes from './SkeletonMilestone.module.css';
import Shimmer from '../Shimmer/Shimmer';

const SkeletonMilestone = () => {
    return (
        <div className={classes.SkeletonMilestone}>
            <Shimmer />

            <div className={classes.Part1}></div>
            <div className={classes.Part2}></div>
            <div className={classes.Part3}></div>
        </div>
    );
};

export default SkeletonMilestone;
