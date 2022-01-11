import i18n from "i18next";
import lOCALE_EN from "./locales/en.json";
import LOCALE_MM from "./locales/mm.json";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: lOCALE_EN,
  },
  mm: {
    translation: LOCALE_MM,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
