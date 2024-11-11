import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { pagesActions } from "./pagesSlice";
import config from "../../config";

export const getPage = (signal, slug) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Pages/GetPageBySlugAndLang?slug=${slug}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
          timeout: 1000,
        }
      );
      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();
      if (slug === "rpg") {
        dispatch(pagesActions.setRpg(response.data.Contents));
      }
    } catch (error) {
      if (!error?.code === "ERR_CANCELED") toast.error(error?.message);
      dispatch(pagesActions.setRpg([]));
    }
  };
};
