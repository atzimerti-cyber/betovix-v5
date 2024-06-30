import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import classes from './CasinoGameCard.module.css';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import { removeFavoriteCasino, addFavoriteCasino } from '../casinoAsyncActions';
import { translate } from '../../../utils/translations';

const CasinoGameCard = (props) => {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(props.game.isFav);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const onToggleFavorite = () => {
        if (!user) {
            toast.warning('Login to access this feature');
            return;
        }

        if (isFavorite) {
            dispatch(removeFavoriteCasino(props.game.Data.Id));
            setIsFavorite(false);
        } else {
            dispatch(addFavoriteCasino(props.game.Data.Id));
            setIsFavorite(true);
        }
    };

    const gameType = props.game.Data.Tags.toLowerCase().includes('live') ? 'live' : 'slots';

    return (
        <div className={classes.SlideContainer}>
            <Link to={`/casino/game/${gameType}/${props.game.Data.Id}/${props.game.Data.BrandGameId}/${props.game.Data.Name}`}>
                <article className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        {!isLoaded && <LoaderPlaceholder />}
                        <img src={props.game.Data.ImageUrl} loading='lazy' onLoad={() => setIsLoaded(true)} />
                    </div>
                    {props.game.isNew && <div className={classes.NewLabel}>{translate('NEW')}</div>}
                    <div className={classes.InfoOverlay}>
                        <div className={classes.InfoContent}>
                            <div>
                                <p className={classes.InfoCategory}>{props.game.Data.BrandName}</p>
                                <p className={classes.Rtp}>{props.game.Data.Name}</p>
                            </div>
                            <HeartIcon
                                className={isFavorite ? classes.FavoriteIcon : null}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onToggleFavorite();
                                }}
                            />
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};

export default CasinoGameCard;
