import { format, formatInTimeZone, toDate } from "date-fns-tz";
import el from "date-fns/locale/el";
import enGB from "date-fns/locale/en-GB";
import { storageGetTimezone, getLang } from "./storage";
import { useSelector } from "react-redux";

export function formatNumberMax(value, dp) {
  if (isNaN(value)) return value;
  return +parseFloat(value).toFixed(dp);
}

export function formatNumberTo(value, dp = 2) {
  if (isNaN(value)) return value;
  return parseFloat(value).toFixed(dp);
}

export function formatDateTimeObj(d) {
  if (typeof d === "string") {
    d = new Date(d);
  }

  const formattedDate = d.toLocaleDateString("en-US", {
    weekday: "short", // abbreviated day of the week, e.g., "Sat"
    month: "short", // abbreviated month, e.g., "Apr"
    day: "2-digit", // day of the month as two digits, e.g., "20"
  });

  const formattedTime = d.toLocaleTimeString("en-US", {
    hour: "2-digit", // 2-digit hour
    minute: "2-digit", // 2-digit minute
    hour12: true, // Use 12-hour format
  });

  return { date: formattedDate, time: formattedTime };
}

export function formatDateTime(d) {
  if (!d || isNaN(new Date(d).getTime())) {
    d = new Date();
  } else if (typeof d === "string") {
    d = new Date(d);
  }

  const formattedDate = d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const formattedTime = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
}

export function formatPoint(val) {
  if (!val) return val;

  if (typeof val === "string") {
    if (stringIsNumber(val)) {
      val = parseFloat(val.replace(",", "."));
    } else {
      return "-";
    }
  }
  return val.toFixed(2);
}

export function formatDateTime2(d) {
  if (typeof d === "string") {
    d = new Date(d);
  }

  const formattedDate = d.toLocaleDateString("en-GB");

  const formattedTime = d.toLocaleTimeString("en-GB", {
    hour: "2-digit", // 2-digit hour
    minute: "2-digit", // 2-digit minute
    hour12: true, // Use 12-hour format
  });

  return `${formattedDate}, ${formattedTime}`;
}

export function formatTimeString(time) {
  if (!time) return 0;

  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time.split(":");

  // Check if hours are '00', and return 'MM:SS' if true, otherwise return 'HH:MM:SS'
  if (hours === "00") {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

export function millisecondsToDateStr(m) {
  if (typeof m !== "number") return m;

  const d = new Date(m);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function getTimeUntil(future) {
  if (typeof future === "string") {
    future = new Date(future);
  }
  const now = new Date();

  // Check if the future date is the same day as today
  if (future.toDateString() === now.toDateString()) {
    const msDifference = future - now; // Milliseconds difference
    const hours = msDifference / (1000 * 60 * 60);

    // If less than an hour but more than 0 minutes
    if (hours < 1 && msDifference > 0) {
      const minutes = Math.ceil(msDifference / (1000 * 60));
      return minutes === 1 ? "in 1 minute" : `in ${minutes} minutes`;
    } else if (hours >= 1) {
      const intHours = parseInt(hours);
      return intHours === 1 ? "in 1 hour" : `in ${intHours} hours`;
    } else {
      // Handle the case when the future time has already passed or is exactly now
      return "Time has passed or match is starting now";
    }
  } else {
    // Calculate the difference in days
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfFutureDay = new Date(
      future.getFullYear(),
      future.getMonth(),
      future.getDate()
    );
    const days = Math.ceil(
      (startOfFutureDay - startOfDay) / (1000 * 60 * 60 * 24)
    );
    return days === 1 ? "in a day" : `in ${days} days`;
  }
}

export function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function addThousandsSeparator(value, decimals = 2) {
  if (value === null) return null;

  value = parseFloat(value.toString().replace(/,/g, ""));
  if (isNaN(value)) return null;

  value = value.toFixed(decimals);
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return value;
}

export function getSportMarketTreeObj(sportMarketTree) {
  if (!sportMarketTree) return null;

  let smto = {};

  for (let i = 0; i < sportMarketTree.childs.length; i++) {
    const group = sportMarketTree.childs[i];

    if (!group) continue;

    for (let k = 0; k < group.childs.length; k++) {
      const sub = group.childs[k];

      if (!sub) continue;

      for (let m = 0; m < sub.childs.length; m++) {
        const market = sub.childs[m];

        if (!market) continue;
        // if (!market.childs || market.childs.length === 0) continue;

        const marketTypeId = market.data.Id;

        // if added before, retain the previous groups
        let groups = [];
        if (smto[marketTypeId]) {
          groups = smto[marketTypeId].groups;
        }

        let groupExists = groups.find((g) => g.groupIndex === i);
        if (!groupExists) {
          groups.push({
            badge: group.badge,
            isActive: group.isActive,
            name: group.name,
            type: "group",
            groupIndex: i,
            allIndex: i * 10000 + k * 1000 + m,
          });
        }

        smto[marketTypeId] = {
          name: market.name,
          isActive: market.isActive,
          type: "market",
          badge: market.badge,
          data: { ...market.data },
          fields: {},
          marketIndex: m,
          sub: {
            badge: sub.badge,
            name: sub.name,
            type: "sub",
            subIndex: k,
          },
          groups: groups,
        };

        for (let field of market.childs) {
          if (!field) continue;
          const fieldTypeId = field.data.FieldTypeId;

          smto[marketTypeId].fields[fieldTypeId] = {
            badge: field.badge,
            name: field.name,
            type: "field",
            data: { ...field.data },
          };
        }
      }
    }
  }

  return smto;
}

export function getSportMarketTreeObjFromMarkets(markets) {
  if (!markets || markets.length === 0) return null;
  markets.sort((a, b) => a.MarketTypeId - b.MarketTypeId);
  let smto = {};

  for (let m = 0; m < markets.length; m++) {
    const market = markets[m];
    const marketTypeId = market.MarketTypeId;

    const allIndex = market.MarketSubTypeId
      ? parseInt(market.MarketSubTypeId) * 1000 + m
      : market.MarketTypeId * 1000 + m;

    smto[marketTypeId] = {
      name: market.MarketName.International,
      isActive: market.Active,
      type: "market",
      badge: null,
      data: null,
      fields: {},
      marketIndex: m,
      sub: {
        badge: null,
        name: market.MarketName.International,
        type: "sub",
        subIndex: market.MarketSubTypeId
          ? parseInt(market.MarketSubTypeId)
          : market.MarketTypeId,
      },
      groups: [
        {
          badge: null,
          isActive: market.Active,
          name: "All",
          type: "group",
          groupIndex: 0,
          allIndex: allIndex,
        },
      ],
    };

    for (let field of market.MarketFields) {
      if (!field) continue;
      const fieldTypeId = field.FieldTypeId;

      smto[marketTypeId].fields[fieldTypeId] = {
        badge: null,
        name: field.FieldName.International,
        type: "field",
        data: null,
      };
    }
  }

  return smto;
}

export function getTranslation(property, translationsObj) {
  let translated = translationsObj[property];
  if (!translated) translated = property;
  return translated;
}

export function childsNotExist(obj) {
  // Base case: check if childs exists and its length is 0
  if (!obj.childs || obj.childs.length === 0) {
    return true;
  }

  // we have market with children
  if (obj.type === "market") return false;

  // Recursive case: iterate through the childs array
  if (childsNotExist(obj.childs[0])) {
    return true;
  }

  // We haven't reached the market children
  return false;
}

export function isMoreThan14DaysOld(storedDate) {
  if (storedDate) {
    const date = new Date(storedDate); // Convert the stored date string to a Date object
    const currentDate = new Date(); // Get today's date

    // Calculate the difference in time (in milliseconds)
    const diffInMilliseconds = currentDate - date;

    // Convert the difference to days
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Check if the difference is greater than 14 days
    return diffInDays > 14;
  }

  // If no date is stored, return false
  return false;
}

export function formatDate(d, type, divider = "-") {
  if (!type) return d;

  if (!d || isNaN(new Date(d).getTime())) {
    d = formatDateInOriginalTimeZone(new Date());
  } else {
    d = formatDateInOriginalTimeZone(d);
  }

  let newTimezone = "Europe/Athens";
  const newTimezoneObj = storageGetTimezone();
  if (newTimezoneObj) {
    newTimezone = newTimezoneObj.value;
  }

  const locales = {
    en: enGB,
    el: el,
  };
  const currentLang = getLang().id;
  const locale = locales[currentLang] || locales["en"];

  let formatted;
  if (type === "date") {
    formatted = formatInTimeZone(d, newTimezone, "EEE, MMM dd", { locale });
  } else if (type === "fullDate") {
    formatted = formatInTimeZone(d, newTimezone, "LLLL dd, yyyy", { locale });
  } else if (type === "time") {
    formatted = formatInTimeZone(d, newTimezone, "HH:mm");
  } else if (type === "datetime") {
    formatted = formatInTimeZone(d, newTimezone, "dd MMM, HH:mm", { locale });
  } else if (type === "datetimeWithSeconds") {
    formatted = formatInTimeZone(d, newTimezone, "dd MMM, HH:mm:ss", {
      locale,
    });
  } else if (type === "dayDate") {
    const weekday = formatInTimeZone(d, newTimezone, "EEE", { locale });
    const date = formatInTimeZone(d, newTimezone, "dd / MM", { locale });
    formatted = { weekday, date };
  } else if (type === "dateToString") {
    formatted = formatInTimeZone(
      d,
      newTimezone,
      `dd${divider}MM${divider}yyyy`
    );
  } else if (type === "dateTimeToString") {
    formatted = formatInTimeZone(
      d,
      newTimezone,
      `dd${divider}MM${divider}yyyy HH:mm:ss`
    );
  }

  return formatted;
}

export function formatDateInOriginalTimeZone(datetime) {
  const originalTimezone = "Europe/Athens";
  const zonedDate = toDate(datetime, { timeZone: originalTimezone });

  return zonedDate;
}

export function siteCurrency(siteCurr) {
  const currencies = useSelector((state) => state.app.siteCurrencies);
  return currencies?.[siteCurr]?.Symbol || null;
}

export function getFormattedSportName(sportNameInternational) {
  if (!sportNameInternational) return null;

  const formattedSportName = sportNameInternational
    .replace(/ ?\([^)]*\)/g, "") // Remove space before parentheses, the parentheses, and their contents
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/:/g, ""); // Remove colons
  const finalSportName = formattedSportName.toLowerCase();

  return finalSportName;
}
