import classes from './SkeletonGame.module.css';
import Shimmer from '../Shimmer/Shimmer';

const SkeletonGame = () => {
    return (
        <div className={classes.SkeletonWins}>
            <Shimmer />

            <div className={classes.Part1}></div>
            <div className={classes.Grouped1}>
                <div className={classes.Part2}></div>
                <div className={classes.Part3}></div>
            </div>
            <div className={classes.Grouped2}>
                <div className={classes.Part4}></div>
                <div className={classes.Part5}></div>
                <div className={classes.Part6}></div>
            </div>
        </div>
    );
};

export default SkeletonGame;
