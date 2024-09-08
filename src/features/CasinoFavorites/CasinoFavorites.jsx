import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SwiperWithOverlay from '../UI/MainSwiper/SwiperWithOverlay';
import HeartIcon from '../../assets/svgs/heart.svg?react';
import { getCasinoFavs } from './CasinoFavoritesAsync';
import { casinoFavoritesActions } from './CasinoFavoritesSlice';
import useSlidesResponsive from '../../hooks/useSlidesResponsive';
import { translate } from '../../utils/translations';

const CasinoFavorites = ({onDataNotFound}) => {
    const casinoFavs = useSelector((state) => state.casinoFavorites.casinoFavs);
    const slidesPerView = useSlidesResponsive().slidesPerView;
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();

        dispatch(getCasinoFavs(controller.signal));

        return () => {
            controller.abort();
            dispatch(casinoFavoritesActions.reset());
        };
    }, []);

    //Remove Component if no favs found
    useEffect(() => { 
        if (casinoFavs !== null && (casinoFavs.length === 0)) {
            onDataNotFound();  
        }
    }, [casinoFavs, onDataNotFound]);

    return (
        <SwiperWithOverlay
            title={translate('Favorites')}
            icon={<HeartIcon />}
            link='/casino/favorites'
            items={casinoFavs}
            slidesPerView={slidesPerView}
        />
    );
};

export default CasinoFavorites;
