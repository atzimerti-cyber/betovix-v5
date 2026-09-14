import classes from './Minibar.module.css';
import useSlidesResponsive from '../../../hooks/useSlidesResponsive';

const Minibar = () => {
    const { isMobile, isTablet } = useSlidesResponsive();

    if (isMobile || isTablet) return null;

    return (
        <div className={classes.Minibar}>
            <div className={classes.MinibarLeftWrapper}></div>
            <div className={classes.MinibarCenterWrapper}></div>
            <div className={classes.MinibarRightWrapper}></div>
        </div>
    );
};

export default Minibar;
