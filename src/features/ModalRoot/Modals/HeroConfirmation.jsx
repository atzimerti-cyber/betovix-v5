import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './HeroConfirmation.module.css';

import WarningIcon from '../../../assets/svgs/warning.svg?react'
import LogoSmallIcon from '../../../assets/svgs/logo-small.svg?react';

import CloseButton from '../../UI/Buttons/CloseButton';

import { translate } from '../../../utils/translations';
import MainButton from '../../UI/Buttons/MainButton';
import { selectedHero } from '../../../pages/UserGamification.jsx/gamificationAsyncActions';
import { gamificationActions } from '../../../pages/UserGamification.jsx/userGamificationSlice';


const HeroConfirmationModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.login.user);
    const displayedHeroAction = useSelector((state) => state.gamification.displayedHero.metadata.action);
    const lvlAction = useSelector((state) => state.gamification.displayedHero.metadata.lvlAction);
    const displayedHero = useSelector((state) => state.gamification.displayedHero);

    const [preMessage, setPreMessage] = useState(true);
    // const [heroSelectionLoading, setHeroSelectionLoading] = useState(false);
    // const [postMessage, setPostMessage] = useState(false);

    const handleButtonClick = () => {
        const controller = new AbortController();
        const signal = controller.signal;
        // setPreMessage(false)
        // setHeroSelectionLoading(true);
        dispatch(selectedHero(displayedHeroAction, lvlAction, signal));
        // await => setHeroSelectionLoading(false) ,setPostMessage(true)

        navigate(location.pathname);
    };


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
                            {translate(`You picked ${displayedHero.metadata.HeroName} ${displayedHero.metadata.HeroSubName}.`)}<br></br>
                            {translate('Once you select a hero, you cannot go back! Are you sure you want to select this hero?')}
                        </p>
                    </div>
                    <div className={classes.Buttons}>
                        <MainButton color='bv-light-green' onClick={handleButtonClick}>
                            <span>YES, I am sure</span>
                        </MainButton>
                        <MainButton color='dark' onClick={() => navigate(location.pathname)}>
                            <span>NO, go back</span>
                        </MainButton>
                    </div>
                </div>
            }
            {/* {heroSelectionLoading &&
                <div className={classes.ModalContent}>
                    <div className={classes.NotAvailable}>
                        <span> <LogoSmallIcon /> </span>
                    </div>
                </div>
            }
            {postMessage &&
                <div className={classes.ModalContent}>

                </div>
            } */}
        </div>
    );
};

export default HeroConfirmationModal;
