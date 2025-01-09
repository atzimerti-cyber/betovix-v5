import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import classes from "./Slip.module.css";
import { betslipActions } from "../betslipSlice";
import TimesIcon from "../../../assets/svgs/times.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";
import { addThousandsSeparator } from "../../../utils/custom";
import TeamLogo from "../../TeamLogo/TeamLogo";
import AmountArea from "./AmountArea";
import { translate, translateNameWithLang } from "../../../utils/translations";
import IndicatorDownIcon from "../../../assets/svgs/indicator-down.svg?react";
import IndicatorUpIcon from "../../../assets/svgs/indicator-up.svg?react";

import { layoutActions } from "../../Layout/layoutSlice";

const Slip = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const selectedOddsFormat = useSelector(
    (state) => state.app.selectedOddsFormat
  );
  const betType = useSelector((state) => state.betslip.betType);
  const amounts = useSelector((state) => state.betslip.amounts);
  const slipsNum = useSelector((state) => state.betslip.betslip.slipsNum);

  const [currentValue, setCurrentValue] = useState(props.slip.Odd);
  const [previousValue, setPreviousValue] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [checkAmounts, setCheckAmounts] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    let timer;

    if (!props.slip?.Odd) return;
    if (!props.slip?.Active) return;

    if (props.slip.Odd !== currentValue) {
      if (previousValue !== null && props.slip.Odd !== previousValue) {
        const ind = props.slip.Odd > previousValue ? "up" : "down";
        setShowIndicator(ind);

        timer = setTimeout(() => {
          setShowIndicator(false);
        }, 7000);
      }

      setPreviousValue(currentValue);
      setCurrentValue(props.slip.Odd);
    }

    return () => {
      clearTimeout(timer);
      if (showIndicator) setShowIndicator(false);
    };
  }, [props.slip.Odd]);

  const getTotalPayout = () => {
    let total = 0;
    if (amounts[props.slip.FieldId])
      total = amounts[props.slip.FieldId] * props.slip.Odd;

    // Add thousands separators
    total = addThousandsSeparator(total, 2);

    return total;
  };

  const getOddsLabel = () => {
    if (
      props.slip.FieldName?.International === "W1" ||
      props.slip.FieldName?.International === "1"
    )
      return translateNameWithLang(props.slip.HomeTeamName);
    else if (
      props.slip.AwayTeamName &&
      (props.slip.FieldName?.International === "W2" ||
        props.slip.FieldName?.International === "2")
    )
      return translateNameWithLang(props.slip.AwayTeamName);
    else if (
      props.slip.FieldName?.International === "x" ||
      props.slip.FieldName?.International === "X"
    )
      return translate("Draw");

    return translateNameWithLang(props.slip.FieldName);
  };

  const convertOdds = (decimalOdds) => {
    if (!decimalOdds || decimalOdds === "-" || decimalOdds <= 1) {
      return "-";
    }

    switch (selectedOddsFormat) {
      case "Decimal":
        return decimalOdds.toFixed(2);
      case "American":
        return decimalOdds >= 2.0
          ? `+${Math.round((decimalOdds - 1) * 100)}`
          : `-${Math.round(100 / (decimalOdds - 1))}`;

      case "Fractional":
        const numerator = Math.round((decimalOdds - 1) * 100);
        const denominator = 100;
        // Simplify the fraction using a helper function
        const gcd = (a, b) => (b ? gcd(b, a % b) : a);
        const divisor = gcd(numerator, denominator);
        return `${numerator / divisor}/${denominator / divisor}`;

      case "Hong Kong":
        return (decimalOdds - 1).toFixed(2);

      case "Indonesian":
        return decimalOdds >= 2.0
          ? (decimalOdds - 1).toFixed(2)
          : (-1 / (decimalOdds - 1)).toFixed(2);

      case "Malay":
        return decimalOdds >= 2.0
          ? (-1 / (decimalOdds - 1)).toFixed(2)
          : (decimalOdds - 1).toFixed(2);

      default:
        return "Unknown format type";
    }
  };

  const handleNavigate = () => {
    const url = `/event/${props.slip.SportName?.International}/${props.slip.SportId}/${props.slip.MatchId}`;
    navigate(url);
  };

  const handleRemoveSlip = (event) => {
    event.stopPropagation();
    dispatch(betslipActions.removeFromSlips(props.slip.FieldId));
    setCheckAmounts(true);

    if (slipsNum == 1) {
      dispatch(layoutActions.setShowRight("betslip"));
      dispatch(layoutActions.setShowRightContainer(false));
    }
  };

  const handleAmountClick = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      className={classes.Slip}
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0, transition: { duration: 0.2, delay: 0 } }}
      transition={{ duration: 0.2 }}
      onClick={handleNavigate}
    >
      <div className={classes.SelectionList}>
        <div
          className={
            props.slip.Odd <= 1
              ? [classes.Selection, classes.Inactive].join(" ")
              : classes.Selection
          }
        >
          <div className={classes.Header}>
            <div className={classes.TeamVersusGroup}>
              <div className={[classes.TeamVersus, classes.TeamA].join(" ")}>
                <div className={classes.TeamText}>
                  <div className={classes.TeamLogoWrapper}>
                    <div className={classes.TeamLogo}>
                      <TeamLogo
                        teamId={props.slip.HomeTeamId}
                        isHome={true}
                        sportName={props.slip.SportName?.International}
                      />
                    </div>
                  </div>
                  <div className={classes.TeamName}>
                    {translateNameWithLang(props.slip.HomeTeamName)}
                  </div>
                </div>
              </div>

              {props.slip.AwayTeamName?.International && (
                <>
                  <div className={classes.TeamVersusWord}> vs </div>

                  <div
                    className={[classes.TeamVersus, classes.TeamB].join(" ")}
                  >
                    <div className={classes.TeamText}>
                      <div className={classes.TeamLogoWrapper}>
                        <div className={classes.TeamLogo}>
                          <TeamLogo
                            teamId={props.slip.AwayTeamId}
                            isHome={false}
                            sportName={props.slip.SportName?.International}
                          />
                        </div>
                      </div>
                      <div className={classes.TeamName}>
                        {translateNameWithLang(props.slip.AwayTeamName)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {props.slip.Live && <div className={classes.LiveBadge}>Live</div>}

            <button
              className={classes.DismissButton}
              onClick={handleRemoveSlip}
            >
              <TimesIcon />
            </button>
          </div>

          <div className={classes.Separator}></div>

          <div className={classes.MarketSection}>
            <div className={classes.OutcomesWrap}>
              <div className={classes.OutcomeGroup}>
                <div className={classes.Content}>
                  <div className={classes.MarketInfo}>
                    <div className={classes.MarketName}>
                      {translateNameWithLang(props.slip.MarketName)}
                    </div>
                  </div>
                </div>
                <div className={classes.Extended}>
                  <div className={classes.Content}>
                    <div className={classes.OutcomeInfo}>
                      <div className={classes.OutcomeName}>
                        {getOddsLabel()}
                      </div>
                      <div className={classes.OddsDelta}>
                        <div className={classes.Indicator}>
                          {showIndicator === "up" && (
                            <div className={classes.Placeholder}>
                              <IndicatorUpIcon
                                className={classes.IndicatorUp}
                              />
                            </div>
                          )}
                          {showIndicator === "down" && (
                            <div className={classes.Placeholder}>
                              <IndicatorDownIcon
                                className={classes.IndicatorDown}
                              />
                            </div>
                          )}
                        </div>
                        <div className={classes.Odds}>
                          {convertOdds(props.slip.Odd)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {betType === "Single" && (
        <div className={classes.PaymentSection}>
          <div className={classes.AmountArea} onClick={handleAmountClick}>
            <AmountArea amountId={props.slip.FieldId} />
          </div>

          <div className={classes.PaymentMarketInfo}>
            <div className={classes.AmountLabel}>
              {translate("Total Payout")}
            </div>
            <div className={classes.AmountTotal}>
              <CoinsIcon />
              <div className={classes.AmountTotalText}>{getTotalPayout()}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Slip;
