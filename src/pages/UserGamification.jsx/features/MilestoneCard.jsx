import { motion } from 'framer-motion';

import classes from './MilestoneCard.module.css';
import largeCoin from '../../../assets/images/large-coin.webp';
import DsButton from '../../../features/UI/Buttons/DsButton';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';

const MilestoneCard = (props) => {
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
                    <p className={props.level?.name.length > 7 ? [classes.Title, classes.LongTitle].join(' ') : classes.Title}>
                        <span>{props.label}</span>
                    </p>

                    {props.reward &&
                        <div className={classes.Details}>
                            <span>{props.reward.description}</span>
                        </div>
                    }
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
