const TRUE_STRINGS = new Set(["true", "1", "yes", "on"]);
const FALSE_STRINGS = new Set(["false", "0", "no", "off"]);

export const normalizeBooleanLikeValue = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (TRUE_STRINGS.has(normalized)) return true;
    if (FALSE_STRINGS.has(normalized)) return false;
  }

  return value;
};

export const normalizeSiteSettings = (settings) => {
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    return {};
  }

  return Object.entries(settings).reduce((acc, [key, value]) => {
    acc[key] = normalizeBooleanLikeValue(value);
    return acc;
  }, {});
};

export const normalizePermissions = (permissions, fallback = {}) => {
  if (!permissions || typeof permissions !== "object" || Array.isArray(permissions)) {
    return { ...fallback };
  }

  return Object.entries(permissions).reduce(
    (acc, [key, value]) => {
      acc[key] = Boolean(normalizeBooleanLikeValue(value));
      return acc;
    },
    { ...fallback }
  );
};

export const isTrueSetting = (value) => normalizeBooleanLikeValue(value) === true;
