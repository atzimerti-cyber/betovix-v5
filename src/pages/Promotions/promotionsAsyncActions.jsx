import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import config from "../../config";
import { promotionsActions } from "./promotionsSlice";
import { trackEventsActions } from "../TrackEvents/TrackEventsSlice";
import { translate } from "../../utils/translations";

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
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getSiteLinks = (signal, category) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/SiteLinks/GetSiteLinks?siteid=${config.VITE_SITE_ID}&lang=${lang.id}&category=${category}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      // const currentLinks = getState().promotions.siteLinks || [];

      // const categoryIndex = currentLinks.findIndex(
      //   (item) => item.category === category
      // );

      // let updatedLinks = [...currentLinks];

      // if (categoryIndex !== -1) {
      //   updatedLinks[categoryIndex].items = response.data.Contents;
      // } else {
      //   updatedLinks.push({
      //     categoryName: category,
      //     items: response.data.Contents,
      //   });
      // }

      if (category === "ServiceLinks") {
        dispatch(promotionsActions.setServiceLinks(response.data.Contents));
      } else if (category === "MainLinks") {
        dispatch(promotionsActions.setMainLinks(response.data.Contents));
        // } else if (category === "GameLinks") {
        //   dispatch(promotionsActions.setGameLinks(response.data.Contents));
      } else if (category.includes("Game")) {
        dispatch(
          promotionsActions.setGameLinks({
            category,
            contents: response.data.Contents,
          })
        );
      }

      // dispatch(promotionsActions.setSiteLinks(updatedLinks));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};
