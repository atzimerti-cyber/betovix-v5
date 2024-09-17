import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCreative, Thumbs } from 'swiper/modules';
import React from 'react';

import 'swiper/css';
import 'swiper/css/bundle';

import classes from './AchievementModal.module.css';

import RewardImage from '../../../../assets/images/reward.png';
import smallLogo from '../../../../assets/svgs/logo-small.svg';

import CloseButton from '../../../UI/Buttons/CloseButton';
import AngleLeftIcon from '../../../../assets/svgs/swipe-prev.svg';
import AngleRightIcon from '../../../../assets/svgs/swipe-next.svg';
import LogoIcon from '../../../../assets/svgs/logo-small.svg?react';
import CoinsIcon from '../../../../assets/svgs/coins.svg?react';
import MainButton from '../../../UI/Buttons/MainButton';

import { translate } from '../../../../utils/translations';
import { claimReward } from '../../../../pages/UserGamification.jsx/gamificationAsyncActions';
import { rewardViewed } from '../../../../pages/UserGamification.jsx/gamificationAsyncActions';

const AchievementModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const swiperRef = useRef(null);
    const mountComponent = useSelector((state) => state.gamification.mountPopUp)

    const rewards = useSelector((state) => state.gamification.popupRewards);
    const user = useSelector((state) => state.login.user);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [viewedRewards, setViewedRewards] = useState(new Set());

    const [showSparkle, setShowSparkle] = useState(false);

    useEffect(() => {

        if (swiperRef.current) {
            // Call swiper.update() to refresh it
            setTimeout(() => {
                swiperRef.current.update();


            }, 1000)
        }

        setShowSparkle(true);
        const timer = setTimeout(() => setShowSparkle(false), 4000);

        return () => clearTimeout(timer);
    }, [rewards]);

    const handleClaimButton = async (id) => {
        dispatch(claimReward(id).then(() => {
            if (swiperRef.current) {
                const currentIndex = swiperRef.current.activeIndex; // Get the current active slide index
                swiperRef.current.removeSlide(currentIndex); // Remove the current slide
            }

        }));
    }

    return (
        rewards &&
        <div className={classes.AchievementModal}>
            <div className={`${classes.backgroundOverlay} ${showSparkle ? classes.sparkle : ''}`}></div>

            {rewards.length > 0 && <Swiper
                modules={[Navigation, Pagination, Scrollbar, EffectCreative]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    prevEl: `.${classes.customPrevArrow}`,
                    nextEl: `.${classes.customNextArrow}`
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => {

                    swiperRef.current = swiper; // Store the swiper instance in ref

                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);

                    const currentReward = rewards[swiper.activeIndex];
                    console.log(currentReward, currentReward.Id);
                    if (currentReward && !viewedRewards.has(currentReward.Id)) {
                        dispatch(rewardViewed(currentReward.Id));
                        setViewedRewards((prev) => new Set(prev).add(currentReward.Id));
                    }



                }}
                onSlideChange={(swiper) => {
                    console.log("onSlideChange: ", swiper);
                    console.log("Is Beginning: ", swiper.isBeginning);
                    console.log("Is End: ", swiper.isEnd);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);

                    const currentReward = rewards[swiper.activeIndex];
                    console.log(currentReward, currentReward.Id);
                    if (currentReward && !viewedRewards.has(currentReward.Id)) {
                        dispatch(rewardViewed(currentReward.Id));
                        setViewedRewards((prev) => new Set(prev).add(currentReward.Id));
                    }
                }}
                speed={700}
                effect="creative"
                creativeEffect={{
                    prev: {
                        opacity: 0,
                        translate: ['-100%', 0, 0],
                        scale: 0.5,
                    },
                    next: {
                        opacity: 1,
                        translate: ['100%', 0, 0],
                        scale: 1,
                    },
                }}

                className={classes.Swiper}
            >
                {rewards.map((reward) => (
                    <SwiperSlide key={reward.Id} style={{ maxWidth: '580px' }}>
                        <div className={classes.ModalContent} >

                            {/* CLOSE BUTTON */}
                            <div className={classes.TopContent}>
                                <header>
                                    <div className={classes.Title}>
                                        <img src={smallLogo} alt='' />
                                        <h1>{translate("You have earned a reward")}</h1>
                                    </div>
                                    <div className={classes.CloseButton}>
                                        <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                                    </div>
                                </header>
                            </div>

                            {/* MAIN CONTENT */}
                            <div className={classes.MainContent} >

                                {/* <img src={RewardImage} alt='' /> */}

<<<<<<< HEAD


                                <div className={classes.RewardDetails} style={{ backgroundImage: `url(${reward.MetaData.Icon})` }}>
=======
                                <div className={classes.RewardDetails}>
>>>>>>> cb6c28be713c560558b79ff920a7cef9bb7e2689
                                    <LogoIcon />
                                    {reward.RewardName ?
                                        (
                                            <>
                                                <h1>{reward.RewardName}</h1>
                                                <p>{reward.MetaData.Description ?
                                                    (
                                                        reward.MetaData.Description.split('?').map((part, index) => (
                                                            <React.Fragment key={index}>
                                                                {index === 0 ? (
                                                                    <>{part}</>
                                                                ) : (
                                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                        <CoinsIcon />
                                                                        {part}
                                                                    </div>
                                                                )}
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        'Big Win!'
                                                    )
                                                }</p>
                                                {reward.RewardName != 'Level Up' &&
                                                    <div className={classes.ClaimButton}>
                                                        <MainButton color='bv-light-green' onClick={() => handleClaimButton(reward.Id)}>
                                                            {translate('Claim Reward')}
                                                        </MainButton>
                                                    </div>}


                                            </>
                                        ) : (
                                            null
                                        )}
                                </div>


                            </div>


                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>}

            <div className={`${classes.customPrevArrow} ${isBeginning ? classes.disabled : ''}`}>
                <img src={AngleLeftIcon} alt="Previous" />
            </div>
            <div className={`${classes.customNextArrow} ${isEnd ? classes.disabled : ''}`}>
                <img src={AngleRightIcon} alt="Next" />
            </div>
        </div>
    );
};

export default AchievementModal;
