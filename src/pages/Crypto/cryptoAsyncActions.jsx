import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { cryptoActions } from './cryptoSlice';

import cryptoPrices from '../../dummyData/cryptoPrices';

export const getCryptoPrices = (signal) => {
    return async (dispatch) => {
        try {
            dispatch(cryptoActions.setCryptoPrices(cryptoPrices));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};

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
