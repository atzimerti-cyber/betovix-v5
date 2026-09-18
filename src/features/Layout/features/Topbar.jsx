import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import classes from "./Topbar.module.css";

import GiftIcon from "../../../assets/svgs/gift.svg?react";
import WalletIcon from "../../../assets/svgs/wallet.svg?react";
import CoinsIcon from "../../../assets/svgs/coins.svg?react";

import LogoBig from "../../../assets/svgs/logo-big.svg?react";
import LogoSmall from "../../../assets/svgs/logo-small.svg?react";

import MenuBurgerIcon from "../../../assets/svgs/menu-burger.svg?react";
import CameraIcon from "../../../assets/svgs/video.svg?react";
import BellIcon from "../../../assets/svgs/bell.svg?react";

import MainButton from "../../UI/Buttons/MainButton";
import Dropdown from "../../UI/Dropdown/Dropdown";
import NotificationDropdown from "../../UI/Dropdown/NotificationDropdown";
import DropdownLang from "../../UI/Dropdown/DropdownLang";
import NumberBadge from "../../UI/Badges/NumberBudge";
import { translate } from "../../../utils/translations";
import { layoutActions } from "../layoutSlice";
import MenuItems from "./MenuItems";
import { addThousandsSeparator } from "../../../utils/custom";

import NoUserImg from "../../../assets/images/nouserimg.png";
import config from "../../../config";
import SearchIcon from "../../../assets/svgs/search.svg?react";
import StarOutlineIcon from "../../../assets/svgs/star-outline.svg?react";
import BonusIcon from "../../../assets/svgs/bonus.svg?react";
import WithdrawIcon from "../../../assets/svgs/withdrawreq.svg?react";
import HistoryIcon from "../../../assets/svgs/transaction.svg?react";
import PromoIcon from "../../../assets/svgs/voucher.svg?react";
import LiveSupportIcon from "../../../assets/svgs/live-support.svg?react";
import UserIcon from "../../../assets/svgs/user.svg?react";
import VerifyIcon from "../../../assets/svgs/verify.svg?react";
import LogoutIcon from "../../../assets/svgs/logout.svg?react";
import { logout } from "../../../pages/Login/loginAsyncActions";
import { searchActions } from "../../../pages/Search/searchSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang);
  const siteSettings = useSelector((state) => state.app.siteSettings);
  const permissions = useSelector((state) => state.login.permissions);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const progressBar = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 950px)",
  });
  const hasCasinoAccess = Boolean(permissions?.AllowToCasino || permissions?.AllowToSlots);

  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );
  const userDropdownVisible = useSelector(
    (state) => state.layout.userDropdownVisible
  );
  const notificationDropdownVisible = useSelector(
    (state) => state.layout.notificationDropdownVisible
  );
  const user = useSelector((state) => state.login.user);
  const showLiveListContainer = useSelector(
    (state) => state.layout.showLiveListContainer
  );
  const showingLiveEvent = useSelector((state) => state.event.showingLiveEvent);
  const availableBonus = useSelector((state) => state.layout.availableBonus);
  const bonusBalance = useSelector((state) => state.layout.bonusBalance);
  const newNotifications = useSelector(
    (state) => state.layout.newNotifications
  );

  const [balanceInteger, setBalanceInteger] = useState(0);
  const [balanceBonusInteger, setBalanceBonusInteger] = useState(0);
  const [balanceDecimal, setBalanceDecimal] = useState("00");
  const [balanceBonusDecimal, setBalanceBonusDecimal] = useState("00");
  const [balanceDropdownVisible, setBalanceDropdownVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      setBalanceInteger(0);
      setBalanceDecimal("00");
      return;
    }

    getBalance();
  }, [user?.Wallet.Balance]);

  useEffect(() => {
    if (!user) {
      setBalanceBonusInteger(0);
      setBalanceBonusDecimal("00");
      return;
    }

    getBonusBalance();
  }, [bonusBalance]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const getBalance = () => {
    let integer = Math.floor(Number(user?.Wallet?.Balance || 0));
    integer = addThousandsSeparator(integer, 0);

    const decimal = ((Number(user?.Wallet?.Balance || 0) % 1) * 100).toFixed(0);

    setBalanceInteger(integer);
    setBalanceDecimal(decimal.padStart(2, "0"));
  };

  const getBonusBalance = () => {
    let integer = Math.floor(bonusBalance);
    integer = addThousandsSeparator(integer, 0);

    const decimal = ((bonusBalance % 1) * 100).toFixed(0);

    setBalanceBonusInteger(integer);
    setBalanceBonusDecimal(decimal.padStart(2, "0"));
  };

  const inCasinoGame = location.pathname.includes("/casino/game/");

  const logoURL = siteSettings?.Logo || config.VITE_SITE_LOGO || null;
  const currency = user?.Wallet?.Currency || user?.Wallet?.CurrencyCode || user?.CurrencyCode || "";
  const siteAssetBase = `${window.location.origin}/${config.VITE_SITE_NAME ? `${config.VITE_SITE_NAME}/` : ""}`;
  const userAvatarURL =
    user?.AvatarUrl ||
    user?.avatarUrl ||
    user?.ProfileImageUrl ||
    user?.profileImageUrl ||
    user?.ImageUrl ||
    user?.imageUrl ||
    `${siteAssetBase}logo-small.svg`;
  return (
    <div className={classes.Topbar} id="topbar">
      <div className={classes.TopbarLeftWrapper} id="topbarLeft">
        <div className={classes.TopbarLeft}>
          <div className={classes.HeaderHamburger} id="HeaderHamburger">
            {!showingLiveEvent && (
              <MainButton
                color="transparent"
                onClick={() =>
                  dispatch(
                    layoutActions.setFullLeftContainer(!fullLeftContainer)
                  )
                }
              >
                <MenuBurgerIcon
                  className={fullLeftContainer ? classes.rotate : ""}
                />
              </MainButton>
            )}

            {showingLiveEvent && showLiveListContainer && (
              <MainButton
                color="transparent"
                onClick={() =>
                  dispatch(layoutActions.setShowLiveListContainer(false))
                }
              >
                <MenuBurgerIcon />
              </MainButton>
            )}

            {showingLiveEvent && !showLiveListContainer && (
              <MainButton
                color="transparent"
                onClick={() =>
                  dispatch(layoutActions.setShowLiveListContainer(true))
                }
              >
                <CameraIcon />
                <div className={classes.LiveBadge}> Live </div>
              </MainButton>
            )}
          </div>
          {isDesktop ? (
            <MainButton color="transparent" onClick={() => navigate("/")}>
              {/* <LogoBig /> */}
              <div
                id="SiteLogo"
                className={classes.SiteLogo}
                style={{
                  backgroundImage: `url(${logoURL})`,
                }}
              ></div>
            </MainButton>
          ) : (
            <MainButton
              color="transparent"
              onClick={() => navigate("/")}
              noPad={user ? false : true}
            >
              {/* {user ? <LogoSmall /> : <LogoBig />} */}
              {user ? (
                // <LogoSmall />
                <div
                  className={classes.SiteLogo}
                  style={{
                    backgroundImage: `url(${logoURL})`,
                  }}
                ></div>
              ) : (
                <div
                  id="SiteLogoNoUser"
                  className={classes.SiteLogoNoUser}
                  style={{
                    backgroundImage: `url(${logoURL})`,
                  }}
                ></div>
                // <div
                //   className={classes.SiteLogo}
                //   style={{
                //     backgroundImage: `url(${smallLogoURL})`,
                //   }}
                // ></div>
              )}
            </MainButton>
          )}

          {isDesktop && user && hasCasinoAccess && (
            <button
              type="button"
              className={classes.FavoritesTrigger}
              onClick={() => navigate("/casino/favorites")}
              aria-label={translate("Favorites")}
            >
              <StarOutlineIcon />
            </button>
          )}

          {isDesktop && hasCasinoAccess && (
            <button
              type="button"
              className={classes.HeaderSearch}
              onClick={() => {
                dispatch(searchActions.setSearchString(""));
                navigate("/search");
              }}
              aria-label={translate("Search by game or provider")}
            >
              <SearchIcon />
              <span>{translate("Search by game or provider")}</span>
            </button>
          )}
        </div>
      </div>


      <div className={classes.TopbarCenterWrapper} id="topbarCenter" />

      <div className={classes.TopbarRightWrapper} id="topbarRight">
        <div
          className={
            user
              ? [classes.HeaderRight, classes.UserHeaderRight].join(" ")
              : [classes.HeaderRight, classes.NoUserHeaderRight].join(" ")
          }
        >
          {user ? (
            <>
              <div className={classes.BalanceDropdownWrapper}>
                <button
                  type="button"
                  className={classes.LoggedBalanceButton}
                  onClick={() => {
                    dispatch(layoutActions.setUserDropdownVisible(false));
                    setBalanceDropdownVisible((value) => !value);
                  }}
                >
                  <span>{balanceInteger}.{balanceDecimal} {currency}</span>
                  <span className={classes.Caret}>⌄</span>
                </button>
                <Dropdown
                  show={balanceDropdownVisible}
                  onClickOutside={() => setBalanceDropdownVisible(false)}
                >
                  <div className={classes.BalanceDropdownPanel}>
                    <div className={classes.BalanceMiniGrid}>
                      <div>
                        <span className={classes.BalanceMiniIcon}><CoinsIcon /></span>
                        <span className={classes.BalanceMiniCopy}>
                          <small>{translate("Real money")}</small>
                          <strong>{balanceInteger}.{balanceDecimal} {currency}</strong>
                        </span>
                      </div>
                      <div>
                        <span className={classes.BalanceMiniIcon}><BonusIcon /></span>
                        <span className={classes.BalanceMiniCopy}>
                          <small>{translate("Bonus money")}</small>
                          <strong>{balanceBonusInteger}.{balanceBonusDecimal} {currency}</strong>
                        </span>
                      </div>
                    </div>
                    <button type="button" onClick={() => { setBalanceDropdownVisible(false); addParamsToUrl("bonus"); }}>
                      <GiftIcon /><span>{translate("BONUS HUB")}</span>
                    </button>
                  </div>
                </Dropdown>
              </div>

              <button
                type="button"
                className={classes.CoinsTrigger}
                onClick={() => {
                  dispatch(layoutActions.setUserDropdownVisible(false));
                  setBalanceDropdownVisible((value) => !value);
                }}
                aria-label={translate("Balance")}
              >
                <CoinsIcon />
              </button>

              <div className={classes.DropDownWrapper}>
                <button
                  type="button"
                  className={classes.UserTrigger}
                  onClick={() => {
                    setBalanceDropdownVisible(false);
                    dispatch(layoutActions.setUserDropdownVisible(!userDropdownVisible));
                  }}
                >
                  <span className={classes.UserTriggerAvatar}>
                    <img src={userAvatarURL} alt="" onError={(event) => { event.currentTarget.src = NoUserImg; }} />
                  </span>
                </button>
                {isDesktop && (
                  <Dropdown
                    show={userDropdownVisible}
                    onClickOutside={() => dispatch(layoutActions.setUserDropdownVisible(false))}
                  >
                    <div className={classes.AccountDropdownPanel}>
                      <div className={classes.AccountSummary}>
                        <div className={classes.AccountBalanceCard}>
                          <div><small>{translate("Balance")}</small><strong>{balanceInteger}.{balanceDecimal}{currency}</strong></div>
                          <div><small>{translate("Coins balance")}</small><strong>{user?.Wallet?.CoinsBalance || user?.CoinsBalance || 0} {translate("coins")}</strong></div>
                          <div className={classes.MoneyBreakdown}><strong>{balanceInteger}.{balanceDecimal}{currency}</strong><small>{translate("Real money")}</small></div>
                          <div className={classes.MoneyBreakdown}><strong>{balanceBonusInteger}.{balanceBonusDecimal}{currency}</strong><small>{translate("Bonus money")}</small></div>
                        </div>
                        <div className={classes.PlayerLevelCard}>
                          <span className={classes.LevelAvatar}>{String(user?.Username || "N").charAt(0).toUpperCase()}</span>
                          <small>{translate("Player level")}</small>
                          <strong>{user?.LevelName || user?.PlayerLevelName || "-"}</strong>
                        </div>
                      </div>
                      <div className={classes.AccountActions}>
                        <button className={classes.PrimaryAccountAction} onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); addParamsToUrl("cashier", "deposit"); }}><WalletIcon />{translate("Deposit")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); addParamsToUrl("bonus"); }}><BonusIcon />{translate("My Bonuses")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); navigate("/profile?tab=overview"); }}><UserIcon />{translate("Profile")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); addParamsToUrl("cashier", "withdraw"); }}><WithdrawIcon />{translate("Withdraw")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); addParamsToUrl("transactions"); }}><HistoryIcon />{translate("History")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); addParamsToUrl("promo-code"); }}><PromoIcon />{translate("Promo Code")}</button>
                        <button onClick={() => { dispatch(layoutActions.setUserDropdownVisible(false)); navigate("/profile?tab=verification"); }}><VerifyIcon />{translate("Verification")}</button>
                      </div>
                      <button className={classes.LogoutAction} onClick={() => dispatch(logout()).finally(() => navigate("/", { replace: true }))}><LogoutIcon />{translate("Log out")}</button>
                      <div className={classes.AccountSupport}>
                        <div className={classes.AccountHelp}>
                          <strong>{translate("Help is needed?")}</strong>
                          <span>{translate("Contact LiveChat")}</span>
                        </div>
                        <button
                          type="button"
                          className={classes.AccountSupportButton}
                          onClick={() => {
                            dispatch(layoutActions.setUserDropdownVisible(false));
                            navigate("/support");
                          }}
                        >
                          <LiveSupportIcon />
                          <span>{translate("Support 24/7")}</span>
                        </button>
                      </div>
                    </div>
                  </Dropdown>
                )}
              </div>
            </>
          ) : (
            <>
              {/* <div id="loginButton"> */}
              <MainButton
                id="loginButton"
                color="transparent"
                onClick={() => addParamsToUrl("auth", "login")}
              >
                {translate("Sign In")}
              </MainButton>
              {/* </div>
              <div id="registerButton"> */}
              <MainButton
                id="registerButton"
                color="secondary"
                onClick={() => addParamsToUrl("auth", "register")}
              >
                {translate("Sign Up")}
              </MainButton>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
