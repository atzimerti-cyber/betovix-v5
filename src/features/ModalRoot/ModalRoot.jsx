import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import classes from './ModalRoot.module.css';
import CashierModal from './Modals/CashierModal';
import LoginModal from './Modals/LoginModal';
import OddsFormatModal from './Modals/OddsFormatModal';
import VipModal from './Modals/VipModal';
import BonusModal from './Modals/BonusModal';

import SearchModal from './Modals/SearchModal';

import AchievementModal from './Modals/AchievementModal';
import HeroConfirmation from './Modals/HeroConfirmation'
import YourProgress from '../../pages/UserGamification.jsx/features/YourProgress';

import { modalActions } from './modalSlice';
import { useEffect } from 'react';
import StatisticsModal from './Modals/StatisticsModal';
import BookedBetModal from './Modals/BookedBetModal';
import LoadBookedModal from './Modals/LoadBookedModal';

const ModalRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onCloseModal = useSelector((state) => state.modal.onCloseModal);
    const user = useSelector((state) => state.login.user);
    const query = new URLSearchParams(location.search);
    const modal = query.get('modal');
    const tab = query.get('tab');

    useEffect(() => {
        return () => dispatch(modalActions.setOnCloseModal(null));
    }, []);


    const getUrlWithParams = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);
        return `${location.pathname}?${searchParams.toString()}`;
    };

    const returnToPrevious = () => {
        if (onCloseModal) {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('modal', onCloseModal.modal);
            if (onCloseModal.tab) searchParams.set('tab', onCloseModal.tab);

            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
            dispatch(modalActions.setOnCloseModal(null));
        } else {
            navigate(location.pathname);
        }
    };

    let modalPage = null;

    if (modal === 'cashier') {
        if (user) modalPage = <CashierModal tab={tab} />;
        else modalPage = <Navigate replace to={getUrlWithParams('auth', 'login')} />;
    } else if (modal === 'auth') modalPage = <LoginModal tab={tab} onClose={returnToPrevious} />;
    else if (modal === 'odds-format') modalPage = <OddsFormatModal />;
    else if (modal === 'booked-bet') modalPage = <BookedBetModal />;
    else if (modal === 'load-booked') modalPage = <LoadBookedModal />;
    else if (modal === 'statistics') modalPage = <StatisticsModal />;
    else if (modal === 'vip') modalPage = <VipModal />;
    else if (modal === 'bonus') {
        if (user) modalPage = <BonusModal />;
        else modalPage = <Navigate replace to={getUrlWithParams('auth', 'login')} />;
    }
    else if (modal === 'search') modalPage = <SearchModal />;
    else if (modal === 'achievement') {
        if (user) modalPage = <AchievementModal />;
        else modalPage = <Navigate replace to={getUrlWithParams('auth', 'login')} />;
    }
    else if (modal === 'hero-confirm') modalPage = <HeroConfirmation />;
    else if (modal === 'your-progress') {
        if (user) modalPage = <YourProgress />;
        else modalPage = <Navigate replace to={getUrlWithParams('auth', 'login')} />;
    }

    return (
        <div className={classes.ModalRoot} id='modal-root'>
            {modal && (
                <div>
                    <AnimatePresence>
                        <motion.div
                            className={classes.Overlay}
                            key={modal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                                <div className={classes.Close} onClick={returnToPrevious}></div>
                            
                            {modalPage}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ModalRoot;
