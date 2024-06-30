import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

import classes from './DepositCrypto.module.css';
import CoinsIcon from '../../../assets/svgs/coins.svg?react';
import AngleLeft2Icon from '../../../assets/svgs/angle-left2.svg?react';
import SpinnerIcon from '../../../assets/svgs/spinner.svg?react';
import DsButton from '../../../features/UI/Buttons/DsButton';
import Dropdown4 from '../../../features/UI/Dropdown/Dropdown4';
import { cryptoActions } from '../cryptoSlice';
import BalanceSeparate from '../../../features/BalanceSeparate/BalanceSeparate';
import CopyToClipboardCont from '../../../features/CopyToClipboard/CopyToClipboardCont';
import { getDepositAddress } from '../cryptoAsyncActions';
import { translate } from '../../../utils/translations';

const DepositCrypto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const selectedCurrency = useSelector((state) => state.crypto.selectedCurrency);
    const selectedNetwork = useSelector((state) => state.crypto.selectedNetwork);
    const crypto = useSelector((state) => state.crypto.crypto);
    const depositAddress = useSelector((state) => state.crypto.depositAddress);
    const user = useSelector((state) => state.login.user);

    const [cryptoOptions, setCryptoOptions] = useState([]);

    const navigateToDeposit = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('method');
        dispatch(cryptoActions.resetCurrency());
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        if (!selectedCurrency) {
            navigateToDeposit();
        }

        return () => dispatch(cryptoActions.resetCurrency());
    }, []);

    useEffect(() => {
        if (!crypto) return;

        const firstOccurrenceMap = {};
        const filteredCryptocurrencies = [];

        crypto.forEach((item) => {
            if (item.network) {
                // Only set the first occurrence for items with 'network'
                if (!firstOccurrenceMap[item.label]) {
                    firstOccurrenceMap[item.label] = item;
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

    useEffect(() => {
        if (!selectedCurrency) return;

        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getDepositAddress(signal));
    }, [selectedCurrency?.label]);

    const getNetworks = (item) => {
        let networks = [];

        crypto.forEach((c) => {
            if (c.label === item.label && c.network) networks.push({ id: c.id, label: c.network });
        });

        return networks;
    };

    const selectCurrency = (option) => {
        dispatch(cryptoActions.setSelectedCurrency(option));
        const network = option.network || option.label;
        dispatch(cryptoActions.setSelectedNetwork({ id: option.id, label: network }));
    };

    return (
        <>
            <div className={classes.ReturnContainer}>
                <div className={classes.ReturnButtonWrapper}>
                    <DsButton color='transparent' onClick={navigateToDeposit}>
                        <AngleLeft2Icon />
                        <span>{translate('Return to Deposit methods')}</span>
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
                        icon={selectedCurrency?.icon}
                        options={cryptoOptions}
                        withSearch
                        onSelect={(option) => selectCurrency(option)}
                        placeholder={translate('Select a Crypto')}
                        selected={selectedCurrency}
                    />

                    <Dropdown4
                        disabled={!selectedCurrency?.network}
                        options={selectedCurrency?.network ? getNetworks(selectedCurrency) : []}
                        onSelect={(network) => dispatch(cryptoActions.setSelectedNetwork(network))}
                        selected={selectedNetwork}
                        placeholder={selectedCurrency ? selectedCurrency.label : translate('Network')}
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
                    {translate('Your')} {selectedCurrency?.short} {translate('deposit address')}
                </label>
                <CopyToClipboardCont text={depositAddress} />
            </div>

            {selectedCurrency && (
                <div className={classes.QrContainer}>
                    <div className={classes.QrWrapper}>
                        {depositAddress ? (
                            <QRCode size={136} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={depositAddress} viewBox={`0 0 136 136`} />
                        ) : (
                            <div className={classes.LoadingAddress}>
                                <SpinnerIcon className={classes.Spinner} />
                            </div>
                        )}
                    </div>
                    <div className={classes.QrInfo}>
                        <h2>
                            {translate('Your')} {selectedCurrency?.short} {translate('deposit address')}
                        </h2>
                        <p>
                            {`${translate('This address accepts only')} ${selectedCurrency?.short}, 
                            ${translate('transferring here any other coin will result in fund loss')}. ${translate('Copy')} ${selectedCurrency?.short} 
                            ${translate('address here')}:`}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepositCrypto;
