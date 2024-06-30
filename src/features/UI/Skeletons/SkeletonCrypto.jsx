import classes from './SkeletonCrypto.module.css';
import Shimmer from '../Shimmer/Shimmer';

const SkeletonCrypto = () => {
    return (
        <div className={classes.SkeletonCrypto}>
            <Shimmer />

            <div className={classes.Part1}></div>
            <div className={classes.Part2}></div>
        </div>
    );
};

export default SkeletonCrypto;
