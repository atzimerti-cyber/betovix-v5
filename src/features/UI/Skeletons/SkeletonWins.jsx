import classes from './SkeletonWins.module.css';
import Shimmer from '../Shimmer/Shimmer';

const SkeletonWins = () => {
    return (
        <div className={classes.SkeletonWins}>
            <Shimmer />

            <div className={classes.Part1}></div>
            <div className={classes.Part2}></div>
            <div className={classes.Part3}></div>
        </div>
    );
};

export default SkeletonWins;
