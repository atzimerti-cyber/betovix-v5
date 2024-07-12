import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './WithdrawCrypto.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import AngleLeft2Icon from '../../../assets/svgs/angle-left2.svg?react';
import DsButton from '../../../features/UI/Buttons/DsButton';
import MainButton from '../../../features/UI/Buttons/MainButton';
import Dropdown4 from '../../../features/UI/Dropdown/Dropdown4';
import { cryptoActions } from '../cryptoSlice';
import BalanceSeparate from '../../../features/BalanceSeparate/BalanceSeparate';
import MainInput2 from '../../../features/UI/Inputs/MainInput2';
import { addThousandsSeparator } from '../../../utils/custom';
import { translate } from '../../../utils/translations';

const WithdrawCrypto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const selectedCurrency = useSelector((state) => state.crypto.selectedCurrency);
    const selectedNetwork = useSelector((state) => state.crypto.selectedNetwork);
    const crypto = useSelector((state) => state.crypto.crypto);
    // const cryptoPrices = useSelector((state) => state.crypto.cryptoPrices);
    const user = useSelector((state) => state.login.user);

    const [cryptoOptions, setCryptoOptions] = useState([]);
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [coinsBalance, setCoinsBalance] = useState('0.00');
    const [cryptoBalance, setCryptoBalance] = useState('0.00000000');

    const navigateToWithdraw = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('method');
        dispatch(cryptoActions.resetCurrency());
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        if (!selectedCurrency) {
            navigateToWithdraw();
        }

        return () => dispatch(cryptoActions.resetCurrency());
    }, []);

    useEffect(() => {
        if (!crypto) return;

        const firstOccurrenceMap = {};
        const filteredCryptocurrencies = [];

        crypto.forEach((item) => {
            if (item.Code) {
                // Only set the first occurrence for items with 'network'
                if (!firstOccurrenceMap[item.Name]) {
                    firstOccurrenceMap[item.Name] = item;
                }
            } else {
                // Immediately include items without 'network'
                filteredCryptocurrencies.push(item);
            }
        });

        // Add the first occurrences from the map to the filtered list
        Object.values(firstOccurrenceMap).forEach((item) => {
            filteredCryptocurrencies.push(item);
        });

        setCryptoOptions(filteredCryptocurrencies);
    }, [crypto]);

    //////////////////gk
    // useEffect(() => {
    //     if (!crypto) return;

    //     const firstOccurrenceMap = {};
    //     const filteredCryptocurrencies = [];

    //     crypto.forEach((item) => {
    //         if (item.network) {
    //             // Only set the first occurrence for items with 'network'
    //             if (!firstOccurrenceMap[item.label]) {
    //                 firstOccurrenceMap[item.label] = item;
    //             }
    //         } else {
    //             // Immediately include items without 'network'
    //             filteredCryptocurrencies.push(item);
    //         }
    //     });

    //     // Add the first occurrences from the map to the filtered list
    //     Object.values(firstOccurrenceMap).forEach((item) => {
    //         filteredCryptocurrencies.push(item);
    //     });

    //     setCryptoOptions(filteredCryptocurrencies);
    // }, [crypto]);

    useEffect(() => {
        setCoinsBalance('0.00');
        setCryptoBalance('0.00000000');
    }, [selectedCurrency?.label]);


    const getNetworks = (item) => {
        let networks = [];

        crypto.forEach((c) => {
            if (c.Name === item.Name && c.Code) networks.push({ id: c.Id, label: c.Code });
        });

        return networks;
    };

    //////////gk
    // const getNetworks = (item) => {
    //     let networks = [];

    //     crypto.forEach((c) => {
    //         if (c.label === item.label && c.network) networks.push({ id: c.id, label: c.network });
    //     });

    //     return networks;
    // };

    const selectCurrency = (option) => {
        dispatch(cryptoActions.setSelectedCurrency(option));
        const network = option.Code || option.label;
        dispatch(cryptoActions.setSelectedNetwork({ id: option.id, label: network }));
    };

    const updateBalance = (type, value) => {
        //const valueNum = parseFloat(value);
        let valueNum;
        if (isNaN(value)) {
            valueNum = 0;
        } else {
            valueNum = value;
        }
        // if (value > balance) {
        //     return
        // } else {
        //     valueNum = value;
        // }

        // if (valueNum <= 0 || isNaN(valueNum) || valueNum < 0.01 ) return;

        if (!selectedCurrency) {
            setCoinsBalance('0.00');
            setCryptoBalance('0.00000000');
            return;
        }

        let coinsValue;
        let cryptoValue;
        const foundPrice = selectedCurrency.Rate;

        if (selectedCurrency.Code.startsWith('USDT')) {
            coinsValue = valueNum;
            cryptoValue = valueNum;
        } else {
            if (type === 'coins') {
                coinsValue = valueNum;
                cryptoValue = valueNum / foundPrice;
            } else {
                cryptoValue = valueNum;
                coinsValue = foundPrice * valueNum;
            }
        }

        // if (selectedCurrency.short === 'USDT') {
        //     coinsValue = valueNum;
        //     cryptoValue = valueNum;
        // } else {
        //     const foundPrice = cryptoPrices['1min'][selectedCurrency.id];

        //     if (type === 'coins') {
        //         coinsValue = valueNum;
        //         cryptoValue = valueNum / foundPrice;
        //     } else {
        //         cryptoValue = valueNum;
        //         coinsValue = foundPrice * valueNum;
        //     }
        // }

        setCoinsBalance(coinsValue);
        setCryptoBalance(cryptoValue);

        // setCoinsBalance(coinsValue.toFixed(2));
        // setCryptoBalance(cryptoValue.toFixed(8));
    };

    const handleAmountBlur = () => {
        const addThousandsSeparator = (number, decimals = 2) => {
            if (typeof number === 'number') {
                number = number.toFixed(decimals);
            }
            const parts = number.split('.');
            const integerPart = parts[0];
            const decimalPart = parts.length > 1 ? parts[1] : '';

            const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
        };

        setCoinsBalance(addThousandsSeparator(coinsBalance));
        setCryptoBalance(addThousandsSeparator(cryptoBalance, 18));
    };

    //For Dropdown4
    const formattedSelectedCurrency = selectedCurrency ? { label: selectedCurrency.Name, ...selectedCurrency } : null;
    const formattedCryptoOptions = cryptoOptions.map(option => ({ label: option.Name, ...option }));

    return (
        <>
            <div className={classes.ReturnContainer}>
                <div className={classes.ReturnButtonWrapper}>
                    <DsButton color='transparent' onClick={navigateToWithdraw}>
                        <AngleLeft2Icon />
                        <span>{translate('Return to Withdraw methods')}</span>
                    </DsButton>
                </div>
                <div className={classes.ReturnEquivalent}>
                    <span>$1.00 =&nbsp;</span>
                    <CoinsIcon />
                    <span>1.00</span>
                </div>
            </div>

            <div className={classes.DropdownContainer}>
                <div className={classes.CurrenciesContainer}>
                    <p>{translate('Currency')}</p>
                    <p>{translate('Network')}</p>
                </div>
                <div className={classes.Dropdown}>
                    <Dropdown4
                        icon={selectedCurrency?.Logo}
                        options={formattedCryptoOptions}
                        withSearch
                        onSelect={(option) => selectCurrency(option)}
                        selected={formattedSelectedCurrency}
                        placeholder={selectedCurrency ? selectedCurrency.Name : translate('Select a Crypto')}

                    // icon={selectedCurrency?.icon}
                    // options={cryptoOptions}
                    // withSearch
                    // onSelect={(option) => selectCurrency(option)}
                    // placeholder={translate('Select a Crypto')}
                    // selected={selectedCurrency}
                    />

                    <Dropdown4
                        options={selectedCurrency?.Code ? getNetworks(selectedCurrency) : []}
                        onSelect={(network) => dispatch(cryptoActions.setSelectedNetwork(network))}
                        selected={selectedNetwork}
                        placeholder={selectedNetwork ? selectedNetwork.label : translate('Select Network')}

                    // disabled={!selectedCurrency?.network}
                    // options={selectedCurrency?.network ? getNetworks(selectedCurrency) : []}
                    // onSelect={(network) => dispatch(cryptoActions.setSelectedNetwork(network))}
                    // selected={selectedNetwork}
                    // placeholder={selectedCurrency ? selectedCurrency.label : translate('Network')}
                    />
                </div>
            </div>

            <div className={classes.BalanceContainer}>
                <div>
                    <CoinsIcon />
                    <BalanceSeparate balance={user ? user.Wallet.Balance : 0} />
                </div>
                <h4>{translate('Your Balance')}</h4>
            </div>

            <div className={classes.BtcAddressContainer}>
                <label>
                    {translate('Your')} {selectedCurrency?.Name} {translate('withdraw address')}
                </label>
                <MainInput2 type='text' name='Widthdraw address' value={withdrawAddress} onChange={(value) => setWithdrawAddress(value)} />
            </div>

            <div className={classes.WithdrawComparisonContainer}>
                <div className={classes.CoinsContainer}>
                    <MainInput2
                        type='text'
                        name='Balance compared to withdraw crypto'
                        value={coinsBalance}
                        onChange={(value) => updateBalance('coins', value)}
                        textPosition='right'
                        onBlur={() => handleAmountBlur()}
                    />
                    <CoinsIcon />
                </div>

                <span>=</span>

                <div className={classes.CoinsContainer}>
                    <MainInput2
                        type='text'
                        name='Crypto Value compared to withdraw balance'
                        value={cryptoBalance}
                        onChange={(value) => updateBalance('crypto', value)}
                        textPosition='right'
                        onBlur={() => handleAmountBlur()}
                    />
                    {selectedCurrency ? (
                        <img src={selectedCurrency.Logo} loading='lazy' alt={selectedCurrency.Code} />
                    ) : (
                        <div className={classes.CryptoContainerLoader}></div>
                    )}
                </div>
            </div>

            <div className={classes.ButtonWrapper}>
                <MainButton color='primary' disabled={!selectedCurrency || withdrawAddress === '' || coinsBalance > user.Wallet.Balance || coinsBalance == 0 || !selectedNetwork}>
                    {translate('Submit Withdrawal')}
                </MainButton>
            </div>


            {selectedCurrency && <div className={classes.WithdrawAdditionalInfo}>{translate('Min. withdrawal = $50, Estimated fees:')}</div>}
        </>
    );
};

export default WithdrawCrypto;
