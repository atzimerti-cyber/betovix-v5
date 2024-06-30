import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import classes from './Banners.module.css';
import BigSwiper from '../UI/MainSwiper/BigSwiper';
import GameCard from '../Game/GameCard';
import LoaderPlaceholder from '../UI/Skeletons/LoaderPlaceholder';

const SportBanners = (props) => {
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };

    return (
        <BigSwiper slidesPerView={1} autoplay delay={6000}>
            {props.banners ? (
                props.banners.Banners &&
                props.banners.Banners.map((banner, index) => {
                    let link = null;
                    let bannerEvent = null;

                    if (banner.EventId > 0) {
                        bannerEvent = props.banners.BannerEvents[banner.EventId];
                        if (bannerEvent) link = `/event/${bannerEvent.Info.SportName.International}/${bannerEvent.Info.SportId}/${banner.EventId}`;
                    }

                    return (
                        <SwiperSlide key={banner.Id}>
                            <Link to={link} className={classes.ImageContainer}>
                                <div className={classes.BannerBackground}>
                                    {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                    <img src={banner.Img} alt='Banner' onLoad={() => updateLoadedImages(index)} />
                                </div>

                                {bannerEvent && (
                                    <div className={classes.EventInfoWrapper}>
                                        <div className={classes.EventInfo}>
                                            <GameCard game={bannerEvent} type='scheduled' />
                                        </div>
                                    </div>
                                )}
                            </Link>
                        </SwiperSlide>
                    );
                })
            ) : (
                <SwiperSlide>
                    <Link to={null}>
                        <div className={classes.BannerBackground}>
                            <LoaderPlaceholder />
                        </div>
                    </Link>
                </SwiperSlide>
            )}
        </BigSwiper>
    );
};

export default SportBanners;
