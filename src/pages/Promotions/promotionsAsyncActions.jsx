import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import config from "../../config";
import { promotionsActions } from "./promotionsSlice";

export const getPromotion = (signal) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Promos/GetPromos?siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      let promotions = response.data.Contents.map((promo) => ({
        id: promo.Id,
        title: promo.Title,
        image: promo.Img,
        link: promo.ImgLink,
        position: promo.Position,
        status: promo.Status,
        type: promo.ProductType,
        content: promo.Content,
      }));

      dispatch(promotionsActions.setPromotions(promotions));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};
