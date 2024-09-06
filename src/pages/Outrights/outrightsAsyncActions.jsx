import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { sportsbookActions } from '../SportsBook/sportsbookSlice';
import { appActions } from '../../features/InitApp/appSlice';
import { getLang } from '../../utils/storage';
import { outrightsActions } from './outrightsSlice';
import { childsNotExist } from '../../utils/custom';
import config from '../../config';

export const getEvent = (sportId, eventId, signal) => {
    return async (dispatch, getState) => {
        try {
            dispatch(appActions.setBarLoading(true));
            const lang = getLang();

            const requests = [
                axiosApi.post(
                    `Pregame/PostData?action=get_sport_market_tree&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: sportId },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                ),
                axiosApi.post(
                    `Pregame/PostData?action=get_event&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: `{"ProviderId":1,"Value":${eventId},"H24":false}` },
                    {
                        signal: signal,
                        baseURLOverride: config.VITE_SPORTS_API_BASE,
                    }
                ),
            ];
            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();
            });

            const sports = getState().app.allSports;
            dispatch(outrightsActions.setSports(sports));
            const selectedSport = sports.find((s) => s.Id === sportId);
            dispatch(sportsbookActions.setSelectedSport(selectedSport));

            const emptyTree = responses[0].data.Contents === 'Not found' || childsNotExist(responses[0].data.Contents) ? true : false;
            if (emptyTree) {
            } else {
                dispatch(sportsbookActions.setSportMarketTree({ sportId: sportId, value: responses[0].data.Contents }));
            }

            dispatch(outrightsActions.setEvent(responses[1].data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};
