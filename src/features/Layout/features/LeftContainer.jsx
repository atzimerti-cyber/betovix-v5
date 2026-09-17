import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";

import MainButton from "../../UI/Buttons/MainButton";
import CloseButton from "../../UI/Buttons/CloseButton";
import classes from "./LeftContainer.module.css";
import LiveSupportIcon from "../../../assets/svgs/live-support.svg?react";
import DropdownLang from "../../UI/Dropdown/DropdownLang";
import CasinoIcon from "../../../assets/svgs/casino.svg?react";
import PromotionsIcon from "../../../assets/svgs/promotions.svg?react";
import SportsIcon from "../../../assets/svgs/sports.svg?react";
import HorseIcon from "../../../assets/svgs/horse-head.svg?react";
import FireIcon from "../../../assets/svgs/fire.svg?react";
import GiftIcon from "../../../assets/svgs/bonus-bag.svg?react";
import PromoGiftIcon from "../../../assets/svgs/gift1.svg?react";
import StaticHorse from "../../../assets/images/static-h.png?react";
import GifHorse from "../../../assets/images/horse.gif?react";
import { layoutActions } from "../layoutSlice";
import Search from "../../Search/Search";
import LeftMenuItem from "./LeftMenuItem";
import CategoryGroup from "../../UI/CategoryGroup/CategoryGroup";
import useBasePath from "../../../hooks/useBasePath";
import { searchActions } from "../../../pages/Search/searchSlice";
import { translate } from "../../../utils/translations";
import StatsIcon from "../../../assets/svgs/bars.svg?react";
import TicketIcon from "../../../assets/svgs/betslip.svg?react";
import LoadIcon from "../../../assets/svgs/loadIcon.svg?react";
import Timezone from "../../Timezone/Timezone";

const LeftContainer = memo(function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const permissions = useSelector((state) => state.login.permissions);
  const menuItems = useSelector((state) => state.app.menuItems);
  const sportsMenuItems = useSelector((state) => state.app.sportsMenuItems);
  const user = useSelector((state) => state.login.user);
  const support = useSelector((state) => state.layout.tawkToScript);
  const app = useSelector((state) => state.app.app);
  const searchString = useSelector((state) => state.search.searchString);
  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );
  const bonusRequest = useSelector(
    (state) => state.app.siteSettings?.BonusRequest
  );

  const pathname = location.pathname.substring(1);
  const pathnameNoParams = useBasePath();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const hasSportsAccess = Boolean(permissions?.AllowToSports);
  const hasCasinoAccess = Boolean(permissions?.AllowToCasino || permissions?.AllowToSlots);
  const showPrimaryProductSwitcher = hasSportsAccess && hasCasinoAccess;
  let elClasses = [classes.SideMenuScroll];
  let elClasses2 = [classes.SideMenuBottomButtons];
  if (!fullLeftContainer) {
    elClasses.push(classes.Closed);
  }

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const casinoButton = () => {
    return (
      (permissions.AllowToCasino || permissions.AllowToSlots) && (
        <MainButton
          active2={pathnameNoParams.includes("/casino")}
          onClick={() => navigate("/casino/lobby")}
          dataTooltipId="left-menu-tooltip"
          dataTooltipContent={translate("Casino")}
        >
          <CasinoIcon
            className={
              pathnameNoParams.includes("casino") ? classes.Active2Svg : null
            }
          />
          <span>{fullLeftContainer ? translate("Casino") : ""}</span>
        </MainButton>
      )
    );
  };
  const sportsButton = () => {
    return (
      permissions.AllowToSports && (
        <MainButton
          active={
            pathnameNoParams.includes("/sportsbook") ||
            pathnameNoParams.includes("/event")
          }
          onClick={() => navigate("/sportsbook/home/football")}
          dataTooltipId="left-menu-tooltip"
          dataTooltipContent={translate("Sports")}
        >
          <SportsIcon
            className={
              pathnameNoParams.includes("sportsbook") ||
                pathnameNoParams.includes("/event")
                ? classes.ActiveSvg
                : null
            }
          />
          <span>{fullLeftContainer ? translate("Sports") : ""}</span>
        </MainButton>
      )
    );
  };
  const sportsMenu = () => {
    return (
      pathnameNoParams !== "/casino" &&
      pathnameNoParams !== "/search" &&
      permissions.AllowToSports && (
        <>
          <div className={classes.SideMenuDivider} id="SideMenuDivider"></div>

          {/* {!isMobile && ( */}
          <Search
            placeholder={translate("Search Event")}
            hide={!fullLeftContainer}
            dataTooltipId="left-menu-tooltip"
            dataTooltipContent={translate("Search Event")}
            value={searchString}
            onChange={(value) => {
              dispatch(searchActions.setSearchString(value));
              if (value !== "") navigate("/searchEvent");
            }}
            category={'sports'}
          />
          {/* )} */}

          <div className={classes.SideMenuContainer} id="sideMenuContainer">
            <div className={classes.SideMenuSubButtonContainer}>
              <>
                {permissions.AllowToSports && (
                  <>
                    <MainButton
                      active={pathnameNoParams.includes("?modal=statistics")}
                      onClick={() => navigate("?modal=statistics")}
                      dataTooltipId="left-menu-tooltip"
                      dataTooltipContent={translate("Stats")}
                    >
                      <StatsIcon
                        className={
                          pathnameNoParams.includes("?modal=statistics")
                            ? classes.ActiveSvg
                            : null
                        }
                      />
                      <span>
                        {fullLeftContainer ? translate("Statistics") : ""}
                      </span>
                    </MainButton>

                    <MainButton
                      active={pathnameNoParams.includes("?modal=load-booked")}
                      onClick={() => navigate("?modal=load-booked")}
                      dataTooltipId="left-menu-tooltip"
                      dataTooltipContent={translate("Load Betslip")}
                    >
                      <LoadIcon
                        className={
                          pathnameNoParams.includes("?modal=load-booked")
                            ? classes.ActiveSvg
                            : null
                        }
                      />
                      <span>
                        {fullLeftContainer ? translate("Load Betslip") : ""}
                      </span>
                    </MainButton>

                    <MainButton
                      active={pathnameNoParams.includes("?modal=load-ticket")}
                      onClick={() => navigate("?modal=load-ticket")}
                      dataTooltipId="left-menu-tooltip"
                      dataTooltipContent={translate("View Ticket")}
                    >
                      <TicketIcon
                        className={
                          pathnameNoParams.includes("?modal=load-ticket")
                            ? classes.ActiveSvg
                            : null
                        }
                      />
                      <span>
                        {fullLeftContainer ? translate("View Ticket") : ""}
                      </span>
                    </MainButton>
                  </>
                )}
              </>
            </div>
          </div>
          {sportsMenuItems.map((menuItem, index) => {
            if (menuItem.category) {
              if (fullLeftContainer) {
                return (
                  <CategoryGroup
                    key={menuItem.category.id}
                    category={menuItem.category}
                    hide={fullLeftContainer}
                  >
                    {getItems(
                      menuItem,
                      menuItem.category.id,
                      menuItem.category.id
                    )}
                  </CategoryGroup>
                );
              } else {
                return (
                  <div className={classes.Grouped} key={menuItem.category.id}>
                    <div
                      className={classes.SideMenuDivider}
                      id="SideMenuDivider"
                    ></div>
                    {getItems(
                      menuItem,
                      menuItem.category.id,
                      menuItem.category.id
                    )}
                  </div>
                );
              }
            } else {
              return getItems(menuItem, index, 0);
            }
          })}
        </>
      )
    );
  };

  const getItems = (menuItem, index, categoryId) => {
    const showEmphasis =
      menuItem.category?.label === "Top Leagues" ? true : false;

    return (
      <ul
        key={`${categoryId
          ? `${categoryId}_${menuItem.category.id}`
          : `${index}_${menuItem.items.id}`
          }`}
        className={classes.List}
      >
        {menuItem.items.map((item) => (
          <LeftMenuItem
            key={`${categoryId ? `${categoryId}_${item.id}` : `${index}_${item.id}`
              }`}
            isActive={String(item.page || "").replace(/^\//, "") === pathname}
            item={item}
            categoryClass={menuItem.category?.customClass || ""}
            hide={!fullLeftContainer}
            showEmphasis={showEmphasis}
            isCateg={Boolean(categoryId)}
            isNew={item.isNew && true}
          />
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className={elClasses.join(" ")}>
        {!fullLeftContainer && (
          <Tooltip
            id="left-menu-tooltip"
            style={{
              backgroundColor: "var(--dark-blue-1)",
              color: "var(--white)",
              border: "1px solid var(--lightcolor-low-op)",
              boxShadow: "var(--db-dropdown-shadow)",
              fontFamily: `'Proxima Nova', sans-serif`,
              fontSize: "0.8125rem",
              fontWeight: 700,
              borderRadius: "0.625rem",
              padding: "0.5rem 0.75rem",
            }}
          />
        )}

        {(showPrimaryProductSwitcher || isMobile) && (
          <div
            className={classes.SideMenuAllButtonsContainer}
            style={{ marginTop: "0.5rem" }}
          >
            {showPrimaryProductSwitcher && (
              <div className={classes.SideMenuButtonContainer}>
                {sportsButton()}
                {casinoButton()}
              </div>
            )}

            {isMobile && (
              <CloseButton
                timesIcon
                onClick={() =>
                  dispatch(layoutActions.setFullLeftContainer(false))
                }
              />
            )}
          </div>
        )}

        {/* TRACK EVENTS BUTTON */}
        {permissions.AllowToSIS && (
          <>
            <div className={classes.GradBtnWrapper}>
              <button
                onClick={() =>
                  user
                    ? navigate("/track-events")
                    : addParamsToUrl("auth", "login")
                }
                className={classes.HorseButton}
              >
                <HorseIcon />
                <span>{translate("Horse Racing")}</span>
              </button>
              <div className={classes.NewBadge}>NEW</div>
            </div>
          </>
        )}


        <div className={classes.PromoCodeCardWrapper}>
          <button
            onClick={() => navigate("?modal=promo-code")}
            className={classes.PromoCodeCard}
            id="promoCodeButton"
          >
            <span className={classes.PromoCodeIcon}><GiftIcon /></span>
            <span className={classes.PromoCodeCopy}>
              <strong>{translate("Promo Code")}</strong>
              <small>{translate("Redeem your code here")}</small>
            </span>
          </button>
        </div>

        {bonusRequest &&
          <div className={classes.GradBonusWrapper} id="BonusRequestButton">
            <a
              href={bonusRequest}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.BonusRequestButton}
            >
                <GiftIcon />
              <span>{translate("Bonus Request")}</span>
            </a>
          </div>
        }

        {hasSportsAccess && sportsMenu()}

        {/* REST OF MENU ITEMS */}
        {menuItems.map((menuItem, index) => {
          if (menuItem.category) {
            if (fullLeftContainer && menuItem.category.staticSection) {
              return (
                <div className={classes.StaticMenuSection} key={menuItem.category.id}>
                  <div className={classes.StaticMenuSectionTitle}>{translate(menuItem.category.label)}</div>
                  {getItems(menuItem, menuItem.category.id, menuItem.category.id)}
                </div>
              );
            }
            if (fullLeftContainer) {
              return (
                <CategoryGroup
                  key={menuItem.category.id}
                  category={menuItem.category}
                  hide={fullLeftContainer}
                >
                  {getItems(
                    menuItem,
                    menuItem.category.id,
                    menuItem.category.id
                  )}
                </CategoryGroup>
              );
            } else {
              return (
                <div className={classes.Grouped} key={menuItem.category.id}>
                  <div
                    className={classes.SideMenuDivider}
                    id="SideMenuDivider"
                  ></div>
                  {getItems(
                    menuItem,
                    menuItem.category.id,
                    menuItem.category.id
                  )}
                </div>
              );
            }
          } else {
            return getItems(menuItem, index, 0);
          }
        })}

        {/* LANGUAGE DROPDOWN */}
        <div
          id="language"
          className={classes.LangDropdown}
        >
          <DropdownLang fullLabel={fullLeftContainer} openTo="top" sidebar />
        </div>

        {fullLeftContainer && hasCasinoAccess && (support?.Source || app?.AppLink1) && (
          <div className={classes.CasinoFooterActions}>
            {support?.Source && (
              <button
                type="button"
                className={classes.CasinoFooterButton}
                onClick={() => navigate("/support")}
              >
                <LiveSupportIcon />
                <span>{translate("Support 24/7")}</span>
              </button>
            )}
            {app?.AppLink1 && (
              <a
                className={classes.CasinoFooterButton}
                href={app.AppLink1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LoadIcon />
                <span>{translate("Download APP")}</span>
              </a>
            )}
          </div>
        )}

        {/* TIMEZONE DROPDOWN */}
        {fullLeftContainer && hasSportsAccess && (
          <div
            id="timezone"
            className={classes.LangDropdown}
            style={{ padding: "0.3rem 0.5rem", justifyContent: "flex-end" }}
          >
            <Timezone />
          </div>
        )}
      </div>

      {!isMobile && (
        <div className={classes.SideMenuDivider} id="SideMenuDivider"></div>
      )}
    </>
  );
});

export default LeftContainer;
