import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import classes from './VipProgress.module.css';
import VipBackgroundIcon from '../../../assets/svgs/vip-background.svg?react';
import { translate } from '../../../utils/translations';
import LevelDiamond from '../../UserGamification.jsx/features/LevelDiamond';

const VipProgress = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const user = useSelector((state) => state.login.user);

    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const userCurrentLevel = useSelector((state) => state.gamification.currentLevel);
    const levelProgress = useSelector((state) => state.gamification.progressBar);

    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        if (modal) {
            searchParams.set('modal', modal);
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        }
        if (tab) {
            searchParams.set('tab', tab);
            navigate(`/profile?${searchParams.toString()}`, { replace: true });
        }


    };

    return (
        <div className={classes.VipProgress} onClick={Object.keys(selectedHero).length > 0 ? () => addParamsToUrl('your-progress') : () => addParamsToUrl(null, 'heroes')}>
            <VipBackgroundIcon className={classes.ProgressMask} />
            <div>
                <div className={classes.Title}>
                    <div className={classes.LeftContainer}>
                        <div>
                            <div className={classes.IconContainer}>
                                <div className={`CardLevel CardLevel`}></div>
                            </div>
                        </div>
                        <div className={classes.TextContainer}>
                            {isMobile ? (
                                null
                            ) : (
                                <span className={classes.TitleContainer}>
                                    {translate('Your progress')}
                                </span>
                            )}

                            <span className={classes.LevelName}>{userCurrentLevel.name}</span>

                        </div>

                    </div>
                    <div className={classes.RightContainer}>
                        <span className={classes.LevelName}>{`${levelProgress}%`}</span>
                    </div>
                </div>
                <div className={classes.MilestoneProgressBar}>
                    <div className={classes.BarContainer}>
                        {levelProgress ? (
                            <span style={{ width: `${levelProgress}%` }}></span>
                        ) : (
                            <span style={{ width: `0%` }}></span>
                        )}
                    </div>
                    <div className={classes.DiamondContainer}>
                        <LevelDiamond small complete={levelProgress >= 0 && true}/>
                        <LevelDiamond small complete={levelProgress >= 20 && true}/>
                        <LevelDiamond small complete={levelProgress >= 40 && true}/>
                        <LevelDiamond small complete={levelProgress >= 60 && true}/>
                        <LevelDiamond small complete={levelProgress >= 80 && true}/>
                        <LevelDiamond small complete={levelProgress >= 100 && true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VipProgress;
