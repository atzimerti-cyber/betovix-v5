import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

import classes from './Dropdown2.module.css';
import useClickOutside from '../../../hooks/useClickOutside';

const Dropdown = (props) => {
    const dropdownRef = useRef();

    const close = useCallback(() => props.onClickOutside(), [props.show]);
    useClickOutside(dropdownRef, close);

    return (
        <motion.div
            ref={dropdownRef}
            className={classes.Dropdown}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.2 }}
        >
            {props.children}
        </motion.div>
    );
};

export default Dropdown;
