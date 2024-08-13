import { useNavigate, useLocation } from 'react-router-dom';

import classes from './StatisticsModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import DsButton from '../../UI/Buttons/DsButton';
import CloseButton from '../../UI/Buttons/CloseButton';
import { appActions } from '../../InitApp/appSlice';
import { translate } from '../../../utils/translations';

const StatisticsModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className={classes.Statistics}>
            <div className={classes.ModalContent}>
                <header>
                    <span className={classes.Center}>
                        <h1>{translate("STATS")}</h1>
                    </span>
                    <span className={classes.Right}>
                        <CloseButton timesIcon color='transparent' onClick={() => navigate(location.pathname)} />
                    </span>
                </header>

                <div className={classes.StatisticsContent}>
                    <iframe
                        src={`/stats/Stats.html`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Stats"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatisticsModal;
