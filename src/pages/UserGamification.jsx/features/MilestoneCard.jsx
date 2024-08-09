import { motion } from 'framer-motion';

import classes from './MilestoneCard.module.css';
import largeCoin from '../../../assets/images/large-coin.webp';
import DsButton from '../../../features/UI/Buttons/DsButton';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';

const MilestoneCard = (props) => {
    return (
        <motion.article
            className={props.firstCard ? (
                [classes.MilestoneCard, classes.Milestone0].join(' ')
            ) : (
                props.complete ? (
                    classes.MilestoneCard
                ) : (
                    [classes.MilestoneCard, classes.Complete].join(' ')
                ))}
            initial={{ y: '0.4rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: props.index * 0.07 }}
            style={{ '--title-fix': '-5px' }}
        >
            <div className={classes.Background}>
                <div className={classes.ImageContainer}>
                    {props.nextLevel ? (
                        <div className={`CardLevel CardLevel${props.level.id}`}></div>
                    ) : (
                        <div className={classes.ImageInner}>
                            <img src={largeCoin} loading='lazy' alt='Coins' />
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.Content}>
                <div>
                    {/* {props.needed && (
                        <p className={classes.WageredNeeded}>
                            <CoinsIcon />
                            {formatNumberTo(props.needed)} wager needed
                        </p>
                    )} */}

                    {props.nextLevel && (
                        <p className={props.level.name.length > 7 ? [classes.Title, classes.LongTitle].join(' ') : classes.Title}>
                            {props.level.name}
                        </p>
                    )}

                    <p className={props.level.name.length > 7 ? [classes.Title, classes.LongTitle].join(' ') : classes.Title}>
                        {/* {props.level.name} */}
                        <span>{props.label}</span>
                    </p>


                    {props.type == 7 &&
                        <p className={classes.Details}>
                            <span>Earn</span>
                            <CoinsIcon style={{ marginLeft: '8px', marginTop: '3px', paddingTop: '1px', marginRight: '1px' }} />
                            <span>{props.details}</span>
                        </p>
                    }
                </div>

                {props.firstCard ? (
                    null
                ) : (
                    !props.nextLevel ? (
                        !props.complete ? (
                            <DsButton locked color='transparent'>
                                Not yet unlocked
                            </DsButton>
                        ) : (
                            <DsButton locked color='transparent'>
                                Completed
                            </DsButton>
                        )
                    ) : (
                        null
                    )
                )}

                {/* {props.firstCard && (
                    <DsButton disabled>
                        GOOD LUCK
                    </DsButton>
                )} */}
                {props.nextLevel && (
                    <DsButton disabled>
                        LEVEL UP
                    </DsButton>
                )}
            </div>
        </motion.article>
    );
};

export default MilestoneCard;
