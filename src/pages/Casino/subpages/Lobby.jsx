import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Lobby.module.css';
import { casinoActions } from '../casinoSlice';
import { getCasino } from '../casinoAsyncActions';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';
import BigSwiper2 from '../../../features/UI/MainSwiper/BigSwiper2';
import SlotsIcon from '../../../assets/svgs/slots.svg?react';
import BlackjackIcon from '../../../assets/svgs/blackjack.svg?react';
import ClockIcon from '../../../assets/svgs/clock.svg?react';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import NewIcon from '../../../assets/casinoIcons/new.svg?react';
import { translate } from '../../../utils/translations';

const Lobby = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const casinoBanners = useSelector((state) => state.casino.casinoBanners);
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getCasino(signal));

        return () => {
            controller.abort();
            dispatch(casinoActions.resetLobby());
        };
    }, [user?.AccountId]);

    return (
        <>
            <BigSwiper2 items={casinoBanners} max={6} />

            {filteredGames['recentGames']?.Data.length > 0 && (
                <SwiperWithOverlay title={translate('Recently Played')} icon={<ClockIcon />} items={filteredGames['recentGames']?.Data} max={20} />
            )}

            {filteredGames['favoriteGames']?.Data.length > 0 && (
                <SwiperWithOverlay
                    title={translate('Favorites')}
                    icon={<HeartIcon />}
                    link='/casino/favorites'
                    items={filteredGames['favoriteGames']?.Data}
                    max={20}
                />
            )}

            {filteredGames['newGames']?.Data.length > 0 && (
                <SwiperWithOverlay
                    title={translate('New Games')}
                    icon={<NewIcon className={classes.NewIcon} />}
                    items={filteredGames['newGames']?.Data}
                    max={20}
                />
            )}

            <SwiperWithOverlay title={translate('Slots')} icon={<SlotsIcon />} link='/casino/slots' items={filteredGames['allSlots']?.Data} max={20} />
            <SwiperWithOverlay title={translate('Live Casino')} icon={<BlackjackIcon />} link='/casino/live' items={filteredGames['allLive']?.Data} max={20} />
        </>
    );
};

export default Lobby;
