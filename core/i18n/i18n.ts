import * as Localization from "expo-localization";
import i18n, { changeLanguage } from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES } from "../constants";

const API_BASE = process.env.EXPO_PUBLIC_API_URL + "/api/v1";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "ar",
    fallbackLng: "ar",
    supportedLngs: SUPPORTED_LANGUAGES.map((lang) => lang.code),
    ns: ["common", "auth"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `${API_BASE}/translations/{{lng}}/{{ns}}`,
      load: "languageOnly",
    },
    detection: {
      order: ["querystring"],
      caches: [],
    },
  });

// Detect initial locale
const deviceLang = Localization.getLocales()["0"].languageCode || "ar";
changeLanguage(deviceLang);

i18n.services.formatter?.add("direction", (value) =>
  RTL_LANGUAGES.includes(value) ? "rtl" : "ltr"
);

export default i18n;
