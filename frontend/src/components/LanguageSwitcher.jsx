import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const buttonClass = (lng) =>
    `px-3 py-1 rounded hover:bg-gray-300 ${
      currentLang === lng ? "bg-green-600 text-white" : "bg-gray-200 text-black"
    }`;

  return (
    <div className="flex justify-end gap-2 p-4">
      <button
        onClick={() => changeLanguage("en")}
        className={buttonClass("en")}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ne")}
        className={buttonClass("ne")}
      >
        नेपाली
      </button>
    </div>
  );
};

export default LanguageSwitcher;
