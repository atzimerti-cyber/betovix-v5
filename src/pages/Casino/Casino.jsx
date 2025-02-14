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

const Casino = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const lang = useSelector((state) => state.app.lang);

  useEffect(() => {
    if (params["*"] === "") navigate("/casino/lobby");

    return () => dispatch(casinoActions.reset());
  }, []);

  let page = <Lobby />;
  if (params["*"].includes("slots")) page = <SlotGames />;
  else if (params["*"].includes("live")) page = <LiveGames />;
  else if (params["*"].includes("favorites")) page = <FavoriteGames />;
  else if (params["*"].includes("providers")) page = <Providers />;
  else if (params["*"].includes("gameshows")) page = <GameShows />;
  else if (params["*"].includes("virtualgames")) page = <VirtualGames />;
  else if (params["*"].includes("tablegames")) page = <TableGames />;
  else if (params["*"].includes("menu")) page = <GamesByTag />;

  return (
    <div className={classes.PageContent}>
      <div className={classes.Casino} id="casinoPage">
        <div className={classes.CasinoHeader} id="casinoMenu">
          <CasinoMenu />
          {params["*"] === "lobby" && <CasinoLobbySearch />}
        </div>

        <div className={classes.Content}>{page}</div>
      </div>
    </div>
  );
};

export default Casino;
