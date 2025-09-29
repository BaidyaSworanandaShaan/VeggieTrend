import React from "react";
import { useVolatilePrice } from "../../hooks/useVolatilePrice";
import { useTranslation } from "react-i18next";
import NepaliNumber from "../NepaliNumber";

const VolatilePrices = () => {
  const {
    data: volatilePrices,
    isLoading: volatilePricesLoading,
    error: volatilePricesError,
  } = useVolatilePrice();
  const { t, i18n } = useTranslation();
  if (volatilePricesLoading) return <p>Loading volatile prices...</p>;
  if (volatilePricesError)
    return <p className="text-red-500">{volatilePricesError}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">
        {t("volatilePrices.title")}
      </h2>

      <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 mb-2 px-2 mt-4">
        <span>{t("days.change")}</span>
        <span>{t("days.yesterday")}</span>
        <span>{t("days.today")}</span>
        <span>{t("days.change")}</span>
      </div>

      <ul className="divide-y divide-gray-200">
        {volatilePrices?.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-4 gap-4 py-2 hover:bg-gray-50 transition-colors rounded px-2"
          >
            <span className="text-gray-800 font-medium">
              {" "}
              {i18n.language === "ne" ? item.item_ne : item.item}
            </span>
            <span className="text-gray-500 text-sm">
              {t("Labels.rs")} <NepaliNumber value={item.yesterday_price} /> {}
            </span>
            <span className="font-semibold">
              Rs. <NepaliNumber value={item.today_price} />{" "}
            </span>
            <span
              className={`${
                item.changes > 0 ? "text-red-500" : "text-green-500"
              } font-medium`}
            >
              {item.changes > 0 ? "+" : ""}
              {<NepaliNumber value={item.changes} />}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VolatilePrices;
