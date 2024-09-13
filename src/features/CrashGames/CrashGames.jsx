import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SwiperWithOverlay from '../UI/MainSwiper/SwiperWithOverlay';
import NewIcon from '../../assets/svgs/crash-games.svg?react';
import { getCasinoCrashGames } from './crashGamesAsyncActions';
import { casinoCrashGamesActions } from './crashGamesSlice';
import useSlidesResponsive from '../../hooks/useSlidesResponsive';
import { translate } from '../../utils/translations';

const CrashGames = ({ onDataNotFound }) => {
    const crashGames = useSelector((state) => state.crashGames.casinoCrashGames);
    //const casinoFavs = useSelector((state) => state.casinoFavorites.casinoFavs);

    const slidesPerView = useSlidesResponsive().slidesPerView;
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();

        dispatch(getCasinoCrashGames(controller.signal));

        return () => {
            controller.abort();
            dispatch(casinoCrashGamesActions.reset());
        };
    }, []);

   

    //Remove Component if no favs found
    useEffect(() => {
        if (crashGames !== null && (crashGames.length === 0)) {
            onDataNotFound();
        }
    }, [crashGames, onDataNotFound]);

    return (
        <SwiperWithOverlay
            title={translate('Crash Games')}
            icon={<NewIcon />}
            // link='/casino/new-games'
            items={crashGames}
            slidesPerView={slidesPerView}
        />
    );
};

export default CrashGames;
