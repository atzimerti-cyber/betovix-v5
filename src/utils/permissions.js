export const hasPermission = (permissions, permission) =>
  permissions?.[permission] === true;

export const hasAnyPermission = (permissions, required = []) =>
  !required.length || required.some((permission) => hasPermission(permissions, permission));

export const hasCasinoAccess = (permissions) =>
  hasAnyPermission(permissions, ["AllowToCasino", "AllowToSlots"]);

const normalize = (value) => String(value || "").trim().toLowerCase();

export const getCasinoRoutePermission = (value) => {
  const route = normalize(value);

  if (
    route.includes("/casino/live") ||
    route.includes("casino/live") ||
    route.includes("gameshows") ||
    route.includes("game-shows") ||
    route.includes("tablegames") ||
    route.includes("table-games") ||
    route.includes("virtualgames") ||
    route.includes("virtual-games") ||
    route.includes("live casino")
  ) {
    return "AllowToCasino";
  }

  if (
    route.includes("/casino/slots") ||
    route.includes("casino/slots") ||
    route.includes("crashgames") ||
    route.includes("crash-games") ||
    route.includes("crash games")
  ) {
    return "AllowToSlots";
  }

  return null;
};

export const isMenuItemAllowed = (item, permissions) => {
  if (!item) return false;

  const label = normalize(item.label ?? item.Name);
  const page = normalize(item.page ?? item.Link ?? item.State);
  const combined = `${label} ${page}`;

  if (
    page.includes("sportsbook") ||
    page.includes("/sports") ||
    page.includes("searchEvent".toLowerCase()) ||
    page.includes("inplay") ||
    label === "sports" ||
    label === "my bets" ||
    label === "betslip"
  ) {
    return hasPermission(permissions, "AllowToSports");
  }

  if (page.includes("track-events") || label.includes("horse racing")) {
    return hasPermission(permissions, "AllowToSIS");
  }

  const casinoPermission = getCasinoRoutePermission(combined);
  if (casinoPermission) return hasPermission(permissions, casinoPermission);

  if (page.includes("casino") || label === "casino") {
    return hasCasinoAccess(permissions);
  }

  return true;
};
