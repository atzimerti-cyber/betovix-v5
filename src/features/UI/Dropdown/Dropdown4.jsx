import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './Dropdown4.module.css';
import DsButton from '../Buttons/DsButton';
import CaretDownIcon from '../../../assets/svgs/caret-down.svg?react';
import ArrowBeforeIcon from '../../../assets/svgs/arrow-before.svg?react';
import useClickOutside from '../../../hooks/useClickOutside';
import Search3 from '../../Search/Search3';

const Dropdown4 = (props) => {
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    const [showDropdown, setShowDropdown] = useState();
    const [searchStr, setSearchStr] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(null);

    const close = useCallback(() => setShowDropdown(false), []);
    useClickOutside(dropdownRef, close);

    useEffect(() => {
        if (!searchStr || searchStr === '') {
            setFilteredOptions(props.options);
        } else {
            const f = props.options.filter((o) => o.label.toLowerCase().includes(searchStr.toLowerCase()));
            setFilteredOptions(f);
        }
    }, [searchStr, props.options]);

    const onSelect = (option) => {
        setShowDropdown(false);
        props.onSelect(option);
    };

    const filterOptions = (value) => {
        setSearchStr(value);
    };

    const onButtonClick = () => {
        setShowDropdown(true);
        timeoutRef.current = setTimeout(() => {
            if (dropdownRef.current) {
                const input = dropdownRef.current.querySelector('input');
                if (input) input.select();
            }
        }, 100);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div className={`${classes.Dropdown} ${!props.selected ? classes.RedBorder : ''}`}>
            <DsButton color='transparent' disabled={props.disabled} onClick={onButtonClick}>
                <div className={classes.Label}>
                    {props.icon && <img src={props.icon} loading='lazy' alt={props.placeholder} />}
                    <span className={!props.selected ? classes.PlaceholderRed : ''}>
                        {props.selected ? props.selected.label : props.placeholder}
                    </span>
                </div>
                <CaretDownIcon className={classes.DownArrow} />
            </DsButton>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        ref={dropdownRef}
                        className={
                            filteredOptions && filteredOptions.length === 0 ? [classes.DropdownContent, classes.Empty].join(' ') : classes.DropdownContent
                        }
                        initial={{ scaleX: 0.95, scaleY: 0.95 }}
                        animate={{ scaleX: 1, scaleY: 1 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <ArrowBeforeIcon className={classes.ArrowBefore} />
                        <ul>
                            {props.withSearch && <Search3 iconLeft placeholder='Search' searchStr={searchStr} onChange={(value) => filterOptions(value)} />}
                            {filteredOptions &&
                                filteredOptions.map((option) => (
                                    <li key={option.id} onClick={() => onSelect(option)}>
                                        <div className={props.selected?.id === option.id ? [classes.Option, classes.Active].join(' ') : classes.Option}>
                                            {option.icon && <img src={option.icon} loading='lazy' alt={option.label} />}
                                            <span>{option.label}</span>
                                        </div>
                                    </li>
                                ))}
                            {/* {filteredOptions &&
                                filteredOptions.map((option) => {
                                    return (
                                        <li key={option.id} onClick={() => onSelect(option)}>
                                            <div className={props.selected?.id === option.id ? [classes.Option, classes.Active].join(' ') : classes.Option}>
                                                {option.icon && <img src={option.icon} loading='lazy' alt={option.label} />}
                                                <span>{option.label}</span>
                                            </div>
                                        </li>
                                    );
                                })} */}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown4;
