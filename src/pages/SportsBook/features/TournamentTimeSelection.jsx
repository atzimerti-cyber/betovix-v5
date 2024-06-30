import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence } from 'framer-motion';

import classes from './TournamentTimeSelection.module.css';
import Dropdown2 from '../../../features/UI/Dropdown/Dropdown2';
import FilterIcon from '../../../assets/svgs/filter.svg?react';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import MenuButton from '../../../features/UI/Buttons/MenuButton';
import { sportsbookActions } from '../sportsbookSlice';
import { translate } from '../../../utils/translations';

const TournamentTimeSelection = () => {
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return isMobile ? (
        <div className={showDropdown ? [classes.DropdownWrapper, classes.Show].join(' ') : classes.DropdownWrapper}>
            <MenuButton color='transparent' onClick={() => setShowDropdown(!showDropdown)}>
                <FilterIcon />
                <span>{translate(tournamentTimeFilter)}</span>
                <AngleDownIcon />
            </MenuButton>

            <AnimatePresence>
                {showDropdown && (
                    <Dropdown2 onClickOutside={() => setShowDropdown(false)}>
                        <div className={classes.DropdownMenu}>
                            <div
                                className={tournamentTimeFilter === 'All' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('All'));
                                    setShowDropdown(false);
                                }}
                            >
                                {translate('All')}
                            </div>
                            <div
                                className={tournamentTimeFilter === '3H' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('3H'));
                                    setShowDropdown(false);
                                }}
                                disabled={selectedSport?.Counters && selectedSport?.Counters['3H'] === 0}
                            >
                                {translate('Next 3 Hours')}
                            </div>
                            <div
                                className={tournamentTimeFilter === '6H' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('6H'));
                                    setShowDropdown(false);
                                }}
                                disabled={selectedSport?.Counters && selectedSport?.Counters['6H'] === 0}
                            >
                                {translate('Next 6 Hours')}
                            </div>
                            <div
                                className={tournamentTimeFilter === '9H' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('9H'));
                                    setShowDropdown(false);
                                }}
                                disabled={selectedSport?.Counters && selectedSport?.Counters['9H'] === 0}
                            >
                                {translate('Next 9 Hours')}
                            </div>
                            <div
                                className={tournamentTimeFilter === '12H' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('12H'));
                                    setShowDropdown(false);
                                }}
                                disabled={selectedSport?.Counters && selectedSport?.Counters['12H'] === 0}
                            >
                                {translate('Next 12 Hours')}
                            </div>
                            <div
                                className={tournamentTimeFilter === '24H' ? [classes.DropdownItem, classes.Active].join(' ') : classes.DropdownItem}
                                onClick={() => {
                                    dispatch(sportsbookActions.setTournamentTimeFilter('24H'));
                                    setShowDropdown(false);
                                }}
                                disabled={selectedSport?.Counters && selectedSport?.Counters['24H'] === 0}
                            >
                                {translate('Next 24 Hours')}
                            </div>
                        </div>
                    </Dropdown2>
                )}
            </AnimatePresence>
        </div>
    ) : (
        <div className={classes.TournamentTimeSelection}>
            <button
                className={tournamentTimeFilter === 'All' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('All'))}
            >
                <span>{translate('All')}</span>
            </button>
            <button
                className={tournamentTimeFilter === '3H' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('3H'))}
                disabled={selectedSport?.Counters && selectedSport?.Counters['3H'] === 0}
            >
                <span>{translate('3h')}</span>
            </button>
            <button
                className={tournamentTimeFilter === '6H' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('6H'))}
                disabled={selectedSport?.Counters && selectedSport?.Counters['6H'] === 0}
            >
                <span>{translate('6h')}</span>
            </button>
            <button
                className={tournamentTimeFilter === '9H' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('9H'))}
                disabled={selectedSport?.Counters && selectedSport?.Counters['9H'] === 0}
            >
                <span>{translate('9h')}</span>
            </button>
            <button
                className={tournamentTimeFilter === '12H' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('12H'))}
                disabled={selectedSport?.Counters && selectedSport?.Counters['12H'] === 0}
            >
                <span>{translate('12h')}</span>
            </button>
            <button
                className={tournamentTimeFilter === '24H' ? [classes.TimeSelectionButton, classes.Active].join(' ') : classes.TimeSelectionButton}
                onClick={() => dispatch(sportsbookActions.setTournamentTimeFilter('24H'))}
                disabled={selectedSport?.Counters && selectedSport?.Counters['24H'] === 0}
            >
                <span>{translate('24h')}</span>
            </button>
        </div>
    );
};

export default TournamentTimeSelection;
