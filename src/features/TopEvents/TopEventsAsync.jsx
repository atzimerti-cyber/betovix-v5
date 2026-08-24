import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { topEventsActions } from "./TopEventsSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

export const getEventsTop = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `Pregame/PostData/?action=coupon&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        { data: `{"providerId":1,"coupon":"top"}` },
        {
          signal: signal,
          baseURLOverride: config.VITE_SPORTS_API_BASE,
        }
      );
      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();

      dispatch(topEventsActions.setTopEvents(response.data.Contents));
    } catch (error) {
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK")
        toast.error(translate(`${error?.message || "An error occurred"}`));
    }
  };
};
