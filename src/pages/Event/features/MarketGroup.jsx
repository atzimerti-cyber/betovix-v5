import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Accordion from "../../../features/UI/Accordion/Accordion";
import Market from "../../SportsBook/features/Market";
import MarketWithList from "../../SportsBook/features/MarketWithList";
import { translate } from "../../../utils/translations";
import BetBuilderBadge from "../../../features/UI/Badges/BetBuilderBadge";
import { getFormattedSportName } from "../../../utils/custom";

const MarketGroup = (props) => {
  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

  ////////////////FOR BET BUILDER UI/////////////////////
  const selectedMarketCategory = useSelector(
    (state) => state.event.selectedMarketCategory
  );
  const combinationMap = useSelector((state) => state.event.combinationMap);
  const user = useSelector((state) => state.login.user);
  //////////////////////////////////////////////////////

  const selectedMarketCategoryIndex = useSelector(
    (state) => state.event.selectedMarketCategoryIndex
  );
  const sportMarketTreeObj = useSelector(
    (state) => state.event.sportMarketTreeObj
  );
  const changedMarkets = useSelector((state) => state.event.changedMarkets);

  const specialGroups = useSelector((state) => state.sportsbook.specialGroups);

  const [marketsWithSubgroups, setMarketsWithSubgroups] = useState(null);

  useEffect(() => {
    if (!props.event) return;
    if (!props.marketGroups) return;
    if (!sportMarketTreeObj) return;

    const selectedMarketCategory =
      props.marketGroups[selectedMarketCategoryIndex];
    if (!selectedMarketCategory) return;

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
      let subIndex = market.MarketSubTypeId
        ? parseInt(market.MarketSubTypeId)
        : market.MarketTypeId;
      let subName = market.MarketName.International;
      let marketIndex = market.MarketTypeId;
      let allIndex = 100000 * market.MarketTypeId;
      const isSpecial = specialGroups.find(
        (s) => s.Id === selectedMarketCategory.Id
      );

      // If not in tree, search for a similar name
      if (
        selectedMarketCategory.name === "All Markets" ||
        selectedMarketCategory.name === "Bet Builder"
      ) {
        let thisGroup;
        if (inTree && inTree.groups && inTree.groups.length > 0) {
          thisGroup = inTree.groups[0];
        } else if (!thisGroup) {
        }
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
        } else if (!thisGroup) {
        } else {
          subIndex = inTree.sub.subIndex;
          subName = inTree.sub.name;
          marketIndex = inTree.marketIndex;
          allIndex = thisGroup.allIndex;
        }
      } else if (!inTree) {
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
        } else if (selectedMarketCategory.name === "All Markets" || isSpecial) {
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

        if (isSpecial) {
          const currentSpecialGroup = specialGroups.find(
            (s) => s.Id === selectedMarketCategory.Id
          );
          if (currentSpecialGroup)
            thisGroup = inTree.groups.find((g) =>
              currentSpecialGroup.groups.includes(g.name)
            );
        }

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
        } else if (
          selectedMarketCategory.name === "All Markets" ||
          (isSpecial && !thisGroup)
        ) {
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

    //###################### BET BUILDER MARKETS #############################
    if (selectedMarketCategory.name === "Bet Builder" && combinationMap) {
      updatedMarkets = updatedMarkets.filter((market) =>
        combinationMap.hasOwnProperty(market.MarketTypeId)
      );
    }
    //###########################################################

    // Grouping objects by the first part of 'name' before '('
    let grouped = updatedMarkets.reduce((acc, obj) => {
      const key = `${obj.label}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    //##########################  FAVORITE MARKET GROUPS #######################################
    if (props.filterFavGroups && props.favoriteGroups) {
      const favoriteGroupNames = Object.values(props.favoriteGroups).flat();

      grouped = Object.keys(grouped).reduce((acc, groupLabel) => {
        const filteredMarkets = grouped[groupLabel].filter((market) => {
          const marketName = market.MarketName?.International;
          // const isFavorite = favoriteGroupNames.includes(marketName);
          const isFavorite = favoriteGroupNames.some(
            (fav) =>
              // marketName?.includes(fav)
              marketName == fav
          );

          return isFavorite;
        });

        if (filteredMarkets.length > 0) {
          acc[groupLabel] = filteredMarkets;
        }

        return acc;
      }, {});
    }
    //###########################################################

    // Sort the items within each array by obj.MarketTypeId
    for (const allIndex in grouped) {
      if (grouped.hasOwnProperty(allIndex)) {
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
    combinationMap,
    props.filterFavGroups,
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

  return selectedMarketCategory &&
    selectedMarketCategory.Id === "betbuildercat" &&
    !user ? (
    <div
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "2rem 1rem",
        gap: "10px",
      }}
    >
      <div style={{ transform: "scale(1.5)" }}>
        <BetBuilderBadge />
      </div>
      <p style={{ textAlign: "center", color: "var(--white)" }}>
        {translate("Please login to access Bet Builder")}.
      </p>
    </div>
  ) : marketsWithSubgroups ? (
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
          const sportName = getFormattedSportName(
            props.event?.Info?.SportName?.International
          );
          return (
            <Accordion
              key={`${group[0].subIndex}-${group[0].label}`}
              title={translate(group[0].label)}
              initOpen={index < 3}
              marketGroup={true}
              sportName={sportName}
              groupName={group[0].label}
              group={group}
            >
              <MarketWithList event={props.event} group={group} />
            </Accordion>
          );
        }
        const sportName = getFormattedSportName(
          props.event?.Info?.SportName?.International
        );
        return (
          <Accordion
            key={`${group[0].subIndex}-${group[0].label}`}
            title={translate(group[0].label)}
            initOpen={index < 3}
            marketGroup={true}
            sportName={sportName}
            groupName={group[0].label}
            group={group}
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
