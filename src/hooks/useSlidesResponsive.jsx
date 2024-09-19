import { useMediaQuery } from 'react-responsive';

const useSlidesResponsive = (categ) => {
    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });

    let slidesPerView = 6;
    let slidesPerGroup = 4;

    if (!categ || categ == "casino") {
        if (isMobile) {
            slidesPerView = 2;
            slidesPerGroup = 2;
        } else if (isTablet) {
            slidesPerView = 4.5;
            slidesPerGroup = 3;
        } else if (isDesktop) {
            slidesPerView = 5;
            slidesPerGroup = 3;
        } else if (isBigDesktop) {
            slidesPerView = 6;
            slidesPerGroup = 5;
        } else {
            slidesPerView = 7;
            slidesPerGroup = 6;
        }
    } else if (categ == "match") {
        if (isMobile) {
            slidesPerView = 1;
            slidesPerGroup = 1;
        } else if (isTablet) {
            slidesPerView = 1;
            slidesPerGroup = 1;
        } else if (isDesktop) {
            slidesPerView = 1.5;
            slidesPerGroup = 1;
        } else if (isBigDesktop) {
            slidesPerView = 3;
            slidesPerGroup = 2;
        } else {
            slidesPerView = 3;
            slidesPerGroup = 2;
        }
    } else if (categ == "crypto-line") {
        if (isMobile) {
            slidesPerView = 2.5;
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
        } else {
            slidesPerView = 6.5;
            slidesPerGroup = 4;
        }
    } else if (categ == "levels") {
        if (isMobile) {
            slidesPerView = 2;
            slidesPerGroup = 2;
        } else if (isTablet) {
            slidesPerView = 3;
            slidesPerGroup = 3;
        } else if (isDesktop) {
            slidesPerView = 3;
            slidesPerGroup = 3;
        } else if (isBigDesktop) {
            slidesPerView = 4;
            slidesPerGroup = 4;
        } else {
            slidesPerView = 4.5;
            slidesPerGroup = 4;
        }
    } else if (categ == "milestones") {
        if (isMobile) {
            slidesPerView = 2.5;
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
        } else {
            slidesPerView = 6.5;
            slidesPerGroup = 4;
        }
    }
    else if (categ == "casinoBanners") {
        if (isMobile) {
            slidesPerView = 1;
            slidesPerGroup = 1;
        } else if (isTablet) {
            slidesPerView = 1.5;
            slidesPerGroup = 1;
        } else if (isDesktop) {
            slidesPerView = 2.2;
            slidesPerGroup = 2;
        } else if (isBigDesktop) {
            slidesPerView = 2.2;
            slidesPerGroup = 2;
        } else {
            slidesPerView = 2.2;
            slidesPerGroup = 2;
        }
    }
    else if (categ == "vendors") {
        if (isMobile) {
            slidesPerView = 2.5;
            slidesPerGroup = 2;
        } else if (isTablet) {
            slidesPerView = 4;
            slidesPerGroup = 3;
        } else if (isDesktop) {
            slidesPerView = 5;
            slidesPerGroup = 4;
        } else if (isBigDesktop) {
            slidesPerView = 7;
            slidesPerGroup = 5;
        } else {
            slidesPerView = 8;
            slidesPerGroup = 6;
        }
    }

    return { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop };
};
export default useSlidesResponsive;
