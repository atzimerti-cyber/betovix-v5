import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import AccountSelect from './AccountSelect';
import { betslipActions } from '../../Betslip/betslipSlice';
import LoadBooked from './LoadBooked'; 
import classes from './OperatorView.module.css';
import { translate } from '../../../utils/translations';
import DIcon from '../../../assets/svgs/down-icon.svg?react';


const OperatorView = () => {
    const dispatch = useDispatch();   
    const navigate = useNavigate();
    const location = useLocation();

    const slips = useSelector((state) => state.betslip.slips);
    const betslip = useSelector((state) => state.betslip.betslip);
    const betError = useSelector((state) => state.betslip.betError);
    const selectedAccount = useSelector((state) => state.login.selectedAccount);
    const triggerPlaceBet = useSelector((state) => state.betslip.triggerPlaceBet);
    const showReceiptFor = useSelector((state) => state.betslip.showReceiptFor);
    const placingBetLoading = useSelector((state) => state.betslip.placingBetLoading);

    const [isVisible, setIsVisible] = useState(true);

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);
      
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const toggleView = () => {
        setIsVisible(!isVisible);
    };

    const handleStakeClick = (stakeValue) => {
        dispatch(betslipActions.setTotalStake(stakeValue));
    };

    const handlePlaceAndPrint = () => {
        dispatch(betslipActions.setTriggerPlaceBet(true));
    };

    useEffect(() => {
        if (!placingBetLoading && triggerPlaceBet && showReceiptFor?.type === 'success') {
            addParamsToUrl('ticket-receipt')
            dispatch(betslipActions.setTriggerPlaceBet(false));
        }
    }, [placingBetLoading, showReceiptFor, triggerPlaceBet]);

    const betButton = useMemo(() => {
      if (betError || slips?.length === 0 || !selectedAccount || selectedAccount.RoleId !== 40) 
            return (
                <button
                        className={classes.printTicket}
                        disabled>
                        <span>{translate('Place & print')}</span>
                    </button>
            );
        else {
            return (
                <button
                className={classes.printTicket}
                title="print ticket when placed"
                onClick={handlePlaceAndPrint}>
                <span>{translate('Place & print')}</span>
            </button>
            );
        }
    }, [betError, slips?.length, betslip?.totalStake, selectedAccount]);
    
    return (
        <div className={classes.operatorView}>
            <div className={classes.operatorViewTitle}>
                {translate('Retail View')}
                <span className={classes.expandArrow}>
                    <DIcon onClick={toggleView}/>
                </span>
            </div>
            <div className={`${classes.loadTicketContainer} ${isVisible ? classes.slideDown : classes.slideUp}`}
                >
                <div>
                    <div className={classes.accountSelectWidget}>
                        {<AccountSelect/> }
                    </div>
                    <LoadBooked />
                    {betButton}
                </div>
                { <div className={classes.favStakeDiv}> 
                    <div className={classes.favStakeBox}>
                        {[1, 5, 10, 50, 100, 500, 1000, 1500, 2000, 3000].map(value => (
                            <div className={classes.favInputTypeButton} key={value}>
                                <input className={classes.inputButton} type="button" value={value}  onClick={() => handleStakeClick(value)}/>
                            </div>
                        ))}
                    </div>
                </div> }
            </div>
        </div>
    );
};

export default OperatorView;
