import React from "react";
import { useTranslation } from "react-i18next";
import { toNepaliNumber } from "../utils/numberUtils";

const NepaliNumber = ({ value }) => {
  console.log(value);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return <>{currentLang === "ne" ? toNepaliNumber(value) : value}</>;
};

export default NepaliNumber;
