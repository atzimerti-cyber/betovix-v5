import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import classes from './Home.module.css';
import HomeBanners from './features/HomeBanners';
import LiveEvents from './features/LiveEvents';
import TopEvents from './features/TopEvents';
import { getHome } from './homeAsyncActions';
import { homeActions } from './homeSlice';
import { getEventsTop } from './homeAsyncActions';
import SwiperWithOverlay from '../../features/UI/MainSwiper/SwiperWithOverlay';
import ClockIcon from '../../assets/svgs/clock.svg?react';
import HeartIcon from '../../assets/svgs/heart.svg?react';
import NewIcon from '../../assets/casinoIcons/new.svg?react';
import VipProgress from './features/VipProgress';
import RegisterContainers from './features/RegisterContainers';
import Crypto from './features/Crypto';

const Home = () => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);

    const [axiosSignal, setAxiosSignal] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosSignal(signal);

        dispatch(getHome(signal));

        return () => {
            controller.abort();
            dispatch(homeActions.reset());
        };
    }, [user?.AccountId]);

    // Observers
    const divs = [{ ref: useRef(null), type: 'getEventsTop' }];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const divInfo = divs.find((div) => div.ref.current === entry.target);
                        if (
                            divInfo
                            // && !data[divInfo.api]
                        ) {
                            // if (divInfo.type === 'getEventsLive') dispatch(getEventsLive(axiosSignal));
                            if (divInfo.type === 'getEventsTop') dispatch(getEventsTop(axiosSignal));
                        }
                        observer.unobserve(entry.target); // Optionally stop observing
                    }
                });
            },
            {
                root: null,
                threshold: 0.2, // Adjust threshold as needed
            }
        );

        // Observing all divs
        divs.forEach((div) => {
            if (div.ref.current) {
                observer.observe(div.ref.current);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [divs]);

    return (
        <div className={classes.PageContent}>
            <div className={classes.Home}>
                <div className={isMobile && !user ? [classes.BannersContent, classes.AdjustMargins].join(' ') : classes.BannersContent}>
                    {(isMobile === false || user === null) && <HomeBanners isMobile={isMobile} />}
                    {!isMobile && user && (
                        <div className={classes.VipContainer}>
                            <VipProgress />
                        </div>
                    )}
                    {isMobile && user && <VipProgress />}

                    {!user && <RegisterContainers />}
                </div>

                <Crypto />

                {permissions.AllowToSports && (
                    <>
                        <LiveEvents />

                        <div ref={divs[0].ref}>
                            <TopEvents />
                        </div>
                    </>
                )}

                {permissions.AllowToCasino || permissions.AllowToSlots ? (
                    <SwiperWithOverlay
                        title='New Games'
                        icon={<NewIcon className={classes.NewIcon} />}
                        link='/casino/slots'
                        items={filteredGames.newGames?.Data}
                    />
                ) : null}

                {user && (permissions.AllowToCasino || permissions.AllowToSlots) ? (
                    <>
                        <SwiperWithOverlay title='Recently Played' icon={<ClockIcon />} items={filteredGames.recentGames?.Data} />
                        <SwiperWithOverlay title='Favorites' icon={<HeartIcon />} link='/casino/favorites' items={filteredGames.favoriteGames?.Data} />
                    </>
                ) : null}

            </div>
        </div>
    );
};

export default Home;
