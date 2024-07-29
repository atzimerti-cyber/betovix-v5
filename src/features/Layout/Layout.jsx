import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Topbar from './features/Topbar';
import classes from './Layout.module.css';
import Footer from './features/Footer';
import BetslipIcon from '../../assets/svgs/betslip.svg?react';
import ChatIcon from '../../assets/svgs/chat.svg?react';
import { layoutActions } from './layoutSlice';
import RightContainer from './features/RightContainer';
import LeftContainer from './features/LeftContainer';
import LiveListContainer from './features/LiveListContainer';
import ModalRoot from '../ModalRoot/ModalRoot';
import Bottombar from './features/Bottombar';
import ChatContainer from './features/ChatContainer';
import WarningIcon from '../../assets/svgs/warning.svg?react';
import SuccessIcon from '../../assets/svgs/check-filled.svg?react';
import UserDrawer from './features/UserDrawer';
import BetslipContainer from './features/BetslipContainer';
import NumberBadge from '../UI/Badges/NumberBudge';
import LiveStream from './features/LiveStream';
import Stats from './features/Stats';
import Ticket from '../Ticket/Ticket';

const Layout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const centerContainerRef = useRef(null);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    const fullLeftContainer = useSelector((state) => state.layout.fullLeftContainer);
    const showRightContainer = useSelector((state) => state.layout.showRightContainer);
    const showRight = useSelector((state) => state.layout.showRight);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);
    const userDropdownVisible = useSelector((state) => state.layout.userDropdownVisible);
    const showStatsFor = useSelector((state) => state.sportsbook.showStatsFor);
    const showVideoFor = useSelector((state) => state.sportsbook.showVideoFor);
    const slips = useSelector((state) => state.betslip.slips);
    const pageNotAuthorized = useSelector((state) => state.layout.pageNotAuthorized);
    const scrollToTop = useSelector((state) => state.layout.scrollToTop);

    const [isFirstRender, setIsFirstRender] = useState(true);

    // After the first render, set isFirstRender to false
    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    // scroll to top of page after a page transition.
    useLayoutEffect(() => {
        if (centerContainerRef.current) {
            centerContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }, [location.pathname, scrollToTop]); // Dependency on pathname to trigger scroll on route change. Can also be triggered with scrollToTop

    let layoutClasses = [classes.Layout];
    if (isMobile) layoutClasses.push('IsMobile');
    if (fullLeftContainer) layoutClasses.push('IsMenuOpen');

    const ToastCloseButton = ({ closeToast }) => (
        <button className={classes.ToastCloseButton} aria-label='Close' type='button' onClick={closeToast}>
            <svg width='13' height='13' viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg' fill='#374E57' data-testid='close-icon'>
                <path d='M7.6497 6.50084L12.7618 1.38875C13.0794 1.07142 13.0794 0.556521 12.7618 0.239183C12.4442 -0.0784256 11.9298 -0.0784256 11.6122 0.239183L6.50014 5.35127L1.38778 0.239183C1.07017 -0.0784256 0.555815 -0.0784256 0.238206 0.239183C-0.0794021 0.556521 -0.0794021 1.07142 0.238206 1.38875L5.35057 6.50084L0.238206 11.6129C-0.0794021 11.9303 -0.0794021 12.4452 0.238206 12.7625C0.397011 12.921 0.605136 13.0004 0.812991 13.0004C1.02085 13.0004 1.22897 12.921 1.38778 12.7622L6.50014 7.65014L11.6122 12.7622C11.771 12.921 11.9792 13.0004 12.187 13.0004C12.3949 13.0004 12.603 12.921 12.7618 12.7622C13.0794 12.4449 13.0794 11.93 12.7618 11.6127L7.6497 6.50084Z'></path>
            </svg>
        </button>
    );

    return (
        <div id='layout' className={layoutClasses.join(' ')}>
            <ToastContainer
                className={classes.MyToast}
                closeButton={ToastCloseButton}
                autoClose={5000}
                icon={({ type }) => {
                    if (type === 'success') return <SuccessIcon />;
                    else if (type === 'error') return <WarningIcon />;
                    else if (type === 'warning') return <WarningIcon />;
                    // else return "ℹ️";
                }}
            />

            <Topbar />

            <div className={classes.Content}>
                {!isMobile && <LiveListContainer />}

                <motion.div
                    className={classes.OuterContainerLeft}
                    key={fullLeftContainer ? 1 : 0}
                    initial={{ width: fullLeftContainer ? 60 : 260 }}
                    animate={{ width: fullLeftContainer ? 260 : 60 }}
                    transition={{ duration: isFirstRender ? 0 : 0.2, ease: 'easeOut' }}
                >
                    <AnimatePresence>
                        <motion.div
                            className={classes.InnerContainer}
                            key={fullLeftContainer ? 1 : 0}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                            transition={{ duration: isFirstRender ? 0 : 0.2, delay: isFirstRender ? 0 : 0.2 }}
                        >
                            <LeftContainer />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <div className={classes.CenterContainer} ref={centerContainerRef}>
                    <main>
                        <div className={pageNotAuthorized ? [classes.FullPage, classes.NotAuthorized].join(' ') : classes.FullPage}>
                            <Outlet />
                        </div>
                    </main>

                    <Footer />
                </div>

                {!isMobile && (
                    <AnimatePresence>
                        {showRightContainer && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 330 }}
                                exit={{ width: 0, transition: { duration: 0.2, delay: 0.2 } }}
                                transition={{ duration: isFirstRender ? 0 : 0.2, ease: 'easeOut' }}
                            >
                                <motion.div
                                    key={showRightContainer ? 1 : 0}
                                    className={[classes.OuterContainerRight, classes.Show].join(' ')}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                                    transition={{ duration: isFirstRender ? 0 : 0.2, delay: 0.2 }}
                                >
                                    <RightContainer />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {showStatsFor && <Stats showStatsFor={showStatsFor} />}

            {showVideoFor && <LiveStream showVideoFor={showVideoFor} />}

            {!isMobile && !showRightContainer && (
                <div className={classes.OverlayButtons}>
                    {permissions.AllowToSports && (
                        <div
                            className={classes.IconButton}
                            onClick={() => {
                                dispatch(layoutActions.setShowRight('betslip'));
                                dispatch(layoutActions.setShowRightContainer(true));
                            }}
                        >
                            <BetslipIcon />
                            {slips.length > 0 && <NumberBadge number={slips.length} floating justifyRight />}
                        </div>
                    )}

                    <div
                        className={classes.IconButton}
                        onClick={() => {
                            dispatch(layoutActions.setShowRight('chat'));
                            dispatch(layoutActions.setShowRightContainer(true));
                        }}
                    >
                        <ChatIcon />
                    </div>
                </div>
            )}

            {isMobile && showRightContainer && showRight === 'chat' && (
                <div className={classes.ChatOuter}>
                    <AnimatePresence>
                        <motion.div initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
                            <ChatContainer />
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
            {isMobile && showRightContainer && showRight === 'betslip' && (
                <div className={classes.BetslipOuter}>
                    <AnimatePresence>
                        <motion.div initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
                            <BetslipContainer />
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            <div
                className={!isDesktop && user && userDropdownVisible ? [classes.FullOverlay, classes.Show].join(' ') : classes.FullOverlay}
                onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))}
            ></div>
            <AnimatePresence>{!isDesktop && user && userDropdownVisible && <UserDrawer />}</AnimatePresence>

            {isMobile && <Bottombar />}

            <ModalRoot />
            <Ticket />
        </div>
    );
};

export default Layout;
