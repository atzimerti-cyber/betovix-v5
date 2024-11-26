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
import SportsIcon from "../../../assets/svgs/sports.svg?react";
import { layoutActions } from "../layoutSlice";
import Search from "../../Search/Search";
import LeftMenuItem from "./LeftMenuItem";
import CategoryGroup from "../../UI/CategoryGroup/CategoryGroup";
import useBasePath from "../../../hooks/useBasePath";
import { searchActions } from "../../../pages/Search/searchSlice";
import { translate } from "../../../utils/translations";
import StatsIcon from "../../../assets/svgs/bars.svg?react";
import TicketIcon from "../../../assets/svgs/ticketReceipt.svg?react";
import LoadIcon from "../../../assets/svgs/loadIcon.svg?react";

const LeftContainer = memo(function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const pathname = location.pathname.substring(1);
  const pathnameNoParams = useBasePath();

  const permissions = useSelector((state) => state.login.permissions);
  const menuItems = useSelector((state) => state.app.menuItems);

  const casinoMenuItems = useSelector((state) => state.app.casinoMenuItems);
  const sportsMenuItems = useSelector((state) => state.app.sportsMenuItems);

  const user = useSelector((state) => state.login.user);
  const searchString = useSelector((state) => state.search.searchString);
  const fullLeftContainer = useSelector(
    (state) => state.layout.fullLeftContainer
  );
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  let elClasses = [classes.SideMenuScroll];
  let elClasses2 = [classes.SideMenuBottomButtons];
  if (!fullLeftContainer) {
    elClasses.push(classes.Closed);
  }

  const getItems = (menuItem, index, categoryId) => {
    const showEmphasis =
      menuItem.category?.label === "Top Leagues" ? true : false;

    return (
      <ul
        key={`${
          categoryId
            ? `${categoryId}_${menuItem.category.id}`
            : `${index}_${menuItem.items.id}`
        }`}
        className={classes.List}
      >
        {menuItem.items.map((item) => (
          <LeftMenuItem
            key={`${
              categoryId ? `${categoryId}_${item.id}` : `${index}_${item.id}`
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

        <div className={classes.SideMenuAllButtonsContainer}>
          <div className={classes.SideMenuButtonContainer}>
            {permissions.AllowToSports && (
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
            )}

            {(permissions.AllowToCasino || permissions.AllowToSlots) && (
              <MainButton
                active2={pathnameNoParams.includes("/casino")}
                onClick={() => navigate("/casino/lobby")}
                dataTooltipId="left-menu-tooltip"
                dataTooltipContent={translate("Casino")}
              >
                <CasinoIcon
                  className={
                    pathnameNoParams.includes("casino")
                      ? classes.Active2Svg
                      : null
                  }
                />
                <span>{fullLeftContainer ? translate("Casino") : ""}</span>
              </MainButton>
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

        {/* SportsMenu */}
        {pathnameNoParams !== "/casino" &&
          pathnameNoParams !== "/search" &&
          permissions.AllowToSports && (
            <>
              <div className={classes.SideMenuDivider}></div>

              {!isMobile && (
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
                />
              )}

              <div className={classes.SideMenuContainer}>
                <div className={classes.SideMenuSubButtonContainer}>
                  <>
                    {/* <div className={classes.LangDropdown}>
                      <DropdownLang topbar />
                    </div> */}
                    {permissions.AllowToSports && (
                      <>
                        <MainButton
                          active={pathnameNoParams.includes(
                            "?modal=statistics"
                          )}
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
                          active={pathnameNoParams.includes(
                            "?modal=load-booked"
                          )}
                          onClick={() => navigate("?modal=load-booked")}
                          dataTooltipId="left-menu-tooltip"
                          dataTooltipContent={translate("Load Booked")}
                        >
                          <LoadIcon
                            className={
                              pathnameNoParams.includes("?modal=load-booked")
                                ? classes.ActiveSvg
                                : null
                            }
                          />
                          <span>
                            {fullLeftContainer ? translate("Load Booked") : ""}
                          </span>
                        </MainButton>

                        <MainButton
                          active={pathnameNoParams.includes(
                            "?modal=load-ticket"
                          )}
                          onClick={() => navigate("?modal=load-ticket")}
                          dataTooltipId="left-menu-tooltip"
                          dataTooltipContent={translate("Print Ticket")}
                        >
                          <TicketIcon
                            className={
                              pathnameNoParams.includes("?modal=load-ticket")
                                ? classes.ActiveSvg
                                : null
                            }
                          />
                          <span>
                            {fullLeftContainer ? translate("Print Ticket") : ""}
                          </span>
                        </MainButton>
                      </>
                    )}
                  </>
                </div>

                {/* {isMobile && <CloseButton timesIcon onClick={() => dispatch(layoutActions.setFullLeftContainer(false))} />} */}
              </div>
              {/* SportsMenuItems */}
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
                      <div
                        className={classes.Grouped}
                        key={menuItem.category.id}
                      >
                        <div className={classes.SideMenuDivider}></div>
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
          )}

        {/* CasinoMenu */}
        {pathnameNoParams !== "/sportsbook" &&
          pathnameNoParams !== "/sportsbook/tournament" &&
          pathnameNoParams !== "/sportsbook/outrights" &&
          pathnameNoParams !== "/searchEvent" &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <>
              <div className={classes.SideMenuDivider}></div>
              {!isMobile && (
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
                />
              )}
              {/* casinoMenuItems */}
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
                        <div className={classes.SideMenuDivider}></div>
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
          )}

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
                  <div className={classes.SideMenuDivider}></div>
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
        {fullLeftContainer ? (
          <div className={classes.LangDropdown} style={{ margin: "1rem" }}>
            <DropdownLang fullLabel={true} openTo="top" />
          </div>
        ) : (
          <div className={classes.LangDropdown} style={{ margin: "1rem" }}>
            <DropdownLang topbar openTo="side"/>
          </div>
        )}
      </div>

      {!isMobile && <div className={classes.SideMenuDivider}></div>}
    </>
  );
});

export default LeftContainer;
