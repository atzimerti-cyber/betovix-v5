import classes from './LoaderPlaceholder.module.css';
import Shimmer from '../Shimmer/Shimmer';

const LoaderPlaceholder = (props) => {
    return (
        <div className={classes.LoaderPlaceholder} style={props.extraStyles ? props.extraStyles : null}>
            <Shimmer />
        </div>
    );
};

export default LoaderPlaceholder;
