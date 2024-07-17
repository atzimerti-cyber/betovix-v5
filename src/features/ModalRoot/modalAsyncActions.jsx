import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { getLang } from '../../utils/storage';
import { modalActions } from './modalSlice';

import levels from '../../dummyData/levels';
import rewards from '../../dummyData/rewards';

export const getBonuses = (signal, status) => {
    return async (dispatch) => {
        try {
           
            dispatch(modalActions.setLoading(true));
            const response = await axiosApi.get(
                `/BonusForAccount/GetMyBonusesByStatus?status=${status}&lang=en&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.data.Status.StatusCode !== 200) throw new Error('Failed to fetch bonuses');
            dispatch(modalActions.setBonuses(response.data.Contents)); 
            dispatch(modalActions.setLoading(false));
        } catch (error) {
            const message = error?.message || 'Error fetching bonuses';
            if (error?.code !== 'ERR_CANCELED') toast.error(message);
            dispatch(modalActions.setLoading(false));
        }
    };
};

export const claimBonus = (signal,bonusId, callback) => {
    return async (dispatch) => {
        try {
            dispatch(modalActions.setLoading(true));
            const response = await axiosApi.get(
                `/BonusForAccount/ClaimBonus?bonusFaId=${bonusId}&lang=en&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.data.Status.StatusCode !== 200) throw new Error('Failed to claim bonus');
            dispatch(modalActions.setLoading(false));

            toast.success('Bonus claimed successfully!');
            if (callback) callback();
        } catch (error) {
            const message = error?.message || 'Error claiming bonus';
            if (error?.code !== 'ERR_CANCELED') toast.error(message);

            dispatch(modalActions.setLoading(false));
        }
    };
};
export const getVip = (signal) => {
    return async (dispatch) => {
        try {
            dispatch(modalActions.setLoading(true));
            // const lang = getLang();

            // const response = await axiosApi.post(
            //     `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
            //     {
            //         data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
            //     },
            //     {
            //         signal: signal,
            //         baseURLOverride: import.meta.env.VITE_CASINO_BASE,
            //     }
            // );

            // if (response.data.Status.StatusCode !== 200) throw Error();

            // dispatch(modalActions.setLevels(response.data.Contents));

            dispatch(modalActions.setLevels(levels));
            dispatch(modalActions.setRewards(rewards));
            dispatch(modalActions.setLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(modalActions.setLoading(false));
        }
    };
};
