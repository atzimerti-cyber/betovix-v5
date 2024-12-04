import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Arrow2LeftIcon from "../../../assets/svgs/angle-left.svg?react"; 
import PromoImage from "../../../assets/casinoIcons/gs.png";
import { translate } from "../../../utils/translations";

const GameShows = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    dispatch(getCasinoByTags(signal, "shows", 100000));

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
      <div className={classes.PromotionsHeader}>
        <div className={classes.GoBackBtn}>
          <button className={classes.BackBtn} onClick={() => navigate(-1)}>
            <Arrow2LeftIcon />
            {translate(`Back`)}
          </button>
        </div>
        <div className={classes.PromoBanner}>
          <p className={classes.PageTitle}>{translate(`Game Shows`)}</p>
          <img src={PromoImage} alt="" />
        </div>
      </div>
      {!barLoading ? (
        <div className={classes.TagGames}>
          {items?.Data ? (
            <GridGames
              collection={items}
              icon={<GameShowsIcon />}
              // title={translate(`Game Shows`)}
              noTitle
              loading={false}
              bigTitle={true}
            />
          ) : null}
        </div>
      ) : (
        <div className={classes.Header}>
          {/* <p className={classes.Title}>Loading...</p> */}
        </div>
      )}
    </>
  );
};

export default GameShows;
