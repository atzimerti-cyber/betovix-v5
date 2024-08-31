import classes from './Preloader.module.css';
import { useState } from 'react';
import preloaderImage from '../../../assets/images/loading.webp';
import preloaderVideo from '../../../assets/mp4/betovix_logo_animation.mp4';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    const handleVideoEnd = () => {
        setLoading(false);
    };
    return (
        <div className={classes.Preloader}>
            {/* <img src={preloaderImage} alt='Loading' /> */}
            <video
                    autoPlay
                    muted
                    className={classes.PreloaderVideo}
                    onEnded={handleVideoEnd}
                >
                    <source src={preloaderVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        </div>
    );
};

export default Preloader;
