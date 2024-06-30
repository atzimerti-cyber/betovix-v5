import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import DsButton from '../../../features/UI/Buttons/DsButton';
import classes from './DepositFiat.module.css';
import AngleLeft2Icon from '../../../assets/svgs/angle-left2.svg?react';
import { cryptoActions } from '../cryptoSlice';
import { translate } from '../../../utils/translations';

const DepositFiat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const navigateToDeposit = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('method');
        dispatch(cryptoActions.resetCurrency());
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <>
            <div className={classes.ReturnContainer}>
                <div className={classes.ReturnButtonWrapper}>
                    <DsButton color='transparent' onClick={navigateToDeposit}>
                        <AngleLeft2Icon />
                        <span>{translate('Return to Deposit methods')}</span>
                    </DsButton>
                </div>
                <div className={classes.ReturnEquivalent}></div>
            </div>
        </>
    );
};

export default DepositFiat;
