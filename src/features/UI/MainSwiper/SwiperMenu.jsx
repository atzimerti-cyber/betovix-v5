import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import classes from './SwiperMenu.module.css';

const SwiperMenu = (props) => {
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

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSwiperUpdate}
            slidesPerView={'auto'}
            // slidesPerGroup={props.slidesPerGroup}
            spaceBetween={16}
            className={classes.SwiperMenu}
        >
            {props.children}
        </Swiper>
    );
};

export default SwiperMenu;
