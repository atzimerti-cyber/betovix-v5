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
  let source = permissions;

  if (typeof source === "string") {
    try {
      source = JSON.parse(source);
    } catch {
      return { ...fallback };
    }
  }

  if (Array.isArray(source)) {
    return source.reduce((acc, entry) => {
      if (typeof entry === "string") {
        acc[entry] = true;
        return acc;
      }

      if (entry && typeof entry === "object") {
        const key = entry.key ?? entry.name ?? entry.permission ?? entry.Permission;
        const value = entry.value ?? entry.enabled ?? entry.allowed ?? entry.Value ?? true;
        if (key) acc[key] = normalizeBooleanLikeValue(value) === true;
      }
      return acc;
    }, { ...fallback });
  }

  if (!source || typeof source !== "object") return { ...fallback };

  return Object.entries(source).reduce(
    (acc, [key, value]) => {
      acc[key] = normalizeBooleanLikeValue(value) === true;
      return acc;
    },
    { ...fallback }
  );
};

export const isTrueSetting = (value) => normalizeBooleanLikeValue(value) === true;
