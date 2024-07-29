import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Market.module.css';
import OddsButton from './OddsButton';
import { translate, translateNameWithLang } from '../../../utils/translations';

const Market = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const sportMarketTree = props.event?.Info?.SportId ? useSelector((state) => state.sportsbook.sportMarketTree)[props.event.Info.SportId] : null;

    const [market, setMarket] = useState(props.market);

    const getFieldLabel = (field) => {
        if (field.FieldName.International === 'W1') return props.typeList ? '1' : translateNameWithLang(props.event.Info.HomeTeamName);
        else if (field.FieldName.International === 'W2') return props.typeList ? '2' : translateNameWithLang(props.event.Info.AwayTeamName);
        else if (field.FieldName.International === 'x' || field.FieldName.International === 'X' || field.FieldName.International === 'Draw')
            return props.typeList ? 'X' : translate('Draw');
        else return translateNameWithLang(field.FieldName);
    };

    useEffect(() => {
        // Add a dummy market, if there is no market.
        if (!props.market && sportMarketTree) {
            const defaultMarket = sportMarketTree.childs[0].childs[0].childs[0];
            if (!defaultMarket) return;

            let dummyFields = [];
            defaultMarket.childs.forEach((field, index) => {
                if (!field.name) return;

                dummyFields.push({
                    Active: false,
                    FieldId: `-${index}`,
                    FieldTypeId: field.data.FieldTypeId,
                    FieldName: { International: field.data.Name },
                    Value: '-',
                });
            });

            const dummyMarket = {
                MarketName: { International: defaultMarket.name },
                MarketFields: dummyFields,
            };

            setMarket(dummyMarket);
        } else {
            setMarket(props.market);
        }
    }, [sportMarketTree, props.market]);

    return (
        <div className={props.marketRow ? [classes.Market, classes.MarketRow].join(' ') : classes.Market} data-markettypeid={props.market?.MarketTypeId}>
            {!props.marketRow && <div className={classes.MarketName}>{market?.MarketName.International}</div>}
            <div className={classes.MarketContainer}>
                <div className={market?.MarketFields.length === 3 ? [classes.MarketGroup, classes.ThreeParts].join(' ') : classes.MarketGroup}>
                    {market?.MarketFields &&
                        market.MarketFields.map((marketField) => {
                            return (
                                <OddsButton
                                    key={marketField.FieldId}
                                    label={getFieldLabel(marketField)}
                                    event={props.event}
                                    market={market}
                                    marketField={marketField}
                                    odds={marketField.Value}
                                    typeList={props.typeList}
                                    disabled={
                                        market.Active === false ||
                                        market.Active === undefined ||
                                        marketField.Active === false ||
                                        marketField.Active === undefined
                                    }
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Market;
