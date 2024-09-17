import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import classes from './FilterBar.module.css';
import Search3 from '../../../features/Search/Search3';
import Dropdown3 from '../../../features/UI/Dropdown/Dropdown3';
import CaretDownIcon from '../../../assets/svgs/caret-down.svg?react';
import Filter2Icon from '../../../assets/svgs/filter2.svg?react';
import { casinoActions } from '../casinoSlice';
import { searchActions } from '../../Search/searchSlice';
import MultiSelect from '../../../features/UI/MultiSelect/MultiSelect';
import { translate } from '../../../utils/translations';

const FilterBar = (props) => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const sorting = useSelector((state) => state.casino.sorting);
    const casinoVendors = useSelector((state) => state.casino.casinoVendors);
    const selectedProviders = useSelector((state) => state.search.searchSelectedProviders);

    const [showSortingDD, setShowSortingDD] = useState(false);
    const [providersOptions, setProvidersOptions] = useState([]);
    const [checkedProviders, setCheckedProviders] = useState([]);
    const [sortingValue, setSortingValue] = useState('Default Sort');


    useEffect(() => {
        if (sorting == 'Default') {
            setSortingValue('Default Sort');
        } else if (sorting == 'Name_Asc') {
            setSortingValue('A - Z');
        } else if (sorting == 'Name_Desc') {
            setSortingValue('Z - A');
        }
    }, [sorting]);


    useEffect(() => {
        if (!casinoVendors) {
            setCheckedProviders([]);
            return;
        }

        const po = casinoVendors.map((v) => {
            return {
                id: v.Data.BrandId,
                label: v.Data.Name,
                value: v.GameCount,
            };
        });

        const cp = casinoVendors
            .filter((v) => selectedProviders.includes(v.Data.Name))
            .map((v) => ({
                id: v.Data.BrandId,
                label: v.Data.Name,
                value: v.GameCount,
            }));
        setProvidersOptions(po);
        setCheckedProviders(cp);
    }, [casinoVendors, selectedProviders]);

    useEffect(() => {
        return () => {
            dispatch(searchActions.reset());
        };
    }, [dispatch]);

    return (
        <div className={classes.FilterBar}>
            <div className={classes.SearchSection}>
                <Search3 placeholder={props.placeholder} searchStr={props.searchString} onChange={(value) => props.onChangeSearch(value)} />
            </div>

            {props.noFilters ? (null) : (
                <div className={classes.FiltersSection}>
                    <div className={classes.DropdownWrapper}>
                        <div className={classes.DropdownInner}>
                            <input id='sort' readOnly role='textbox' value={sortingValue} onClick={() => setShowSortingDD(!showSortingDD)} />
                            <span className={classes.RightIcon}>
                                <CaretDownIcon />
                            </span>

                            <AnimatePresence>
                                {showSortingDD && (
                                    <Dropdown3 onClickOutside={() => setShowSortingDD(false)}>
                                        <li
                                            className={sorting === 'Default' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('Default'));
                                                setShowSortingDD(false);
                                            }}
                                        >
                                            {translate('Default Sort')}
                                        </li>
                                        <li
                                            className={sorting === 'Name_Asc' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('Name_Asc'));
                                                setShowSortingDD(false);
                                            }}
                                        >
                                            {translate('A - Z')}
                                        </li>
                                        <li
                                            className={sorting === 'Name_Desc' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                            onClick={() => {
                                                dispatch(casinoActions.setSorting('Name_Desc'));
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
                        placeholder={(translate('Providers'))}
                        icon={<Filter2Icon />}
                        options={providersOptions}
                        onClose={(providers) => {
                            props.onChangeProviders(providers);
                            dispatch(searchActions.setSearchSelectedProviders(providers));
                        }}
                        // max={3}
                        maxMessage={translate('A maximum of three providers is allowed')}
                        selected={checkedProviders && checkedProviders.length > 0 ? (checkedProviders) : (null)}
                    />
                </div>
            )}

        </div>
    );
};

export default FilterBar;
