import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';

import classes from './SportsBookMenu.module.css';
import SwiperMenu from '../../../features/UI/MainSwiper/SwiperMenu';
import HomeIcon from '../../../assets/svgs/home.svg?react';
import VideoIcon from '../../../assets/svgs/video.svg?react';
import TimerIcon from '../../../assets/svgs/timer.svg?react';
import CupIcon from '../../../assets/svgs/cup.svg?react';
import PaperIcon from '../../../assets/svgs/paper.svg?react';
import SettingsIcon from '../../../assets/svgs/settings.svg?react';
import StatsIcon from '../../../assets/svgs/bars.svg?react';
import { translate } from '../../../utils/translations';

const SportsBookMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const selectedOddsFormat = useSelector((state) => state.app.selectedOddsFormat);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const selectedSportSlug = selectedSport ? `/${selectedSport.Name?.International?.toLowerCase().replace(/ /g, '-')}` : '';
  
    const getModalPath = (modal) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);

        return `${location.pathname}?${searchParams.toString()}`;
    };

    return (
        <SwiperMenu>
            <SwiperSlide>
                <NavLink
                    className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)}
                    to={`/sportsbook/home${selectedSportSlug}`}
                >
                    <HomeIcon />
                    {translate('Lobby')}
                </NavLink>
            </SwiperSlide>
            <SwiperSlide>
                <NavLink
                    className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)}
                    to={`/sportsbook/live${selectedSportSlug}`}
                >
                     <div className={classes.LiveBadge}>{translate('Live')}</div>
                    {/* <VideoIcon /> */}
                    {translate('Live Events')}
                </NavLink>
            </SwiperSlide>
            <SwiperSlide>
                <NavLink
                    className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)}
                    to={`/sportsbook/upcoming${selectedSportSlug}`}
                >
                    <TimerIcon />
                    {translate('Upcoming')}
                </NavLink>
            </SwiperSlide>
            <SwiperSlide>
                <NavLink
                    className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)}
                    to={`/sportsbook/outrights${selectedSportSlug}`}
                >
                    <CupIcon />
                    {translate('Outrights')}
                </NavLink>
            </SwiperSlide>
            <SwiperSlide>
                <NavLink className={({ isActive }) => (isActive ? [classes.NavItem, classes.ActiveItem].join(' ') : classes.NavItem)} to='/sportsbook/mybets'>
                    <PaperIcon />
                    {translate('My Bets')}
                </NavLink>
            </SwiperSlide>

            <SwiperSlide>
                <a className={[classes.ModalItem].join(' ')} onClick={() => navigate(getModalPath('odds-format'))}>
                    <SettingsIcon />
                    {translate('Odds Format')} - {translate(selectedOddsFormat)}
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a className={[classes.ModalItem].join(' ')} onClick={() => navigate(getModalPath('statistics'))}>
                    <StatsIcon />
                    {translate('Statistics')}
                </a>
            </SwiperSlide>
        </SwiperMenu>
    );
};

export default SportsBookMenu;
