import React from "react";

import BannerImage from "../../assets/images/banner.png";
import { useTranslation } from "react-i18next";
const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-light my-10">
      <div className="max-w-7xl mx-auto   flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 text-center md:text-left px-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("banner.title")}
          </h1>
          <p className="text-gray-700 text-sm md:text-lg mt-5">
            {t("banner.subtitle")}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={BannerImage}
            alt="Banner"
            className="w-full h-48 md:h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
