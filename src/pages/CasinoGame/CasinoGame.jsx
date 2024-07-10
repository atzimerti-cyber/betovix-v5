import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';

import classes from './CasinoGame.module.css';
import { getVendorGame, getLiveVendorGame } from '../Casino/casinoAsyncActions';
import { appActions } from '../../features/InitApp/appSlice';
import { casinoActions } from '../Casino/casinoSlice';
import MainButton from '../../features/UI/Buttons/MainButton';
import LogoSmall from '../../assets/svgs/logo-small.svg?react';
import HeartOutlineIcon from '../../assets/svgs/heart-outline.svg?react';
import ExpandOutlineIcon from '../../assets/svgs/expand-outline.svg?react';
import FullscreenOutlineIcon from '../../assets/svgs/fullscreen-outline.svg?react';
import Switch from '../../features/UI/Switch/Switch';
import BarLoading from '../../features/UI/BarLoading/BarLoading';
import { translate } from '../../utils/translations';

const CasinoGame = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const gameContentRef = useRef(null);
    const { type, providername, id, brandgameid, name } = useParams();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const casinoGame = useSelector((state) => state.casino.casinoGame);
    const showCasinoGame = useSelector((state) => state.casino.showCasinoGame);
    const user = useSelector((state) => state.login.user);
    const barLoading = useSelector((state) => state.app.barLoading);

    const [isDemo, setIsDemo] = useState(user ? false : true);

    useEffect(() => {
        if (user) dispatch(casinoActions.setShowCasinoGame(true));
        else dispatch(casinoActions.setShowCasinoGame(false));

        const controller = new AbortController();
        const signal = controller.signal;

        if (type === 'live') dispatch(getLiveVendorGame(providername, id, brandgameid, name, isDemo, signal));
        else dispatch(getVendorGame(providername, id, brandgameid, name, isDemo, signal));

        return () => {
            controller.abort();
            dispatch(casinoActions.setCasinoGame(null));
            dispatch(casinoActions.setShowCasinoGame(false));
            dispatch(appActions.setBarLoading(false));
        };
    }, [isDemo, user?.AccountId]);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            gameContentRef.current.requestFullscreen().catch((err) => {
                setIsFullScreen(false);
            });
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    let elClasses = [classes.CasinoGameWrapper];
    if (isExpanded) elClasses.push(classes.Expanded);
    if (isFullScreen) elClasses.push(classes.FullScreen);

    return (
        <>
            <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

            <div className={elClasses.join(' ')}>
                <div className={classes.CasinoGame}>
                    <div className={classes.Header}>
                        <LogoSmall />
                        <div className={classes.RightSection}>
                            <MainButton
                                color='transparent'
                                // onClick={() => {
                                //     if (user) {
                                //         props.onToggleFavorite(index);
                                //     } else {
                                //         toast.warning('Login to access this feature');
                                //     }
                                // }}
                            >
                                <HeartOutlineIcon />
                                <span>{translate('Like')}</span>
                            </MainButton>

                            <MainButton color='transparent' onClick={() => setIsExpanded((prev) => !prev)}>
                                <ExpandOutlineIcon />
                                <span>{translate('Expand')}</span>
                            </MainButton>

                            <MainButton color='transparent' onClick={() => toggleFullScreen()}>
                                <FullscreenOutlineIcon />
                                <span>{translate('Full Screen')}</span>
                            </MainButton>
                        </div>
                    </div>
                    <div className={classes.Placeholder} ref={gameContentRef}>
                        <div className={classes.GameContent}>
                            {casinoGame && (
                                <iframe
                                    className={classes.GameIframe}
                                    src={casinoGame.url}
                                    allow='autoplay; clipboard-write;'
                                    // allow='autoplay; clipboard-write; geolocation;camera;microphone'
                                    width='100%'
                                    height='100%'
                                ></iframe>
                            )}
                        </div>
                        {!showCasinoGame && (
                            <div className={classes.GameOverlay}>
                                {!user && (
                                    <>
                                        <div className={classes.OverlayTitle}>{translate(`You're playing a demo, login to play for real.`)}</div>
                                        <div className={classes.OverlayButtons}>
                                            <MainButton color='primary' onClick={() => addParamsToUrl('auth', 'login')}>
                                                {translate('Login')}
                                            </MainButton>
                                            <MainButton color='transparent' onClick={() => dispatch(casinoActions.setShowCasinoGame(true))}>
                                                {translate('Play Demo')}
                                            </MainButton>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={classes.GameControls}>
                        <div className={classes.GameNameWrapper}>
                            <h3 className={classes.GameName}>{name}</h3>
                        </div>
                        <div className={classes.DemoControl}>
                            <Switch
                                active={isDemo}
                                label={translate('DEMO MODE')}
                                onClick={() => {
                                    if (user) setIsDemo((prev) => !prev);
                                    else toast.warning(translate('Login to access this feature'));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CasinoGame;
