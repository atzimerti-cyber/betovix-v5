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
    const displayedHero = useSelector((state) => state.gamification.displayedHero);
    const displayedHeroAction = useSelector((state) => state.gamification.displayedHero?.metadata?.action);
    const lvlAction = useSelector((state) => state.gamification.displayedHero?.metadata?.lvlAction);
   
    
    const selectError = useSelector((state) => state.gamification.selectedHeroError);
    const [preMessage, setPreMessage] = useState(true);
    const [heroSelectionLoading, setHeroSelectionLoading] = useState(false);
    const [postMessageError, setPostMessageError] = useState(false);
    const [postMessageSuccess, setPostMessageSuccess] = useState(false);

    const handleButtonClick = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        setPreMessage(false);
        // setHeroSelectionLoading(true);

        dispatch(selectedHero(displayedHeroAction, lvlAction, signal))
            .then(() => {
                navigate(location.pathname);
             
                // setTimeout(() => {
                // setHeroSelectionLoading(false);
                // if(selectError) {
                //     setPostMessageError(true);
                // } else {
                //     setPostMessageSuccess(true);
                // }
                // }, 10000);
            })
            .catch((error) => {
                navigate(location.pathname);

                // Handle error if necessary
                //setHeroSelectionLoading(false);
            });

        // navigate(location.pathname);
    };

    useEffect(() => {
        if(selectError === false) {
            dispatch(gamificationActions.setCanSelect(false))
        }
    }, [selectError]);

    useEffect(() => {
        if (postMessageSuccess || postMessageError) {
            setTimeout(() => { navigate(location.pathname); }, 10000);
        }
    }, [postMessageError, postMessageSuccess]);

    if (!displayedHero || !displayedHeroAction || !lvlAction) {
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
                            {translate(`You picked ${displayedHero.metadata.HeroName} ${displayedHero.metadata.HeroSubName}.`)}<br></br>
                            {translate('Once you select a hero, you cannot go back! Are you sure you want to select this hero?')}
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
            {heroSelectionLoading &&
                <div className={classes.ModalContent}>
                    <div className={classes.NotAvailable}>
                        <span> <LogoSmallIcon /> </span>
                        <span> {translate('Pending')}...</span>
                    </div>
                </div>
            }
            {postMessageSuccess &&
                <div className={classes.ModalContent}>
                <div className={classes.Result}>
                        <span> <LogoSmallIcon /> </span>
                        <span> {translate('Selected Hero Successfully')}</span>
                    </div>
                </div>
            }
             {postMessageError &&
                <div className={classes.ModalContent}>
                <div className={classes.Result}>
                        <span> <LogoSmallIcon /> </span>
                        <span> {translate('Error Selecting Hero')}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default HeroConfirmationModal;
