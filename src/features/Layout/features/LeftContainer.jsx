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
import PromotionsImg from "../../../assets/images/promosyonlar.png";
import SportsIcon from "../../../assets/svgs/sports.svg?react";
import HorseIcon from "../../../assets/svgs/horse-head.svg?react";
import FireIcon from "../../../assets/svgs/fire.svg?react";
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
import InteractiveButton from "../../UI/Buttons/InteractiveButton";

const LeftContainer = memo(function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const timezone = useSelector((state) => state.app.timezone); // triggers recalc on timezone change
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const permissions = useSelector((state) => state.login.permissions);
  const menuItems = useSelector((state) => state.app.menuItems);
  const casinoMenuItems = useSelector((state) => state.app.casinoMenuItems);
  const sportsMenuItems = useSelector((state) => state.app.sportsMenuItems);
  const user = useSelector((state) => state.login.user);
  const searchString = useSelector((state) => state.search.searchString);
  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );
  const casinoOriented = useSelector(
    (state) => state.app.siteSettings?.casinoOriented
  );

  const pathname = location.pathname.substring(1);
  const pathnameNoParams = useBasePath();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
  const casinoMenu = () => {
    return (
      pathnameNoParams !== "/sportsbook" &&
      pathnameNoParams !== "/sportsbook/tournament" &&
      pathnameNoParams !== "/sportsbook/outrights" &&
      pathnameNoParams !== "/searchEvent" &&
      (permissions.AllowToCasino || permissions.AllowToSlots) && (
        <>
          <div className={classes.SideMenuDivider} id="SideMenuDivider"></div>

          <Search
            placeholder={translate("Search Casino")}
            hide={!fullLeftContainer}
            dataTooltipId="left-menu-tooltip"
            dataTooltipContent={translate("Search Casino")}
            value={searchString}
            onChange={(value) => {
              dispatch(searchActions.setSearchString(value));
              if (value !== "") navigate("/search");
            }}
            category={'casino'}
          />

          {casinoMenuItems.map((casinoMenuItem, index) => {
            if (casinoMenuItem.category) {
              if (fullLeftContainer) {
                return (
                  <CategoryGroup
                    key={`_${casinoMenuItem.category.id}`}
                    category={casinoMenuItem.category}
                    hide={fullLeftContainer}
                  >
                    {getItems(
                      casinoMenuItem,
                      casinoMenuItem.category.id,
                      casinoMenuItem.category.id
                    )}
                  </CategoryGroup>
                );
              } else {
                return (
                  <div
                    className={classes.Grouped}
                    key={casinoMenuItem.category.id}
                  >
                    <div
                      className={classes.SideMenuDivider}
                      id="SideMenuDivider"
                    ></div>
                    {getItems(
                      casinoMenuItem,
                      casinoMenuItem.category.id,
                      casinoMenuItem.category.id
                    )}
                  </div>
                );
              }
            } else {
              return getItems(casinoMenuItem, index, 0);
            }
          })}
        </>
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
            isActive={item.page === pathname}
            item={item}
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
              backgroundColor: "#fff",
              color: "#87a0b5",
              fontFamily: `'Proxima Nova', sans-serif`,
              fontSize: "14px",
            }}
          />
        )}

        <div
          className={classes.SideMenuAllButtonsContainer}
          style={{ marginTop: "0.5rem" }}
        >
          <div className={classes.SideMenuButtonContainer}>
            {casinoOriented && casinoOriented === "true" ? (
              <>
                {/* {casinoButton()} */}
                {permissions.AllowToSlots && !permissions.AllowToSports ? (
                  null
                ) : (
                  casinoButton()
                )}
                {sportsButton()}
              </>
            ) : (
              <>
                {sportsButton()}
                {permissions.AllowToSlots && !permissions.AllowToSports ? (
                  null
                ) : (
                  casinoButton()
                )}
                {/* {casinoButton()} */}
              </>
            )}
          </div>

          {isMobile && (
            <CloseButton
              timesIcon
              onClick={() =>
                dispatch(layoutActions.setFullLeftContainer(false))
              }
            />
          )}
        </div>

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


        <div className={classes.GradPromoWrapper}>
          <button
            onClick={() => navigate("/promotions")}
            className={classes.PromotionsButton}
            id="promotionsButton"
            style={{ backgroundImage: `url(${PromotionsImg})` }}
          >
            <span>{translate("Promotions")}</span>
          </button>
        </div>

        <div className={classes.GradBtnWrapper}>
          <button
            onClick={() => navigate("?modal=promo-code")}
            className={classes.PromoButton}
            id="promoCodeButton"
          >
            <FireIcon />
            <span>{translate("Promo Code")}</span>
          </button>
        </div>

        {casinoOriented && casinoOriented === "true" ? (
          <>
            {casinoMenu()}
            {sportsMenu()}
          </>
        ) : (
          <>
            {sportsMenu()}
            {casinoMenu()}
          </>
        )}

        {/* REST OF MENU ITEMS */}
        {menuItems.map((menuItem, index) => {
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

        {/* LANGUAGE DROPDOWN */}
        {fullLeftContainer && (
          <div
            id="language"
            className={classes.LangDropdown}
            style={{ padding: "0.3rem 0.5rem", justifyContent: "flex-start" }}
          >
            <DropdownLang fullLabel={true} openTo="top" />
          </div>
        )}

        {/* TIMEZONE DROPDOWN */}
        {fullLeftContainer && (
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
