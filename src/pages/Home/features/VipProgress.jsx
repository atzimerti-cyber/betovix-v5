import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './VipProgress.module.css';
import VipBackgroundIcon from '../../../assets/svgs/vip-background.svg?react';
import { translate } from '../../../utils/translations';

const VipProgress = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);
    const levels = useSelector((state) => state.home.levels);

    const displayedHeroLevels = useSelector((state) => state.gamification.displayedHero.levels);
    const progress = useSelector((state) => state.gamification.progressBar);
    const userCurrentLevel = useSelector((state) => state.gamification.currentLevel);

    // useEffect(() => {
    //     if (!displayedHeroLevels) return;
    //     if (!user) return;

    //     const foundIndex = displayedHeroLevels.findIndex((l) => l.id === userLevel?.id);
    //     if (foundIndex > -1) {
    //         setCurrentLevel(displayedHeroLevels[foundIndex]);
    //         if (foundIndex < displayedHeroLevels.length) setNextLevel(displayedHeroLevels[foundIndex + 1]);
    //     }
    // }, [displayedHeroLevels?.length]);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className={classes.VipProgress} onClick={() => addParamsToUrl('your-progress')}>
            <VipBackgroundIcon className={classes.ProgressMask} />

            <div>
                <div className={classes.LeftContainer}>
                    <div>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel`}></div>
                        </div>
                    </div>
                    <div className={classes.TextContainer}>
                        <span className={classes.TitleContainer}>
                            {translate('Your progress to')}
                        </span>
                        <span className={classes.LevelName}>{userCurrentLevel.name}</span>
                    </div>
                </div>

                <div className={classes.MilestoneProgressBar}>
                    <div className={classes.BarContainer}>
                        {Object.keys(userCurrentLevel).length > 0 ? (
                            <span style={{ width: `${userCurrentLevel.progress}%` }}></span>
                        ) : (
                            <span style={{ width: `0%` }}></span>
                        )}

                        {/* <span style={{ width: `${progress}%` }}></span> */}
                    </div>
                    {/* <div className={classes.DiamondsContainer}>
                        {currentLevel && (
                            <>
                                {currentLevel.milestones.map((milestone) => (
                                    <div
                                        key={milestone.id}
                                        className={
                                            user?.wagered >= milestone.wagered ? [classes.DiamondPosition, classes.Complete].join(' ') : classes.DiamondPosition
                                        }
                                    >
                                        <div className={classes.Diamond}></div>
                                    </div>
                                ))}
                                <div className={classes.DiamondPosition}>
                                    <div className={classes.Diamond}></div>
                                </div>
                            </>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default VipProgress;
