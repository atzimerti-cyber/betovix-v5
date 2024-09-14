import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import classes from './SportsBanners.module.css';
import BigSwiper from '../../../features/UI/MainSwiper/BigSwiper';
import LoaderPlaceholder from '../../../features/UI/Skeletons/LoaderPlaceholder';
import { useDispatch, useSelector } from 'react-redux';

const SportsBanners = (props) => {

    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevData) => [...prevData, index]);
    };

    return (
        <BigSwiper slidesPerView={1} autoplay delay={6000}>
            {props.banners ? (
                props.banners.Banners.map((banner, index) => {
                    let link = null;
                    return (
                        <SwiperSlide key={banner.Id}>
                            <Link to={link} className={classes.ImageContainer}>
                                <div className={classes.BannerBackground}>
                                    {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                    <img src={banner.Img} alt='Banner' onLoad={() => updateLoadedImages(index)} />
                                </div>
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

export default SportsBanners;
