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

    const [currentLevel, setCurrentLevel] = useState(null);
    const [nextLevel, setNextLevel] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!levels) return;
        if (!user) return;

        const foundIndex = levels.findIndex((l) => l.level === user.level);
        if (foundIndex > -1) {
            setCurrentLevel(levels[foundIndex]);
            if (foundIndex < levels.length) setNextLevel(levels[foundIndex + 1]);

            const userWagered = user.wagered;
            const levelMin = levels[foundIndex].rewards.milestones[0];
            const levelMinWagered = levelMin.wagered;
            if (userWagered < levelMinWagered) setProgress(0);
            else if (foundIndex < levels.length) {
                const levelMax = levels[foundIndex + 1].rewards.milestones[0];
                const levelMaxWagered = levelMax.wagered;
                let p = 100 * (userWagered / levelMaxWagered);
                if (p > 100) p = 100;
                setProgress(p);
            } else {
                setProgress(0);
            }
        }
    }, [levels?.length]);

    return (
        <div className={classes.VipProgress}>
            <VipBackgroundIcon className={classes.ProgressMask} />

            <div>
                <div className={classes.LeftContainer}>
                    <div>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel${user?.level}`}></div>
                        </div>
                    </div>
                    <div className={classes.TextContainer}>
                        <span className={classes.TitleContainer}>
                            {translate('Your')} <span className={classes.TitleAccent}>{translate('VIP')}</span> progress to
                        </span>
                        <span className={classes.LevelName}>{currentLevel?.name}</span>
                    </div>
                    <div className={classes.NextLevelContainer}>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel${user?.level + 1}`}></div>
                        </div>
                    </div>
                </div>

                {nextLevel && (
                    <div className={classes.RightContainer}>
                        <span className={classes.ProgressTextContainer}>
                            <span className={classes.ProgressTextAccent}>{progress}%</span> {translate('progress to')} {nextLevel.name}
                        </span>
                        <div className={classes.IconContainer}>
                            <div className={`CardLevel CardLevel${user?.level + 1}`}></div>
                        </div>
                    </div>
                )}

                <div className={classes.MilestoneProgressBar}>
                    <div className={classes.BarContainer}>
                        <span style={{ width: `${progress}%` }}></span>
                    </div>
                    <div className={classes.DiamondsContainer}>
                        {currentLevel && (
                            <>
                                {currentLevel.rewards.milestones.map((milestone) => (
                                    <div
                                        key={milestone.milestone}
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

            <DsButton disabled>
                {translate('Claim')}&nbsp;
                <CoinsIcon />
                &nbsp;0.00 {translate('Instant Bits')}
            </DsButton>
        </div>
    );
};

export default VipProgress;
