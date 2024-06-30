import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import classes from './TournamentSort.module.css';
import Dropdown2 from '../../../features/UI/Dropdown/Dropdown2';
import SortIcon from '../../../assets/svgs/sort.svg?react';
import MenuButton from '../../../features/UI/Buttons/MenuButton';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import { sportsbookActions } from '../sportsbookSlice';
import { translate } from '../../../utils/translations';

const TournamentSort = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const tournamentSort = useSelector((state) => state.sportsbook.tournamentSort);

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={showDropdown ? [classes.DropdownWrapper, classes.Show].join(' ') : classes.DropdownWrapper}>
            <MenuButton color='transparent' onClick={() => setShowDropdown(!showDropdown)}>
                <SortIcon />
                <span>{tournamentSort}</span>
                <AngleDownIcon />
            </MenuButton>

            <AnimatePresence>
                {showDropdown && (
                    <Dropdown2 onClickOutside={() => setShowDropdown(false)}>
                        <div className={classes.DropdownMenu}>
                            <div
                                className={tournamentSort === 'Default Sort' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentSort('Default Sort'));
                                    setShowDropdown(false);
                                }}
                            >
                                {translate('Default Sort')}
                            </div>
                            <div
                                className={tournamentSort === 'A - Z' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentSort('A - Z'));
                                    setShowDropdown(false);
                                }}
                            >
                                {translate('A - Z')}
                            </div>
                            <div
                                className={tournamentSort === 'Z - A' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentSort('Z - A'));
                                    setShowDropdown(false);
                                }}
                            >
                                {translate('Z - A')}
                            </div>
                        </div>
                    </Dropdown2>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TournamentSort;
