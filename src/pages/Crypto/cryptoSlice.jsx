import { createSlice } from '@reduxjs/toolkit';

import bnb from '../../assets/cryptoIcons/bnb.svg';
import btc from '../../assets/cryptoIcons/btc.svg';
import xrp from '../../assets/cryptoIcons/xrp.svg';
import trx from '../../assets/cryptoIcons/trx.svg';
import sol from '../../assets/cryptoIcons/sol.svg';
import eth from '../../assets/cryptoIcons/eth.svg';
import ltc from '../../assets/cryptoIcons/ltc.svg';
import ape from '../../assets/cryptoIcons/ape.svg';
import doge from '../../assets/cryptoIcons/doge.svg';
import shib from '../../assets/cryptoIcons/shib.png';
import usdt from '../../assets/cryptoIcons/usdt.svg';

const initialState = {
    crypto: [
        { id: 'ETH', short: 'ETH', icon: eth, label: 'Ethereum', color: '#627EEA80', available: true },
        { id: 'BTC', short: 'BTC', icon: btc, label: 'Bitcoin', color: '#F7931A80', available: true },
        { id: 'LTC', short: 'LTC', icon: ltc, label: 'Litecoin', color: '#52749080', available: true },
        { id: 'DOGE', short: 'DOGE', icon: doge, label: 'Dogecoin', color: '#C2A63380', available: true },
        { id: 'SOL', short: 'SOL', icon: sol, label: 'Solana', color: '#66F9A180', available: false },
        { id: 'XRP', short: 'XRP', icon: xrp, label: 'Ripple', color: '#23292F80', available: true },
        { id: 'ERC-20', short: 'USDT', icon: usdt, label: 'Tether', network: 'ERC-20', color: '#53AE9480', available: true },
        { id: 'BEP-20', short: 'USDT', icon: usdt, label: 'Tether', network: 'BEP-20', color: '#53AE9480', available: true },
        { id: 'BNB', short: 'BNB', icon: bnb, label: 'Binance Coin', color: '#F3BA2F80', available: true },
        { id: 'APE', short: 'APE', icon: ape, label: 'Ape Coin', color: '#0054F980', available: false },
        { id: 'SHIB', short: 'SHIB', icon: shib, label: 'Shiba Inu', color: '#D4374480', available: false },
        { id: 'TRX', short: 'TRX', icon: trx, label: 'Tron', color: '#D4374480', available: true },
    ],
    cryptoPrices: null,
    selectedCurrency: null,
    selectedNetwork: null,
    depositAddress: '',
};

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        reset: (state) => {
            state.selectedCurrency = null;
            state.selectedNetwork = null;
            state.depositAddress = '';
        },
        resetCurrency: (state) => {
            state.selectedCurrency = null;
            state.selectedNetwork = null;
            state.depositAddress = '';
        },

        setCryptoPrices: (state, action) => {
            state.cryptoPrices = action.payload;
        },
        setSelectedCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
        },
        setSelectedNetwork: (state, action) => {
            state.selectedNetwork = action.payload;
        },
        setDepositAddress: (state, action) => {
            state.depositAddress = action.payload;
        },
    },
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;
