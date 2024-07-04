import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { cryptoActions } from './cryptoSlice';

///////////////////
// import cryptoPrices from '../../dummyData/cryptoPrices';
///////////////////

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

////////gk WITH DUMMY DATA
// export const getCryptoPrices = (signal) => {
//     return async (dispatch) => {
//         try {
//             dispatch(cryptoActions.setCryptoPrices(cryptoPrices));
//         } catch (error) {
//             if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
//         }
//     };
// };

export const getDepositAddress = (signal) => {
    return async (dispatch) => {
        try {
            dispatch(cryptoActions.setDepositAddress(''));

            // TODO:
            setTimeout(() => {
                const length = 34;
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                dispatch(cryptoActions.setDepositAddress(result));
            }, 500);
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};
