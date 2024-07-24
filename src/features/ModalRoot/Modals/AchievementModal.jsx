import { useState, useRef } from 'react';
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

 
 

const AchievementModal = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const user = useSelector((state) => state.login.user);

    const rewards = useSelector((state) => state.gamification.newRewards);


    const handleClaimButton = (id) => {

    }

    return (
        <div className={classes.AchievementModal}>


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
                    <SwiperSlide key={reward.id} style={{ maxWidth: '580px' }}>
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
                                {reward.image ? (
                                    <img src={reward.image} alt='' />
                                ) : (
                                    <img src={RewardImage} alt='' />
                                )}
                                <div className={classes.RewardDetails}>
                                    {reward.title ? (
                                        <>
                                            <h1>{reward.title}</h1>
                                            <p>{reward.desc}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h1>Lalalalala lalalala</h1>
                                            <p>mpla mpla mpla mpla</p>
                                        </>
                                    )}
                                </div>

                                <div className={classes.ClaimButton}>
                                    <MainButton color='bv-light-green' onClick={() => handleClaimButton(reward.id)}>
                                        {translate('Claim Reward')}
                                    </MainButton>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                className={classes.ThumbsSwiper}
            >
                {rewards.map((reward) => (
                    <SwiperSlide key={reward.id}>
                        <div className={classes.ThumbImageContainer}>
                            <img src={reward.image || RewardImage} alt='' />
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper> */}

            <div className={classes.customPrevArrow}>
                <img src={AngleLeftIcon} alt="Previous" />
            </div>
            <div className={classes.customNextArrow}>
                <img src={AngleRightIcon} alt="Next" />
            </div>

            {/* <div className={classes.NavButtonsRight}>
                <ArrowButton>
                    <AngleRightIcon />
                </ArrowButton>
            </div>
            <div className={classes.NavButtonsLeft}>
                <ArrowButton>
                    <AngleLeftIcon />
                </ArrowButton>
            </div> */}
        </div>
    );
};

export default AchievementModal;
