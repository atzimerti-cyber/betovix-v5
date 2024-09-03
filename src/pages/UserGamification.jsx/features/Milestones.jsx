import { useEffect, useState, useRef } from 'react';
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
import AngleLeftIcon from '../../../assets/svgs/angle-left.svg?react';
import AngleRightIcon from '../../../assets/svgs/angle-right.svg?react';

import { useMediaQuery } from 'react-responsive';

const Milestones = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const user = useSelector((state) => state.login.user);

    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const selectedHeroLevels = useSelector((state) => state.gamification.heroLevels);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);
    const currentUserLevel = useSelector((state) => state.gamification.currentLevel);
    const ericLevels = useSelector((state) => state.gamification.ericLevels);

    let heroLevels;
    if (!selectedHero) {
        heroLevels = ericLevels;
        // heroLevels = displayedHero.levels;
    } else if (selectedHero) {
        heroLevels = selectedHeroLevels;
    }

    const [thisLevelIndex, setThisLevelIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (!heroLevels) return;

        const foundIndex = heroLevels.findIndex((l) => l.id === props.activeLevel?.id);
        if (foundIndex > -1) {
            setThisLevelIndex(foundIndex);
        } else {
            setThisLevelIndex(0);
        }

    }, [props.activeLevel?.id]);

    const getProgress = () => {
        if (!heroLevels) return 0;
        if (!Array.isArray(heroLevels)) {
            return 0;
        }

        const currentLevel = heroLevels[thisLevelIndex];

        var progress = 0;
        let totalXP = 0;
        let progressSection = 0;
        let progressSectionRounded = 0;

        let achList = [...currentLevel.milestones];

        if (achList.length > 0) {
            achList.map(ach => {
                totalXP += ach.pointsValue;
            })

            if (currentLevel.nextLvlBP) {
                totalXP = totalXP + currentLevel.nextLvlBP;
                progressSection = totalXP / (achList.length + 1);
            } else {
                progressSection = totalXP / (achList.length);
            }
            progressSectionRounded = parseFloat(progressSection.toFixed(2));
        }

        let xP = 0;

        achList.forEach(item => {
            const mP = item.percentageComplete;
            xP += (mP / 100) * progressSectionRounded;
        });

        progress = (xP / totalXP) * 100;
        return progress;
    };

    const handleRefresh = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getUserAchievements(signal));
    };


    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
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
                {props.profile && (
                    isMobile ? (
                        null
                    ) : (
                        <button className={classes.LeftArrow} onClick={scrollLeft}>
                            <AngleLeftIcon />
                            {/* &#8592; */}
                        </button>
                    )

                )}


                <div className={classes.MilestoneCarousel}>
                    <DraggableDiv ref={scrollContainerRef}>
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
                                                // <MilestoneCard
                                                //     key={`${heroLevels[thisLevelIndex].milestone}_temp_locked`}
                                                //     label='Milestone 0'
                                                //     index={heroLevels[thisLevelIndex].milestones.length}
                                                //     level={heroLevels[thisLevelIndex]}
                                                //     firstCard
                                                //     complete={currentUserLevel === heroLevels[thisLevelIndex] || heroLevels[thisLevelIndex].name < currentUserLevel?.name}
                                                // />
                                                <MilestoneCard
                                                    key={`${heroLevels[thisLevelIndex].milestone}_temp_locked`}
                                                    label={heroLevels[thisLevelIndex]?.name}
                                                    index={heroLevels[thisLevelIndex].milestones.length}
                                                    level={heroLevels[thisLevelIndex]}
                                                    firstCard
                                                    complete={heroLevels[thisLevelIndex]?.name === currentUserLevel?.name}
                                                />
                                            )}

                                            {heroLevels[thisLevelIndex]?.milestones.map((milestone, index) => (
                                                <MilestoneCard
                                                    key={`${heroLevels[thisLevelIndex].id}_${milestone.id}`}
                                                    label={`${milestone?.name}`}
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
                                                    // label=''
                                                    index={heroLevels[thisLevelIndex].milestones.length}
                                                    complete={heroLevels[thisLevelIndex + 1]?.percentageComplete === 100 ? true : false}
                                                    level={heroLevels[thisLevelIndex + 1] ? heroLevels[thisLevelIndex + 1] : null}
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
                {props.profile && (
                    isMobile ? (
                        null
                    ) : (
                        <button className={classes.RightArrow} onClick={scrollRight}>
                            <AngleRightIcon />
                            {/* &#8594; */}
                        </button>
                    )

                )}

            </div>
            {
                !user && (
                    <DsButton active={true} color='transparent' onClick={props.onGotoLogin}>
                        {translate('Please Login')}
                    </DsButton>
                )
            }
        </div >
    );
};

export default Milestones;
