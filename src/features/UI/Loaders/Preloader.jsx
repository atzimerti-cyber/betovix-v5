import classes from './Preloader.module.css';
import preloaderImage from '../../../assets/images/loading.webp';

const Preloader = () => {
    return (
        <div className={classes.Preloader}>
            <img src={preloaderImage} alt='Loading' />
        </div>
    );
};

export default Preloader;
