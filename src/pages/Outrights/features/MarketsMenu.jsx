import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HorizontalMenu from '../../../features/UI/HorizontalMenu/HorizontalMenu';
import classes from './MarketsMenu.module.css';
import { outrightsActions } from '../outrightsSlice';

const MarketsMenu = (props) => {
    const dispatch = useDispatch();

    const selectedMarketCategory = useSelector((state) => state.outrights.selectedMarketCategory);

    const [menu, setMenu] = useState(null);

    useEffect(() => {
        dispatch(outrightsActions.setSelectedMarketCategory(props.marketGroups[0]));
    }, [props.marketGroups]);

    useEffect(() => {
        setMenu(
            <HorizontalMenu
                items={props.marketGroups}
                selected={selectedMarketCategory?.Id}
                onSelect={(item, index) => {
                    dispatch(outrightsActions.setSelectedMarketCategory(item));
                    dispatch(outrightsActions.setSelectedMarketCategoryIndex(index));
                }}
                lightColor
            />
        );
    }, [selectedMarketCategory?.Id]);

    return (
        <div className={classes.MarketsMenu}>
            <div className={classes.MarketSelection}>
                <div className={classes.MenuContent}>
                    {menu}
                    {/* <HorizontalMenu
                        items={props.marketGroups}
                        selected={selectedMarketCategory?.Id}
                        onSelect={(item, index) => {
                            dispatch(outrightsActions.setSelectedMarketCategory(item));
                            dispatch(outrightsActions.setSelectedMarketCategoryIndex(index));
                        }}
                        lightColor
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default MarketsMenu;
