import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalMenu from '../../../features/UI/HorizontalMenu/HorizontalMenu';
import classes from './MarketsMenu.module.css';
import { outrightsActions } from '../outrightsSlice';

const MarketsMenu = (props) => {
    const dispatch = useDispatch();

    const selectedMarketCategory = useSelector((state) => state.outrights.selectedMarketCategory);

    useEffect(() => {
        dispatch(outrightsActions.setSelectedMarketCategory(props.marketGroups[0]));
    }, []);

    return (
        <div className={classes.MarketsMenu}>
            <div className={classes.MarketSelection}>
                <div className={classes.MenuContent}>
                    <HorizontalMenu
                        items={props.marketGroups}
                        selected={selectedMarketCategory?.Id}
                        onSelect={(item, index) => {
                            dispatch(outrightsActions.setSelectedMarketCategory(item));
                            dispatch(outrightsActions.setSelectedMarketCategoryIndex(index));
                        }}
                        lightColor
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketsMenu;
