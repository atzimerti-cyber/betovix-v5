import { toast } from 'react-toastify';
import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { bannersActions } from './BannersSlice';
import config from '../../config';
 
export const getBanners = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

           const response = await axiosApi.get(`Pregame/getBanners?providerId=1&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                signal: signal,
                baseURLOverride: config.VITE_SPORTS_API_BASE,
            });

            if ((response.status && response.status !== 200) || (response.data.Status && response.data.Status.StatusCode !== 200)) throw Error();

            dispatch(
                bannersActions.setBanners({
                    BannerEvents: response.data?.BannerEvents,
                    Banners: response.data?.Banners?.filter((d) => d !== null),
                })
            );
        } catch (error) {
            if (!error?.code === 'ERR_CANCELED') toast.error(error?.message);
        }
    };
};

