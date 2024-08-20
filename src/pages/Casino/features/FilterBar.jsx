import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import classes from './FilterBar.module.css';
import Search3 from '../../../features/Search/Search3';
import Dropdown3 from '../../../features/UI/Dropdown/Dropdown3';
import CaretDownIcon from '../../../assets/svgs/caret-down.svg?react';
import Filter2Icon from '../../../assets/svgs/filter2.svg?react';
import { casinoActions } from '../casinoSlice';
import MultiSelect from '../../../features/UI/MultiSelect/MultiSelect';
import { translate } from '../../../utils/translations';

const FilterBar = (props) => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const sorting = useSelector((state) => state.casino.sorting);
    const casinoVendors = useSelector((state) => state.casino.casinoVendors);

    const [showSortingDD, setShowSortingDD] = useState(false);
    const [providersOptions, setProvidersOptions] = useState([]);
    // const [providers, setProviders] = useState([]);

    // useEffect(() => {
    //     if (props.selectedProviders) {
    //         setProviders(props.selectedProviders);
    //     }
    // }, [])


    useEffect(() => {
        if (!casinoVendors) return;

        const po = casinoVendors.map((v) => {
            return {
                id: v.Data.BrandId,
                label: v.Data.Name,
                value: v.GameCount,
            };
        });
        setProvidersOptions(po);
    }, [casinoVendors]);

    return (
        <div className={classes.FilterBar}>
            <div className={classes.SearchSection}>
                <Search3 placeholder={props.placeholder} searchStr={props.searchString} onChange={(value) => props.onChangeSearch(value)} />
            </div>

            {props.noFilters ? (null) : (
                <div className={classes.FiltersSection}>
                    <div className={classes.DropdownWrapper}>
                        <div className={classes.DropdownInner}>
                            <input id='sort' readOnly role='textbox' value={sorting} onClick={() => setShowSortingDD(!showSortingDD)} />
                            <span className={classes.RightIcon}>
                                <CaretDownIcon />
                            </span>

                            <AnimatePresence>
                                {showSortingDD && (
                                    <Dropdown3 onClickOutside={() => setShowSortingDD(false)}>
                                        <li
                                            className={sorting === 'Default Sort' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('Default Sort'));
                                                setShowSortingDD(false);
                                            }}
                                        >
                                            {translate('Default Sort')}
                                        </li>
                                        <li
                                            className={sorting === 'A - Z' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('A - Z'));
                                                setShowSortingDD(false);
                                            }}
                                        >
                                            {translate('A - Z')}
                                        </li>
                                        <li
                                            className={sorting === 'Z - A' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('Z - A'));
                                                setShowSortingDD(false);
                                            }}
                                        >
                                            {translate('Z - A')}
                                        </li>
                                    </Dropdown3>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <MultiSelect
                        id={translate('Providers')}
                        menuTitle={translate('Providers')}
                        placeholder={translate('Providers')}
                        icon={<Filter2Icon />}
                        options={providersOptions}
                        onClose={(providers) => props.onChangeProviders(providers)}
                        max={3}
                        maxMessage={translate('A maximum of three providers is allowed')}
                    />
                </div>
            )}

        </div>
    );
};

export default FilterBar;
