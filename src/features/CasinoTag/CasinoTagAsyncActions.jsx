import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { casinoTagActions } from "./CasinoTagSlice";
import config from "../../config";
import { translate } from "../../utils/translations";

export const getCasinoSwiperByTag = (signal, tag) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `MyCasino/GetHomeGames?tags=${tag}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );
      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();

      dispatch(casinoTagActions.setCasinoByTag({ tag, data: response.data }));
    } catch (error) {
      if (!error?.code === "ERR_CANCELED") {
        let toastMessage = translate(`${error?.message}`);
        toast.error(toastMessage);
      }
      dispatch(casinoTagActions.setCasinoByTag([]));
    }
  };
};
