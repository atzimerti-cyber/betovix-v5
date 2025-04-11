import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import classes from "./Vouchers.module.css";

import { VouchstarBtn } from "react-vstar-websdk";
import DsButton from "../../../features/UI/Buttons/DsButton";
import AngleLeft2Icon from "../../../assets/svgs/angle-left2.svg?react";
import { translate } from "../../../utils/translations";
import { appActions } from "../../../features/InitApp/appSlice";
import useDebounce from "../../../hooks/useDebounce";
import config from "../../../config";

const Vouchers = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang);
  const accountId = useSelector((state) => state.login.user.AccountId);

  const siteid = config.VITE_SITE_ID;

  const [amount, setAmount] = useState(20); // default amount
  const [btnDisabled, setBtnDisabled] = useState(true); // default amount
  const debAmount = useDebounce(amount, 20);

  const navigateToDeposit = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", "cashier");
    searchParams.set("tab", "deposit");
    searchParams.delete("stage");
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    let numAmount;
    if (debAmount) {
      numAmount = Number(debAmount);
      if (numAmount >= 20) {
        setBtnDisabled(false);
      }
    } else {
      setBtnDisabled(true);
    }
    return () => {};
  }, [debAmount]);

  return props.vouchers ? (
    <div className={classes.ReturnContainer}>
      <div className={classes.ReturnButtonWrapper}>
        <DsButton color="transparent" onClick={navigateToDeposit}>
          <AngleLeft2Icon />
          <span>{translate("Return to Deposit Methods")}</span>
        </DsButton>
      </div>
      <div className={classes.VoucherTabContainer}>
        <div className={classes.AmountInputWrapper}>
          <label htmlFor="amountInput">
            {translate("Enter voucher amount")}:
          </label>
          <input
            id="amountInput"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/\D/g, "");
              setAmount(numericValue);
            }}
            className={`${classes.Input}`}
          />
        </div>

        <div
          className={classes.VoucherBtnWrapper}
          onClick={() => {
            dispatch(appActions.setShowVoucherModal(true));
          }}
          style={btnDisabled ? { pointerEvents: "none", opacity: "0.5" } : {}}
        >
          {props.vouchers.Methods &&
            props.vouchers.Methods.map((voucher, index) => {
              const paymentName = voucher.Name;
              const buttons = voucher?.Fields?.map((paym, i) => {
                return (
                  //   <VouchstarBtn
                  //     additional={`${accountId},${siteid},${paymentName}`}
                  //     theme="dark"
                  //     debug={false}
                  //     type="row"
                  //     size="xl"
                  //     config={{
                  //       price: amount,
                  //       payment: {
                  //         currency: "EUR",
                  //         paymentMethod: `${paym.Type}`,
                  //       },
                  //     }}
                  //   />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                    className={classes.BtnWrapper}
                  >
                    <img
                      src={`https://cdn.vouchstar.shop/assets/paymentMethods/${paym.Type}.svg`}
                      alt={`Vouchstar ${paym.Type} payment method`}
                      //   width="50"
                      //   height="50"
                      className={classes.PaymImg}
                      //   style={{
                      //     backgroundColor: "#fff",
                      //     position: "absolute",
                      //     top: "5px",
                      //     left: "15%",
                      //     width: "70%",
                      //     cursor: "pointer",
                      //     pointerEvents: "none",
                      //   }}
                    />

                    <VouchstarBtn
                      additional={`${accountId},${siteid},${paym.Name}`}
                      theme="dark"
                      debug={false}
                      type="col"
                      size="xl"
                      config={{
                        price: amount,
                        payment: {
                          currency: "EUR",
                          paymentMethod: paym.Type,
                        },
                      }}
                    />
                  </div>
                );
              });

              return buttons;
            })}
        </div>
      </div>
    </div>
  ) : null;
};

export default Vouchers;
