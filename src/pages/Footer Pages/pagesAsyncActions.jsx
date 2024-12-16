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
      dispatch(pagesActions.setPage(response.data.Contents));

    } catch (error) {
      if (!error?.code === "ERR_CANCELED") toast.error(error?.message);
      dispatch(pagesActions.setPage([]));

    }
  };
};

export const contactForm = (form) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      // Make the POST request with the provided form data and configurations
      const response = await axiosApi.post(
        `/ContactRequest/PostFormContact?siteId=${config.VITE_SITE_ID}`,
        form,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
          timeout: 1000,
        }
      );

      // Check response status and throw an error for unsuccessful cases
      const isSuccessful =
        response?.status === 200 && response?.data?.Status?.StatusCode === 200;

      if (!isSuccessful) {
        throw new Error("Unsuccessful response");
      }

      // Show success toast on successful submission
      toast.success(
        "Form successfully submitted! Please await our response by email."
      );
    } catch (error) {
      // Show error toast for failures
      toast.error("Something went wrong. Please try again.");
    }
  };
};
