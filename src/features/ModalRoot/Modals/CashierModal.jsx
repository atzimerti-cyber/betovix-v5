import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CashierModal.module.css';
import WalletIcon from '../../../assets/svgs/wallet.svg?react';
import ModalHeader from '../features/ModalHeader';
import Tabs from '../../UI/Tabs/Tabs';
import Deposit from '../../../pages/Crypto/features/Deposit';
import Withdraw from '../../../pages/Crypto/features/Withdraw';
//import BuyCrypto from '../../../pages/Crypto/features/BuyCrypto';
import { translate } from '../../../utils/translations';
import { getWallet } from '../../../pages/Crypto/cryptoAsyncActions';

const CashierModal = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState(props.tab);

    const contentInnerClasses = [classes.TabContentInner, classes[`TabContentInner_${selectedTab}`]];

    const changeTab = (tab) => {
        const searchParams = new URLSearchParams();
        searchParams.set('modal', 'cashier');
        searchParams.set('tab', tab);

        setSelectedTab(tab);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getWallet(signal));

        return () => {
            controller.abort();
            // dispatch(cryptoActions.reset());
        };
    }, [])

    return (
        <div className={classes.CashierModal}>
            <ModalHeader icon={<WalletIcon />} title={translate('Wallet')} />

            <div className={classes.TabContainer}>
                <Tabs
                    tabs={[
                        { id: 'deposit', label: translate('Deposit'), active: selectedTab === 'deposit' },
                        { id: 'withdraw', label: translate('Withdraw'), active: selectedTab === 'withdraw' },
                        // { id: 'buy-crypto', label: 'Buy Crypto', active: selectedTab === 'buy-crypto' },
                    ]}
                    onChangeTab={(tab) => changeTab(tab)}
                // onChangeTab={(tab) => setSelectedTab(tab)}
                />
            </div>

            <div className={classes.TabContentHiddenBox}>
                <div className={contentInnerClasses.join(' ')}>
                    <div className={selectedTab === 'deposit' ? [classes.TabContent, classes.Active].join(' ') : classes.TabContent}>
                        {selectedTab === 'deposit' && <Deposit />}
                    </div>
                    <div className={selectedTab === 'withdraw' ? [classes.TabContent, classes.Active].join(' ') : classes.TabContent}>
                        {selectedTab === 'withdraw' && <Withdraw />}
                    </div>
                    {/* <div className={selectedTab === 'buy-crypto' ? [classes.TabContent, classes.Active].join(' ') : classes.TabContent}>
                        {selectedTab === 'buy-crypto' && <BuyCrypto />}
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default CashierModal;
