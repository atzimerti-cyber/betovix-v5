import { useNavigate, useLocation } from 'react-router-dom';

import classes from './OddsFormatModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import DsButton from '../../UI/Buttons/DsButton';
import CloseButton from '../../UI/Buttons/CloseButton';
import { appActions } from '../../InitApp/appSlice';
import { translate } from '../../../utils/translations';

const OddsFormatModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const oddsFormatOptions = useSelector((state) => state.app.oddsFormatOptions);
    const selectedOddsFormat = useSelector((state) => state.app.selectedOddsFormat);

    const updateOddsFormat = (oddsFormat) => {
        if (oddsFormat === selectedOddsFormat) return;

        dispatch(appActions.setOddsFormat(oddsFormat));
        navigate(location.pathname);
    };

    return (
        <div className={classes.OddsFormat}>
            <div className={classes.ModalContent}>
                <header>
                    <span className={classes.Center}>
                        <h1>{translate("Odds Format")}</h1>
                    </span>
                    <span className={classes.Right}>
                        <CloseButton timesIcon color='transparent' onClick={() => navigate(location.pathname)} />
                    </span>
                </header>

                <div className={classes.OddsFormatContent}>
                    {oddsFormatOptions.map((oddsFormat, index) => (
                        <DsButton key={index} active={selectedOddsFormat === oddsFormat} color='transparent' onClick={() => updateOddsFormat(oddsFormat)}>
                            {translate(oddsFormat)}
                        </DsButton>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OddsFormatModal;
