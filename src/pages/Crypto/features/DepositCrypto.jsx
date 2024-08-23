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
    const qrImage = useSelector((state) => state.crypto.qrCodeImage);
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

    useEffect(() => {
        if (!selectedCurrency) return;

        //console.log("Selected Currency:", selectedCurrency);
        //console.log("Selected Network:", selectedNetwork);

        const controller = new AbortController();
        const signal = controller.signal;

        if (selectedNetwork) {
            dispatch(getDepositAddress(signal));
        }

    }, [selectedCurrency?.Id, selectedNetwork]);

    const getNetworks = (item) => {
        let networks = [];

        crypto.forEach((c) => {
            if (c.Name === item.Name && c.Code) networks.push({ id: c.Id, label: c.Code });
        });

        return networks;
    };

    const selectCurrency = (option) => {
        dispatch(cryptoActions.setSelectedCurrency(option));
        const network = option.Code || option.label;
        dispatch(cryptoActions.setSelectedNetwork({ id: option.Id, label: network }));
    };

    //For Dropdown4
    const formattedSelectedCurrency = selectedCurrency ? { label: selectedCurrency.Name, ...selectedCurrency } : null;
    const formattedCryptoOptions = cryptoOptions.map(option => ({ label: option.Name, ...option }));

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
                        icon={selectedCurrency?.Logo}
                        options={formattedCryptoOptions}
                        // options={cryptoOptions}
                        withSearch
                        onSelect={(option) => selectCurrency(option)}
                        selected={formattedSelectedCurrency}
                        // selected={selectedCurrency}
                        // placeholder={translate('Select a Crypto')}
                        placeholder={selectedCurrency ? selectedCurrency.Name : translate('Select a Crypto')}
                    // placeholder={translate('Select a Crypto')}

                    />

                    <Dropdown4
                        // disabled={!selectedCurrency?.network}
                        // options={selectedCurrency?.network ? getNetworks(selectedCurrency) : []}
                        options={selectedCurrency?.Code ? getNetworks(selectedCurrency) : []}
                        onSelect={(network) => dispatch(cryptoActions.setSelectedNetwork(network))}
                        selected={selectedNetwork}
                        placeholder={selectedNetwork ? selectedNetwork : translate('Select Network')}
                    // placeholder={selectedCurrency ? selectedCurrency.Code : translate('Network')}
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
                <label htmlFor='container'>
                    {translate('Your')} {selectedCurrency?.Name} {translate('deposit address')}
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
                            {`${translate('This address accepts only')} ${selectedCurrency?.Name}, 
                            ${translate('transferring here any other coin will result in fund loss')}. ${translate('Copy')} ${selectedCurrency?.Name} 
                            ${translate('address here')}:`}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepositCrypto;
