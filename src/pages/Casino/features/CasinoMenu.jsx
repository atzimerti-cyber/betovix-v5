import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import classes from "./CasinoMenu.module.css";
import SwiperMenu from "../../../features/UI/MainSwiper/SwiperMenu";
import HomeIcon from "../../../assets/svgs/home.svg?react";
import SlotsIcon from "../../../assets/svgs/slots.svg?react";
import BlackjackIcon from "../../../assets/svgs/blackjack.svg?react";
import HeartIcon from "../../../assets/svgs/heart.svg?react";
import ProvidersIcon from "../../../assets/casinoIcons/providers.svg?react";
import { translate } from "../../../utils/translations";

const CasinoMenu = () => {
  const user = useSelector((state) => state.login.user);
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  return (
    <div className={classes.CasinoMenuSwiper} style={{ minWidth: "40%" }}>
      <SwiperMenu>
        <SwiperSlide>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to="/casino/lobby"
          >
            <HomeIcon />
            {translate("Lobby")}
          </NavLink>
        </SwiperSlide>

        <SwiperSlide>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to="/casino/slots"
          >
            <SlotsIcon />
            {translate("Slots")}
          </NavLink>
        </SwiperSlide>

        {user && (
          <SwiperSlide>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? [classes.NavItem, classes.ActiveItem].join(" ")
                  : classes.NavItem
              }
              to="/casino/favorites"
            >
              <HeartIcon />
              {translate("Favorites")}
            </NavLink>
          </SwiperSlide>
        )}

        <SwiperSlide>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to="/casino/live"
          >
            <BlackjackIcon />
            {translate("Live Casino")}
          </NavLink>
        </SwiperSlide>

        <SwiperSlide>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to="/casino/gameshows"
          >
            <BlackjackIcon />
            {translate("Game Shows")}
          </NavLink>
        </SwiperSlide>

        <SwiperSlide>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to="/casino/providers"
          >
            <ProvidersIcon fill="var(--db-gray-5)" />
            {translate("Providers")}
          </NavLink>
        </SwiperSlide>
      </SwiperMenu>
    </div>
  );
};

export default CasinoMenu;
