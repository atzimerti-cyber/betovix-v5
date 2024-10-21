import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import classes from "./ProgressMap.module.css";

import HeroTimeline from "./HeroTimeline";
import MainButton from "../../../features/UI/Buttons/MainButton";
import { translate } from "../../../utils/translations";

import { getUserAchievements } from "../gamificationAsyncActions";

const ProgressMap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const user = useSelector((state) => state.login.user);
  const selectedHero = useSelector((state) => state.gamification.selectedHero);
  const selectedHeroLevels = useSelector(
    (state) => state.gamification.heroLevels
  );

  useEffect(() => {
    dispatch(getUserAchievements());
  }, [user]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className={classes.PageContent}>
      <div className={classes.Banner}>
        <h1 className={classes.BannerTitle}>
          <span>{translate(`${selectedHero.name}`)}{' '}{translate(`${selectedHero.subName}`)}</span>
          {/* <span>{translate(`HERO'S HAVEN`)}</span> */}
        </h1>
      </div>

      <div className={classes.Container}>
        {user ? (
          selectedHero && Object.keys(selectedHero).length > 0 ? (
            <div className={classes.Timeline}>
              <HeroTimeline hero={selectedHero} levels={selectedHeroLevels} />
            </div>
          ) : (
            <div className={classes.ButtonContainer}>
              <MainButton
                color="bv-light-green"
                size="small"
                onClick={() => addParamsToUrl("heroes")}
              >
                Select a hero
              </MainButton>
            </div>
          )
        ) : (
          <div className={classes.ButtonContainer}>
            <MainButton
              color="bv-light-green"
              size="small"
              onClick={() => addParamsToUrl("auth", "login")}
            >
              Login
            </MainButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressMap;
