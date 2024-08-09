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

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
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
                                        <div className={classes.MinibarItem}>
                                            <NavLink className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)} to='/casino/lobby'>

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
                                <LevelUpIcon/>
                            </div>
                        </MainButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Minibar;
