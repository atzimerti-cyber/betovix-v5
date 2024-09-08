import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SwiperWithOverlay from '../UI/MainSwiper/SwiperWithOverlay';
import NewIcon from '../../assets/casinoIcons/new.svg?react';
import { getCasinoNewGames } from './CasinoNewAsync';
import { casinoNewActions } from './CasinoNewGamesSlice';
import useSlidesResponsive from '../../hooks/useSlidesResponsive';
import { translate } from '../../utils/translations';

const CasinoNewGames = () => {
    const casinoNew = useSelector((state) => state.casinoNew.casinoNew);
    const slidesPerView = useSlidesResponsive().slidesPerView;
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();

        dispatch(getCasinoNewGames(controller.signal));

        return () => {
            controller.abort();
            dispatch(casinoNewActions.reset());
        };
    }, []);
    return (
        <SwiperWithOverlay
            title={translate('New Games')}
            icon={<NewIcon />}
            // link='/casino/new-games'
            items={casinoNew}
            slidesPerView={slidesPerView}
        />
    );
};

export default CasinoNewGames;
