import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './BetslipControl.module.css';
import AngleDownIcon from '../../../assets/svgs/angle-down.svg?react';
import { betslipActions } from '../betslipSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import { translate } from '../../../utils/translations';
import { getTicketFromStorage, setTicketChangesSettings, setTicketToStorage } from '../../../utils/storage';
import { ticketActions } from '../../Ticket/ticketSlice';
import Switch from '../../UI/Switch/Switch';

const BetslipControl = () => {
    const dispatch = useDispatch();
    const changesDropdownRef = useRef();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const slips = useSelector((state) => state.betslip.slips);
    const ticketChangesSettings = useSelector((state) => state.ticket.ticketChangesSettings);

    const [showChangesDropdown, setShowChangesDropdown] = useState();

    const close = useCallback(() => setShowChangesDropdown(false), []);
    useClickOutside(changesDropdownRef, close);

    const updateSelectedAccept = (property, value) => {
        let updatedAccept = { ...ticketChangesSettings };
        updatedAccept[property] = value;
        dispatch(ticketActions.setTicketChangesSettings(updatedAccept));
        setTicketChangesSettings(updatedAccept);

        setTimeout(() => {
            setShowChangesDropdown(false);
        }, 200);
    };

    const updateBackendAccept = (value) => {
        const boolValue = value === '0' ? false : true;
        const storageTicket = getTicketFromStorage();
        setTicketToStorage({ ...storageTicket, acceptChanges: boolValue });
    };

    const acceptChanges = ticketChangesSettings?.acceptChanges ? 'Accept all odds changes' : 'No odds changes accepted';

    return (
        <div className={slips.length > 0 ? [classes.BetslipControl, classes.Show].join(' ') : classes.BetslipControl}>
            <button className={[classes.ControlButton, classes.RemoveAllButton].join(' ')} onClick={() => dispatch(betslipActions.resetSlips())}>
                {translate('Remove all')}
            </button>

            <div className={classes.Fill}></div>

            <div className={classes.ControlOdds}>
                <button className={classes.ControlButton} onClick={() => setShowChangesDropdown(true)}>
                    {translate(acceptChanges)}
                    <AngleDownIcon />
                </button>

                <AnimatePresence>
                    {showChangesDropdown && (
                        <motion.div
                            ref={changesDropdownRef}
                            className={classes.DropdownWrapper}
                            initial={{ y: -28, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -28, opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={classes.Dropdown}>
                                <div className={classes.DropdownItem} onClick={() => updateSelectedAccept('acceptChanges', true)}>
                                    {translate('Accept all odds changes')}
                                </div>
                                <div className={classes.DropdownItem} onClick={() => updateSelectedAccept('acceptChanges', false)}>
                                    {translate('No odds changes accepted')}
                                </div>

                                <div
                                    className={[classes.DropdownItem, classes.PlacementSwitch].join(' ')}
                                    onClick={() => {
                                        const value = ticketChangesSettings?.oddChanges === '2' ? '0' : '2';
                                        updateSelectedAccept('oddChanges', value);
                                        updateBackendAccept(value);
                                    }}
                                >
                                    <Switch active={ticketChangesSettings?.oddChanges === '2'} label={translate('Accept placement changes')} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BetslipControl;
