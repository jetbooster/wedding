import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "./en/translation";
import translationFr from "./fr/translation";

i18next.use(LanguageDetector).use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: translationEn,
    },
    fr: {
      translation: translationFr,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
