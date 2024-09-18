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

    // const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    // const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    // const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    // const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("vendors");

    const imageRefs = useRef([]);
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    // let slidesPerView = 9.5;
    // let slidesPerGroup = 6;

    // if (isMobile) {
    //     slidesPerView = 2;
    //     slidesPerGroup = 2;
    // } else if (isTablet) {
    //     slidesPerView = 3;
    //     slidesPerGroup = 3;
    // } else if (isDesktop) {
    //     slidesPerView = 3.5;
    //     slidesPerGroup = 3;
    // } else if (isBigDesktop) {
    //     slidesPerView = 4;
    //     slidesPerGroup = 4;
    // }

    useEffect(() => {
        loadedImages.forEach((index) => {
            const container = imageRefs.current[index];
            if (container) {
                const img = container.querySelector('img');
                const dominantColor = getDominantColor(img);
                container.style.backgroundImage = dominantColor;
            }
        });
    }, [loadedImages]);

    function getDominantColor(imgElement) {
        if (!imgElement.complete || imgElement.naturalWidth === 0) {
            console.warn('Image failed to load or is broken:', imgElement.src);
            return null; // Return early if the image is broken
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const isGrayscale = Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;

        if (isGrayscale) {
            r = 50;
            g = 87;
            b = 54;
        }

        // return `linear-gradient(50deg, rgba(${r},${g},${b},1), transparent)`;
        return `linear-gradient(50deg, #0e1b26), transparent)`;
    }

    const handleVendorClick = (vendor) => {
        // if (goToSearchModal) {
        //     addParamsToUrl('search');
        // } else {
            navigate(`/search?provider=${vendor}`)
        // }
    }

    // const addParamsToUrl = (modal, tab) => {
    //     const searchParams = new URLSearchParams(location.search);
    //     searchParams.set('modal', modal);
    //     if (tab) searchParams.set('tab', tab);

    //     navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    // };

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
                                            <div className={classes.ImageContainer} ref={el => imageRefs.current[index] = el}>
                                                {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                <img src={item.Data.Logo} crossOrigin="anonymous" loading='lazy' onLoad={() => updateLoadedImages(index)} />
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
