import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./CasinoGames.module.css";
import CasinoGameCard from "./CasinoGameCard";
import SkeletonGameCardRow from "../../UI/Skeletons/SkeletonGameCardRow";
import logoAnimation from "../../../assets/images/small-logo-animation.gif";
import MainButton from "../../UI/Buttons/MainButton";
import { loadMoreSearch } from "../../../pages/Search/searchAsyncActions";
import { useMediaQuery } from "react-responsive";

const CasinoGames = (props) => {
  const dispatch = useDispatch();
  const isSmallMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 575px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });
  const isBigDesktop = useMediaQuery({ query: "(max-width: 1240px)" });
  const isVeryBigDesktop = useMediaQuery({ query: "(max-width: 1500px)" });
  const moreLoading = useSelector((state) => state.search.moreLoading);

  const isRightContainerOpen = useSelector(
    (state) => state.layout.showRightContainer
  );
  const isLeftContainerOpen = useSelector(
    (state) => state.layout.fullLeftContainer
  );

  const [axiosController, setAxiosController] = useState(null);

  useEffect(() => {
    return () => {
      if (axiosController) axiosController.abort();
    };
  }, [axiosController]);

  const addToGames = () => {
    if (axiosController) axiosController.abort();

    const controller = new AbortController();
    const signal = controller.signal;
    setAxiosController(controller);

    dispatch(loadMoreSearch(signal, 24, [], props.searchString, "Default"));
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
    <div className={classes.ResultsContainer}>
      {(props.collection?.Total > 0 || props.loading) && (
        <p className={classes.CategoryTitle}>
          {props.searchString === "" ? "Slot Games" : "Search results"}
        </p>
      )}

      <ul
        className={classes.CardsContainer}
        style={{
          gridTemplateColumns: `repeat(${responsiveGrid()}, minmax(0, 1fr))`,
        }}
      >
        {props.collection?.Data.map((game) => {
          return <CasinoGameCard key={game.Data.Id} game={game} />;
        })}

        {props.loading || props.collection === null || moreLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <SkeletonGameCardRow key={index} />
            ))
          : null}
      </ul>

      {props.collection?.Total === 0 && (
        <p className={classes.NoResults}>
          {props.searchString
            ? `No results with '${props.searchString}'`
            : "No results"}
        </p>
      )}

      {props.searchString !== "" &&
        props.collection?.Total > props.collection?.Data.length && (
          <div className={classes.LoadMore}>
            {moreLoading ? (
              <img
                src={logoAnimation}
                className={classes.MoreLoadingAnimation}
              ></img>
            ) : (
              <MainButton color="primary" onClick={addToGames}>
                <span>Load More</span>
              </MainButton>
            )}
          </div>
        )}
    </div>
  );
};

export default CasinoGames;
