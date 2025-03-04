import { useState, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import classes from "./AmountArea.module.css";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { betslipActions } from "../betslipSlice";
import { translate } from "../../../utils/translations";
// import { ticketActions } from '../../Ticket/ticketSlice';

const AmountArea = memo(function (props) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const maxBet = useSelector((state) => state.ticket.maxBet);
  const amounts = useSelector((state) => state.betslip.amounts);
  const totalStake = useSelector((state) => state.betslip.totalStake);
  const betType = useSelector((state) => state.betslip.betType);

  const [betAmount, setBetAmount] = useState("0.00");
  const [initRender, setInitRender] = useState(false);

  useEffect(() => {
    if (totalStake !== null) {
      setBetAmount(totalStake.toFixed(2));
      updateAmount(parseFloat(totalStake));
    } else {
      setBetAmount("0.00");
      updateAmount(parseFloat(0));
    }
  }, [totalStake]);

  useEffect(() => {
    let thisAmount = amounts[props.amountId];
    if (!thisAmount) {
      updateAmount(0);
      thisAmount = 0;
    }

    handleAmountChange(thisAmount);
    handleAmountBlur();

    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  // If the value was changed by clicking the checkbox
  useEffect(() => {
    const shownValue = parseFloat(betAmount);
    const savedValue = parseFloat(amounts[props.amountId]);

    if (amounts[props.amountId] !== undefined && shownValue !== savedValue) {
      handleAmountChange(savedValue);
      handleAmountBlur();
    }
  }, [amounts[props.amountId]]);

  const handleAmountChange = (value) => {
    let thisAmount = "" + value;

    if (thisAmount === "") {
      thisAmount = "0";
    } else {
      // Regular expression to match a number with up to two decimal places
      const regex = /^\d*\.?\d{0,2}$/;
      if (!regex.test(thisAmount)) {
        return;
      }

      // Remove leading zeros except for decimal numbers like "0.xx"
      thisAmount = thisAmount
        .replace(/^0+([1-9]\d*(\.\d+)?)/, "$1")
        .replace(/^(0\.\d+)/, "$1");

      if (maxBet && thisAmount > maxBet.maxbet) {
        const finalMaxBet = maxBet.maxbet < 0 ? 0 : maxBet.maxbet;
        thisAmount = finalMaxBet;
        toast.error(
          translate(`Maximum stake for you at the moment is ${finalMaxBet}`)
        );
      }
      if (thisAmount === ".00") thisAmount = "0.00";
    }

    setBetAmount(thisAmount);
    updateAmount(parseFloat(thisAmount));
  };

  // Formats the value to two decimal places and adds thousand separators on blur
  const handleAmountBlur = () => {
    // let formattedValue = amounts[props.amountId];
    // if (formattedValue === "" || formattedValue === undefined) {
    //   formattedValue = "0.00";
    // } else {
    //   // Convert to number then back to string to trim unnecessary zeros
    //   formattedValue = Number(formattedValue).toFixed(2);
    //   // Add thousands separators
    //   formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }
    // setBetAmount(formattedValue);
  };

  const handleAmountFocus = () => {
    if (!initRender) {
      setInitRender(true);
      return;
    }
    if (!betAmount) return;

    let thisAmount = (betAmount + "")
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\.\d{2})\d+/g, "$1");

    // Remove leading zeros except for decimal numbers like "0.xx"
    thisAmount = thisAmount
      .replace(/^0+([1-9])/, "$1")
      .replace(/^0+(\d*\.\d+)/, "$1");

    setBetAmount(parseFloat(thisAmount));
  };

  const updateAmount = (value) => {
    if (betType === "Multiple") {
      dispatch(betslipActions.setAmounts({}));
    }
    dispatch(
      betslipActions.updateAmount({ key: props.amountId, value: value })
    );
    // dispatch(ticketActions.setCalculateTicket());
  };

  return (
    <>
      <CoinsIcon className={classes.CoinsIcon} />
      <input
        ref={inputRef}
        className={
          betAmount == 0
            ? [classes.NoAmount, classes.AmountInput].join(" ")
            : classes.AmountInput
        }
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={betAmount}
        onChange={(e) => handleAmountChange(e.target.value)}
        onBlur={handleAmountBlur}
        onFocus={handleAmountFocus}
      />
    </>
  );
});

export default AmountArea;
