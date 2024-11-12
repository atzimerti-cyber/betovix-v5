import { toast } from "react-toastify";
import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { bannersActions } from "./BannersSlice";
import config from "../../config";

export const getBanners = (signal, device) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `SiteBanner/GetSiteBanners?siteId=${config.VITE_SITE_ID}&lang=${lang.id}`,
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
      let banners = [];
      if (device === "mobile") {
        response.data.Contents.map((banner) => {
          if (banner.Position > 5) {
            banners.push(banner);
          }
        });
      } else if (device === "desktop") {
        response.data.Contents.map((banner) => {
          if (banner.Position < 6) {
            banners.push(banner);
          }
        });
      }
      dispatch(bannersActions.setBanners(banners));
    } catch (error) {
      if (!error?.code === "ERR_CANCELED") toast.error(error?.message);
    }
  };
};
