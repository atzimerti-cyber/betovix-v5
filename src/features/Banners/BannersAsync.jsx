import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { bannersActions } from "./BannersSlice";
import config from "../../config";

import { translate } from "../../utils/translations";

export const getBanners = (signal, device) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `SiteBanner/GetSiteBanners?siteId=${config.VITE_SITE_ID}&lang=${lang.id}&deviceTarget=${device}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (
        (response.status && response.status !== 200) ||
        (response.data.Status && response.data.Status.StatusCode !== 200)
      )
        throw Error();
      const banners = Array.isArray(response.data?.Contents)
        ? response.data.Contents
        : [];
      dispatch(bannersActions.setBanners(banners));
    } catch (error) {
      dispatch(bannersActions.setBanners([]));
      if (error?.code !== "ERR_CANCELED" && error?.code !== "ERR_NETWORK") {
        toast.error(translate(`${error?.message || "An error occurred"}`));
      }
    }
  };
};
