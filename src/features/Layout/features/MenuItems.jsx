import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import StarIcon from "../../../assets/svgs/star.svg?react";
import BellIcon from "../../../assets/svgs/bell.svg?react";
import LiveSupportIcon from "../../../assets/svgs/live-support.svg?react";
import PaperIcon from "../../../assets/svgs/paper2.svg?react";
import ExchangeIcon from "../../../assets/svgs/exchange.svg?react";
import LogoutIcon from "../../../assets/svgs/logout.svg?react";
import UserIcon from "../../../assets/svgs/user.svg?react";
import AffIcon from "../../../assets/svgs/affiliate.svg?react";
import { loginActions } from "../../../pages/Login/loginSlice";
import classes from "./MenuItems.module.css";
import { translate } from "../../../utils/translations";
import { useMediaQuery } from "react-responsive";
import { getAccessToken } from "../../../utils/auth";

const MenuItems = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);
  const user = useSelector((state) => state.login.user);
  const siteSettings = useSelector((state) => state.app.siteSettings);

  const newNotifications = useSelector(
    (state) => state.layout.newNotifications
  );

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const newRewards = useSelector(
    (state) => state.gamification.availableRewards
  );

  const permissions = useSelector((state) => state.login.permissions);
  const support = useSelector((state) => state.layout.tawkToScript);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const NavigateToBackOffice = () => {
    // const currentDomain = window.location.hostname;
    // const token = getAccessToken();
    // const prefix =
    //   siteSettings?.WalletPrefix
    //     ? siteSettings.WalletPrefix
    //     : "wallet.";

    // const walletUrl = `https://${prefix}${currentDomain}?token=${token}`;

    // window.location.href = walletUrl;

    const currentDomain = window.location.hostname;
    const token = getAccessToken();
    const url = siteSettings?.WalletUrl;

    const walletUrl = url
      ? url + "?token=" + token
      : "https://wallet." + currentDomain + "?token=" + token;

    window.location.href = walletUrl;
  }

  return (
    <>
      {user && user.Role < 40 &&
        <li>
          <a
            onClick={() => {
              NavigateToBackOffice();
              props.onClick();
            }}
          >
            <AffIcon fill="#527491" height="16px" width="16px" />
            <span>{translate("Affiliate")}</span>
          </a>
        </li>
      }


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
            {newNotifications && newNotifications.length > 0 && (
              <div className={classes.NumberBadge}>
                {newNotifications.length}
              </div>
            )}
          </a>
        </li>
      )}
      {permissions.AllowGamification && (
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
      )}
      {permissions.AllowToSports && (
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
      )}
      <li>
        <a
          onClick={() => {
            addParamsToUrl("transactions");
          }}
        >
          <ExchangeIcon fill="#527491" />
          <span>{translate("My Transactions")}</span>
        </a>
      </li>
      {support?.Source &&
        <li>
          <a
            onClick={() => {
              navigate(`/support`);
              props.onClick();
            }}
          >
            <LiveSupportIcon />
            <span>{translate("Live Support")}</span>
          </a>
        </li>
      }
      <li>
        <a
          onClick={() => {
            window.location.reload();
            dispatch(loginActions.logout());
            props.onClick();
          }}
          className={classes.LogOutBtn}
        >
          <LogoutIcon />
          <span>{translate("Log Out")}</span>
        </a>
      </li>
    </>
  );
};

export default MenuItems;
