import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import classes from './Minibar.module.css';

import MainButton from '../../UI/Buttons/MainButton';
import NumberBadge from '../../UI/Badges/NumberBudge';
import { translate } from '../../../utils/translations';
import { layoutActions } from '../layoutSlice';
import MenuItems from './MenuItems';
import SwiperMenu from '../../UI/MainSwiper/SwiperMenu';
import LevelUpIcon from '../../../assets/svgs/level-up.svg?react';

import { sportsbookActions } from '../../../pages/SportsBook/sportsbookSlice';


const Minibar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const user = useSelector((state) => state.login.user);
    const minibarMenu = useSelector((state) => state.layout.minibarMenu);
    const userCurrentLevel = useSelector((state) => state.gamification.currentLevel);

    useEffect(() => {

    }, []);

    const getPathByItemName = (itemName) => {
        switch (itemName) {
            case 'Sports':
                return '/sportsbook/home/football';
            case 'Inplay Calendar':
                return '/sportsbook/live/football';
            case 'Daily Events':
                return '/sportsbook/home/football/daily-events';
            case 'All Events':
                return '/sportsbook/home/football/all-events';
            case 'General View':
                return '/sportsbook/live/football';
            case 'Event View':
                return '/sportsbook/live/football';
            case 'My Bets':
                return '/sportsbook/mybets';
            case 'Casino':
                return '/casino/lobby';
            default:
                return '/';
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
            <div className={classes.Minibar}>
                <div className={classes.MinibarLeftWrapper}>
                    <>

                        {Object.keys(minibarMenu).length > 0 && (
                            <SwiperMenu>
                                {minibarMenu.map((item) => (
                                    <SwiperSlide key={item.Id}>
                                        <div className={classes.MinibarItem} onClick={() => handleClick(item.Name)}>
                                            <NavLink className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)} to={getPathByItemName(item.Name)}>

                                                {translate(`${item.Name}`)}

                                            </NavLink>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </SwiperMenu>
                        )}
                    </>
                </div>

                <div className={classes.MinibarCenterWrapper}>
                    {user && (
                        <>

                        </>
                    )}
                </div>

                <div className={classes.MinibarRightWrapper}>
                    {user && (
                        <>
                            <div className={classes.YourProgress}>
                                <MainButton color='transparent' onClick={() => addParamsToUrl('your-progress')}>

                                    {/* <div className={classes.ProgressTitle}>{translate('Progress')}</div> */}
                                    <div className={classes.Level}>{`${userCurrentLevel.progress}%`}</div>
                                    <div className={classes.ProgressBar}>

                                        {Object.keys(userCurrentLevel).length > 0 ? (
                                            <span style={{ width: `${userCurrentLevel.progress}%` }}></span>
                                        ) : (
                                            <span style={{ width: `0%` }}></span>
                                        )}
                                    </div>
                                    <div className={classes.Icon}>
                                        <LevelUpIcon />
                                    </div>
                                </MainButton>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </>
    );
};

export default Minibar;
