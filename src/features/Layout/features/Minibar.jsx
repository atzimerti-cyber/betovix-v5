import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import classes from './Minibar.module.css';
import DropdownLang from '../../UI/Dropdown/DropdownLang';
import MainButton from '../../UI/Buttons/MainButton';
import { translate } from '../../../utils/translations';

import SwiperMenu from '../../UI/MainSwiper/SwiperMenu';
import MinibarMenu from '../../UI/HorizontalMenu/MinibarMenu';

import LevelUpIcon from '../../../assets/svgs/level-up.svg?react';

import { sportsbookActions } from '../../../pages/SportsBook/sportsbookSlice';


const Minibar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.login.user);
    const minibarMenu = useSelector((state) => state.layout.minibarMenu);
    const hasHero = useSelector((state) => state.gamification.selectedHero);
    const userCurrentLevel = useSelector((state) => state.gamification.currentLevel);

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    //console.log(userCurrentLevel);

    const getPathByItemName = (itemName) => {
        switch (itemName) {
            case 'Sports':
                return navigate('/sportsbook/home/football');
            case 'Inplay Calendar':
                return navigate('/sportsbook/live/football');
            case 'Daily Events':
                return navigate('/sportsbook/home/football/daily-events');
            case 'All Events':
                return navigate('/sportsbook/home/football/all-events');
            case 'General View':
                return navigate('/sportsbook/live/football');
            case 'Event View':
                return navigate('/sportsbook/live/football');
            case 'My Bets':
                return navigate('/sportsbook/mybets');
            case 'Casino':
                return navigate('/casino/lobby');
            default:
                return navigate('/');
        }
    };

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const handleClick = (itemName) => {
        if (itemName === 'Daily Events') {
            dispatch(sportsbookActions.setTournamentTimeFilter('24H'));
        }
        if (itemName === 'All Events') {
            dispatch(sportsbookActions.setTournamentTimeFilter('All'));
        }
    };

    return (
        <>
            {!isMobile ? (
                <div className={classes.Minibar}>
                    <div className={classes.MinibarLeftWrapper}>
                        <>
                            <menu className={classes.MenuSelection}>
                                <div className={classes.MenuContent}>
                                    {Object.keys(minibarMenu).length > 0 && (
                                        <MinibarMenu
                                            items={minibarMenu}
                                            onSelect={(item) => {
                                                getPathByItemName(item.Name)
                                                handleClick(item.Name)
                                            }}
                                        />
                                    )}
                                </div>
                            </menu>
                        </>
                    </div>

                    <div className={classes.MinibarCenterWrapper}>
                        {!user && (
                            <>

                            </>
                        )}
                    </div>

                    <div className={classes.MinibarRightWrapper}>
                        {user && hasHero && Object.keys(hasHero).length > 0 && (
                            <>
                                <div className={classes.YourProgress}>
                                    <MainButton color='transparent' onClick={() => addParamsToUrl('your-progress')}>

                                        {/* <div className={classes.ProgressTitle}>{translate('Progress')}</div> */}
                                        <div className={classes.Level}>{`${userCurrentLevel?.progress}%`}</div>
                                        <div className={classes.ProgressBar}>
                                            {userCurrentLevel && Object.keys(userCurrentLevel).length > 0 ? (
                                                <span style={{ width: `${userCurrentLevel?.progress}%` }}></span>
                                            ) : (
                                                <span style={{ width: `0%` }}></span>
                                            )}
                                        </div>
                                        {/* <div className={classes.Icon}>
                                            <LevelUpIcon />
                                        </div> */}
                                    </MainButton>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            ) : (
                <div className={classes.Minibar}>
                    <div className={classes.MinibarLeftWrapper}>
                        {user && hasHero && Object.keys(hasHero).length > 0 && (
                            <>

                                <div className={classes.YourProgressMobile}>
                                    <MainButton color='transparent' onClick={() => addParamsToUrl('your-progress')}>
                                        <div className={classes.Container}>
                                            <div className={classes.ProgressBarMobile}>
                                                {userCurrentLevel && Object.keys(userCurrentLevel).length > 0 ? (
                                                    <span style={{ width: `${userCurrentLevel?.progress}%` }}></span>
                                                ) : (
                                                    <span style={{ width: `0%` }}></span>
                                                )}
                                            </div>
                                            <div className={classes.LevelMobile}>{`${userCurrentLevel?.progress}%`}</div>
                                        </div>

                                        {/* <div className={classes.Icon}>
                                            <LevelUpIcon />
                                        </div> */}
                                    </MainButton>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            )}

        </>
    );
};

export default Minibar;
