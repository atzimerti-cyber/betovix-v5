import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './BetError.module.css';
import Warning2Icon from '../../../assets/svgs/warning2.svg?react';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import { betslipActions } from '../betslipSlice';
import { translate } from '../../../utils/translations';

const BetError = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const slips = useSelector((state) => state.betslip.slips);
    const betType = useSelector((state) => state.betslip.betType);
    const amounts = useSelector((state) => state.betslip.amounts);
    const settings = useSelector((state) => state.app.settings);
    const user = useSelector((state) => state.login.user);
    const ticketChangesSettings = useSelector((state) => state.ticket.ticketChangesSettings);
    const ticketUpdated = useSelector((state) => state.ticket.ticketUpdated);

    const [errorContent, setErrorContent] = useState(null);

    const betErrors = useMemo(() => {
        return {
            minimumStake: (
                <>
                    {translate('The minimum stake is')} <CoinsIcon className={classes.CoinIcon} />
                    0.10
                    <br />
                    {translate('Please adjust your stake')}.
                </>
            ),
            balance: translate('Insufficient balance. Please deposit to place this bet') + '.',
            inactive: (
                <>
                    {translate('Some selections are inactive')}. <br />
                    {translate('Please remove the inactive selections')}.
                </>
            ),
            multiNum: translate('Cannot place a multi bet with a single selection') + '.',
            systemNum: translate('Cannot place a system with a single selection') + '.',
            multiSame: translate('Cannot place a multi bet with selections from the same event') + '.',
            acceptChanges: translate('There are changes in the odds. Please accept the changes') + '.',
        };
    }, []);

    useEffect(() => {
        //TODO: Add wallet amount changing as condition to check again
        let betError = null;
        let lessThanMinStake = false;
        let hasSystemBet = false;
        let totalBet = 0;

        Object.keys(amounts).forEach((key) => {
            totalBet = totalBet + amounts[key];

            if ((betType === 'Single' || betType === 'Multiple') && amounts[key] < settings.minStake) lessThanMinStake = true;
            else if (betType === 'System' && amounts[key] >= settings.minStake) hasSystemBet = true;
        });
        if (betType === 'System') {
            lessThanMinStake = hasSystemBet ? false : true;
        }

        const slipsNoOdds = slips.filter((s) => s.Odd <= 0);
        const slipsWithChanges = slips.filter((s) => s.changed === true);

        const ids = slips.map((slip) => slip.MatchId);
        const uniqueIds = new Set(ids);

        if (slipsNoOdds.length) {
            betError = 'inactive';
        } else if (ticketChangesSettings && ticketChangesSettings.acceptChanges === false && slipsWithChanges.length > 0) {
            betError = 'acceptChanges';
        } else if (betType === 'Multiple' && slips.length === 1) {
            betError = 'multiNum';
        } else if (betType === 'System' && slips.length === 1) {
            betError = 'systemNum';
        } else if (betType === 'Multiple' && ids.length !== uniqueIds.size) {
            betError = 'multiSame';
        } else if (slips.length && lessThanMinStake) {
            betError = 'minimumStake';
        } else if (totalBet > user?.Wallet.Balance) {
            betError = 'balance';
        }

        let ec = null;
        if (betError) ec = betErrors[betError];

        dispatch(betslipActions.setBetError(betError));
        setErrorContent(ec);
    }, [ticketUpdated]);

    return (
        <div className={classes.BetErrorGroup}>
            {errorContent && (
                <div className={classes.BetError}>
                    <div className={classes.BetErrorMessage}>
                        <Warning2Icon />
                        <div className={classes.BetText}>{errorContent}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BetError;
