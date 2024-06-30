import { useRef } from 'react';
import { motion } from 'framer-motion';

import classes from './Dropdown3.module.css';
import useClickOutside from '../../../hooks/useClickOutside';
import CaretDown2Icon from '../../../assets/svgs/caret-down2.svg?react';

const Dropdown = (props) => {
    const dropdownRef = useRef();

    useClickOutside(dropdownRef, props.onClickOutside);

    return (
        <motion.div
            ref={dropdownRef}
            className={classes.Dropdown}
            initial={{ scaleX: 0.95, scaleY: 0.95 }}
            animate={{ scaleX: 1, scaleY: 1 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
            <CaretDown2Icon className={classes.Arrow} />

            <ul className={classes.DropdownMenu}>{props.children}</ul>
        </motion.div>
    );
};

export default Dropdown;
