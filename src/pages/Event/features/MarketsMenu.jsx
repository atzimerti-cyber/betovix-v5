import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HorizontalMenu from "../../../features/UI/HorizontalMenu/HorizontalMenu";
import classes from "./MarketsMenu.module.css";
import { eventActions } from "../eventSlice";
import { getBBComboMap } from "../eventAsyncActions";
import AdditionalMarketGroups from "./AdditionalMarketGroups";

const MarketsMenu = (props) => {
  const dispatch = useDispatch();

  const selectedMarketCategoryIndex = useSelector(
    (state) => state.event.selectedMarketCategoryIndex
  );
  const selectedMarketCategory = useSelector(
    (state) => state.event.selectedMarketCategory
  );
  const user = useSelector((state) => state.login.user);

  const [allMarketGroups, setAllMarketGroups] = useState([]);

  useEffect(() => {
    dispatch(eventActions.setSelectedMarketCategory(props.marketGroups[0]));

    if (props.marketGroups) {
      setAllMarketGroups(props.marketGroups);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (
      selectedMarketCategory &&
      selectedMarketCategory.Id === "betbuildercat" &&
      props.eventId
    ) {
      if (user) {
        dispatch(getBBComboMap(props.eventId, signal));
      }
    }

    return () => {
      controller.abort();
      dispatch(eventActions.setCombinationMap(null));
    };
  }, [selectedMarketCategory, user]);

  return (
    <>
      <div className={classes.MarketsMenu}>
        <div className={classes.MarketSelection}>
          <div className={classes.MenuContent}>
            <HorizontalMenu
              items={props.marketGroups}
              selected={props.marketGroups[selectedMarketCategoryIndex]?.Id}
              onSelect={(item, index) => {
                dispatch(eventActions.setSelectedMarketCategory(item));
                dispatch(eventActions.setSelectedMarketCategoryIndex(index));
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          color: "white",
          fontSize: "12px",
          flexWrap: "wrap",
        }}
      >
        <AdditionalMarketGroups />
      </div>
    </>
  );
};

export default MarketsMenu;
