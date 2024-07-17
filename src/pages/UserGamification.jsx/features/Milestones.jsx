import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import classes from './Milestones.module.css';

import DraggableDiv from '../../../features/DraggableDiv/DraggableDiv';
import MilestoneCard from './MilestoneCard';
import LevelDiamond from './LevelDiamond';
import SkeletonMilestone from '../../../features/UI/Skeletons/SkeletonMilestone'
import DsButton from '../../../features/UI/Buttons/DsButton'

import { translate } from '../../../utils/translations';

const Milestones = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.login.user);

    const displayedHeroLevels = useSelector((state) => state.gamification.displayedHero.levels);

    const [currentMilestone, setCurrentMilestone] = useState(null);
    const [thisLevelIndex, setThisLevelIndex] = useState(0);

    useEffect(() => {
        if (!displayedHeroLevels) return;

        const foundIndex = displayedHeroLevels.findIndex((l) => l.id === props.activeLevel);
        if (foundIndex > -1) {
            setThisLevelIndex(foundIndex);
        } else {
            setThisLevelIndex(displayedHeroLevels[0]);
        }

    }, [props.activeLevel]);

    console.log("mesa sto milestone, AUTO TO LEVEL", thisLevelIndex);
    console.log("poso", displayedHeroLevels[thisLevelIndex]?.milestones);

    const getProgress = () => {
        // if (!levels) return 0;

        // const userWagered = user?.wagered;

        // const levelMilestones = levels[thisLevelIndex].rewards.milestones;
        // const levelMin = levelMilestones[0];
        // const levelMinWagered = levelMin.wagered;
        // if (userWagered < levelMinWagered) return 0;

        // const nextLevelMilestones = thisLevelIndex < levels.length - 1 ? levels[thisLevelIndex + 1].rewards.milestones : levelMilestones;
        // const levelMax = nextLevelMilestones[0];
        // const levelMaxWagered = levelMax.wagered;

        // let progress = 100 * (userWagered / levelMaxWagered);

        // if (progress > 100) progress = 100;
        let progress = 50;
        return progress;
    };

    const getNeeded = (milestone) => {
        // return milestone.wagered - user?.wagered;
    };

    return (
        <div className={classes.MilestoneSection}>
            <div className={!user ? [classes.CarouselContainer, classes.NotLoggedIn].join(' ') : classes.CarouselContainer}>
                <div className={classes.MilestoneCarousel}>
                    <DraggableDiv>
                        <div className={classes.ScrollContent}>
                            <div className={classes.ProgressBar}>
                                <div className={classes.BarContainer}>
                                    <span style={{ width: `${getProgress()}%` }}></span>
                                </div>
                                <div className={classes.DiamondContainer}>
                                    {displayedHeroLevels && displayedHeroLevels.length > 0 ? (
                                        <>
                                            {displayedHeroLevels[thisLevelIndex]?.milestones.map((milestone, index) => (
                                                <LevelDiamond
                                                    key={milestone.id}
                                                    // key={`${displayedHeroLevels[thisLevelIndex].id}_${milestone.milestone}`}
                                                    //complete={user?.wagered >= milestone.wagered}
                                                    index={index}
                                                />
                                            ))}

                                            {thisLevelIndex < displayedHeroLevels.length && (
                                                <LevelDiamond
                                                    // key={`${displayedHeroLevels[thisLevelIndex].id}_${displayedHeroLevels[thisLevelIndex].milestones[displayedHeroLevels[thisLevelIndex].milestones.length]
                                                    //     }`}
                                                    key={displayedHeroLevels[thisLevelIndex].id}
                                                    // complete={
                                                    //     user?.wagered >=
                                                    //     displayedHeroLevels[thisLevelIndex + 1].milestones[displayedHeroLevels[thisLevelIndex + 1].milestones.length - 1]
                                                    //         .wagered
                                                    // }
                                                    index=''
                                                />
                                            )}
                                        </>
                                    ) : (
                                        Array.from({ length: 6 }, (_, index) => <LevelDiamond key={index} complete={false} index={index} />)
                                    )}
                                </div>
                            </div>

                            <div className={classes.CardsContainer}>
                                {displayedHeroLevels ? (
                                    <>
                                        {displayedHeroLevels[thisLevelIndex]?.milestones.map((milestone, index) => (
                                            <MilestoneCard
                                                key={`${displayedHeroLevels[thisLevelIndex].id}_${milestone.id}`}
                                                // key={`${displayedHeroLevels[thisLevelIndex].level}_${milestone.milestone}`}
                                                label={`${milestone.name}`}
                                                index={index}
                                                //complete={user?.wagered >= milestone.wagered}
                                                level={displayedHeroLevels[thisLevelIndex]}
                                            // needed={
                                            //     currentMilestone &&
                                            //         currentMilestone.level === displayedHeroLevels[thisLevelIndex].level &&
                                            //         currentMilestone.milestone === milestone.milestone
                                            //         ? getNeeded(milestone)
                                            //         : null
                                            // }
                                            />
                                        ))}

                                        {thisLevelIndex < displayedHeroLevels.length && (
                                            <MilestoneCard
                                                key={`${displayedHeroLevels[thisLevelIndex].id}_locked`}
                                                // key={`${displayedHeroLevels[thisLevelIndex].level}_${displayedHeroLevels[thisLevelIndex].milestones[displayedHeroLevels[thisLevelIndex].milestones.length]
                                                //     }`}
                                                label='Locked'
                                                index={displayedHeroLevels[thisLevelIndex].milestones.length}
                                                // complete={
                                                //     user?.wagered >=
                                                //     displayedHeroLevels[thisLevelIndex + 1].milestones[displayedHeroLevels[thisLevelIndex + 1].milestones.length - 1]
                                                //         .wagered
                                                // }
                                                level={displayedHeroLevels[thisLevelIndex]}
                                                nextLevel
                                            />
                                        )}
                                    </>
                                ) : (
                                    Array.from({ length: 6 }, (_, index) => (
                                        <div key={index} className={classes.SkeletonWrapper}>
                                            <div className={classes.Background}>
                                                <SkeletonMilestone />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </DraggableDiv>
                </div>
            </div>
            {!user && (
                <DsButton active={true} color='transparent' onClick={props.onGotoLogin}>
                    {translate('Login to join VIP')}
                </DsButton>
            )}
        </div>
    );
};

export default Milestones;
