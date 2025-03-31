import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./ModalRoot.module.css";
import CashierModal from "./Modals/CashierModal";
import LoginModal from "./Modals/LoginModal";
import AnnouncementModal from "./Modals/AnnouncementModal";

import OddsFormatModal from "./Modals/OddsFormatModal";
import BonusModal from "./Modals/BonusModal";

import SearchModal from "./Modals/SearchModal";

import AchievementModal from "./Modals/Gamification Modals/AchievementModal";
import HeroConfirmation from "./Modals/HeroConfirmation";
import BuyLevelConfirmation from "./Modals/BuyLevelConfirmation";
import YourProgress from "../../pages/UserGamification.jsx/features/YourProgress";

import { modalActions } from "./modalSlice";
import { useEffect } from "react";
import StatisticsModal from "./Modals/StatisticsModal";
import BookedBetModal from "./Modals/BookedBetModal";
import LoadBookedModal from "./Modals/LoadBookedModal";
import PromotionModal from "./Modals/PromotionModal";
import LoadTicketModal from "./Modals/LoadTicketModal";
import TicketReceiptModal from "./Modals/TicketReceiptModal";
import TransactionsModal from "./Modals/TransactionsModal";
import NotificationsModal from "./Modals/NotificationsModal";
import CasinoGameOptionsModal from "./Modals/CasinoGameOptionsModal";
import PleaseVerify from "./Modals/PleaseVerify";
import TfaModal from "./Modals/TfaModal";
import PromoCodeModal from "./Modals/PromoCodeModal";
import NotificationPopUp from "./Modals/NotificationPopUp";
import CalendarModal from "./Modals/CalendarModal";

const ModalRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const inLobbySearch = useSelector((state) => state.modal.inLobbySearch);
  const permissions = useSelector((state) => state.login.permissions);
  const onCloseModal = useSelector((state) => state.modal.onCloseModal);
  const user = useSelector((state) => state.login.user);
  const query = new URLSearchParams(location.search);
  let modal = query.get("modal");
  const tab = query.get("tab");

  useEffect(() => {
    return () => dispatch(modalActions.setOnCloseModal(null));
  }, []);

  const getUrlWithParams = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    searchParams.set("tab", tab);
    return `${location.pathname}?${searchParams.toString()}`;
  };

  const returnToPrevious = () => {
    dispatch(modalActions.setInLobbySearch(false));
    if (onCloseModal) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("modal", onCloseModal.modal);
      if (onCloseModal.tab) searchParams.set("tab", onCloseModal.tab);

      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
      dispatch(modalActions.setOnCloseModal(null));
    } else {
      navigate(location.pathname);
    }
  };

  let modalPage = null;

  if (modal === "cashier") {
    if (user) modalPage = <CashierModal tab={tab} />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "auth")
    modalPage = <LoginModal tab={tab} onClose={returnToPrevious} />;
  else if (modal === "odds-format") modalPage = <OddsFormatModal />;
  else if (modal === "verify") modalPage = <PleaseVerify />;
  else if (modal === "booked-bet") modalPage = <BookedBetModal />;
  else if (modal === "calendar") modalPage = <CalendarModal />;
  else if (modal === "load-booked") modalPage = <LoadBookedModal />;
  else if (modal === "ticket-receipt") modalPage = <TicketReceiptModal />;
  else if (modal === "load-ticket") modalPage = <LoadTicketModal />;
  else if (modal === "promo-code") modalPage = <PromoCodeModal />;
  else if (modal === "statistics") modalPage = <StatisticsModal />;
  else if (modal === "announcement") modalPage = <AnnouncementModal />;
  else if (modal === "promotion") modalPage = <PromotionModal />;
  else if (modal === "transactions") modalPage = <TransactionsModal />;
  else if (modal === "tfa") modalPage = <TfaModal />;
  else if (modal === "bonus") {
    if (user) modalPage = <BonusModal />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "search") modalPage = <SearchModal />;
  else if (modal === "notifications") {
    if (user) modalPage = <NotificationsModal />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "n") {
    if (user) modalPage = <NotificationPopUp />;
  } else if (modal === "achievement") {
    if (user && permissions.AllowGamification) modalPage = <AchievementModal />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "hero-confirm") modalPage = <HeroConfirmation />;
  else if (modal === "buy-level-confirm") {
    if (user && !permissions.AllowGamification)
      modalPage = <BuyLevelConfirmation />;
  } else if (modal === "your-progress") {
    if (user && permissions.AllowGamification) modalPage = <YourProgress />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "game-options") {
    if (user) modalPage = <CasinoGameOptionsModal onClose={returnToPrevious} />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  }

  useEffect(() => {
    const isShown = sessionStorage.getItem("promoShown");

    if (!isShown && modal == null && !user) {
      setTimeout(() => {
        // console.log('isShown')
        modal = true;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("modal", "announcement");
        navigate(`${location.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
      }, 1000);
    }
  }, []);

  return (
    <div className={classes.ModalRoot} id="modal-root">
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
      {/* {inLobbySearch && (
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
          </motion.div>
        </AnimatePresence>
      )} */}
    </div>
  );
};

export default ModalRoot;
