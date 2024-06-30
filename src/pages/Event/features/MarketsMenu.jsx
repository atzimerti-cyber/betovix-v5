import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalMenu from '../../../features/UI/HorizontalMenu/HorizontalMenu';
import classes from './MarketsMenu.module.css';
import { eventActions } from '../eventSlice';

const MarketsMenu = (props) => {
    const dispatch = useDispatch();

    const selectedMarketCategory = useSelector((state) => state.event.selectedMarketCategory);

    useEffect(() => {
        dispatch(eventActions.setSelectedMarketCategory(props.marketGroups[0]));
    }, []);

    return (
        <div className={classes.MarketsMenu}>
            <div className={classes.MarketSelection}>
                <div className={classes.MenuContent}>
                    <HorizontalMenu
                        items={props.marketGroups}
                        selected={selectedMarketCategory?.Id}
                        onSelect={(item) => dispatch(eventActions.setSelectedMarketCategory(item))}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketsMenu;
