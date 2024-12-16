import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./GridGames.module.css"; 
import logoAnimation from "../../../assets/images/small-logo-animation.gif";
import CasinoGameCard from "../features/CasinoGameCard";
import MainButton from "../../../features/UI/Buttons/MainButton";
import { addToGamesWithFilter, loadMoreSearch } from "../casinoAsyncActions";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import { translate } from "../../../utils/translations";
import { useMediaQuery } from "react-responsive";

const GridGames = (props) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const isSmallMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 575px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });
  const isBigDesktop = useMediaQuery({ query: "(max-width: 1240px)" });
  const isVeryBigDesktop = useMediaQuery({ query: "(max-width: 1500px)" });

  const isRightContainerOpen = useSelector(
    (state) => state.layout.showRightContainer
  );
  const isLeftContainerOpen = useSelector(
    (state) => state.layout.fullLeftContainer
  );

  const moreLoading = useSelector((state) => state.casino.moreLoading);

  const [axiosController, setAxiosController] = useState(null);

  useEffect(() => {
    return () => axiosController && axiosController.abort();
  }, [axiosController]);

  const addToGames = () => {
    if (axiosController) axiosController.abort();

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);

    //dispatch(addToGamesWithFilter(props.property, signal));
    let tags = [props.tag, ...props.providers];
    dispatch(
      loadMoreSearch(signal, 28, tags, props.searchString, props.sorting)
    );
  };

  const responsiveGrid = () => {
    let repeat = 5;
    if (isSmallMobile) {
      repeat = 2;
    } else if (isMobile) {
      repeat = 3;
    } else if (isTablet) {
      repeat = 5;
    } else if (isDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        repeat = 4;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          repeat = 6;
        } else {
          repeat = 4;
        }
      } else {
        repeat = 6;
      }
    } else if (isBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        repeat = 6;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          repeat = 7;
        } else {
          repeat = 6;
        }
      } else {
        repeat = 7;
      }
    } else if (isVeryBigDesktop) {
      if (isRightContainerOpen && isLeftContainerOpen) {
        repeat = 5;
      } else if (isRightContainerOpen || isLeftContainerOpen) {
        if (isRightContainerOpen) {
          repeat = 6;
        } else {
          repeat = 6;
        }
      } else {
        repeat = 8;
      }
    } else {
      repeat = 8;
    }
    return repeat;
  };

  return (
    <div className={classes.Games}>
      <div
        className={classes.Header}
        style={props.noTitle && { marginBottom: 0 }}
      >
        {props.noTitle ? null : (
          <>
            {props.icon}
            <p className={props.bigTitle ? classes.BigTitle : classes.Title}>
              {translate(props.title)}
            </p>
          </>
        )}

        {props.collection?.Data.Total > 0 && (
          <p className={classes.Total}>
            {props.collection?.Total} {translate("Games")}
          </p>
        )}
        {props.collection?.Data.length > 0 && props.collection?.Total && (
          <p className={classes.TotalBubble}>{props.collection?.Total}</p>
        )}
      </div>

      <div
        className={classes.GameGrid}
        style={{
          gridTemplateColumns: `repeat(${responsiveGrid()}, minmax(0, 1fr))`,
        }}
      >
        {/* {props.collection?.Total === 0 ||
          (props.collection?.Data.length === 0 && (
            <p className={classes.NoResults}>
              {props.searchString
                ? `${translate("No results with")} '${props.searchString}'`
                : translate("No results")}
            </p>
          ))} */}
        {props.collection &&
          props.collection.Total === 0 &&
          !props.collection?.Data.length && (
            <p className={classes.NoResults}>{translate("No results")}</p>
          )}

        {props.collection &&
          (props.collection.Total === undefined || null) &&
          !props.collection?.Data.length && (
            <p className={classes.NoResults}>{translate("No results")}</p>
          )}

        {props.collection &&
          props.collection.Data.map((game) => {
            return <CasinoGameCard key={game.Data.Id} game={game} />;
          })}

        {props.loading || props.collection === null || moreLoading
          ? Array.from({ length: 24 }, (_, index) => (
              <div key={index} className={classes.ImageContainer}>
                <LoaderPlaceholder />
              </div>
            ))
          : null}
      </div>

      {props.collection?.Total > props.collection?.Data.length &&
        props.collection?.Data.length > 0 && (
          <div className={classes.LoadMore}>
            {moreLoading ? (
              <img
                src={logoAnimation}
                className={classes.MoreLoadingAnimation}
              ></img>
            ) : (
              <MainButton color="primary" onClick={addToGames}>
                <span>{translate("Load More")}</span>
              </MainButton>
            )}
          </div>
        )}
    </div>
  );
};

export default GridGames;
