import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import classes from './MainSwiper.module.css';
import ArrowButton from '../Buttons/ArrowButton';
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';
import AngleRight2Icon from '../../../assets/svgs/angle-right2.svg?react';

const MainSwiper = (props) => {
    const swiperRef = useRef(null);
    const timeoutRef = useRef(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    let modules = [];
    if (props.autoplay) modules.push(Autoplay);
    if (props.pagination) modules.push(Pagination);

    const alterState = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSwiperUpdate = (swiper) => {
        timeoutRef.current = setTimeout(() => alterState(swiper), 200);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    let elClasses = [classes.MainSwiperWrapper];
    if (props.pagination) elClasses.push(classes.WithPagination);
    if (props.scrolling) elClasses.push(classes.scrolling); //////////////

    let delay = 6000;
    if (props.delay) {
        delay = props.delay;
    }


    return (
        <div className={elClasses.join(' ')}>
            <div className={classes.SwiperHeader}>
                <div className={classes.Title}>
                    {props.icon && props.icon}
                    {props.title && props.title}
                </div>
                <div className={classes.NavButtons}>
                    {props.viewAll && (
                        <>
                            <Link to={props.viewAll} className={classes.ViewAllLink}>
                                View all <AngleRight2Icon />
                            </Link>
                        </>
                    )}
                    {props.viewText && (
                        <a className={classes.ViewAllLink} onClick={props.onTask ? props.onTask : null}>
                            {props.viewText}
                        </a>
                    )}

                    {!props.hideArrows ? (
                        <>
                            <ArrowButton disabled={isBeginning} onClick={() => swiperRef.current.slidePrev()}>
                                <AngleLeftIcon />
                            </ArrowButton>
                            <ArrowButton
                                disabled={isEnd || props.children.length <= props.slidesPerView || Array.isArray(props.children) === false}
                                onClick={() => swiperRef.current.slideNext()}
                            >
                                <AngleRightIcon />
                            </ArrowButton>
                        </>
                    ) : (
                        null
                    )}


                </div>
            </div>

            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSwiperUpdate}
                slidesPerView={props.slidesPerView}
                slidesPerGroup={props.slidesPerGroup}
                spaceBetween={props.spaceBetween ? props.spaceBetween : 16}
                autoplay={
                    props.autoplay
                        ? {
                            delay: delay,
                            disableOnInteraction: false,
                        }
                        : null
                }
                pagination={{
                    clickable: true,
                }}
                modules={modules}
                loop={props.loop && true}
                className={classes.MainSwiper}
            >
                {props.children}

            </Swiper>
        </div>
    );

};

export default MainSwiper;
