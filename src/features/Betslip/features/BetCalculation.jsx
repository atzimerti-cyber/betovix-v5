import { memo } from 'react';
import { useSelector } from 'react-redux';

import classes from './BetCalculation.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import AmountArea from './AmountArea';
import { translate } from '../../../utils/translations';

const BetCalculation = memo(function () {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const betslip = useSelector((state) => state.betslip.betslip);
    const betType = useSelector((state) => state.betslip.betType);
    const slips = useSelector((state) => state.betslip.slips);

    return (
        <div className={classes.BetCalculation}>
            {betType === 'Multiple' && (
                <div className={classes.AmountArea}>
                    <AmountArea amountId={slips.length} />
                </div>
            )}

            <div className={classes.TotalStake}>
                <div className={classes.Label}>{translate('Total Stake')}</div>
                <div className={classes.Value}>
                    <CoinsIcon />
                    <div>{betslip.totalStake}</div>
                </div>
            </div>

            {betslip?.bonusParoliCateg > 0 && (
                <div className={classes.TotalBonus}>
                    <div className={classes.Label}>{`${translate('Bonus')} (${betslip.bonusParoliCateg}%)`}</div>
                    <div className={classes.Value}>
                        <CoinsIcon />
                        <div>{betslip.bonusParoliExtra}</div>
                    </div>
                </div>
            )}

            <div className={classes.TotalPayout}>
                <div className={classes.Label}>{translate('Total Payout')}</div>
                <div className={classes.Value}>
                    <CoinsIcon />
                    <div>{betslip.totalPayout}</div>
                </div>
            </div>
        </div>
    );
});

export default BetCalculation;
