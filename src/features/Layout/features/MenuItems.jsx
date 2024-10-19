import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import StarIcon from "../../../assets/svgs/star.svg?react";
import TransactionIcon from "../../../assets/svgs/transaction.svg?react";
import VaultIcon from "../../../assets/svgs/vault.svg?react";
import BellIcon from "../../../assets/svgs/bell.svg?react";
import LiveSupportIcon from "../../../assets/svgs/live-support.svg?react";
import PaperIcon from "../../../assets/svgs/paper2.svg?react";
import LogoutIcon from "../../../assets/svgs/logout.svg?react";
import UserIcon from "../../../assets/svgs/user.svg?react";
import { loginActions } from "../../../pages/Login/loginSlice";
import classes from "./MenuItems.module.css";
import { translate } from "../../../utils/translations";
import { useMediaQuery } from "react-responsive";

const MenuItems = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const newRewards = useSelector(
    (state) => state.gamification.availableRewards
  );
  const newNotifications = 0; ///////////////////////////////////////////////////////////////

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <>
      <li>
        <a
          onClick={() => {
            navigate(`profile?tab=overview`);
            props.onClick();
          }}
        >
          <UserIcon fill="#527491" height="16px" width="16px" />
          <span>{translate("Profile")}</span>
        </a>
      </li>

      {!isDesktop && (
        <li>
          <a onClick={() => addParamsToUrl("notifications")}>
            <BellIcon />
            <span>{translate("Notifications")}</span>
            {newNotifications > 0 && (
              <div className={classes.NumberBadge}>{newNotifications}</div>
            )}
          </a>
        </li>
      )}
      <li>
        <a
          onClick={() => {
            navigate(`rewards`);
            props.onClick();
          }}
        >
          <StarIcon />
          <span>{translate("My Rewards")}</span>
          {newRewards > 0 && (
            <div className={classes.NumberBadge}>{newRewards}</div>
          )}
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            navigate(`sportsbook/mybets`);
            props.onClick();
          }}
        >
          <PaperIcon fill="#527491" />
          <span>{translate("My Bets")}</span>
        </a>
      </li>
      <li>
        <a>
          <LiveSupportIcon />
          <span>{translate("Live Support")}</span>
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            window.location.reload();
            dispatch(loginActions.logout());
            props.onClick();
          }}
          style={{ background: "#1c374d" }}
        >
          <LogoutIcon />
          <span>{translate("Log Out")}</span>
        </a>
      </li>
    </>
  );
};

export default MenuItems;
