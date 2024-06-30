import classes from './ImageNotFound.module.css';
import NoImageIcon from '../../../assets/svgs/no-image.svg?react';

const ImageNotFound = () => {
    return (
        <div className={classes.ImageNotFound}>
            <NoImageIcon />
            Image not found!
        </div>
    );
};

export default ImageNotFound;
