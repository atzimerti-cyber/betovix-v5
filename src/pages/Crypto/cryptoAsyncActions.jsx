import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { cryptoActions } from './cryptoSlice';

export const getCrypto = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {},
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch crypto');

            const crypto = response.data.Contents;
            console.log("All crypto", crypto);
            dispatch(cryptoActions.setCrypto(crypto));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

///////////// NOT USED (FETCHES ALL CRYPTO, NOT JUST PRICES)
// export const getCryptoPrices = (signal) => {
//     return async (dispatch) => {
//         try {
//             const lang = getLang();

//             const response = await axiosApi.post(
//                 `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
//                 {},
//                 {
//                     signal: signal,
//                     baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
//                 }
//             );

//             if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch crypto prices');

//             const cryptoPrices = response.data.Contents;
//             //console.log(cryptoPrices);
//             dispatch(cryptoActions.setCryptoPrices(cryptoPrices));
//         } catch (error) {
//             const message = error?.message ? error.message : error;
//             if (!error?.code === 'ERR_CANCELED') toast.error(message);
//         }
//     };
// };

export const getDepositAddress = (signal) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const coin = state.crypto.selectedCurrency;
            const lang = getLang();

            const response = await axiosApi.post(
                `/Payments/PostData?action=HandlePaymentMethod&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    data: `{ "Name":"${coin.Provider}", "curr": "${coin.Code}" }`,
                },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch Deposit Address');

            const depositAddress = response.data.Contents.WalletAddress;
            const qrImage = response.data.Contents.QrCodeImage;
            //console.log(depositAddress, qrImage);
            dispatch(cryptoActions.setDepositAddress(depositAddress));
            dispatch(cryptoActions.setQRCodeImage(qrImage));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
