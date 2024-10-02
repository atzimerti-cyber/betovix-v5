import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import classes from "./Topbar.module.css";

import UserIcon from "../../../assets/svgs/user.svg?react";
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

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  const newNotifications = 5;
  const newRewards = useSelector(
    (state) => state.gamification.availableRewards
  );

  const [balanceInteger, setBalanceInteger] = useState(0);
  const [balanceDecimal, setBalanceDecimal] = useState("00");

  useEffect(() => {
    if (!user) {
      setBalanceInteger(0);
      setBalanceDecimal("00");
      return;
    }

    getBalance();
  }, [user?.Wallet.Balance]);

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

  const inCasinoGame = location.pathname.includes("/casino/game/");

  return (
    <div className={classes.Topbar}>
      <div className={classes.TopbarLeftWrapper}>
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
                <div className={classes.LiveBadge}>{translate("Live")}</div>
              </MainButton>
            )}
          </div>
          {isDesktop ? (
            <MainButton color="transparent" onClick={() => navigate("/")}>
              <LogoBig />
            </MainButton>
          ) : (
            <MainButton
              color="transparent"
              onClick={() => navigate("/")}
              noPad={user ? false : true}
            >
              {user ? <LogoSmall /> : <LogoBig />}
            </MainButton>
          )}
        </div>
      </div>

      <div className={classes.TopbarCenterWrapper}>
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
              <CoinsIcon />
              <div
                className={
                  inCasinoGame
                    ? [classes.HeaderBalanceWrap, classes.IsInPlay].join(" ")
                    : classes.HeaderBalanceWrap
                }
              >
                <div className={classes.HeaderBalance}>
                  {balanceInteger}
                  <span>.{balanceDecimal}</span>
                </div>
                <div className={classes.InPlay}>(In Play)</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={classes.TopbarRightWrapper}>
        <div
          className={
            user
              ? [classes.HeaderRight, classes.UserHeaderRight].join(" ")
              : [classes.HeaderRight, classes.NoUserHeaderRight].join(" ")
          }
        >
          {user ? (
            <>
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
                    <UserIcon />
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
                  {/* <div className={classes.Container}> */}
                    <div className={classes.DropDownWrapper}>
                      <div
                        className={classes.DropDownLabel}
                        onClick={() =>
                          dispatch(
                            layoutActions.setNotificationDropdownVisible(
                              !notificationDropdownVisible
                            )
                          )
                        }
                      >
                        <div className={classes.NotificationButtonContainer}>
                          <button
                            className={classes.NotificationButton}
                            color="transparent"
                          >
                            <BellIcon />
                          </button>
                          {newNotifications > 0 && (
                            <NumberBadge
                              number={newNotifications}
                              floating
                              justifyRight
                            />
                          )}
                        </div>
                      </div>

                      {isDesktop && (
                        <NotificationDropdown
                          show={notificationDropdownVisible}
                          onClickOutside={() =>
                            dispatch(
                              layoutActions.setNotificationDropdownVisible(
                                false
                              )
                            )
                          }
                        />
                      )}
                    </div>

                    <DropdownLang topbar />
                  {/* </div> */}
                </>
              )}
            </>
          ) : (
            <>
              <MainButton
                color="transparent"
                onClick={() => addParamsToUrl("auth", "login")}
              >
                {translate("LOGIN")}
              </MainButton>
              <MainButton
                color="secondary"
                onClick={() => addParamsToUrl("auth", "register")}
              >
                {translate("REGISTER")}
              </MainButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
