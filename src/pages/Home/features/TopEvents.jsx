import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import MainSwiper from '../../../features/UI/MainSwiper/MainSwiper';
import TopEventsIcon from '../../../assets/svgs/top-events.svg?react';
import classes from './LiveEvents.module.css';
import SkeletonGame from '../../../features/UI/Skeletons/SkeletonGame';
import GameCard from '../../../features/Game/GameCard';
import { translate } from '../../../utils/translations';

const TopEvents = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const eventsTop = useSelector((state) => state.home.eventsTop);

    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });

    let slidesPerView = 3;
    let slidesPerGroup = 3;

    if (isTablet) {
        slidesPerView = 1;
        slidesPerGroup = 1;
    } else if (isDesktop) {
        slidesPerView = 2;
        slidesPerGroup = 2;
    }

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            icon={<TopEventsIcon />}
            title={<Link to='/sportsbook/home/football'>{translate('Top Events')}</Link>}
            viewAll='/sportsbook/home/football'
        >
            {eventsTop
                ? eventsTop.map((game, index) => {
                      if (index > 9) return null;

                      return (
                          <SwiperSlide key={game.MatchId}>
                              <div className={classes.SlideContainer}>
                                  <GameCard game={game} type='scheduled' />
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
    );
};

export default TopEvents;
