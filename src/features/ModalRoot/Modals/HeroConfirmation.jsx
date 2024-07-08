import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './HeroConfirmation.module.css';

import WarningIcon from '../../../assets/svgs/warning.svg?react'

import CloseButton from '../../UI/Buttons/CloseButton';

import { translate } from '../../../utils/translations';
import MainButton from '../../UI/Buttons/MainButton';


const AchievementModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.login.user);
    const selectedHero = useSelector((state) => state.profile.selectedHero);



    return (
        <div className={classes.ConfirmationModal}>
            <div className={classes.ModalContent}>
                <div className={classes.BackgroundContainer}>
                    <div className={classes.TopContent}>
                        <header>
                            <div className={classes.Center}>
                                <h1 className={classes.Title}>
                                    <WarningIcon className={classes.WarningIcon}/>
                                    {translate('Warning!')}
                                </h1>
                            </div>
                            <div className={classes.Right}>
                                <CloseButton timesIcon onClick={() => navigate(location.pathname)} />
                            </div>
                        </header>
                    </div>
                </div>
                <div className={classes.MainContent}>
                    <p className={classes.Message}>
                        {translate('Once you select a hero, you cannot go back! Are you sure you want to select this hero?')}
                    </p>
                </div>
                <div className={classes.Buttons}>
                    <MainButton color='bv-light-green'>
                        <span>YES, I am sure</span>
                    </MainButton>
                    <MainButton color='dark' onClick={() => navigate(location.pathname)}>
                        <span>NO, go back</span>
                    </MainButton>
                </div>
            </div>
        </div>
    );
};

export default AchievementModal;
