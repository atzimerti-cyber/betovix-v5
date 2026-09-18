import { useSelector } from "react-redux";

import classes from "./GridVendors.module.css";
import LoaderPlaceholder from "../../../features/UI/Skeletons/LoaderPlaceholder";
import { translate } from "../../../utils/translations";
import VendorCard from "./VendorCard";

const GridVendors = (props) => {
  useSelector((state) => state.app.lang); // rerender translations
  const moreLoading = useSelector((state) => state.casino.moreLoading);

  const vendors = Array.isArray(props.collection)
    ? [...props.collection].sort((a, b) =>
        (a?.Data?.Name || "").localeCompare(b?.Data?.Name || "")
      )
    : [];

  return (
    <div className={classes.VendorGames}>
      {(props.title || props.icon) && (
        <div className={classes.Header}>
          {props.icon}
          {props.title && <p className={classes.Title}>{translate(props.title)}</p>}
          {vendors.length > 0 && <div className={classes.Total}>{vendors.length}</div>}
        </div>
      )}

      <div className={classes.GameGrid}>
        {props.showAllProviders && (
          <div className={classes.AllProvidersCard}>
            {translate("All providers")}
          </div>
        )}

        {vendors.map((vendor) => (
          <VendorCard key={vendor.Data.Id} vendor={vendor} />
        ))}

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
