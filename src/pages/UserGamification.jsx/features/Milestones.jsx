import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import classes from './Milestones.module.css';

import DraggableDiv from '../../../features/DraggableDiv/DraggableDiv';
import MilestoneCard from './MilestoneCard';
import LevelDiamond from './LevelDiamond';
import SkeletonMilestone from '../../../features/UI/Skeletons/SkeletonMilestone'
import DsButton from '../../../features/UI/Buttons/DsButton'

import { getUserAchievements } from '../gamificationAsyncActions';
import { translate } from '../../../utils/translations';
import RefreshIcon from '../../../assets/svgs/refresh.svg';
import { gamificationActions } from '../userGamificationSlice';

const Milestones = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.login.user);

    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);

    let heroLevels;
    if (!selectedHero) {
        heroLevels = displayedHero.levels;
    } else if (selectedHero) {
        heroLevels = selectedHeroLevels;
    }

    const [thisLevelIndex, setThisLevelIndex] = useState(0);

    useEffect(() => {
        if (!heroLevels) return;

        const foundIndex = heroLevels.findIndex((l) => l.id === props.activeLevel?.id);
        if (foundIndex > -1) {
            setThisLevelIndex(foundIndex);
        } else {
            setThisLevelIndex(0);
        }

    }, [props.activeLevel?.id]);

    // useEffect(() => {
    //     const progress = getProgress();
    //     dispatch(gamificationActions.setProgressBar(progress))

    // }, []);

    const getProgress = () => {
        if (!heroLevels) return 0;
        if (!Array.isArray(heroLevels)) {
            return 0;
        }
        const currentLevel = heroLevels[thisLevelIndex];

        var progress = 0;

        const mL = currentLevel.milestones.length;

        let achList = [...currentLevel.milestones];
        achList.push(currentLevel);

        // currentLevel.milestones.forEach(milestone => {
        //     achList.push(milestone);
        // }

        const progressSection = 100 / (achList.length);
        achList.forEach(item => {
            const mP = item.percentageComplete;
            progress += (mP / 100) * progressSection;
        });

        return progress;
    };

    const handleRefresh = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getUserAchievements(signal));
    };

    return (
        <div className={classes.MilestoneSection}>
            {props.progressBar &&
                (
                    <div className={classes.RefreshButtonBg}>
                        <div className={classes.RefreshButton}>
                            <button onClick={handleRefresh} >
                                <img src={RefreshIcon} alt='Refresh' style={{ height: '20px', width: '20px' }} />
                            </button>
                        </div>
                    </div>
                )}
            <div className={!user ? [classes.CarouselContainer, classes.NotLoggedIn].join(' ') : classes.CarouselContainer}>
                <div className={classes.MilestoneCarousel}>
                    <DraggableDiv>
                        <div className={classes.ScrollContainer}>


                            <div className={classes.ScrollContent}>
                                {props.progressBar &&
                                    (
                                        <div className={classes.ProgressBar}>
                                            <div className={classes.BarContainer}>
                                                <span style={{ width: `${getProgress()}%` }}></span>
                                            </div>
                                            <div className={classes.DiamondContainer}>
                                                {heroLevels && heroLevels.length > 0 ? (
                                                    <>
                                                        {[
                                                            { id: `${heroLevels[thisLevelIndex]}placeholder`, milestone: 'before_first' },
                                                            ...heroLevels[thisLevelIndex]?.milestones
                                                        ].map((milestone, index) => (
                                                            <LevelDiamond
                                                                key={milestone.id}
                                                                complete={(index == 0 || milestone.percentageComplete == 100) && true}
                                                                index={index}
                                                            />
                                                        ))}

                                                        {thisLevelIndex < heroLevels.length && (
                                                            <LevelDiamond
                                                                // key={`${displayedHeroLevels[thisLevelIndex].id}_${displayedHeroLevels[thisLevelIndex].milestones[displayedHeroLevels[thisLevelIndex].milestones.length]
                                                                //     }`}
                                                                key={heroLevels[thisLevelIndex].id}
                                                                // complete={
                                                                //     user?.wagered >=
                                                                //     displayedHeroLevels[thisLevelIndex + 1].milestones[displayedHeroLevels[thisLevelIndex + 1].milestones.length - 1]
                                                                //         .wagered
                                                                // }
                                                                index=''
                                                                complete={heroLevels[thisLevelIndex].percentageComplete === 100 ? true : false}
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    Array.from({ length: 6 }, (_, index) => <LevelDiamond key={index} complete={false} index={index} />)
                                                )}
                                            </div>
                                        </div>
                                    )}


                                <div className={classes.CardsContainer}>
                                    {heroLevels ? (
                                        <>
                                            {thisLevelIndex < heroLevels.length && (
                                                <MilestoneCard
                                                    key={`${heroLevels[thisLevelIndex].milestone}_temp_locked`}
                                                    label='Milestone 0'
                                                    index={heroLevels[thisLevelIndex].milestones.length}
                                                    level={heroLevels[thisLevelIndex]}
                                                    firstCard
                                                />
                                            )}

                                            {heroLevels[thisLevelIndex]?.milestones.map((milestone, index) => (
                                                <MilestoneCard
                                                    key={`${heroLevels[thisLevelIndex].id}_${milestone.id}`}
                                                    label={`${milestone.name}`}
                                                    index={index}
                                                    type={`${milestone.rewardType}`}
                                                    details={`${milestone.rewardValue}`}
                                                    level={heroLevels[thisLevelIndex]}
                                                    complete={milestone.percentageComplete === 100 ? true : false}
                                                />
                                            ))}

                                            {thisLevelIndex < heroLevels.length && (
                                                <MilestoneCard
                                                    key={`${heroLevels[thisLevelIndex].id}_locked`}
                                                    // label='LEVEL UP'
                                                    index={heroLevels[thisLevelIndex].milestones.length}
                                                    // complete={
                                                    //     user?.wagered >=
                                                    //     displayedHeroLevels[thisLevelIndex + 1].milestones[displayedHeroLevels[thisLevelIndex + 1].milestones.length - 1]
                                                    //         .wagered
                                                    // }
                                                    complete={heroLevels[thisLevelIndex].percentageComplete === 100 ? true : false}
                                                    level={heroLevels[thisLevelIndex]}
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
                        </div>
                    </DraggableDiv>
                </div>
            </div>
            {!user && (
                <DsButton active={true} color='transparent' onClick={props.onGotoLogin}>
                    {translate('Please Login')}
                </DsButton>
            )}
        </div>
    );
};

export default Milestones;
