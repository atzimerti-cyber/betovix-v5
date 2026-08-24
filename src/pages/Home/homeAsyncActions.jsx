import axiosApi from "../../axios-api";
import config from "../../config";
import { casinoActions } from "../Casino/casinoSlice";

const normalizeSectionsResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.sections)) return payload.sections;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.Items)) return payload.Items;
  if (Array.isArray(payload?.Contents)) return payload.Contents;
  return [];
};

const getSectionItems = (section) => {
  if (Array.isArray(section?.items)) return section.items;
  if (Array.isArray(section?.Items)) return section.Items;
  if (Array.isArray(section?.games)) return section.games;
  if (Array.isArray(section?.Games)) return section.Games;
  return [];
};

const normalizeSection = (section) => ({
  ...section,
  key: section?.key || section?.Key || section?.code || section?.Code,
  title:
    section?.title ||
    section?.Title ||
    section?.name ||
    section?.Name ||
    section?.key ||
    section?.Key,
  items: getSectionItems(section),
  sectionType:
    section?.sectionType || section?.type || section?.SectionType || "collection",
  displayOrder:
    section?.displayOrder ?? section?.DisplayOrder ?? section?.viewOrder ?? 9999,
  renderPage: section?.renderPage ?? section?.RenderPage,
  renderType: section?.renderType ?? section?.RenderType,
});

const isHomeSection = (section) => {
  if (!section?.renderPage) return true;
  if (Array.isArray(section.renderPage)) return section.renderPage.includes("home");
  return String(section.renderPage).toLowerCase().includes("home");
};

const hydrateCollection = async (section, signal) => {
  const normalized = normalizeSection(section);
  if (normalized.items.length > 0 || !normalized.key) return normalized;

  try {
    const response = await axiosApi.get(
      `casino/personalization/collections/by-key/${encodeURIComponent(
        normalized.key
      )}?siteId=${config.VITE_SITE_ID}`,
      {
        signal,
        baseURLOverride: config.VITE_CASINO_BASE,
        timeout: 10000,
      }
    );

    const payload = response?.data;
    const detail = Array.isArray(payload)
      ? payload[0]
      : payload?.collection || payload?.Collection || payload;

    return normalizeSection({ ...normalized, ...(detail || {}) });
  } catch (error) {
    if (error?.code !== "ERR_CANCELED" && error?.response?.status !== 401) {
      console.error(
        `Home collection '${normalized.key}' could not be hydrated`,
        error
      );
    }
    return normalized;
  }
};

export const getHomeCasinoSections = (signal) => {
  return async (dispatch) => {
    const sections = [];
    const hiddenKeys = new Set(["continue-playing", "continue_playing"]);

    const collectionsRequest = axiosApi
      .get(`casino/personalization/collections?siteId=${config.VITE_SITE_ID}`, {
        signal,
        baseURLOverride: config.VITE_CASINO_BASE,
        timeout: 10000,
      })
      .then(async (response) => {
        const collectionDefinitions = normalizeSectionsResponse(response?.data)
          .map(normalizeSection)
          .filter((section) => section?.key && !hiddenKeys.has(section.key))
          .filter(isHomeSection);

        // Some sites return full collections from the list endpoint, while
        // others return only the collection definitions. Hydrate only the
        // latter through the same by-key endpoint used by the migrated site.
        const hydrated = await Promise.all(
          collectionDefinitions.map((section) => hydrateCollection(section, signal))
        );

        sections.push(...hydrated);
      });

    const liveGamesRequest = axiosApi
      .get(
        `MyCasino/GetHomeGames?tags=live&count=20&siteid=${config.VITE_SITE_ID}`,
        {
          signal,
          baseURLOverride: config.VITE_CASINO_BASE,
          timeout: 10000,
        }
      )
      .then((response) => {
        const items = normalizeSectionsResponse(response?.data);
        if (items.length > 0) {
          sections.push({
            key: "live",
            sectionType: "tag",
            title: "Live Games",
            displayOrder: 200,
            items,
            renderPage: "home,casino",
          });
        }
      });

    const newGamesRequest = axiosApi
      .get(
        `MyCasino/GetHomeGames?tags=new&count=20&siteid=${config.VITE_SITE_ID}`,
        {
          signal,
          baseURLOverride: config.VITE_CASINO_BASE,
          timeout: 10000,
        }
      )
      .then((response) => {
        const items = normalizeSectionsResponse(response?.data);
        if (items.length > 0) {
          sections.push({
            key: "new",
            sectionType: "tag",
            title: "New Games",
            displayOrder: 199,
            items,
            renderPage: "home,casino",
          });
        }
      });

    const results = await Promise.allSettled([
      collectionsRequest,
      liveGamesRequest,
      newGamesRequest,
    ]);

    results.forEach((result) => {
      if (result.status === "rejected" && result.reason?.code !== "ERR_CANCELED") {
        console.error("Home casino section request failed", result.reason);
      }
    });

    if (signal?.aborted) return;

    const uniqueSections = Array.from(
      new Map(
        sections
          .map(normalizeSection)
          .filter((section) => section?.key)
          .filter((section) => Array.isArray(section.items) && section.items.length > 0)
          .map((section) => [section.key, section])
      ).values()
    ).sort(
      (a, b) => Number(a?.displayOrder ?? 9999) - Number(b?.displayOrder ?? 9999)
    );

    dispatch(casinoActions.setCasinoHome(uniqueSections));
  };
};
