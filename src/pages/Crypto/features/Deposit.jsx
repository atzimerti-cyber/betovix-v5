import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './Deposit.module.css';
import { cryptoActions } from '../cryptoSlice';
import DepositCrypto from './DepositCrypto';
import DepositFiat from './DepositFiat';
import MainButton from '../../../features/UI/Buttons/MainButton';
import { addThousandsSeparator } from '../../../utils/custom';
import allCrypto from '../../../assets/cryptoIcons/all-crypto.svg';
import allCards from '../../../assets/cryptoIcons/all-cards.png';
import { translate } from '../../../utils/translations';

const Deposit = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const crypto = useSelector((state) => state.crypto.crypto);
    //const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);

    const query = new URLSearchParams(location.search);
    const method = query.get('method');

    useEffect(() => {
        return () => dispatch(cryptoActions.setSelectedCurrency(null));
    }, []);

    // const getPrice = (item) => {

    // };

    // const getPrice = (item) => {
    //     if (item.id === 'ERC-20' || item.id === 'BEP-20') {
    //         return '1.00';
    //     }

    //     const price1min = cryptoPrices['1min'][item.id];
    //     const price1min = 0;

    //     return price1min;
    // };

    const navigateToModal = (modal, tab, method) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        searchParams.set('tab', tab);

        if (method) searchParams.set('method', method);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const selectCurrency = (option) => {
        dispatch(cryptoActions.setSelectedCurrency(option));
        const network = option.Code || option.label;
        dispatch(cryptoActions.setSelectedNetwork({ id: option.Id, label: network }));
    };

    const uniqueCrypto = [];
    const names = new Set();

    crypto.forEach((item) => {
        if (!names.has(item.Name)) {
            names.add(item.Name);
            if (item.AllowDeposit) {
                uniqueCrypto.push(item);
            }
        }
    });

    //////////////////////////gk
    // const selectCurrency = (option) => {
    //     dispatch(cryptoActions.setSelectedCurrency(option));
    //     const network = option.network || option.label;
    //     dispatch(cryptoActions.setSelectedNetwork({ id: option.id, label: network }));
    // };

    let elClasses = [classes.PaymentVerticalWrapper];
    if (method === 'crypto') elClasses.push(classes.Crypto);
    else if (method === 'fiat') elClasses.push(classes.Fiat);

    return (
        <div className={elClasses.join(' ')}>
            <div className={classes.PaymentOptionsWrapper}>
                <div className={classes.Grid}>
                    {crypto && (
                        <>
                            {uniqueCrypto.map((item) => {
                                if (item.id === 'BEP-20') return null;

                                return (
                                    <div key={item.Id} className={[classes.PaymentButtonContainer, classes.CryptoCoin].join(' ')}>
                                        {item.available === false && (
                                            <div className={classes.PaymentDisabledOverlay}>
                                                <span>{translate('Temporarily unavailable')}</span>
                                            </div>
                                        )}
                                        <MainButton
                                            color='transparent'
                                            onClick={() => {
                                                selectCurrency(item);
                                                navigateToModal('cashier', 'deposit', 'crypto');
                                            }}
                                            disabled={item.available === false}
                                        >
                                            <img src={item.Logo} loading='lazy' alt={item.Code} />
                                            <h2>{item.Name}</h2>
                                            {item.Rate &&
                                                <h3>€{item.Rate > 0.01 ? addThousandsSeparator(item.Rate) : parseFloat(item.Rate.toFixed(6))}</h3>}
                                        </MainButton>
                                        {/* <MainButton
                                            color='transparent'
                                            onClick={() => {
                                                selectCurrency(item);
                                                navigateToModal('cashier', 'deposit', 'crypto');
                                            }}
                                            disabled={item.available === false}
                                        >
                                            <img src={item.icon} loading='lazy' alt={item.label} />
                                            <h2>{item.label}</h2>
                                            <h3>${getPrice(item) > 0.01 ? addThousandsSeparator(getPrice(item)) : getPrice(item)}</h3>
                                        </MainButton> */}
                                    </div>
                                );
                            })}

                            <div className={classes.PaymentButtonContainer}>
                                <MainButton
                                    color='transparent'
                                    onClick={() => {
                                        dispatch(cryptoActions.setSelectedCurrency(null));
                                        navigateToModal('cashier', 'deposit', 'crypto');
                                    }}
                                >
                                    <img className={classes.AllCrypto} src={allCrypto} loading='lazy' alt='All crypto' />
                                    <h2>{translate('All crypto coins/tokens')}</h2>
                                </MainButton>
                            </div>
                            <div className={classes.PaymentButtonContainer}>
                                <MainButton
                                    color='transparent'
                                    onClick={() => {
                                        dispatch(cryptoActions.setSelectedCurrency(null));
                                        navigateToModal('cashier', 'deposit', 'fiat');
                                    }}
                                >
                                    <img className={classes.AllCrypto} src={allCards} loading='lazy' alt='All crypto' />
                                    <h2>{translate('Fiat for the giftcards')}</h2>
                                </MainButton>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className={classes.DepositCryptoWrapper}>
                <DepositCrypto />
            </div>

            <div className={classes.DepositFiatWrapper}>
                <DepositFiat />
            </div>
        </div>
    );
};

export default Deposit;
