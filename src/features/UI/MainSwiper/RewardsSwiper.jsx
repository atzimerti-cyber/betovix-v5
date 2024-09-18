import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';

import MainSwiper from './MainSwiper';
import classes from './RewardsSwiper.module.css';
import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';

import DefaultReward from '../../../assets/images/default-reward.png';
import MainButton from '../Buttons/MainButton';

import { claimReward } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';
import { getRewards } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';

const RewardsSwiper = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 770px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });
    const [loadedImages, setLoadedImages] = useState([]);

    const updateLoadedImages = (index) => {
        setLoadedImages((prevState) => [...prevState, index]);
    };

    const handleClaim = (id) => {
        dispatch(claimReward(id))
            .then(() => {
                dispatch(getRewards(true));
            });
    };

    let slidesPerView = 2.2;
    let slidesPerGroup = 1;

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
                    props.items.map((item, index) => {
                        if (props.max && index > props.max + 1) return null;

                        return (
                            <SwiperSlide key={item.Id}>
                                <div className={`${classes.SlideContainer}`}>
                                    <article className={classes.Card}>
                                        
                                        <div className={classes.ImageContainer}>
                                            {loadedImages.includes(index) === false && <LoaderPlaceholder />}
                                            {item.MetaData.Icon ?
                                                (
                                                    <img src={item.MetaData.Icon} alt={''} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                                ) : (
                                                    <img src={DefaultReward} alt={''} loading='lazy' onLoad={() => updateLoadedImages(index)} />
                                                )}
                                        </div>

                                        <div className={classes.Text}>
                                            <h1>{item.RewardName}</h1>
                                            <p>{item.MetaData.Description}</p>
                                        </div>

                                        <div className={classes.ClaimButton}>
                                            {item.RewardName.toLowerCase() !== 'level up' ? (
                                                props.claimed ? (
                                                    <MainButton disabled>
                                                        Claimed
                                                    </MainButton>
                                                ) : (
                                                    <MainButton color='bv-light-green' onClick={() => handleClaim(item.Id)}>
                                                        Claim Reward
                                                    </MainButton>
                                                )
                                            ) : (null)}

                                        </div>

                                    </article>
                                </div>
                            </SwiperSlide>
                        );
                    })
                )
            ) : null}
        </MainSwiper>
    );
};

export default RewardsSwiper;
