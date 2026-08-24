import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import { profileActions } from "./profileSlice";
import config from "../../config";
import { translate } from "../../utils/translations";
import { loginActions } from "../Login/loginSlice";

export const getOverview = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(profileActions.setTopGames(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const subscribeToEmails = (signal, state) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Permission/SaveAllowPromo?allow=${state}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_UPLOAD,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(
          translate("Something went wrong. Please try again later")
        );
      }

      if (state === true) {
        dispatch(profileActions.setMarketingEmails(true));
      } else {
        dispatch(profileActions.setMarketingEmails(false));
      }
    } catch (error) {
      const message = translate("Error occurred");
      toast.error(translate(message));
    }
  };
};

export const getHeroes = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(`/Gamification/GetAllHeroes`, {
        signal: signal,
        baseURLOverride: config.VITE_WALLET_STORETUBE,
      });

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      const heroes = response.data.Contents;
      console.log("All Heroes:", heroes);
      dispatch(profileActions.setHeroes(heroes));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getLevels = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=GetPaymentMethods&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"Id":""}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch heroes");

      const levels = response.data.Contents;
      console.log("All Levels:", levels);
      dispatch(profileActions.setHeroes(levels));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const changePassword = (signal, payload) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/MyAffiliate/ChangePassword?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          OldPass: payload.OldPass,
          Password: payload.Password,
          RePassword: payload.RePassword,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to change password");
    } catch (error) {
      const message = error?.message ? error.message : error;
      toast.error(translate(message));
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const changeUsername = (signal, oldUsername, newUsername, password) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const payload = {
        OldUsername: `${oldUsername}`,
        NewUsername: `${newUsername}`,
        Password: `${password}`,
        SiteId: config.VITE_SITE_ID,
      };

      const response = await axiosApi.post(
        `/MyAccount/ChangeUsername`,
        payload,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Status.Message || response.data.Contents);
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: translate(message) };
    }
  };
};


const KYC_STATUS = {
  NOT_STARTED: 0,
  PENDING: 1,
  REJECTED: 2,
  VERIFIED: 3,
};

const toUiKycStatus = (status) => {
  if (!status || ["Missing", "NotStarted", "Draft"].includes(status)) return KYC_STATUS.NOT_STARTED;
  if (["Uploaded", "Submitted", "UnderReview"].includes(status)) return KYC_STATUS.PENDING;
  if (["Rejected", "ResubmissionRequired", "Expired"].includes(status)) return KYC_STATUS.REJECTED;
  if (status === "Approved") return KYC_STATUS.VERIFIED;
  return KYC_STATUS.NOT_STARTED;
};

const findRequirement = (state, key) =>
  (state?.requirements || []).find((item) => item?.requirementKey === key) || null;

const findDocument = (state, documentType) => {
  const source = state?.documents?.length ? state.documents : state?.requirements || [];
  return source.find(
    (item) => item?.documentType === documentType || item?.requirementKey === documentType
  ) || null;
};

const getIdUiStatus = (state) => {
  const front = findDocument(state, "IdentityDocumentFront")?.status || "Missing";
  const back = findDocument(state, "IdentityDocumentBack")?.status || "Missing";
  if (front === "Approved" && back === "Approved") return KYC_STATUS.VERIFIED;
  if ([front, back].some((v) => ["Rejected", "ResubmissionRequired", "Expired"].includes(v))) return KYC_STATUS.REJECTED;
  if ([front, back].some((v) => ["Uploaded", "Submitted", "UnderReview"].includes(v))) return KYC_STATUS.PENDING;
  return KYC_STATUS.NOT_STARTED;
};

const mapKycStateToLegacyLevels = (state) => ({
  level1: toUiKycStatus(findRequirement(state, "email")?.status),
  level2: toUiKycStatus(findRequirement(state, "personal_information")?.status),
  level3: getIdUiStatus(state),
  level4: toUiKycStatus(findDocument(state, "Selfie")?.status),
  level5: toUiKycStatus(findDocument(state, "ProofOfAddress")?.status),
  level6: toUiKycStatus(findDocument(state, "SourceOfFunds")?.status),
});

const validateKycResponse = (response, fallback) => {
  if (response?.status && response.status !== 200) throw new Error(fallback);
  if (response?.data?.Status && response.data.Status.StatusCode !== 200) {
    throw new Error(response.data.Contents || fallback);
  }
};

const getActiveKycCaseId = (state) => state?.activeCase?.verificationCaseId || null;
const getKycLevelId = (state) => state?.verificationLevel?.verificationLevelId || 1;

const ensureKycCase = async (state) => {
  const active = getActiveKycCaseId(state);
  if (active) return active;

  const response = await axiosApi.post(
    "kyc/me/cases",
    { verificationLevelId: getKycLevelId(state), source: "PlayerPortal" },
    { baseURLOverride: config.VITE_WALLET_API_BASE }
  );
  validateKycResponse(response, "Unable to start verification");
  return response.data?.Contents?.verificationCaseId || response.data?.Contents?.activeCase?.verificationCaseId;
};

const submitKycCaseIfReady = async (state) => {
  if (!state?.canSubmit) return;
  const caseId = getActiveKycCaseId(state);
  if (!caseId) return;
  await axiosApi.post(
    `kyc/me/cases/${caseId}/submit`,
    { acceptedTerms: true },
    { baseURLOverride: config.VITE_WALLET_API_BASE }
  );
};

export const getLevelsVerified = (signal) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get("kyc/me/state", {
        signal,
        baseURLOverride: config.VITE_WALLET_API_BASE,
      });
      validateKycResponse(response, "Unable to get verification status");
      const state = response.data?.Contents ?? response.data ?? {};
      dispatch(profileActions.setKycState(state));
      dispatch(profileActions.setVerificationLevels(mapKycStateToLegacyLevels(state)));
      return state;
    } catch (error) {
      if (error?.code !== "ERR_CANCELED") {
        return { success: false, error: error?.response?.data?.detail || error?.message || "Error occurred" };
      }
    }
  };
};

export const submitPersonalInfo = (personalInfo, signal) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.post(
        "kyc/me/personal-information",
        personalInfo,
        { signal, baseURLOverride: config.VITE_WALLET_API_BASE }
      );
      validateKycResponse(response, "Unable to verify personal information");

      const stateResponse = await axiosApi.get("kyc/me/state", {
        baseURLOverride: config.VITE_WALLET_API_BASE,
      });
      validateKycResponse(stateResponse, "Unable to get verification status");
      const state = stateResponse.data?.Contents ?? stateResponse.data ?? {};
      await submitKycCaseIfReady(state);
      await dispatch(getLevelsVerified(signal));
      toast.success(translate("Verification Request Successful"));
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.detail || error?.response?.data?.title || error?.message || "Error occurred";
      if (error?.code !== "ERR_CANCELED") toast.error(translate(message));
      return { success: false, error: translate(message) };
    }
  };
};

export const uploadKYCFile = (file, level, signal, documentTypeOverride) => {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setDisableVerifyButton(true));

      let kycState = getState()?.profile?.kycState;
      if (!kycState) {
        const stateResponse = await axiosApi.get("kyc/me/state", {
          signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        });
        validateKycResponse(stateResponse, "Unable to get verification status");
        kycState = stateResponse.data?.Contents ?? stateResponse.data ?? {};
      }

      const verificationCaseId = await ensureKycCase(kycState);
      if (!verificationCaseId) throw new Error("Unable to start verification case");

      const documentType =
        documentTypeOverride ||
        ({ 4: "Selfie", 5: "ProofOfAddress", 6: "SourceOfFunds" }[level]);
      if (!documentType) throw new Error("Invalid verification document type");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("verificationCaseId", verificationCaseId);
      formData.append("documentType", documentType);

      const response = await axiosApi.post("kyc/me/documents", formData, {
        signal,
        baseURLOverride: config.VITE_WALLET_API_BASE,
        headers: { "Content-Type": "multipart/form-data" },
      });
      validateKycResponse(response, "Unable to upload verification file");

      const stateResponse = await axiosApi.get("kyc/me/state", {
        baseURLOverride: config.VITE_WALLET_API_BASE,
      });
      validateKycResponse(stateResponse, "Unable to get verification status");
      const updatedState = stateResponse.data?.Contents ?? stateResponse.data ?? {};
      await submitKycCaseIfReady(updatedState);
      await dispatch(getLevelsVerified(signal));

      toast.success(translate("Upload Successful"));
      return { success: true };
    } catch (error) {
      const message = error?.response?.data?.detail || error?.response?.data?.title || error?.message || "Error occurred";
      if (error?.code !== "ERR_CANCELED") toast.error(translate(message));
      return { success: false, error: message };
    } finally {
      dispatch(profileActions.setDisableVerifyButton(false));
    }
  };
};

export const selfExclusion = (signal, payload) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/SelfExclusion/SelfExclusion?siteid=${config.VITE_SITE_ID}`,
        payload,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Contents);
      }

      const message = translate(`Your request was successful`);
      toast.success(message);
      window.location.reload();
      dispatch(loginActions.logout());
    } catch (error) {
      const message = translate(
        `Something went wrong. Please contact our customer support.`
      );
      toast.error(message);
    }
  };
};
