import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BetslipEmptyIcon from '../../../assets/svgs/betslip-empty.svg?react';
import TopEventsIcon from '../../../assets/svgs/top-events.svg?react';
import classes from './Empty.module.css';
import { translate } from '../../../utils/translations';

const Empty = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const showReceiptFor = useSelector((state) => state.betslip.showReceiptFor);

    let isInSports = false;
    if (location.pathname.includes('sportsbook') || location.pathname.includes('event')) {
        isInSports = true;
    }

    let elClasses = [classes.Empty];
    if (isInSports) elClasses.push(classes.Disabled);
    if (showReceiptFor) elClasses.push(classes.ShowingReceipt);

    return (
        <div className={elClasses.join(' ')} onClick={isInSports ? null : () => navigate('/sportsbook/home/football')}>
            <BetslipEmptyIcon />
            <div className={classes.EmptyTitle}>{translate('Betslip is empty')}</div>
            {isInSports ? (
                <div className={classes.EmptyText}>{translate('Please add a selection to place a bet')}</div>
            ) : (
                <div className={classes.EmptyText}>
                    <div className={classes.EmptytextContainer}>
                    {translate('Go to')} 
                        <div className={classes.GotoSports}>
                            <TopEventsIcon />
                            {translate('Sports')} 
                        </div>
                        {translate('for wide market selections')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Empty;
