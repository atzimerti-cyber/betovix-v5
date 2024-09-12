import classes from './Preloader.module.css';
import { useState } from 'react';
//import preloaderImage from '../../../assets/images/loading.webp';
import preloaderVideo from '../../../assets/mp4/betovix_logo_animation.mp4';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    const handleVideoEnd = () => {
        setLoading(false);
    };
    return (
        <div className={classes.Preloader}>
              {/* <img src={preloaderImage} alt='Loading' />   */}
              {/* <img src='loading.webp' alt='Loading' />  */}
              
              <video 
                src={preloaderVideo}   // Path to your MP4 video
                autoPlay 
                loop 
                muted 
                playsInline  // Prevents iOS fullscreen autoplay
                style={{ width: '100%', height: 'auto' }}  // Adjust this to fit your layout
            />
               
            {/* <video
                    autoPlay
                    muted
                    className={classes.PreloaderVideo}
                    onEnded={handleVideoEnd}
                >
                    <source src={preloaderVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
        </div>
    );
};

export default Preloader;
