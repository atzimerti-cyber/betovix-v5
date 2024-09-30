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


import { DragDealer } from '../HorizontalMenu/DragDealer';
import { LeftArrow, RightArrow } from '../HorizontalMenu/Arrows';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const VendorSwiper = (props) => {
    const navigate = useNavigate();

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("vendors");

    const imageRefs = useRef([]);

    const dragState = useRef(new DragDealer());
    const handleDrag = ({ scrollContainer }) =>
        (ev) => dragState.current.dragMove(ev, (posDiff) => {
            if (scrollContainer.current) {
                scrollContainer.current.scrollLeft += posDiff;
            }
        });

    const handleVendorClick = (vendor) => {
        if (dragState.current.dragging) {
            return false;
        }
        navigate(`/search?provider=${vendor}`)
    }

    return (
        <div className={classes.VendorsSwiper} onMouseLeave={dragState.current.dragStop}>
            {/* <MainSwiper */}
            <ScrollMenu
                // slidesPerView={props.slidesPerView ? props.slidesPerView : slidesPerView}
                // slidesPerGroup={slidesPerGroup}
                // viewText={props.text}
                // onTask={props.task}
                // hideArrows
                // noHeader
                // spaceBetween={5}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                onMouseDown={() => dragState.current.dragStart}
                onMouseUp={() => dragState.current.dragStop}
                onMouseMove={handleDrag}
            >
                {props.items ? (
                    props.items.length === 0 ? (
                        <p className={classes.NoResults}></p>
                    ) : (
                        props.items.map((item, index) => {
                            if (props.max && index > props.max + 1) return null;

                            return (
                                // <SwiperSlide key={item.Data.Id}>
                                <div key={item.Data.Id} className={classes.ScrollItem} onClick={() => handleVendorClick(item.Data.Name)} >
                                    <div
                                        className={classes.SlideContainer}
                                    // onClick={() => handleVendorClick(item.Data.Name)}
                                    >
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer} ref={el => imageRefs.current[index] = el} style={{ backgroundImage: `url('${item.Data.Logo}')` }}>
                                            </div>
                                            {props.isNew && <div className={classes.NewLabel}>NEW</div>}
                                        </article>
                                    </div>
                                </div>
                                // </SwiperSlide>
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
            </ScrollMenu>
            {/* </MainSwiper> */}
        </div>
    );
};

export default VendorSwiper;
