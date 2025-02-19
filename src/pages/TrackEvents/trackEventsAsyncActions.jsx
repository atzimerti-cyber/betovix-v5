import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { trackEventsActions } from "./TrackEventsSlice";
import config from "../../config";
import { useSelector } from "react-redux";

export const getTrackEvent = (signal, gameid, gamename) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `SIS/GetLaunchUrl?gameid=${gameid}&gamename=${gamename}&lang=${lang.id}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error("Failed to fetch event search data");
      }

      dispatch(trackEventsActions.setUrl(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error.toString();
      if (error?.code !== "ERR_CANCELED") {
        toast.error(message);
      }
    }
  };
};
