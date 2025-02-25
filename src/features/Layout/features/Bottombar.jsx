import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import MenuBurgerIcon from "../../../assets/svgs/menu-burger.svg?react";
import SearchIcon from "../../../assets/svgs/search.svg?react";
import CasinoIcon from "../../../assets/svgs/casino.svg?react";
import SportsIcon from "../../../assets/svgs/sports.svg?react";
import Chat2Icon from "../../../assets/svgs/chat2.svg?react";
import BetslipIcon from "../../../assets/svgs/betslip.svg?react";
// import Paper2Icon from "../../../assets/svgs/paper2.svg?react";
import Paper2Icon from "../../../assets/svgs/mybets.svg?react";
import PlayIcon from "../../../assets/svgs/play.svg?react";
import LeaderIcon from "../../../assets/svgs/leader.svg?react";
import PricesIcon from "../../../assets/svgs/prices.svg?react";
import Crash from "../../../assets/casinoIcons/crash.svg?react";
import BlackjackIcon from "../../../assets/svgs/blackjack.svg?react";
import classes from "./Bottombar.module.css";
import { layoutActions } from "../layoutSlice";
import useBasePath from "../../../hooks/useBasePath";
import { formatNumberTo } from "../../../utils/custom";
import { translate } from "../../../utils/translations";

const Bottombar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const basepath = useBasePath();

  const slips = useSelector((state) => state.betslip.slips);
  const user = useSelector((state) => state.login.user);
  const initDataLoaded = useSelector((state) => state.app.initDataLoaded);
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const permissions = useSelector((state) => state.login.permissions);
  // const fixedMenu = useSelector((state) => state.app.siteSettings.FixedMenu);
  const fixedMenu = "true";

  const getMultiplier = () => {
    let totalMultiplier = 1;
    slips.forEach((slip) => {
      totalMultiplier = totalMultiplier * slip.Odd;
    });

    return formatNumberTo(totalMultiplier);
  };

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const [menuButtonsIndexes, setMenuButtonsIndexes] = useState([]);

  const allButtons = [
    <button
      id="menuButton"
      key={1}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => dispatch(layoutActions.setFullLeftContainer(true))}
    >
      <MenuBurgerIcon className={classes.WithStroke} />
      <span className={classes.Label}>{translate("Menu")}</span>
    </button>,

    <button
      id="sportsButton"
      key={2}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/sportsbook");
      }}
    >
      <SportsIcon className={classes.WithFill} />
      <span className={classes.Label}>{translate("Sports")}</span>
    </button>,

    <button
      id="casinoButton"
      key={3}
      type="button"
      className={
        location.pathname.includes("/casino")
          ? [classes.BottomMenuItem, classes.Active].join(" ")
          : classes.BottomMenuItem
      }
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/casino/lobby");
      }}
    >
      <CasinoIcon className={classes.WithFill} />
      <span className={classes.Label}>{translate("Casino")}</span>
    </button>,

    <button
      id="myBetsButton"
      key={4}
      type="button"
      className={
        location.pathname.includes("/sportsbook/mybets")
          ? [classes.BottomMenuItem, classes.Active].join(" ")
          : classes.BottomMenuItem
      }
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/sportsbook/mybets");
      }}
    >
      <Paper2Icon className={classes.WithFill} />
      <span className={classes.Label}>{translate("My Bets")}</span>
    </button>,

    <button
      id="betslip"
      key={5}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        dispatch(layoutActions.setShowRightContainer(true));
        dispatch(layoutActions.setShowRight("betslip"));
      }}
    >
      <BetslipIcon className={classes.WithFill} />

      {getMultiplier() > 1 && (
        <motion.div
          key={slips.length}
          className={classes.OddsBubble}
          initial={{ y: -50 }}
          animate={{ y: [-55, -50] }}
          transition={{ times: [0.2, 0.4], ease: "linear" }}
        >
          @{getMultiplier()}
        </motion.div>
      )}

      <span className={classes.Label}>{translate("Betslip")}</span>
      {slips.length > 0 && (
        <div className={classes.SlipsNum}>{slips.length}</div>
      )}
    </button>,

    <button
      id="searchCasinoButton"
      key={6}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/search");
      }}
      // onClick={() => addParamsToUrl("search")}
    >
      <SearchIcon className={classes.WithStroke} />
      <span className={classes.Label}>{translate("Search Casino")}</span>
    </button>,

    <button
      id="searchSportButton"
      key={7}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/searchEvent");
      }}
    >
      <SearchIcon className={classes.WithStroke} />
      <span className={classes.Label}>{translate("Events")}</span>
    </button>,

    <button
      id="inplayButton"
      key={8}
      type="button"
      className={
        location.pathname.includes("/sportsbook/live")
          ? [classes.BottomMenuItem, classes.Active].join(" ")
          : classes.BottomMenuItem
      }
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/sportsbook/live");
      }}
    >
      <PlayIcon className={classes.WithFill} />
      <span className={classes.Label}>{translate("In Play")}</span>
    </button>,

    <button
      id="liveCasino"
      key={9}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/casino/live");
      }}
    >
      <BlackjackIcon className={classes.WithFill} />
      <span className={classes.Label}>{translate("Live")}</span>
    </button>,

    <button
      id="crashGames"
      key={10}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        navigate("/casino/menu?tag=crash");
      }}
    >
      <Crash className={classes.WithFill} />
      <span className={classes.Label}>{translate("Crash")}</span>
    </button>,

    <button
      id="chatButton"
      key={13}
      type="button"
      className={classes.BottomMenuItem}
      onClick={() => {
        dispatch(layoutActions.setFullLeftContainer(false));
        dispatch(layoutActions.setShowRight("chat"));
        dispatch(layoutActions.setShowRightContainer(true));
      }}
    >
      <Chat2Icon className={classes.WithFill} />
      <span className={classes.Label}>{translate("Chat")}</span>
    </button>,

    // <button
    //   id="leaderboardButton"
    //   key={9}
    //   type="button"
    //   className={
    //     location.pathname.includes("/leaderboard")
    //       ? [classes.BottomMenuItem, classes.Active].join(" ")
    //       : classes.BottomMenuItem
    //   }
    //   onClick={() => {
    //     dispatch(layoutActions.setFullLeftContainer(false));
    //     navigate("/leaderboard");
    //   }}
    // >
    //   <LeaderIcon className={classes.WithFill} />
    //   <span className={classes.Label}>{translate("Leaderboard")}</span>
    // </button>,

    // <button
    //   id="cryptoButton"
    //   key={10}
    //   type="button"
    //   className={
    //     location.pathname.includes("/crypto")
    //       ? [classes.BottomMenuItem, classes.Active].join(" ")
    //       : classes.BottomMenuItem
    //   }
    //   onClick={() => {
    //     dispatch(layoutActions.setFullLeftContainer(false));
    //     navigate("/crypto");
    //   }}
    // >
    //   <PricesIcon className={classes.WithFill} />
    //   <span className={classes.Label}>{translate("Crypto Prices")}</span>
    // </button>,
  ];

  useEffect(() => {
    if (!initDataLoaded) return;

    if (fixedMenu === "false" || !fixedMenu) {
      let allButtonsObj = {
        menu: 0,
        sports: 1,
        casino: 2,
        mybets: 3,
        betslip: 4,
        search: 5,
        searchEvent: 6,
        inplay: 7,
        liveCasino: 8,
        crashGames: 9,
        chat: 10,
        crypto: 11,
        leader: 12,
      };

      // Remove buttons depending on the perimissions
      if (!permissions.AllowToSports) {
        delete allButtonsObj["sports"];
        delete allButtonsObj["mybets"];
        delete allButtonsObj["betslip"];
        delete allButtonsObj["inplay"];
        delete allButtonsObj["searchEvent"];
      }
      if (!permissions.AllowToCasino && !permissions.AllowToSlots) {
        delete allButtonsObj["search"];
        delete allButtonsObj["casino"];
        delete allButtonsObj["liveCasino"];
        delete allButtonsObj["crashGames"];
      }

      // Remove buttons depending on the route
      // if (slips.length > 0) delete allButtonsObj['mybets'];
      // else delete allButtonsObj['betslip'];

      if (basepath.includes("sportsbook") || basepath.includes("event")) {
        delete allButtonsObj["search"];
        delete allButtonsObj["sports"];
        delete allButtonsObj["crypto"];
        delete allButtonsObj["betslip"];
      } else if (basepath.includes("casino/game")) {
        delete allButtonsObj["mybets"];
        delete allButtonsObj["searchEvent"];
        delete allButtonsObj["betslip"];
        delete allButtonsObj["inplay"];
      } else if (basepath.includes("casino")) {
        delete allButtonsObj["mybets"];
        delete allButtonsObj["searchEvent"];
        delete allButtonsObj["betslip"];
        delete allButtonsObj["inplay"];
        delete allButtonsObj["casino"];
        delete allButtonsObj["leader"];
        delete allButtonsObj["crypto"];
        delete allButtonsObj["chat"];
      }

      if (!user) {
        delete allButtonsObj["mybets"];
      }

      const allButtonsIndexes = Object.values(allButtonsObj).sort(
        (a, b) => a - b
      );
      let firstFiveItems = allButtonsIndexes.slice(0, 5);
      setMenuButtonsIndexes(firstFiveItems);
    } else if (fixedMenu === "true") {
      let buttonsObj = {
        menu: 0,
        sports: 1,
        casino: 2,
        liveCasino: 8,
        betslip: 4,
        chat: 10,
      };
      const buttonsObjIndexes = Object.values(buttonsObj).sort((a, b) => a - b);
      setMenuButtonsIndexes(buttonsObjIndexes);
    }
  }, [
    location.pathname,
    slips.length,
    lang.id,
    user?.AccountId,
    initDataLoaded,
  ]);

  return (
    <div className={classes.Bottombar} id="bottomBar">
      {allButtons.map((menuButton, index) => {
        if (!menuButtonsIndexes.includes(index)) return null;
        return menuButton;
      })}
    </div>
  );
};

export default Bottombar;
