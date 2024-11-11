import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { getCasinoByTags, getCasinoTags } from "../casinoAsyncActions";
import classes from "./GamesByTag.module.css";

import GridGames from "../features/GridGames";
import { translate } from "../../../utils/translations";
import { casinoActions } from "../casinoSlice";
import { layoutActions } from "../../../features/Layout/layoutSlice";
import { appActions } from "../../../features/InitApp/appSlice";
import { AnimatePresence } from "framer-motion";

import BarLoading from "../../../features/UI/BarLoading/BarLoading";

const GamesByTag = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const location = useLocation();
  const { label } = location.state || {};

  const user = useSelector((state) => state.login.user);

  const [menuTag, setMenuTag] = useState(null);
  const [items, setItems] = useState({ Data: null });

  const casinoByTags = useSelector((state) => state.casino.casinoByTags);
  const barLoading = useSelector((state) => state.app.barLoading);

  useEffect(() => {
    return () => {
      dispatch(casinoActions.reset());
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tag = searchParams.get("tag");

    if (tag) {
      setMenuTag(tag);
    }
  }, [location.search]);

  useEffect(() => {
    if (!menuTag) return;
    dispatch(appActions.setBarLoading(true));

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCasinoByTags(signal, menuTag, 100000));

    return () => {
      controller.abort();
    };
  }, [menuTag]);

  useEffect(() => {
    if (casinoByTags) {
      if (casinoByTags[menuTag]) {
        setItems({ Data: casinoByTags[menuTag] });
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
              icon={""}
              title={translate(`${label}`)}
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

export default GamesByTag;
