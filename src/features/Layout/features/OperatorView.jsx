import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import AccountSelect from './AccountSelect';
import LoadBooked from './LoadBooked'; 
import classes from './OperatorView.module.css';
import { translate } from '../../../utils/translations';

const OperatorView = () => {

    return (
        <div className={classes.operatorView}>
            <div className={classes.operatorViewTitle}>
                {translate('Retail View')}
                <span className={classes.expandArrow}>
                    <i className="glyphicons glyphicons-chevron-down" aria-hidden="true"></i>
                </span>
            </div>
            <div className={classes.loadTicketContainer}>
                <div>
                    <div className={classes.accountSelectWidget}>
                        {/* <AccountSelect/> */}
                    </div>
                    <LoadBooked />
                </div>
                {/* <div>
                    <button className={classes.printTicket} title="print ticket when placed">
                        <i className="glyphicons glyphicons-print" aria-hidden="true"></i>
                        <span>{translate('Place & print')}</span>
                    </button>
                    <div className={classes.favStakeBox}>
                        {[1, 5, 10, 50, 100, 500, 1000, 1500, 2000, 3000].map(value => (
                            <div className={classes.favInputTypeButton} key={value}>
                                <input className={classes.inputButton} type="button" value={value} />
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default OperatorView;
