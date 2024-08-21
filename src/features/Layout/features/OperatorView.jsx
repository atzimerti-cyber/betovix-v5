import AccountSelect from './AccountSelect';
import LoadBooked from './LoadBooked'; 
import classes from './OperatorView.module.css';
import { translate } from '../../../utils/translations';
import DIcon from '../../../assets/svgs/down-icon.svg?react';


const OperatorView = () => {

    return (
        <div className={classes.operatorView}>
            <div className={classes.operatorViewTitle}>
                {translate('Retail View')}
                <span className={classes.expandArrow}>
                    <DIcon/>
                </span>
            </div>
            <div className={classes.loadTicketContainer}>
                <div>
                    <div className={classes.accountSelectWidget}>
                        {<AccountSelect/> }
                    </div>
                    <LoadBooked />
                    <button className={classes.printTicket} title="print ticket when placed">
                        <span>{translate('Place & print')}</span>
                    </button>
                </div>
                { <div>
                    <div className={classes.favStakeBox}>
                        {[1, 5, 10, 50, 100, 500, 1000, 1500, 2000, 3000].map(value => (
                            <div className={classes.favInputTypeButton} key={value}>
                                <input className={classes.inputButton} type="button" value={value} />
                            </div>
                        ))}
                    </div>
                </div> }
            </div>
        </div>
    );
};

export default OperatorView;
