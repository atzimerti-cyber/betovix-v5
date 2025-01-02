import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Accordion from "../../../features/UI/Accordion/Accordion";
import Market from "../../SportsBook/features/Market";
import MarketWithList from "../../SportsBook/features/MarketWithList";
import { translate } from "../../../utils/translations";

const MarketGroup = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  const selectedMarketCategoryIndex = useSelector(
    (state) => state.event.selectedMarketCategoryIndex
  );
  const sportMarketTreeObj = useSelector(
    (state) => state.event.sportMarketTreeObj
  );
  const changedMarkets = useSelector((state) => state.event.changedMarkets);

  const [marketsWithSubgroups, setMarketsWithSubgroups] = useState(null);

  useEffect(() => {
    if (!props.event) return;
    if (!props.marketGroups) return;
    if (!sportMarketTreeObj) return;

    const selectedMarketCategory =
      props.marketGroups[selectedMarketCategoryIndex];
    if (!selectedMarketCategory) return;

    // if (selectedMarketCategory.name === "All Markets") {
    //   null;
    // }

    let keyString = null;
    if (selectedMarketCategory.Auto)
      keyString = selectedMarketCategory.Auto.split("|| ")[1];

    let updatedMarkets = [];

    props.event.Markets.forEach((market) => {
      if (!market.MarketFields || market.MarketFields.length === 0) return;
      const activeMarketFields = market.MarketFields.filter((mf) => mf.Active);
      if (activeMarketFields.length === 0) return;

      const marketTypeId = market.MarketTypeId;

      const inTree = sportMarketTreeObj[marketTypeId];
      let subIndex;
      let subName;
      let marketIndex;
      let allIndex;

      // If not in tree, search for a similar name
      if (!inTree) {
        if (keyString && market.MarketName.International.includes(keyString)) {
          subIndex = market.MarketSubTypeId
            ? parseInt(market.MarketSubTypeId)
            : market.MarketTypeId;
          subName = market.MarketName.International;
          marketIndex = market.MarketTypeId;
          allIndex = 100000 * market.MarketTypeId;
        } else if (selectedMarketCategory.Id === 9999) {
          subIndex = market.MarketSubTypeId
            ? parseInt(market.MarketSubTypeId)
            : market.MarketTypeId;
          subName = market.MarketName.International;
          marketIndex = market.MarketTypeId;
          allIndex = 100000 * market.MarketTypeId;
        } else if (selectedMarketCategory.name === "All Markets") {
          /////////////////////
          subIndex = market.MarketSubTypeId /////////////////////
            ? parseInt(market.MarketSubTypeId) /////////////////////
            : market.MarketTypeId; /////////////////////
          subName = market.MarketName.International; /////////////////////
          marketIndex = market.MarketTypeId; /////////////////////
          allIndex = 1000000 * market.MarketTypeId; /////////////////////
        } else {
          return;
        }
      } else {
        const thisGroup = inTree.groups.find(
          (g) => g.groupIndex === selectedMarketCategory.Id
        );
        if (
          !thisGroup &&
          keyString &&
          market.MarketName.International.includes(keyString)
        ) {
          subIndex = market.MarketSubTypeId
            ? parseInt(market.MarketSubTypeId)
            : market.MarketTypeId;
          subName = market.MarketName.International;
          marketIndex = market.MarketTypeId;
          allIndex = 100000 * market.MarketTypeId;
        } else if (selectedMarketCategory.name === "All Markets") {
          subIndex = market.MarketSubTypeId
            ? parseInt(market.MarketSubTypeId)
            : market.MarketTypeId;
          subName = market.MarketName.International;
          marketIndex = market.MarketTypeId;
          allIndex = 1000000 * market.MarketTypeId;
        } else if (!thisGroup) {
          return;
        } else {
          subIndex = inTree.sub.subIndex;
          subName = inTree.sub.name;
          marketIndex = inTree.marketIndex;
          allIndex = thisGroup.allIndex;
        }
      }

      // Markets with similar name (includes a number inside parenthesis) should be grouped together
      let label = market.MarketName.International;

      if (
        market.MarketFields[0]?.FieldName?.International.startsWith("Over") ||
        market.MarketFields[0]?.FieldName?.International.startsWith("Under") ||
        market.MarketFields[0]?.FieldName?.International.startsWith("Team 1") ||
        market.MarketFields[0]?.FieldName?.International.startsWith("Team 2")
      ) {
        label = removeNumberInParentheses(market.MarketName.International);
      }

      const updatedMarket = {
        ...market,
        MarketFields: activeMarketFields,
        subIndex: subIndex,
        subName: subName,
        marketIndex: marketIndex,
        label: label,
        allIndex: allIndex,
      };
      updatedMarkets.push(updatedMarket);
    });

    updatedMarkets.sort((a, b) => a.allIndex - b.allIndex);

    // Grouping objects by the first part of 'name' before '('
    const grouped = updatedMarkets.reduce((acc, obj) => {
      const key = `${obj.label}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    // Sort the items within each array by obj.MarketTypeId
    for (const allIndex in grouped) {
      if (grouped.hasOwnProperty(allIndex)) {
        // grouped[allIndex].sort((a, b) => a.MarketTypeId - b.MarketTypeId);
        grouped[allIndex].sort((a, b) =>
          a.MarketName.International.localeCompare(b.MarketName.International)
        );
      }
    }

    const subgroups = Object.values(grouped).map((group) => {
      return group;
    });

    setMarketsWithSubgroups(subgroups);
  }, [
    changedMarkets,
    props.marketGroupsChanged,
    selectedMarketCategoryIndex,
    sportMarketTreeObj,
  ]);

  const removeNumberInParentheses = (input) => {
    // Regular expression to find a number in parentheses
    const regex = /\s*\(-?\d+(\.\d+)?\)\s*/;

    // Check if the input contains a number in parentheses
    if (regex.test(input)) {
      // Remove the number in parentheses and trim the result
      return input.replace(regex, "").trim();
    }

    // Return the original input if no number in parentheses is found
    return input;
  };

  return marketsWithSubgroups ? (
    <div>
      {marketsWithSubgroups.length === 0 && (
        <p style={{ color: "var(--brand-color)" }}>
          {translate("No available markets")}.
        </p>
      )}
      {marketsWithSubgroups.map((group, index) => {
        if (
          group.length > 3 &&
          group[0].MarketFields &&
          (group[0].MarketFields[0]?.FieldName?.International.startsWith(
            "Over"
          ) ||
            group[0].MarketFields[0]?.FieldName?.International.startsWith(
              "Under"
            ))
        ) {
          return (
            <Accordion
              key={`${group[0].subIndex}-${group[0].label}`}
              title={translate(group[0].label)}
              initOpen={index < 3}
            >
              <MarketWithList event={props.event} group={group} />
            </Accordion>
          );
        }

        return (
          <Accordion
            key={`${group[0].subIndex}-${group[0].label}`}
            title={translate(group[0].label)}
            initOpen={index < 3}
          >
            {group.map((market) => (
              <Market
                key={market.MarketId}
                event={props.event}
                market={market}
                marketRow
              />
            ))}
          </Accordion>
        );
      })}
    </div>
  ) : null;
};

export default MarketGroup;
