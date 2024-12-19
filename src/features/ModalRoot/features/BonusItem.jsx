import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LoyaltyBonus from "../../../assets/svgs/loyaltyBonus.webp";
import RegisterBonus from "../../../assets/svgs/registerBonus.webp";
import DepositBonus from "../../../assets/svgs/depositBonus.webp";
import { cancelBonus, claimBonus } from "../modalAsyncActions";
import RewardsCategory from "../features/RewardsCategory";
import ReturnIcon from "../../../assets/svgs/return.svg?react";

import { translate } from "../../../utils/translations";
import { formatDateTime, getTimeUntil } from "../../../utils/custom";

import classes from "./BonusItem.module.css"; // Assuming you have some CSS for the BonusItem

const BonusItem = ({ bonus, handleTabClick }) => {
  const dispatch = useDispatch();
  const usernameSplit = bonus.Username ? bonus.Username.split(" ") : [];
  const bonusType = usernameSplit[0] || "";

  const [message, setMessage] = useState("Remove Bonus");

  let color = "var(--badge-new-purple)";

  const {
    Status: status,
    Progress: initialProgress,
    Waggered,
    WinsLimit,
  } = bonus;
  let progress = initialProgress;

  if (initialProgress === 0 && Waggered > 0) {
    progress = (100 * Waggered) / WinsLimit;
  }

  if (status === 1) color = "var(--light-blue)";
  if (status === 3 || status === 4) color = "var(--cancelled)";
  if (status === 5) color = "var(--yellow-accent-color)";
  if (status === 6) color = "var(--brand-green)";

  const handleClaimBonus = (id) => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(
      claimBonus(signal, id, () => {
        handleTabClick("Active", 2);
      })
    );
  };

  const handleCancelBonus = (bonus, buttonMessage) => {
    if (buttonMessage === "Remove Bonus") {
      setMessage("Are you sure you want to cancel this bonus?");
    } else if (buttonMessage === "Return") {
      setMessage("Remove Bonus");
    } else {
      const controller = new AbortController();
      const signal = controller.signal;

      const cancelledBonus = { ...bonus, Status: 3 };

      dispatch(cancelBonus(signal, cancelledBonus));
    }
  };

  return (
    <div key={bonus.Id} className={classes.bonusItem}>
      <div
        className={classes.bonusShadow}
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      ></div>
      <div className={classes.bonusItemContent}>
        <div className={classes.bonusItemImage}>
          {bonusType === "Loyalty" && (
            <img src={LoyaltyBonus} alt="bonus" loading="lazy" />
          )}
          {bonusType === "Deposit" && (
            <img src={DepositBonus} alt="bonus" loading="lazy" />
          )}
          {bonusType === "Register" && (
            <img src={RegisterBonus} alt="bonus" loading="lazy" />
          )}
          {bonus.imageUrl && (
            <img src={bonus.imageUrl} alt="bonus" loading="lazy" />
          )}
          {!["Loyalty", "Deposit", "Register"].includes(bonusType) && (
            <img src={LoyaltyBonus} alt="bonus" loading="lazy" />
          )}
        </div>
        <div className={classes.bonusContentContainer}>
          <div className={classes.contentTitle}>
            <div className={classes.bonusTitle}>
              <h3>
                {bonusType + " "}
                {translate("Bonus")}
              </h3>
              <div className={classes.BonusBlnc}>
                {translate("Balance") + ": "}
                {bonus.Balance.toFixed(2)}
              </div>
            </div>
            <div className={classes.bonusDate}>
              {bonus.StartedAt && (
                <div className={classes.startingDate}>
                  {formatDateTime(bonus.StartedAt)}
                </div>
              )}
              {bonus.ExpiresAt && (
                <>
                  <div>-</div>
                  <div className={classes.endingDate}>
                    {formatDateTime(bonus.ExpiresAt)}
                  </div>
                </>
              )}
            </div>
          </div>
          {status !== 1 ? (
            status !== 2 ? (
              <div className={classes.wageringContent}>
                <RewardsCategory
                  label="0.00"
                  progress={progress}
                  bits={bonus.WinsLimit}
                />
              </div>
            ) : (
              <>
                <div className={classes.wageringContent}>
                  <RewardsCategory
                    label="0.00"
                    progress={progress}
                    bits={bonus.WinsLimit}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "0.2rem",
                  }}
                >
                  {message ===
                    "Are you sure you want to cancel this bonus?" && (
                    <div className={classes.bonusWrapperBtns}>
                      <div className={classes.bonusItemClaim}>
                        <div
                          className={classes.BackBtn}
                          onClick={() => handleCancelBonus(bonus, "Return")}
                          style={{ background: "#12374d" }}
                        >
                          <ReturnIcon />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={classes.bonusWrapperBtns}>
                    <div className={classes.bonusItemClaim}>
                      <div
                        className={classes.CancelBtn}
                        onClick={() => handleCancelBonus(bonus, message)}
                        style={
                          message === "Remove Bonus"
                            ? { backgroundColor: "#72b4d504" }
                            : { backgroundColor: "#c32727db" }
                        }
                      >
                        <div className={classes.claim}>
                          {translate(`${message}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            <div className={classes.bonusWrapperBtns}>
              <div className={classes.bonusItemClaim}>
                <div
                  className={classes.claimBtn}
                  onClick={() => handleClaimBonus(bonus.Id)}
                >
                  <div className={classes.claim}>{translate("Claim")}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusItem;
