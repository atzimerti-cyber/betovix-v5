import { store } from '../app/store';

export function translate(key) {
    if (!key) return;

    const { translations } = store.getState().app;

    return translations[key] || key; // Fallback to key if translation is missing
}

export function translateNameWithLang(name) {
    if (!name) return;

    const { translations, lang } = store.getState().app;

    if (name.langValues && name.langValues[lang.id]) return name.langValues[lang.id];
    else if (name.International) {
        let strippedName = name.International.split('. Outright')[0]; // remove Outright before translating
        return translations[strippedName] || strippedName;
    }

    return translations[name] || name; // Fallback to key if translation is missing
}
