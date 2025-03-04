import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import classes from "./CashierModal.module.css";
import WalletIcon from "../../../assets/svgs/wallet.svg?react";
import ModalHeader from "../features/ModalHeader";
import Tabs from "../../UI/Tabs/Tabs";
import Deposit from "../../../pages/Crypto/features/Deposit";
import Withdraw from "../../../pages/Crypto/features/Withdraw";
import { translate } from "../../../utils/translations";
import {
  GetPaymentMethods,
  getWithrawalReqs,
} from "../../../pages/Crypto/cryptoAsyncActions";
import { cryptoActions } from "../../../pages/Crypto/cryptoSlice";

const CashierModal = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const loading = useSelector((state) => state.crypto.paymentsLoading);

  const [selectedTab, setSelectedTab] = useState(props.tab);

  const contentInnerClasses = [
    classes.TabContentInner,
    classes[`TabContentInner_${selectedTab}`],
  ];

  const changeTab = (tab) => {
    const searchParams = new URLSearchParams();
    searchParams.set("modal", "cashier");
    searchParams.set("tab", tab);

    setSelectedTab(tab);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("tab");

    if (type === "deposit") {
      dispatch(GetPaymentMethods(signal, 1));
    } else if (type === "withdraw") {
      dispatch(GetPaymentMethods(signal, 2));
    }

    return () => {
      controller.abort();
      dispatch(cryptoActions.resetPayments());
    };
  }, [selectedTab]);

  return (
    <div className={classes.CashierModal}>
      <ModalHeader icon={<WalletIcon />} title={translate("Wallet")} />

      <div className={classes.TabContainer}>
        <Tabs
          tabs={[
            {
              id: "deposit",
              label: translate("Deposit"),
              active: selectedTab === "deposit",
            },
            {
              id: "withdraw",
              label: translate("Withdraw"),
              active: selectedTab === "withdraw",
            },
            // { id: 'buy-crypto', label: 'Buy Crypto', active: selectedTab === 'buy-crypto' },
          ]}
          onChangeTab={(tab) => changeTab(tab)}
          // onChangeTab={(tab) => setSelectedTab(tab)}
        />
      </div>

      <div className={classes.TabContentHiddenBox}>
        {loading ? (
          <AnimatePresence>
            <motion.div
              className={classes.Overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={classes.Spinner}></div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className={contentInnerClasses.join(" ")}>
            <div
              className={
                selectedTab === "deposit"
                  ? [classes.TabContent, classes.Active].join(" ")
                  : classes.TabContent
              }
            >
              {selectedTab === "deposit" && <Deposit />}
            </div>
            <div
              className={
                selectedTab === "withdraw"
                  ? [classes.TabContent, classes.Active].join(" ")
                  : classes.TabContent
              }
            >
              {selectedTab === "withdraw" && <Withdraw />}
            </div>
            {/* <div className={selectedTab === 'buy-crypto' ? [classes.TabContent, classes.Active].join(' ') : classes.TabContent}>
                        {selectedTab === 'buy-crypto' && <BuyCrypto />}
                    </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierModal;
