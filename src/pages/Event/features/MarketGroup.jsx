import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Accordion from '../../../features/UI/Accordion/Accordion';
import Market from '../../SportsBook/features/Market';
import MarketWithList from '../../SportsBook/features/MarketWithList';
import { translate } from '../../../utils/translations';

const MarketGroup = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const selectedMarketCategoryIndex = useSelector((state) => state.event.selectedMarketCategoryIndex);
    const sportMarketTreeObj = useSelector((state) => state.event.sportMarketTreeObj);
    const changedMarkets = useSelector((state) => state.event.changedMarkets);

    const [marketsWithSubgroups, setMarketsWithSubgroups] = useState(null);

    useEffect(() => {
        if (!props.event) return;
        if (!props.marketGroups) return;
        if (!sportMarketTreeObj) return;

        const selectedMarketCategory = props.marketGroups[selectedMarketCategoryIndex];
        if (!selectedMarketCategory) return;

        let keyString = null;
        if (selectedMarketCategory.Auto) keyString = selectedMarketCategory.Auto.split('|| ')[1];

        let updatedMarkets = [];
        props.event.Markets.forEach((market, index) => {
            if (!market.MarketFields || market.MarketFields.length === 0) return;
            const activeMarketFields = market.MarketFields.filter((mf) => mf.Active);
            if (activeMarketFields.length === 0) return;

            const marketTypeId = market.MarketTypeId;
            const treeObj = sportMarketTreeObj[marketTypeId];

            let groupIndex;
            let subIndex;
            let subName;
            let marketIndex;

            if (treeObj) {
                groupIndex = treeObj.groups.find((g) => g.groupIndex === selectedMarketCategory.Id);
                if (!groupIndex && keyString && market.MarketName.International.includes(keyString)) {
                    // If there confirms with auto, add it
                    subIndex = treeObj.sub.subIndex;
                    subName = treeObj.sub.name;
                    marketIndex = 9999;
                } else if (!groupIndex) {
                    return;
                }

                subIndex = treeObj.sub.subIndex;
                subName = treeObj.sub.name;
                marketIndex = treeObj.marketIndex;
            } else if (!treeObj && selectedMarketCategory.Auto) {
                if (market.MarketName.International.includes(keyString)) {
                    subIndex = market.MarketSubTypeId ? parseInt(market.MarketSubTypeId) : market.MarketTypeId;
                    subName = market.MarketName.International;
                    marketIndex = market.MarketTypeId;
                } else {
                    return;
                }
            } else if (!treeObj && selectedMarketCategory.Id === 9999) {
                subIndex = market.MarketSubTypeId ? parseInt(market.MarketSubTypeId) : market.MarketTypeId;
                subName = market.MarketName.International;
                marketIndex = market.MarketTypeId;
            } else if (!treeObj) {
                return;
            }

            // Markets with the same subgroup and similar name (includes a number inside parenthesis) should be grouped together
            let label = market.MarketName.International;

            if (
                market.MarketFields[0]?.FieldName?.International.startsWith('Over') ||
                market.MarketFields[0]?.FieldName?.International.startsWith('Under') ||
                market.MarketFields[0]?.FieldName?.International.startsWith('Team 1') ||
                market.MarketFields[0]?.FieldName?.International.startsWith('Team 2')
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
            };
            updatedMarkets.push(updatedMarket);
        });

        // Grouping objects by 'subIndex' and the first part of 'name' before '('
        const grouped = updatedMarkets.reduce((acc, obj) => {
            // const key = `${obj.subIndex}-${obj.label}`;
            const key = `${obj.label}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        // Convert the object of groups into an array of groups and sort each group by 'marketIndex'
        const subgroups = Object.values(grouped).map((group) => {
            group.sort((a, b) => a.marketIndex - b.marketIndex);
            return group;
        });

        // Sort the subgroups based on 'subIndex' and then by the smallest 'marketIndex' within each subgroup
        subgroups.sort((a, b) => {
            const subIndexDiff = a[0].subIndex - b[0].subIndex;
            if (subIndexDiff !== 0) return subIndexDiff;

            const marketIndexDiff = a[0].marketIndex - b[0].marketIndex;
            if (subIndexDiff !== 0) return marketIndexDiff;

            // If subIndex and marketIndex are the same, compare the smallest 'marketTypeId' of each subgroup
            // return a[0].MarketTypeId - b[0].MarketTypeId;
            return a[0].MarketName.International - b[0].MarketName.International;
        });

        setMarketsWithSubgroups(subgroups);
    }, [changedMarkets, props.marketGroupsChanged, selectedMarketCategoryIndex, sportMarketTreeObj, props.event?.MatchId]);

    const removeNumberInParentheses = (input) => {
        // Regular expression to find a number in parentheses
        const regex = /\s*\(-?\d+(\.\d+)?\)\s*/;

        // Check if the input contains a number in parentheses
        if (regex.test(input)) {
            // Remove the number in parentheses and trim the result
            return input.replace(regex, '').trim();
        }

        // Return the original input if no number in parentheses is found
        return input;
    };

    return marketsWithSubgroups ? (
        <div>
            {marketsWithSubgroups.map((group, index) => {
                if (
                    group.length > 3 &&
                    group[0].MarketFields &&
                    (group[0].MarketFields[0]?.FieldName?.International.startsWith('Over') ||
                        group[0].MarketFields[0]?.FieldName?.International.startsWith('Under'))
                ) {
                    return (
                        <Accordion key={`${group[0].subIndex}-${group[0].label}`} title={translate(group[0].label)} initOpen={index < 3}>
                            <MarketWithList event={props.event} group={group} />
                        </Accordion>
                    );
                }

                return (
                    <Accordion key={`${group[0].subIndex}-${group[0].label}`} title={translate(group[0].label)} initOpen={index < 3}>
                        {group.map((market) => (
                            <Market key={market.MarketId} event={props.event} market={market} marketRow />
                        ))}
                    </Accordion>
                );
            })}
        </div>
    ) : null;
};

export default MarketGroup;
