import { toast } from 'react-toastify';
import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { bannersActions } from './BannersSlice';
import config from '../../config';

export const getBanners = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            //    const response = await axiosApi.get(`Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
            const response = await axiosApi.get(`SiteBanner/GetSiteBanners?siteId=${config.VITE_SITE_ID}&lang=${lang.id}`, {
                signal: signal,
                baseURLOverride: config.VITE_WALLET_API_BASE,
            });

            if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();

            dispatch(bannersActions.setBanners(response.data.Contents));

        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
    //test
    //test
};

