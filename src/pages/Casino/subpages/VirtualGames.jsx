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

import VirtualGamesIcon from "../../../assets/svgs/virtualgames.svg?react";

import BarLoading from "../../../features/UI/BarLoading/BarLoading";

import { translate } from "../../../utils/translations";

const VirtualGames = () => {
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

    dispatch(getCasinoByTags(signal, "virtual", 100000));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (casinoByTags) {
      if (casinoByTags["virtual"]) {
        setItems({ Data: casinoByTags["virtual"] });
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
              icon={<VirtualGamesIcon/>}
              title={translate(`Virtual Games`)}
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

export default VirtualGames;
