import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import classes from './VendorCard.module.css';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import BonusIcon from '../../../assets/svgs/bonus.svg?react';
//import { removeFavoriteCasino, addFavoriteCasino } from '../casinoAsyncActions';
import { translate } from '../../../utils/translations';

const VendorCard = (props) => {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    //const [isFavorite, setIsFavorite] = useState(props.game.isFav);
    const containerRef = useRef(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);


    useEffect(() => {
        if (isLoaded && containerRef.current) {
            const dominantColor = getDominantColor(containerRef.current.querySelector('img'));
            containerRef.current.style.backgroundImage = dominantColor;
        }
    }, [isLoaded]);

    // const onToggleFavorite = () => {
    //     if (!user) {
    //         toast.warning('Login to access this feature');
    //         return;
    //     }

    //     if (isFavorite) {
    //         dispatch(removeFavoriteCasino(props.game.Data.Id));
    //         setIsFavorite(false);
    //     } else {
    //         dispatch(addFavoriteCasino(props.game.Data.Id));
    //         setIsFavorite(true);
    //     }
    // };

    function getDominantColor(imgElement) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const isGrayscale = Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;

        if (isGrayscale) {
            // r = 100;
            // g = 146;
            // b = 45;
            r = 50;
            g = 87;
            b = 54;
        }

        // return `rgba(${r},${g},${b}`;
        return `linear-gradient(50deg, rgba(${r},${g},${b},0.6), transparent)`;
    }

    return (
        <div className={classes.SlideContainer}>
            <Link to={`/search?provider=${props.vendor.Data.Name}`}>
                <article className={classes.Card}>
                    <div className={classes.ImageContainer} ref={containerRef}>
                        {!isLoaded && <LoaderPlaceholder />}
                        <img src={props.vendor.Data.Logo} crossOrigin="anonymous" loading='lazy' onLoad={() => setIsLoaded(true)}>
                        
                        </img>
                    </div>
                    {props.vendor.isNew && <div className={classes.NewLabel}>{translate('NEW')}</div>}
                    <div className={classes.InfoOverlay}>
                        <div className={classes.InfoContent}>
                            <div>
                                <p className={classes.InfoCategory}>{props.vendor.Data.Name}</p>
                                <p className={classes.Rtp}>{props.vendor.GameCount} {translate("Games")}</p>
                            </div>
                            {/* <HeartIcon
                                className={isFavorite ? classes.FavoriteIcon : null}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onToggleFavorite();
                                }}
                            /> */}
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};

export default VendorCard;
