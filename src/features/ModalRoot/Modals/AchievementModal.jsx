import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCreative, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/bundle';

import classes from './AchievementModal.module.css';

import RewardImage from '../../../assets/images/reward.png';
import smallLogo from '../../../assets/svgs/logo-small.svg';

import CloseButton from '../../UI/Buttons/CloseButton';
import AngleLeftIcon from '../../../assets/svgs/swipe-prev.svg';
import AngleRightIcon from '../../../assets/svgs/swipe-next.svg';
import MainButton from '../../UI/Buttons/MainButton';

import { translate } from '../../../utils/translations';
import { claimReward } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';
import { rewardViewed } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';


const AchievementModal = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const rewards = useSelector((state) => state.gamification.popupRewards);
    const user = useSelector((state) => state.login.user);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [viewedRewards, setViewedRewards] = useState(new Set());

    useEffect(() => {
        rewards.forEach((reward) => {
            if (!viewedRewards.has(reward.id)) {
                dispatch(rewardViewed(reward.id));
                setViewedRewards((prev) => new Set(prev).add(reward.id));
            }
        });
    }, [rewards, viewedRewards, dispatch]);

    const [showSparkle, setShowSparkle] = useState(false);

    useEffect(() => {
        setShowSparkle(true);
        const timer = setTimeout(() => setShowSparkle(false), 7000);
        return () => clearTimeout(timer);
    }, []);

    const handleClaimButton = (id) => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(claimReward(id, signal));
    }

    return (
        <div className={classes.AchievementModal}>
            <div className={`${classes.backgroundOverlay} ${showSparkle ? classes.sparkle : ''}`}></div>

            <Swiper
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
                    console.log(swiper);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
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
                        <div className={classes.ModalContent}>
                            <div className={classes.TopContent}>
                                <header>
                                    <div className={classes.Title}>
                                        <img src={smallLogo} alt='' style={{ margin: '2%' }} />
                                        <h1>{translate("You have earned a reward.")}</h1>
                                    </div>
                                    <div className={classes.CloseButton}>
                                        <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                                    </div>
                                </header>
                            </div>

                            <div className={classes.MainContent}>
                                {reward.RewardMetaData.Picture ? (
                                    <img src={reward.RewardMetaData.Picture} alt='' />
                                ) : (
                                    // <img src={RewardImage} alt='' />
                                    null
                                )}
                                <div className={classes.RewardDetails}>
                                    {reward.RewardName ? (
                                        <>
                                            <h1>{reward.RewardName}</h1>
                                            <p>{reward.RewardName}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h1>Lalalalala lalalala</h1>
                                            <p>mpla mpla mpla mpla</p>
                                        </>
                                    )}
                                </div>

                                <div className={classes.ClaimButton}>
                                    <MainButton color='bv-light-green' onClick={() => handleClaimButton(reward.Id)}>
                                        {translate('Claim Reward')}
                                    </MainButton>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={classes.customPrevArrow}>
                <img src={AngleLeftIcon} alt="Previous" />
            </div>
            <div className={classes.customNextArrow}>
                <img src={AngleRightIcon} alt="Next" />
            </div>
        </div>
    );
};

export default AchievementModal;
