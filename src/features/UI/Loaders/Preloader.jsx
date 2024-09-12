import classes from './Preloader.module.css';
import { useState, useRef , useEffect} from 'react';
//import preloaderImage from '../../../assets/images/loading.webp';
import preloaderVideo from '../../../assets/mp4/betovix_logo_animation.mp4';

const Preloader = () => {
     
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
    
        // Ensure the video plays after it's preloaded
        const handleCanPlayThrough = () => {
          setIsLoaded(true); // Video is ready to play
          video.play();      // Force autoplay when video is ready
        };
    
        const fallbackAutoplay = () => {
            setTimeout(() => {
              if (!isLoaded && video) {
                video.play();
              }
            }, 1000);  // Attempt to play after 1 second as a fallback
          };
        
          if (video) {
            video.addEventListener('canplaythrough', handleCanPlayThrough);
            fallbackAutoplay();  // Fallback in case iPhone 11 doesn't handle canplaythrough
          }
    
        return () => {
          if (video) {
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
          }
        };
      }, [isLoaded]);

    return (
        <div className={classes.Preloader}>
              {/* <img src={preloaderImage} alt='Loading' />   */}
              {/* <img src='loading.webp' alt='Loading' />  */}
              
              <video
                ref={videoRef}
                src={preloaderVideo} // Replace with the correct video source
                preload="auto"  // Preload the entire video
                loop
                muted
                playsInline
                style={{ width: '100%', height: 'auto' }}  // Adjust to fit your layout
                controls={false}  // Ensure controls are hidden
                autoplay
            />
                {!isLoaded && <div>Loading video...</div>}  {/* Show loading indicator */}
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
