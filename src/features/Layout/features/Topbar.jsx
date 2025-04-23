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
import NoUserSvg from "../../../assets/images/nouserimg.svg?react";
import config from "../../../config";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const progressBar = useMediaQuery({
    query: "(min-width: 576px) and (max-width: 950px)",
  });

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
  const newRewards = useSelector(
    (state) => state.gamification.availableRewards
  );

  const [balanceInteger, setBalanceInteger] = useState(0);
  const [balanceBonusInteger, setBalanceBonusInteger] = useState(0);
  const [balanceDecimal, setBalanceDecimal] = useState("00");
  const [balanceBonusDecimal, setBalanceBonusDecimal] = useState("00");

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
    let integer = Math.floor(user.Wallet.Balance);
    integer = addThousandsSeparator(integer, 0);

    const decimal = ((user.Wallet.Balance % 1) * 100).toFixed(0);

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

  const logoURL = config.VITE_SITE_LOGO ? config.VITE_SITE_LOGO : null;
  const basePath = window.location.origin;
  const sitename = config.VITE_SITE_NAME ? config.VITE_SITE_NAME + "/" : "";
  const smallLogoURL = `${basePath}/${sitename}logo-small.svg`;

  return (
    <div className={classes.Topbar} id="topbar">
      <div className={classes.TopbarLeftWrapper} id="topbarLeft">
        <div className={classes.TopbarLeft}>
          <div className={classes.HeaderHamburger}>
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
                    backgroundImage: `url(${smallLogoURL})`,
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
        </div>
      </div>

      <div className={classes.TopbarCenterWrapper} id="topbarCenter">
        {user && (
          <>
            <MainButton
              color="secondary"
              size="small"
              onClick={() => addParamsToUrl("cashier", "deposit")}
            >
              <WalletIcon />
              <span>{translate("Wallet")}</span>
            </MainButton>
            <div className={classes.BalanceContainer}>
              <div
                className={
                  inCasinoGame
                    ? [classes.HeaderBalanceWrap, classes.IsInPlay].join(" ")
                    : classes.HeaderBalanceWrap
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className={classes.HeaderBalance}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CoinsIcon />
                    {balanceInteger}
                    <span>.{balanceDecimal}</span>
                  </div>
                  {balanceBonusInteger && (
                    <div
                      className={classes.HeaderBalance}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CoinsIcon />
                      {balanceBonusInteger}
                      <span>.{balanceBonusDecimal}</span>
                      <span className={classes.BonusBalanceText}>
                        ({translate("Bonus")}){" "}
                      </span>
                    </div>
                  )}
                </div>
                <div className={classes.InPlay}>(In Play)</div>
              </div>
            </div>
            <div className={classes.BonusButtonContainer}>
              <MainButton
                className={classes.BonusButton}
                color="transparent"
                onClick={() => addParamsToUrl("bonus")}
              >
                <GiftIcon />
                <div className={classes.BonusButtonColor}>
                  {translate("Bonus")}
                </div>
              </MainButton>
              {availableBonus > 0 && (
                <NumberBadge number={availableBonus} floating justifyRight />
              )}
            </div>
          </>
        )}
      </div>

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
              {/* <div className={classes.BonusButtonContainer}>
                <MainButton
                  className={classes.BonusButton}
                  color="transparent"
                  onClick={() => addParamsToUrl("bonus")}
                >
                  <GiftIcon />
                  <div className={classes.BonusButtonColor}>
                    {translate("Bonus")}
                  </div>
                </MainButton>
                {availableBonus > 0 && (
                  <NumberBadge number={availableBonus} floating justifyRight />
                )}
              </div> */}

              <div className={classes.DropDownWrapper}>
                <div
                  className={classes.DropDownLabel}
                  onClick={() =>
                    dispatch(
                      layoutActions.setUserDropdownVisible(!userDropdownVisible)
                    )
                  }
                >
                  <MainButton color="transparent">
                    <div
                      className={classes.UserImage}
                      style={
                        {
                          // backgroundImage: `url(${
                          //   user.Avatar ? user.Avatar : NoUserImg
                          // })`,
                        }
                      }
                    >
                      <NoUserSvg />
                    </div>

                    {/* <UserIcon /> */}
                    <span>{user?.Username}</span>
                  </MainButton>
                  {newRewards > 0 && (
                    <NumberBadge number={newRewards} floating justifyRight />
                  )}
                </div>

                {isDesktop && (
                  <Dropdown
                    show={userDropdownVisible}
                    onClickOutside={() =>
                      dispatch(layoutActions.setUserDropdownVisible(false))
                    }
                  >
                    <ul className={classes.DropdownMenu}>
                      <MenuItems
                        onClick={() =>
                          dispatch(layoutActions.setUserDropdownVisible(false))
                        }
                      />
                    </ul>
                  </Dropdown>
                )}
              </div>

              <div className={classes.HeaderRightDivider}></div>

              {isDesktop && (
                <>
                  <div className={classes.DropDownWrapper}>
                    <div
                      className={classes.DropDownLabel}
                      onClick={() => {
                        dispatch(
                          layoutActions.setNotificationDropdownVisible(
                            !notificationDropdownVisible
                          )
                        );
                      }}
                    >
                      <div className={classes.NotificationButtonContainer}>
                        <button
                          className={classes.NotificationButton}
                          color="transparent"
                        >
                          <BellIcon />
                        </button>
                        {newNotifications && newNotifications.length > 0 && (
                          <div className={classes.NotificationBadge}>
                            <span>{newNotifications.length}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isDesktop && (
                      <NotificationDropdown
                        show={notificationDropdownVisible}
                        onClickOutside={() =>
                          dispatch(
                            layoutActions.setNotificationDropdownVisible(false)
                          )
                        }
                      />
                    )}
                  </div>

                  <DropdownLang topbar />
                </>
              )}
            </>
          ) : (
            <>
              {/* <div id="loginButton"> */}
              <MainButton
                id="loginButton"
                color="transparent"
                onClick={() => addParamsToUrl("auth", "login")}
              >
                {translate("Login")}
              </MainButton>
              {/* </div>
              <div id="registerButton"> */}
              <MainButton
                id="registerButton"
                color="secondary"
                onClick={() => addParamsToUrl("auth", "register")}
              >
                {translate("Register")}
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
