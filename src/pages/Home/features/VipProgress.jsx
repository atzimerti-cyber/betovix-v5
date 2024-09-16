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

    const selectedHero = useSelector((state) => state.progress.selectedHero);
    const userCurrentLevel = useSelector((state) => state.progress.currentLevel);
    const nextLevel = useSelector((state) => state.progress.nextLevel);
    const levelProgress = useSelector((state) => state.progress.progressBar);

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
                                {userCurrentLevel.icon ? (
                                    <img src={userCurrentLevel.icon} alt='' />
                                ) : (
                                    <div className={`CardLevel CardLevel`}></div>
                                )}
                            </div>
                        </div>
                        <div className={classes.TextContainer}>
                            {isMobile ? (
                                <span className={classes.TitleContainer}>{userCurrentLevel.name}</span>
                            ) : (
                                <span className={classes.TitleContainer}>{userCurrentLevel.name}</span>
                            )}

                            {/* <span className={classes.TextContainer}>
                                {translate('Your progress to ')}{userCurrentLevel.name}
                            </span> */}
                            <span className={classes.LevelName} style={{ color: 'var(--db-brand-green)' }}>{`${levelProgress}%`}</span>

                        </div>

                    </div>
                    {nextLevel.icon && (
                                  <div className={classes.RightContainer}>
                                  <span className={classes.TextContainer}>
                                      {translate('Your progress to ')}
                                  </span>
                                  <div style={{ display: "flex", flexDirection: "row" , alignItems: "center"}}>
                                      <span style={{ color: 'var(--db-brand-green)' }}>{nextLevel.name}</span>
                                      <div className={classes.IconContainer} style={{ marginLeft: "5px" }}>
                                          {nextLevel.icon ? (
                                              <img src={nextLevel.icon} alt='' />
                                          ) : (
                                              <div className={`CardLevel CardLevel`}></div>
                                          )}
          
                                      </div>
                                  </div>
          
                              </div>
                                )}
                    
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
                        <LevelDiamond small complete={levelProgress >= 0 && true} />
                        <LevelDiamond small complete={levelProgress >= 20 && true} />
                        <LevelDiamond small complete={levelProgress >= 40 && true} />
                        <LevelDiamond small complete={levelProgress >= 60 && true} />
                        <LevelDiamond small complete={levelProgress >= 80 && true} />
                        <LevelDiamond small complete={levelProgress >= 100 && true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VipProgress;
