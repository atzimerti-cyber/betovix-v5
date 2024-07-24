import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import MainSwiper from './MainSwiper';
import classes from './RewardsSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';

import DefaultReward from '../../../assets/images/default-reward.png';
import MainButton from '../Buttons/MainButton';

const RewardsSwiper = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    const handleCardClick = (hero) => {
        dispatch(gamificationActions.setDisplayedHero(hero));
    };

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    let slidesPerView = 1.5;
    let slidesPerGroup = 1.5;

    return (
        <MainSwiper
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            icon={props.icon}
            title={props.link ? <Link to={props.link}>{props.title}</Link> : props.task ? <a onClick={props.task}>{props.title}</a> : props.title}
            viewAll={props.link}
            viewText={props.text}
            onTask={props.task}>
            {props.items ? (
                props.items.length === 0 ? (
                    <p className={classes.NoResults}>No {props.title}</p>
                ) : (
                    props.items.map((item, index) => {
                        if (props.max && index > props.max + 1) return null;

                        return (
                            <SwiperSlide key={item.id}>
                                <div className={classes.SlideContainer}>
                                    <article className={`${classes.Card}`}>
                                        <div className={classes.ImageContainer}>
                                            {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                            {/* <img src={DefaultReward} loading='lazy' onLoad={() => updateLoadedImages(index)} /> */}
                                            <img src={item.image} alt={DefaultReward} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                        </div>

                                        <div className={classes.Text}>
                                            <h1>Kainourgio Reward Kainourgio Reward Kainourgio Reward Kainourgio Reward</h1>
                                            <p>Kainourgio Reward Kainourgio Reward </p>
                                            <h1>{item.title}</h1>
                                            <p>{item.desc}</p>
                                        </div>

                                        <div className={classes.ClaimButton}>
                                            <MainButton color='bv-light-green' onClick={() => addParamsToUrl('achievement')}>
                                                Claim Reward
                                            </MainButton>
                                        </div>
                                    </article>

                                </div>
                            </SwiperSlide>
                        )
                    })
                )
            ) : (
                null
            )}
        </MainSwiper>

    );

};

export default RewardsSwiper;
