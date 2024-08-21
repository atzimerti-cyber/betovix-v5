import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import MainSwiper from './MainSwiper';
import classes from './VendorSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import { gamificationActions } from '../../../pages/UserGamification.jsx/userGamificationSlice';

const VendorSwiper = (props) => {

    const dispatch = useDispatch();

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    const handleCardClick = (vendor) => {
        return null;
    };

    let slidesPerView = 6.3;
    let slidesPerGroup = 4;

    if (isMobile) {
        slidesPerView = 2;
        slidesPerGroup = 2;
    } else if (isTablet) {
        slidesPerView = 3;
        slidesPerGroup = 3;
    } else if (isDesktop) {
        slidesPerView = 3.5;
        slidesPerGroup = 3;
    } else if (isBigDesktop) {
        slidesPerView = 4;
        slidesPerGroup = 4;
    }

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            //icon={props.icon}
            // title={props.link ? <Link to={props.link}>{props.title}</Link> : props.task ? <a onClick={props.task}>{props.title}</a> : props.title}
            // viewAll={props.link}
            viewText={props.text}
            onTask={props.task}
            hideArrows
        >
            {props.items ? (
                props.items.length === 0 ? (
                    <p className={classes.NoResults}></p>
                ) : (
                    props.items.map((item, index) => {
                        if (props.max && index > props.max + 1) return null;

                        return (
                            <SwiperSlide key={item.Data.Id}>
                                <Link to={`/search?provider=${item.Data.Name}`}>
                                    <div
                                        className={classes.SlideContainer}
                                        onClick={() => handleCardClick(item)}
                                    >
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer}>
                                                {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                <img src={item.Data.Logo} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                            </div>
                                            {props.isNew && <div className={classes.NewLabel}>NEW</div>}
                                            <div className={classes.InfoOverlay}>
                                                <div className={classes.InfoContent}>
                                                    <div>
                                                        <p className={classes.InfoCategory}>{item.Data.Name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })
                )
            ) : (
                Array.from({ length: slidesPerView }, (_, index) => (
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
                ))
            )}
        </MainSwiper>
    );
};

export default VendorSwiper;
