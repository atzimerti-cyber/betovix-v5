import { useRef, useCallback } from 'react';

import classes from './Dropdown.module.css';
import useClickOutside from '../../../hooks/useClickOutside';
import ArrowIcon from '../../../assets/svgs/arrow.svg?react';

const Dropdown = (props) => {
    const dropdownRef = useRef();

    const close = useCallback(() => props.onClickOutside(), [props.show]);
    useClickOutside(dropdownRef, close);

    return (
        <div ref={dropdownRef} className={props.show ? [classes.Dropdown, classes.Visible].join(' ') : classes.Dropdown}>
            <ArrowIcon className={classes.ArrowIcon} />
            {props.children}
        </div>
    );
};

export default Dropdown;
