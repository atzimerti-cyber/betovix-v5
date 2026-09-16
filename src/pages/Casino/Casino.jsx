import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Casino.module.css";
import CasinoMenu from "./features/CasinoMenu";
import CasinoLobbySearch from "../../features/Search/CasinoLobbySearch";
import Lobby from "./subpages/Lobby";
import LiveGames from "./subpages/LiveGames";
import SlotGames from "./subpages/SlotGames";
import Providers from "./subpages/Providers";
import GameShows from "./subpages/GameShows";
import FavoriteGames from "./subpages/FavoriteGames";
import GamesByTag from "./subpages/GamesByTag";
import { casinoActions } from "./casinoSlice";
import VirtualGames from "./subpages/VirtualGames";
import TableGames from "./subpages/TableGames";
import { getCasinoRoutePermission, hasPermission } from "../../utils/permissions";

const Casino = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const casinoRoute = params["*"] || "";

  const lang = useSelector((state) => state.app.lang);
  const permissions = useSelector((state) => state.login.permissions) || {};

  useEffect(() => {
    const route = casinoRoute;
    if (!route) {
      navigate(hasPermission(permissions, "AllowToSlots") ? "/casino/lobby" : "/casino/live", { replace: true });
      return;
    }

    const requiredPermission = getCasinoRoutePermission(`/casino/${route}`);
    if (requiredPermission && !hasPermission(permissions, requiredPermission)) {
      if (hasPermission(permissions, "AllowToSlots")) navigate("/casino/lobby", { replace: true });
      else if (hasPermission(permissions, "AllowToCasino")) navigate("/casino/live", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [navigate, casinoRoute, permissions]);

  useEffect(() => () => dispatch(casinoActions.reset()), [dispatch]);

  let page = <Lobby />;
  if (casinoRoute.includes("slots")) page = <SlotGames />;
  else if (casinoRoute.includes("live")) page = <LiveGames />;
  else if (casinoRoute.includes("favorites")) page = <FavoriteGames />;
  else if (casinoRoute.includes("providers")) page = <Providers />;
  else if (casinoRoute.includes("gameshows")) page = <GameShows />;
  else if (casinoRoute.includes("virtualgames")) page = <VirtualGames />;
  else if (casinoRoute.includes("tablegames")) page = <TableGames />;
  else if (casinoRoute.includes("menu")) page = <GamesByTag />;

  return (
    <div className={classes.PageContent}>
      <div className={classes.Casino} id="casinoPage">
        <div className={classes.CasinoHeader} id="casinoMenu">
          <CasinoMenu />
          {casinoRoute === "lobby" && <CasinoLobbySearch />}
        </div>

        <div className={classes.Content}>{page}</div>
      </div>
    </div>
  );
};

export default Casino;
