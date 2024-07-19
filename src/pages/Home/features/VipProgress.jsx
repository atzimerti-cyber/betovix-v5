import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './VipProgress.module.css';
import VipBackgroundIcon from '../../../assets/svgs/vip-background.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import DsButton from '../../../features/UI/Buttons/DsButton';
import { translate } from '../../../utils/translations';

const VipProgress = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);
    const levels = useSelector((state) => state.home.levels);

    const displayedHeroLevels = useSelector((state) => state.gamification.displayedHero.levels);
    const userLevel = useSelector((state) => state.gamification.currentLevel);

    const [currentLevel, setCurrentLevel] = useState(null);
    const [nextLevel, setNextLevel] = useState(null);
    const [progress, setProgress] = useState(10); ////////////////////////////////

    useEffect(() => {
        if (!displayedHeroLevels) return;
        if (!user) return;

        const foundIndex = displayedHeroLevels.findIndex((l) => l.id === userLevel?.id);
        if (foundIndex > -1) {
            setCurrentLevel(displayedHeroLevels[foundIndex]);
            if (foundIndex < displayedHeroLevels.length) setNextLevel(displayedHeroLevels[foundIndex + 1]);

            // const userWagered = user.wagered;
            // const levelMin = levels[foundIndex].rewards.milestones[0];
            // const levelMinWagered = levelMin.wagered;
            // if (userWagered < levelMinWagered) setProgress(0);
            // else if (foundIndex < levels.length) {
            //     const levelMax = levels[foundIndex + 1].rewards.milestones[0];
            //     const levelMaxWagered = levelMax.wagered;
            //     let p = 100 * (userWagered / levelMaxWagered);
            //     if (p > 100) p = 100;
            //     setProgress(p);
            // } else {
            //     setProgress(0);
            // }
        }
    }, [displayedHeroLevels?.length]);

    return (
        <div className={classes.VipProgress}>
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
                            {/* {translate('Your')} <span className={classes.TitleAccent}>{translate('VIP')}</span> progress to */}
                        </span>
                        <span className={classes.LevelName}>{currentLevel?.name}</span>
                    </div>
                    <div className={classes.NextLevelContainer}>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel`}></div>
                        </div>
                    </div>
                </div>

                {nextLevel && (
                    <div className={classes.RightContainer}>
                        <span className={classes.ProgressTextContainer}>
                            {/* <span className={classes.ProgressTextAccent}>{progress}%</span> 
                            {translate('progress to')} {nextLevel.name} */}
                        </span>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel`}></div>
                        </div>
                    </div>
                )}

                <div className={classes.MilestoneProgressBar}>
                    <div className={classes.BarContainer}>
                        <span style={{ width: `10%` }}></span>
                        {/* <span style={{ width: `${progress}%` }}></span> */}
                    </div>
                    <div className={classes.DiamondsContainer}>
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
                    </div>
                </div>
            </div>

            <DsButton locked>
                {translate('Claim')}&nbsp;
                <CoinsIcon />
                &nbsp;0.00 {translate('Instant Bits')}
            </DsButton>
        </div>
    );
};

export default VipProgress;
