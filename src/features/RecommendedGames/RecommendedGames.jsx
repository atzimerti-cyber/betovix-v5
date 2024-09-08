import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SwiperWithOverlay from '../UI/MainSwiper/SwiperWithOverlay';
import NewIcon from '../../assets/casinoIcons/new.svg?react';
import { getRecommendedGames } from './recommendedGamesAsyncActions';
import { recommendedGamesActions } from './recommendedGamesSlice';
import useSlidesResponsive from '../../hooks/useSlidesResponsive';
import { translate } from '../../utils/translations';

const RecommendedGames = ({ onDataNotFound }) => {
    const recommendedGames = useSelector((state) => state.recommendedGames.recommendedGames);
    const slidesPerView = useSlidesResponsive().slidesPerView;
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();

        dispatch(getRecommendedGames(controller.signal));

        return () => {
            controller.abort();
            dispatch(recommendedGamesActions.reset());
        };
    }, []);

    //Remove Component if no favs found
    useEffect(() => {
        if (recommendedGames != null && (recommendedGames.length === 0)) {
            onDataNotFound();
        }
    }, [recommendedGames, onDataNotFound]);

    return (
        <SwiperWithOverlay
            title={translate('Recommended Games')}
            icon={<NewIcon />}
            // link='/casino/new-games'
            items={recommendedGames}
            slidesPerView={slidesPerView}
        />
    );
};

export default RecommendedGames;