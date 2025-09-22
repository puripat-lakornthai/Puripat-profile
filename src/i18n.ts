import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// แก้พาธให้ตรงกับของคุณ
import en from "./translate/en.json";
import th from "./translate/th.json";

const saved = localStorage.getItem("lang") as "en" | "th" | null;
const fallbackLng: "en" | "th" = saved ?? "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: fallbackLng,
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React ไม่ต้อง escape
  });

// sync <html lang="">
document.documentElement.lang = i18n.language;

// อัปเดต <html lang> เมื่อสลับภาษา
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("lang", lng);
});

export default i18n;
