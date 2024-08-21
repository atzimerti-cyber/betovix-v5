import { useState } from 'react';
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

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

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

    return (
        <div className={classes.SlideContainer}>
            <Link to={`/search?provider=${props.vendor.Data.Name}`}>
                <article className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        {!isLoaded && <LoaderPlaceholder />}
                        <img src={props.vendor.Data.Logo} loading='lazy' onLoad={() => setIsLoaded(true)} />
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
