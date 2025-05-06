// Lang
export function getLang(dl) {
  let lang = localStorage.getItem("lang");
  if (lang) lang = JSON.parse(lang);
  // lang = {
  //   id: "en",
  //   label: "English",
  //   flag: "https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/gb.svg",
  // };
  else if (dl) {
    lang = dl;
  } else lang = { id: "en" };

  return lang;
}
export function setLang(lang) {
  const langStr = JSON.stringify(lang);

  localStorage.setItem("lang", langStr);
}

// Timezone
export function storageGetTimezone() {
  let timezone = localStorage.getItem("TIMEZONE");
  if (timezone) timezone = JSON.parse(timezone);

  return timezone;
}
export function storageSetTimezone(timezone) {
  const timezoneStr = JSON.stringify(timezone);
  localStorage.setItem("TIMEZONE", timezoneStr);
}

// Odds format
export function storageGetOddsFormat() {
  let oddsFormat = localStorage.getItem("oddsFormat");
  return oddsFormat;
}
export function storageSetOddsFormat(oddsFormat) {
  localStorage.setItem("oddsFormat", oddsFormat);
}

// Ticket
export function getTicketFromStorage() {
  let ticket = localStorage.getItem("ticket");
  if (ticket) ticket = JSON.parse(ticket);
  return ticket;
}
export function setTicketToStorage(ticket) {
  localStorage.setItem("ticket", JSON.stringify(ticket));
}

// Accept changes settings
export function getTicketChangesSettings() {
  let changeSettings = localStorage.getItem("ticketSettings");
  if (changeSettings) changeSettings = JSON.parse(changeSettings);
  else {
    changeSettings = {
      acceptChanges: true,
      oddChanges: "2",
    };
    setTicketChangesSettings(changeSettings);
  }

  return changeSettings;
}
export function setTicketChangesSettings(changeSettings) {
  localStorage.setItem("ticketSettings", JSON.stringify(changeSettings));
}

// Left bar
export function getLeftbar() {
  const isOpen = localStorage.getItem("leftbar");
  let isOpenBool = isOpen !== "false";
  return isOpenBool;
}
export function setLeftbar(isOpen) {
  const str = isOpen.toString();
  localStorage.setItem("leftbar", str);
}

// Right bar
export function getRightbar() {
  let isOpen = localStorage.getItem("rightbar");
  if (isOpen === null) {
    isOpen = "false";
  }
  let isOpenBool = isOpen !== "false";
  return isOpenBool;
}
export function setRightbar(isOpen) {
  const str = isOpen.toString();
  localStorage.setItem("rightbar", str);
}

// Favorite markets
export function storageGetFavMarkets() {
  let favMarkets = localStorage.getItem("otFavs");
  if (favMarkets) favMarkets = JSON.parse(favMarkets);
  return favMarkets;
}
export function storageAddFavMarket(sportName, marketName) {
  let favMarkets = localStorage.getItem("otFavs");
  if (favMarkets) favMarkets = JSON.parse(favMarkets);
  else favMarkets = { [sportName]: [] };

  if (!favMarkets[sportName]) favMarkets[sportName] = [];

  favMarkets[sportName].push(marketName);
  localStorage.setItem("otFavs", JSON.stringify(favMarkets));
}
export function storageRemoveFavMarket(sportName, marketName) {
  let favMarkets = localStorage.getItem("otFavs");
  if (favMarkets) favMarkets = JSON.parse(favMarkets);

  if (favMarkets && favMarkets[sportName]) {
    const updatedMarkets = favMarkets[sportName].filter(
      (m) => m !== marketName
    );

    if (updatedMarkets.length === 0) {
      delete favMarkets[sportName];
    } else {
      favMarkets[sportName] = updatedMarkets;
    }

    localStorage.setItem("otFavs", JSON.stringify(favMarkets));
  }
}
