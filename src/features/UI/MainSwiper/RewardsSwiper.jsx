import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import MainSwiper from './MainSwiper';
import classes from './RewardsSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';
import { getLeftbar, getRightbar } from '../../../utils/storage';

import DefaultReward from '../../../assets/images/default-reward.png';
import MainButton from '../Buttons/MainButton';

import { claimReward } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';

const RewardsSwiper = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 770px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
    const [loadedImages, setLoadedImages] = useState([]);

    const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
    const [isRightbarOpen, setIsRightbarOpen] = useState(false);

    useEffect(() => {
        setIsLeftbarOpen(getLeftbar());
        setIsRightbarOpen(getRightbar());
    }, [isDesktop]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    /////REMOVE OPEN ACHIEVEMENT MODAL
    const addParamsToUrl = (modal, id, tab) => {

        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(claimReward(id, signal));

        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    let slidesPerView = 2.2;
    let slidesPerGroup = 1;
    let openBars = false;

    if (isMobile) {
        slidesPerView = 1.3;
        slidesPerGroup = 1;
    } else if (isTablet) {
        slidesPerView = 1.9;
        slidesPerGroup = 1;
    } else if (isDesktop) {
        slidesPerView = 2.3;
        slidesPerGroup = 1;
    } else if (isBigDesktop) {
        slidesPerView = 1.7;
        slidesPerGroup = 1;
    }

    if (isDesktop && (isLeftbarOpen || isRightbarOpen)) {
        openBars = true;
    }
    // console.log(openBars);

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            icon={props.icon}
            title={props.title}
            viewAll={props.link}
            viewText={props.text}
            claimed={props.claimed}
        >
            {props.items ? (
                props.items.length === 0 ? (
                    <p className={classes.NoResults}>No {props.title}</p>
                ) : (
                    !props.claimed ? (
                        props.items.map((item, index) => {
                            if (props.max && index > props.max + 1) return null;

                            return (
                                <SwiperSlide key={item.id}>
                                    <div className={openBars ? `${classes.SlideContainer} ${classes.OpenBars}` : `${classes.SlideContainer}`}>
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer}>
                                                {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                <img src={item.image} alt={DefaultReward} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                            </div>

                                            <div className={classes.Text}>
                                                <h1>{item.title}</h1>
                                                <p>{item.desc}Kainourgio Reward Kainio Reward Kainourgio</p>
                                            </div>

                                            <div className={classes.ClaimButton}>
                                                <MainButton color='bv-light-green' onClick={() => addParamsToUrl('achievement', item.id)}>
                                                    Claim Reward
                                                </MainButton>
                                            </div>
                                        </article>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        props.items.map((item, index) => {
                            if (props.max && index > props.max + 1) return null;

                            return (
                                <SwiperSlide key={item.id}>
                                    <div className={openBars ? `${classes.SlideContainer} ${classes.OpenBars}` : `${classes.SlideContainer}`}>
                                        <article className={classes.Card}>
                                            <div className={classes.ImageContainer}>
                                                {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                                <img src={item.image} alt={DefaultReward} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                            </div>

                                            <div className={classes.Text}>
                                                <h1>{item.title}</h1>
                                                <p>{item.desc}Kainourgio Reward Kainio Reward Kainourgio</p>
                                            </div>

                                            <div className={classes.ClaimButton}>
                                                <MainButton disabled color='bv-light-green' onClick={() => addParamsToUrl('achievement', item.id)}>
                                                    Claimed
                                                </MainButton>
                                            </div>
                                        </article>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )
                )
            ) : null}
        </MainSwiper>
    );
};

export default RewardsSwiper;
