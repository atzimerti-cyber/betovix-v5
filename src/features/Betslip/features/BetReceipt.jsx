import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './BetReceipt.module.css';
import BetSuccessIcon from '../../../assets/svgs/bet-success.svg?react';
import BetErrorIcon from '../../../assets/svgs/bet-error.svg?react';
import { translate } from '../../../utils/translations';
import { betslipActions } from '../betslipSlice';

const BetReceipt = memo(function () {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const slips = useSelector((state) => state.betslip.slips);
    const showReceiptFor = useSelector((state) => state.betslip.showReceiptFor);

    useSelector(() => {
        if (!slips.length) return;

        dispatch(betslipActions.setShowReceiptFor(null));
    }, [slips.length]);

    const restoreTicket = () => {
        if (!showReceiptFor) return;

        dispatch(betslipActions.setBetType(showReceiptFor.betType));
        dispatch(betslipActions.setSlips(showReceiptFor.slips));
        dispatch(betslipActions.setAmounts(showReceiptFor.amounts));
    };

    return showReceiptFor?.type === 'success' ? (
        <section className={classes.BetReceipt}>
            <BetSuccessIcon className={classes.BetSuccessIcon} />
            <div className={classes.BetSuccessText}>{translate('Bet Successfully Placed')}</div>

            <button className={classes.AddPreviousButton} onClick={restoreTicket}>
                {translate('Add Previous Selection')}
            </button>

            <button className={classes.ShareButton} onClick={() => console.log('SHARE IN CHAT')}>
                {translate('Share in Chat')}
            </button>

            <button className={classes.OkButton} onClick={() => dispatch(betslipActions.setShowReceiptFor(null))}>
                {translate('OK')}
            </button>
        </section>
    ) : (
        // TODO: Change icon. Anything else?
        <section className={classes.BetReceipt}>
            <BetErrorIcon className={classes.BetErrorIcon} />
            <div className={classes.BetSuccessText}>{translate(showReceiptFor?.message)}</div>

            <button className={classes.AddPreviousButton} onClick={restoreTicket}>
                {translate('Retry')}
            </button>

            <button className={classes.OkButton} onClick={() => dispatch(betslipActions.setShowReceiptFor(null))}>
                {translate('OK')}
            </button>
        </section>
    );
});

export default BetReceipt;
