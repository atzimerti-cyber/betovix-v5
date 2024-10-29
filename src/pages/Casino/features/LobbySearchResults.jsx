import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./LobbySearchResults.module.css";
import CasinoGameCard from "../../../features/ModalRoot/features/CasinoGameCard";
import SkeletonGameCardRow from "../../../features/UI/Skeletons/SkeletonGameCardRow";

import { translate } from "../../../utils/translations";
import { useLocation, useNavigate } from "react-router-dom";
import { searchActions } from "../../Search/searchSlice";

import ArrowRight from "../../../assets/svgs/angle-right.svg?react";

const LobbySearchResults = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const moreLoading = useSelector((state) => state.search.moreLoading);

  const viewAll = (searchString) => {
    dispatch(searchActions.setSearchString(searchString));
    navigate("/search");
  };

  return (
    <div className={classes.ResultsContainer}>
      {(props.collection?.Total > 0 || props.loading) && (
        <div className={classes.CategoryTitle}>
          <p>
            {props.searchString === ""
              ? translate("Slot Games")
              : translate("Search results")}
          </p>
          {props.collection?.Data.length > 0 && (
            <div
              className={classes.ViewAll}
              onClick={() => viewAll(props.searchString)}
            >
              {translate(`View all`)}
              <ArrowRight height="12px" />
            </div>
          )}
        </div>
      )}

      <ul className={classes.CardsContainer}>
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
    </div>
  );
};

export default LobbySearchResults;
