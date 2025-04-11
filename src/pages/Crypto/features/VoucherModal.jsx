import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

import classes from "./VoucherModal.module.css";

import { VouchstarModal } from "react-vstar-websdk";
import { appActions } from "../../../features/InitApp/appSlice";

const VoucherModal = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Used to re-render on language change
  const modalWrapperRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (
        modalWrapperRef.current &&
        modalWrapperRef.current.childNodes.length === 0
      ) {
        dispatch(appActions.setShowVoucherModal(false));
      }
    });

    if (modalWrapperRef.current) {
      observer.observe(modalWrapperRef.current, {
        childList: true,
        subtree: false,
      });
    }

    return () => {
      observer.disconnect();
      dispatch(appActions.setShowVoucherModal(false));
    };
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className={classes.Overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={classes.ModalWrapper} ref={modalWrapperRef}>
          <VouchstarModal />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoucherModal;
