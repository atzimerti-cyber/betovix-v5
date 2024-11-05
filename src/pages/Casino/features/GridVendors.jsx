import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./GridVendors.module.css";
import diceAnimation from "../../../assets/images/dice_animation_1.webp";
import CasinoGameCard from "../features/CasinoGameCard";
import MainButton from "../../../features/UI/Buttons/MainButton";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import { translate } from "../../../utils/translations";
import VendorCard from "./VendorCard";

const GridVendors = (props) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const moreLoading = useSelector((state) => state.casino.moreLoading);

  return (
    <div className={classes.VendorGames}>
      <div className={classes.Header}>
        {props.icon}
        <p className={classes.Title}>{translate(props.title)}</p>
        {props.collection?.length > 0 && (
          <div className={classes.Total}>{props.collection?.length}</div>
        )}
      </div>

      <div className={classes.GameGrid}>
        {props.collection?.map((vendor, index) => {
          return <VendorCard key={vendor.Data.Id} vendor={vendor} />;
        })}

        {props.loading || props.collection === null || moreLoading
          ? Array.from({ length: 24 }, (_, index) => (
              <div key={index} className={classes.ImageContainer}>
                <LoaderPlaceholder />
              </div>
            ))
          : null}
      </div>

      {props.collection?.Total === 0 && (
        <p className={classes.NoResults}>
          {props.searchString
            ? `${translate("No results with")} '${props.searchString}'`
            : translate("No results")}
        </p>
      )}
    </div>
  );
};

export default GridVendors;
