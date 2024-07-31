import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { profileActions } from './profileSlice';

export const getOverview = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    // data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
                    data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`,
                },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }
            );

            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(profileActions.setTopGames(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
