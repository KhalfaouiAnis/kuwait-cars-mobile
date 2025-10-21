import * as Localization from "expo-localization";
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const API_BASE = process.env.EXPO_PUBLIC_API_URL + "/api";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "fr"],
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
const deviceLang = Localization.getLocales()["0"].languageCode || "en";
i18n.changeLanguage(deviceLang);

i18n.services.formatter?.add("direction", (value) =>
  value === "ar" ? "rtl" : "ltr"
);

export default i18n;
