import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./ModalRoot.module.css";
import CashierModal from "./Modals/CashierModal";
import LoginModal from "./Modals/LoginModal";
import AnnouncementModal from "./Modals/AnnouncementModal";

import VoucherModal from "../../pages/Crypto/features/VoucherModal";

import OddsFormatModal from "./Modals/OddsFormatModal";
import BonusModal from "./Modals/BonusModal";

import SearchModal from "./Modals/SearchModal";


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
import CasinoGameInModal from "./Modals/CasinoGameInModal";
import PaymentModal from "./Modals/PaymentModal";
import PrintTicket from "./Modals/PrintTicket";

const ModalRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const showVoucherModal = useSelector((state) => state.app.showVoucherModal);
  const inLobbySearch = useSelector((state) => state.modal.inLobbySearch);
  const onCloseModal = useSelector((state) => state.modal.onCloseModal);
  const user = useSelector((state) => state.login.user);
  const siteSettings = useSelector((state) => state.app.siteSettings);
  const query = new URLSearchParams(location.search);
  let modal = query.get("modal");
  const tab = query.get("tab");
  const resetToken = query.get("resetToken");

  useEffect(() => {
    if (!resetToken || (modal === "auth" && tab === "forgot-password")) return;

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", "auth");
    searchParams.set("tab", "forgot-password");
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [resetToken, modal, tab, location.pathname, location.search, navigate]);

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
  else if (modal === "announcement") {
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const announcementImage = String(
      isMobileViewport
        ? siteSettings?.AnouncementImgMobile || ""
        : siteSettings?.AnouncementImg || ""
    ).trim();

    if (announcementImage) modalPage = <AnnouncementModal />;
    else modal = null;
  }
  else if (modal === "promotion") modalPage = <PromotionModal />;
  else if (modal === "transactions") modalPage = <TransactionsModal />;
  else if (modal === "payment")
    modalPage = <PaymentModal onClose={returnToPrevious} />;
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
  } else if (modal === "game-options") {
    if (user) modalPage = <CasinoGameOptionsModal onClose={returnToPrevious} />;
    else
      modalPage = <Navigate replace to={getUrlWithParams("auth", "login")} />;
  } else if (modal === "cgame")
    modalPage = <CasinoGameInModal onClose={returnToPrevious} />;
  else if (modal === "print-ticket")
    modalPage = <PrintTicket onClose={returnToPrevious} />;

  useEffect(() => {
    if (!siteSettings || user || modal != null) return undefined;

    const desktopImage = String(siteSettings?.AnouncementImg || "").trim();
    const mobileImage = String(siteSettings?.AnouncementImgMobile || "").trim();
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const announcementImage = isMobileViewport ? mobileImage : desktopImage;
    const isShown = sessionStorage.getItem("promoShown");

    if (isShown || !announcementImage) return undefined;

    const timeoutId = window.setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("modal", "announcement");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [siteSettings, user, modal, location.pathname, location.search, navigate]);

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
      {showVoucherModal && <VoucherModal />}
    </div>
  );
};

export default ModalRoot;
