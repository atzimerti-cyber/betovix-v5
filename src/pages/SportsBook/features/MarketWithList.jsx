import { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './MarketWithList.module.css';
import OddsButton from './OddsButton';
import Market from './Market';
import SelectionSlider from '../../../features/UI/SelectionSlider/SelectionSlider';
import { translate } from '../../../utils/translations';

const MarketWithList = (props) => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [showFull, setShowFull] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(props.group.length % 2 === 0 ? props.group.length / 2 - 1 : Math.floor(props.group.length / 2));

    const getFieldLabel = (field) => {
        if (field.FieldName.International === 'W1') return props.event.Info.HomeTeamName.International;
        else if (field.FieldName.International === 'W2') return props.event.Info.AwayTeamName.International;
        else if (field.FieldName.International === 'x' || field.FieldName.International === 'X') return 'Draw';
        else return field.FieldName.International;
    };

    return showFull ? (
        <>
            <div className={classes.HideList}>
                <button className={classes.ListVisibilityButton} onClick={() => setShowFull(false)}>
                    {translate('Hide List')}
                </button>
            </div>
            {props.group.map((market) => (
                <Market key={market.MarketId} event={props.event} market={market} marketRow />
            ))}
        </>
    ) : (
        <div className={classes.Market}>
            <div className={classes.MarketContainer}>
                <div className={classes.MarketGroup}>
                    {props.group[selectedIndex]?.MarketFields &&
                        props.group[selectedIndex].MarketFields.map((marketField) => {
                            return (
                                <OddsButton
                                    key={marketField.FieldId}
                                    label={getFieldLabel(marketField)}
                                    event={props.event}
                                    market={props.group[selectedIndex]}
                                    marketField={marketField}
                                    odds={marketField.Value}
                                    disabled={
                                        props.group[selectedIndex].Active === false ||
                                        props.group[selectedIndex].Active === undefined ||
                                        marketField.Active === false ||
                                        marketField.Active === undefined
                                    }
                                />
                            );
                        })}
                </div>
                <button className={classes.ListVisibilityButton} onClick={() => setShowFull(true)}>
                    {translate('Show List')}
                </button>
            </div>

            <div className={classes.SliderContainer}>
                <SelectionSlider min={0} max={props.group.length - 1} defaultValue={selectedIndex} onChange={(value) => setSelectedIndex(value)} />
            </div>
        </div>
    );
};

export default MarketWithList;
