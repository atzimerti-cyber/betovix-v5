import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import classes from './AchievementModal.module.css';

import RewardImage from '../../../assets/images/reward.png';
import smallLogo from '../../../assets/svgs/logo-small.svg';

import CloseButton from '../../UI/Buttons/CloseButton';
import ArrowButton from '../../UI/Buttons/ArrowButton';
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';
import MainButton from '../../UI/Buttons/MainButton';

import { translate } from '../../../utils/translations';


const AchievementModal = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const user = useSelector((state) => state.login.user);

    const rewards = useSelector((state) => state.gamification.newRewards);


    const handleClaimButton = (id) => {

    }

    return (
        <div className={classes.AchievementModal}>


            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                className={classes.Swiper}
            >
                {rewards.map((reward) => (
                    <SwiperSlide key={reward.id} style={{ maxWidth: '580px' }}>
                        <div className={classes.ModalContent}>
                            <div className={classes.TopContent}>
                                <header>
                                    <div className={classes.Title}>
                                        <img src={smallLogo} alt='' style={{ margin: '2%' }} />
                                        <h1>You have earned a reward.</h1>
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
                                    <MainButton color='bv-light-green' onClick={handleClaimButton}>
                                        Claim Reward
                                    </MainButton>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={classes.NavButtonsRight}>
                <ArrowButton>
                    {/* Uncomment and adjust the line below if you need navigation */}
                    {/* <ArrowButton disabled={isEnd} onClick={() => swiperRef.current.slideNext()}> */}
                    <AngleRightIcon />
                </ArrowButton>
            </div>
            <div className={classes.NavButtonsLeft}>
                <ArrowButton>
                    {/* Uncomment and adjust the line below if you need navigation */}
                    {/* <ArrowButton disabled={isBeginning} onClick={() => swiperRef.current.slidePrev()}> */}
                    <AngleLeftIcon />
                </ArrowButton>
            </div>
        </div>
    );
};

export default AchievementModal;
