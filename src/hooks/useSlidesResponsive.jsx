import { useMediaQuery } from 'react-responsive';

const useSlidesResponsive = () => {
    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });

    let slidesPerView = 6;
    let slidesPerGroup = 4;

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
    }

    return {slidesPerView,slidesPerGroup,isMobile,isTablet,isDesktop,isBigDesktop};
};
export default useSlidesResponsive;
