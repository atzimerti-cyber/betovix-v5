import { toast } from 'react-toastify';
import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { casinoNewActions } from './CasinoNewGamesSlice';
import config from '../../config';
 
export const getCasinoNewGames = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/MyCasino/GetNewGames?siteid=${config.VITE_SITE_ID}`,
                {
                    signal: signal,
                    baseURLOverride: config.VITE_CASINO_BASE,
                }
            );
            if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();

           dispatch(casinoNewActions.setCasinoNew(response.data.Contents));
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};

