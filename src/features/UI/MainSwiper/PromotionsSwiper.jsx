import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import MainSwiper from './MainSwiper';
import classes from './PromotionsSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';

const PromotionsSwiper = (props) => {
    const [loadedImages, setLoadedImages] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });

    let slidesPerView = 3;
    let slidesPerGroup = 1;

    if (isMobile) {
        slidesPerView = 1.2;
    } else if (isDesktop) {
        slidesPerView = 2;
    }

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            icon={props.icon}
            title={<Link to={props.link}>{props.title}</Link>}
            viewAll={props.link}
            pagination
        >
            {props.items
                ? props.items.map((item, index) => {
                      if (props.max && index > props.max + 1) return null;

                      return (
                          <SwiperSlide key={index}>
                              <div className={classes.SlideContainer}>
                                  <Link to={`/promotions/${item.GameId}`}>
                                      <article className={classes.Card}>
                                          <div className={classes.ImageContainer}>
                                              {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                              <img src={item.Img} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                          </div>
                                      </article>
                                  </Link>
                              </div>
                          </SwiperSlide>
                      );
                  })
                : Array.from({ length: slidesPerView }, (_, index) => (
                      <SwiperSlide key={index}>
                          <div className={[classes.SlideContainer, classes.Loading].join(' ')}>
                              <Link to={null}>
                                  <article className={classes.Card}>
                                      <div className={classes.ImageContainer}>
                                          <LoaderPlaceholder />
                                      </div>
                                  </article>
                              </Link>
                          </div>
                      </SwiperSlide>
                  ))}
        </MainSwiper>
    );
};

export default PromotionsSwiper;
