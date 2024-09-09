import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import MainSwiper from '../../../features/UI/MainSwiper/MainSwiper';
import VideoIcon from '../../../assets/svgs/video.svg?react';
import classes from './LiveEvents.module.css';
import SkeletonGame from '../../../features/UI/Skeletons/SkeletonGame';
import GameCard from '../../../features/Game/GameCard';
import { translate } from '../../../utils/translations';
import useSlidesResponsive from '../../../hooks/useSlidesResponsive';

const LiveEvents = () => {
    const liveState = useSelector((state) => state.live.liveState);

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("match");

    return (
        <div className={classes.LiveSwiper}>
            <MainSwiper
                slidesPerView={slidesPerView}
                slidesPerGroup={slidesPerGroup}
                icon={<VideoIcon />}
                title={<Link to='/sportsbook/live'>{translate('Live Events')}</Link>}
                viewAll='/sportsbook/live'
            >
                {liveState
                    ? Object.keys(liveState).map((key, index) => {
                        const game = liveState[key];

                        if (index > 9) return null;
                        if (!game.Header?.Active) return null;

                        return (
                            <SwiperSlide key={game.MatchId}>
                                <div className={classes.SlideContainer}>
                                    <GameCard game={game} type='live' />
                                </div>
                            </SwiperSlide>
                        );
                    })
                    : Array.from({ length: slidesPerView }, (_, index) => (
                        <SwiperSlide key={index}>
                            <div className={[classes.SlideContainer, classes.Loading].join(' ')}>
                                <Link to='/' className={classes.Card}>
                                    <SkeletonGame />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
            </MainSwiper>
        </div>

    );
};

export default LiveEvents;
