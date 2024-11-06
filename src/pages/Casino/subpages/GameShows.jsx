import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { getCasinoByTags, getCasinoTags } from "../casinoAsyncActions";
import classes from "./GamesByTag.module.css";

import GridGames from "../features/GridGames";
import { casinoActions } from "../casinoSlice";
import { layoutActions } from "../../../features/Layout/layoutSlice";
import { appActions } from "../../../features/InitApp/appSlice";
import { AnimatePresence } from "framer-motion";

import BarLoading from "../../../features/UI/BarLoading/BarLoading";
import GameShowsIcon from "../../../assets/svgs/gameshows.svg?react";

import { translate } from "../../../utils/translations";

const GameShows = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations 

  const user = useSelector((state) => state.login.user);

  const casinoByTags = useSelector((state) => state.casino.casinoByTags);
  const barLoading = useSelector((state) => state.app.barLoading);

  const [items, setItems] = useState({ Data: null });

  useEffect(() => {
    return () => {
      dispatch(casinoActions.reset());
    };
  }, []);

  useEffect(() => {
    dispatch(appActions.setBarLoading(true));

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCasinoByTags(signal, "shows"));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (casinoByTags) {
      if (casinoByTags["shows"]) {
        setItems({ Data: casinoByTags["shows"] });
        dispatch(appActions.setBarLoading(false));
      }
    }
  }, [casinoByTags]);

  return (
    <>
      <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

      {!barLoading ? (
        <div className={classes.TagGames}>
          {items?.Data ? (
            <GridGames
              collection={items}
              icon={<GameShowsIcon/>}
              title={translate(`Game Shows`)}
              loading={false}
              bigTitle={true}
            />
          ) : null}
        </div>
      ) : (
        <div className={classes.Header}>
          <p className={classes.Title}>Loading...</p>
        </div>
      )}
    </>
  );
};

export default GameShows;
