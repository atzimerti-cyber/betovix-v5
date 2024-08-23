import classes from './TicketReceiptModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseButton from '../../UI/Buttons/CloseButton';
import { translate } from '../../../utils/translations';

const TicketReceipt = () => {
    const navigate = useNavigate();
    const receipt = useSelector((state) => state.betslip.showReceiptFor);

    return (
        <div className={classes.TicketReceipt}>
            <div className={classes.ModalContent}>
                <header>
                    <span className={classes.Center}>
                        <h1>{translate("Ticket Receipt")}</h1>
                    </span>
                    <span className={classes.Right}>
                        <CloseButton timesIcon color='transparent' onClick={() => navigate(location.pathname)} />
                    </span>
                </header>

                <div className={classes.TicketReceiptContent}>
                </div>
            </div>
        </div>
    );
};

export default TicketReceipt;
