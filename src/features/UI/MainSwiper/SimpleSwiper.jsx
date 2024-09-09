import { useRef, useState, useEffect } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';

import classes from './SimpleSwiper.module.css';
import ArrowButton from '../Buttons/ArrowButton';
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';

const SimpleSwiper = (props) => {
    const swiperRef = useRef(null);
    const timeoutRef = useRef(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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
    if (props.noArrows) elClasses.push(classes.NoArrows);

    return (
        <div className={elClasses.join(' ')}>
            {props.noArrows ? null : (
                <div className={classes.SwiperHeader}>
                    <div className={classes.NavButtons}>
                        <ArrowButton disabled={isBeginning} onClick={() => swiperRef.current.slidePrev()}>
                            <AngleLeftIcon />
                        </ArrowButton>
                        <ArrowButton disabled={isEnd || Array.isArray(props.children) === false} onClick={() => swiperRef.current.slideNext()}>
                            <AngleRightIcon />
                        </ArrowButton>
                    </div>
                </div>
            )}

            <div>
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSwiperUpdate}
                    slidesPerView={props.slidesPerView ? props.slidesPerView : 'auto'}
                    // slidesPerGroup={props.slidesPerGroup}
                    spaceBetween={11}
                    className={classes.MainSwiper}
                >
                    {props.children}
                </Swiper>
            </div>
        </div>
    );
};

export default SimpleSwiper;
