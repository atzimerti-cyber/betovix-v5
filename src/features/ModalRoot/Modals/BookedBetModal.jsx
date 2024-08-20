import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './BookedBetModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import DsButton from '../../UI/Buttons/DsButton';
import CloseButton from '../../UI/Buttons/CloseButton';
import { betslipActions } from '../../Betslip/betslipSlice';
import { translate } from '../../../utils/translations';

const BookedBetModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const lastBooked = useSelector((state) => state.betslip.lastBooked);

    if( lastBooked === null) {
        navigate(location.pathname)
        return null;
    }

    const ticketData = JSON.parse(JSON.parse(lastBooked.json));

    return (
        <div className={classes.BookedBet}>
            <div className={classes.ModalContent}>
                <header>
                    <span className={classes.Center}>
                        <h1>{translate("Share Booked Bet")}</h1>
                    </span>
                    <span className={classes.Right}>
                        <CloseButton timesIcon color='transparent' onClick={() => navigate(location.pathname)} />
                    </span>
                </header>

                <div className={classes.BookedBetContent}>
                  <div className={classes.BetInfo}>
                        <div className={classes.BetInfoItem}>
                           <i>{translate('Your bet has been booked')}.</i>
                           <h2>* {lastBooked.BookId}  *</h2>
                        </div>
                        <div className={classes.BetInfoItem}>
                            <div>
                                <strong>{translate('BETTING DATE')}</strong>
                            </div>
                            <div>
                                {new Date(lastBooked.date_added).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <table className={classes.EventsTable}>
                        <thead>
                            <tr>
                                <th>{translate('Time')}</th>
                                <th>{translate('Event Date')}</th>
                                <th>{translate('Tournament')}</th>
                                <th>{translate('Event')}</th>
                                <th>{translate('Market')}</th>
                                <th>{translate('Outcome')}</th>
                                <th>{translate('Odd')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketData.points.map((point, index) => (
                                <tr key={index}>
                                    <td>{point.Live ? '-' : new Date(point.DateOfMatch).toLocaleTimeString()}</td>
                                    <td>{point.Live ? '[Live]' : new Date(point.DateOfMatch).toLocaleDateString()}</td>
                                    <td>{point.TournamentName.International}</td>
                                    <td>{point.MatchName}</td>
                                    <td>{point.MarketName.International}</td>
                                    <td>{point.FieldName.International}</td>
                                    <td>{point.Odd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookedBetModal;
