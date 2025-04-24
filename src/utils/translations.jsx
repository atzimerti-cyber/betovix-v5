import { store } from "../app/store";

export function translate(key) {
  if (!key) return;

  const { translations } = store.getState().app;

  return translations[key] || key; // Fallback to key if translation is missing
}

// export function translateNameWithLang(name) {
//     if (!name) return;

//     const { translations, lang } = store.getState().app;

//     if (name.langValues && name.langValues[lang.id]) return name.langValues[lang.id];
//     else if (name.International) {
//         let strippedName = name.International.split('. Outright')[0]; // remove Outright before translating
//         return translations[strippedName] || strippedName;
//     }

//     return translations[name] || name; // Fallback to key if translation is missing
// }

export function translateNameWithLang(name) {
  if (!name) return ""; // Ensure that if name is undefined or null, it returns an empty string

  const { translations, lang } = store.getState().app;

  if (name.langValues && name.langValues[lang.id]) {
    // Ensure it returns a string, otherwise return empty string or some default
    return typeof name.langValues[lang.id] === "string"
      ? name.langValues[lang.id]
      : "";
  } else if (name.International) {
    let strippedName = name.International.split(". Outright")[0]; // remove "Outright" before translating
    // Return a translated value or fallback to the strippedName
    return translations[strippedName] || strippedName;
  } else if (name) {
    return name;
  }
  // Ensure the default fallback also returns a string

  // return typeof translations[name] === 'string' ? translations[name] : name.toString();
  return null;
}
