import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Systems.module.css';
import { getTicketFromStorage } from '../../../utils/storage';
import { translate } from '../../../utils/translations';
import AmountArea from './AmountArea';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { betslipActions } from '../betslipSlice';

const Systems = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang);
    const slips = useSelector((state) => state.betslip.slips);
    const ticketUpdated = useSelector((state) => state.ticket.ticketUpdated);
    const amounts = useSelector((state) => state.betslip.amounts);

    const [systemsArr, setSystemsArr] = useState([]);

    useEffect(() => {
        if (slips.length < 2) {
            setSystemsArr([]);
            return;
        }

        const storageTicket = getTicketFromStorage();
        if (!storageTicket) return;
        if (!storageTicket.systems) return;

        let updatedSystems = [];
        Object.keys(storageTicket.systems).forEach((key) => {
            updatedSystems.push({
                type: key,
                combinations: storageTicket.systems[key],
                amount: 0,
            });
        });

        setSystemsArr(updatedSystems);
    }, [ticketUpdated]);

    const onCheckChange = (system) => {
        if (amounts[system.type] && amounts[system.type] > 0) dispatch(betslipActions.updateAmount({ key: system.type, value: 0 }));
        else dispatch(betslipActions.updateAmount({ key: system.type, value: 1 }));
    };

    return (
        <div className={classes.Systems}>
            {systemsArr.length > 0 && (
                <div className={classes.Header}>
                    <span>{translate('Type')}</span>
                    <span>{translate('Combinations')}</span>
                    <span>{translate('Amount')}</span>
                </div>
            )}

            {systemsArr.map((system) => (
                <div key={system.type} className={classes.SystemRow}>
                    <div className={classes.CheckboxWrapper}>
                        <Checkbox
                            label={`${translate('Multiple')} ${system.type}`}
                            name={`System ${system.type}`}
                            checked={amounts[system.type] && amounts[system.type] > 0}
                            onChange={() => onCheckChange(system)}
                        />
                    </div>

                    <span>{system.combinations}</span>
                    <div>
                        <AmountArea amountId={system.type} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Systems;
