import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import classes from "./CasinoMenu.module.css";
import SwiperMenu from "../../../features/UI/MainSwiper/SwiperMenu";
import HomeIcon from "../../../assets/svgs/home.svg?react";
import SlotsIcon from "../../../assets/svgs/slots.svg?react";
import BlackjackIcon from "../../../assets/svgs/blackjack.svg?react";
import HeartIcon from "../../../assets/svgs/heart.svg?react";

import GameShows from "../../../assets/svgs/gameshows.svg?react";
import VirtualGames from "../../../assets/svgs/virtualgames.svg?react";
import TableGames from "../../../assets/svgs/table-games.svg?react";
import ProvidersIcon from "../../../assets/svgs/providers-menu.svg?react";
import { translate } from "../../../utils/translations";

const CasinoMenu = () => {
  const user = useSelector((state) => state.login.user);
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const minibar = useSelector((state) => state.app.casinoMinibarItems);

  return (
    // <div style={{ minWidth: "40%" }}>
    // <div className={classes.CasinoMenuSwiper} style={{ width: "100%" }}>
    //   <SwiperMenu>
    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/lobby"
    //       >
    //         <HomeIcon />
    //         {translate("Lobby")}
    //       </NavLink>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/providers"
    //       >
    //         <ProvidersIcon fill="var(--light-blue)" />
    //         {translate("Providers")}
    //       </NavLink>
    //     </SwiperSlide>

    //     {user && (
    //       <SwiperSlide>
    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive
    //               ? [classes.NavItem, classes.ActiveItem].join(" ")
    //               : classes.NavItem
    //           }
    //           to="/casino/favorites"
    //         >
    //           <HeartIcon />
    //           {translate("Favorites")}
    //         </NavLink>
    //       </SwiperSlide>
    //     )}

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/live"
    //       >
    //         <BlackjackIcon />
    //         {translate("Live Casino")}
    //       </NavLink>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/virtualgames"
    //       >
    //         <VirtualGames />
    //         {translate("Virtual Games")}
    //       </NavLink>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/gameshows"
    //       >
    //         <GameShows />
    //         {translate("Game Shows")}
    //       </NavLink>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/tablegames"
    //       >
    //         <TableGames />
    //         {translate("Table Games")}
    //       </NavLink>
    //     </SwiperSlide>

    //     <SwiperSlide>
    //       <NavLink
    //         className={({ isActive }) =>
    //           isActive
    //             ? [classes.NavItem, classes.ActiveItem].join(" ")
    //             : classes.NavItem
    //         }
    //         to="/casino/slots"
    //       >
    //         <SlotsIcon />
    //         {translate("Slots")}
    //       </NavLink>
    //     </SwiperSlide>
    //   </SwiperMenu>
    // </div>
    // </div>
    <div className={classes.CasinoMenuSwiper} style={{ width: "100%" }}>
    <SwiperMenu>
      {minibar && minibar.items.map((item) => (
        <SwiperSlide key={item.id}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.NavItem, classes.ActiveItem].join(" ")
                : classes.NavItem
            }
            to={"/" + item.page || "#"} // Default to "#" if no page link is provided
          >
            {item.icon} {/* Render the icon or fallback */}
            {translate(item.label)} {/* Translate the label */}
          </NavLink>
        </SwiperSlide>
      ))}
    </SwiperMenu>
  </div>
  );
};

export default CasinoMenu;
