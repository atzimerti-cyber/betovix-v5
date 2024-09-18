import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MilestoneCard.module.css';
import largeCoin from '../../../assets/images/large-coin.webp';
import DsButton from '../../../features/UI/Buttons/DsButton';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import MainButton from '../../../features/UI/Buttons/MainButton';

const MilestoneCard = (props) => {
    const navigate = useNavigate();
    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);

    const openConfirm = () => {
        addParamsToUrl('buy-level-confirm');
    };

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <motion.article
            className={
                props.complete ? (
                    [classes.MilestoneCard, classes.Complete].join(' ')
                ) : (
                    classes.MilestoneCard
                )}
            initial={{ y: '0.4rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: props.index * 0.07 }}
            style={{ '--title-fix': '-5px' }}
        >

            {props.buyLevel && selectedHero && displayedHero && selectedHero.id === displayedHero.id &&
                (
                    <div className={classes.BuyButton}>
                        <MainButton color='bv-light-green' onClick={openConfirm}>
                            Buy Level
                        </MainButton>
                    </div>
                )
            }
            <div className={classes.Background}>
                <div className={classes.ImageContainer}>
                    {props.firstCard ? (
                        props.icon ? (<div className={props.complete ? ([classes.ImageInner, classes.Complete].join(' ')) : classes.ImageInner}>
                            <img src={props.icon} loading='lazy' alt='Coins' />
                        </div>) : (
                            <div className={props.complete ? ([classes.ImageInner, classes.Complete].join(' ')) : classes.ImageInner}>
                                <div className={`CardLevel CardLevel${props.level.id}`}></div>
                            </div>
                        )

                    ) : (
                        props.icon ? (
                            <div className={props.complete ? ([classes.ImageInner, classes.Complete].join(' ')) : classes.ImageInner}>
                                <img src={props.icon} loading='lazy' alt='Coins' />
                            </div>
                        ) : (
                            <div className={props.complete ? ([classes.ImageInner, classes.Complete].join(' ')) : classes.ImageInner}>
                                <img src={largeCoin} loading='lazy' alt='Coins' />
                            </div>
                        )
                    )}
                </div>
            </div>


            <div className={classes.Content}>

                <div>
                    <p className={[classes.Title, classes.LongTitle].join(' ')}>
                        <span>{props.label ? props.label : 'Milestone'}</span>
                    </p>

                    {props.reward && (
                        <div className={classes.Details}>
                            <span>
                                {props.reward.description ?
                                    (
                                        props.reward.description.split('?').map((part, index) => (
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
                                        'Big Rewards!'
                                    )
                                }
                            </span>
                        </div>
                    )}

                </div>

                {props.firstCard ?
                    (
                        null
                    ) : (
                        !props.complete ? (
                            <p className={[classes.Status, classes.Completed].join(' ')}>Not yet unlocked</p>
                        ) : (
                            <p className={classes.Status}></p>
                        )

                    )
                }
            </div>
        </motion.article>
    );
};

export default MilestoneCard;
