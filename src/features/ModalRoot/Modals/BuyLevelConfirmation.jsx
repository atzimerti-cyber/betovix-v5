import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './BuyLevelConfirmation.module.css';

import WarningIcon from '../../../assets/svgs/warning.svg?react'
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import CloseButton from '../../UI/Buttons/CloseButton';

import { translate } from '../../../utils/translations';
import MainButton from '../../UI/Buttons/MainButton';
import { BuyHeroLevel } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';
import { gamificationActions } from '../../../pages/UserGamification.jsx/userGamificationSlice';


const BuyLevelConfirmationModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.login.user);
    const selectedHero = useSelector((state) => state.gamification.selectedHero);
    const lvlAction = useSelector((state) => state.gamification.displayedHero?.metadata?.lvlAction);
   
    const [preMessage, setPreMessage] = useState(true);

    const handleButtonClick = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        setPreMessage(false);

        dispatch(BuyHeroLevel(selectedHero, lvlAction, signal))
            .then(() => {
                navigate(location.pathname);
            })
            .catch((error) => {
                navigate(location.pathname);
            });
    };

    if (!selectedHero || !lvlAction) {
        navigate(location.pathname);
        return null
    }

    return (
        <div className={classes.ConfirmationModal}>
            {preMessage &&
                <div className={classes.ModalContent}>
                    <div className={classes.BackgroundContainer}>
                        <div className={classes.TopContent}>
                            <header>
                                <div className={classes.Center}>
                                    <h1 className={classes.Title}>
                                        <WarningIcon className={classes.WarningIcon} />
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
                            {translate(`You picked to buy level ${lvlAction} of ${selectedHero?.name}.`)}<br></br>
                            {translate('Once you buy a level, you cannot go back! Are you sure you want to buy this level?')}
                        </p>
                    </div>
                    <div className={classes.Buttons}>
                        <MainButton color='bv-light-green' onClick={handleButtonClick}>
                            <span>{translate('YES, I am sure')}</span>
                        </MainButton>
                        <MainButton color='dark' onClick={() => navigate(location.pathname)}>
                            <span>{translate('NO, go back')}</span>
                        </MainButton>
                    </div>
                </div>
            }
        </div>
    );
};

export default BuyLevelConfirmationModal;
