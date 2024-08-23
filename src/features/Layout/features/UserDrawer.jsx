import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import classes from './UserDrawer.module.css';
import CloseButton from '../../UI/Buttons/CloseButton';
import MenuItems from './MenuItems';
import { layoutActions } from '../layoutSlice';

import DropdownLang from '../../UI/Dropdown/DropdownLang';

const UserDrawer = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.login.user);

    return (
        <motion.div
            className={classes.UserDrawerMenu}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.2 }}
        >
            <div className={classes.UserDrawerMenuHeader}>
                <h2>{user?.Username}</h2>
                <CloseButton timesIcon onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))} />
            </div>
            <div className={classes.UserDrawerDivider}></div>
            <MenuItems onClick={() => dispatch(layoutActions.setUserDropdownVisible(false))} />
            <div className={classes.LangContainer}>
                <DropdownLang fullLabel/>
            </div>

        </motion.div>
    );
};

export default UserDrawer;
