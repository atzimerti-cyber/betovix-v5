import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

import MainSwiper from './MainSwiper';
import classes from './VendorSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import SearchModal from '../../ModalRoot/Modals/SearchModal';
import useSlidesResponsive from '../../../hooks/useSlidesResponsive';

const VendorSwiper = (props) => {
    const navigate = useNavigate();
    const goToSearchModal = useMediaQuery({ query: '(max-width: 768px)' });

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("vendors");

    const imageRefs = useRef([]);
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    const handleVendorClick = (vendor) => {
        navigate(`/search?provider=${vendor}`)
    }

    return (
        <div className={classes.VendorsSwiper}>
            <MainSwiper
                slidesPerView={props.slidesPerView ? props.slidesPerView : slidesPerView}
                slidesPerGroup={slidesPerGroup}
                viewText={props.text}
                onTask={props.task}
                hideArrows
                noHeader
                spaceBetween={5}
            >
                {props.items ? (
                    props.items.length === 0 ? (
                        <p className={classes.NoResults}></p>
                    ) : (
                        props.items.map((item, index) => {
                            if (props.max && index > props.max + 1) return null;

                            return (
                                <SwiperSlide key={item.Data.Id}>
                                    {/* <Link to={goToSearchModal ?(null):(`/search?provider=${item.Data.Name}`)}> */}
                                    <div
                                        className={classes.SlideContainer}
                                        onClick={() => handleVendorClick(item.Data.Name)}
                                    >
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer} ref={el => imageRefs.current[index] = el} style={{ backgroundImage: `url('${item.Data.Logo}')` }}>
                                                {/* {loadedImages.includes(index) === false && <LoaderPlaceholder />} */}
                                                {/* <img src={item.Data.Logo} crossOrigin="anonymous" loading='lazy' onLoad={() => updateLoadedImages(index)} /> */}
                                            </div>
                                            {props.isNew && <div className={classes.NewLabel}>NEW</div>}
                                        </article>
                                    </div>
                                    {/* </Link> */}
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
        </div>
    );
};

export default VendorSwiper;
