import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalMenu from '../../../features/UI/HorizontalMenu/HorizontalMenu';
import classes from './MarketsMenu.module.css';
import { eventActions } from '../eventSlice';

const MarketsMenu = (props) => {
    const dispatch = useDispatch();

    const selectedMarketCategoryIndex = useSelector((state) => state.event.selectedMarketCategoryIndex);

    useEffect(() => {
        dispatch(eventActions.setSelectedMarketCategory(props.marketGroups[0]));
    }, []);

    return (
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
    );
};

export default MarketsMenu;
