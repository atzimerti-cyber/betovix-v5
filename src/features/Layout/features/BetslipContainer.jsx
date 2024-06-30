import { useDispatch } from 'react-redux';

import classes from './BetslipContainer.module.css';
import { layoutActions } from '../layoutSlice';
import Betslip from '../../Betslip/Betslip';
import { useCallback } from 'react';

const BetslipContainer = () => {
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
        dispatch(layoutActions.setShowRight('betslip'));
        dispatch(layoutActions.setShowRightContainer(false));
    }, []);

    return (
        <div className={classes.BetslipContainer}>
            <Betslip onClose={onClose} />
        </div>
    );
};

export default BetslipContainer;
