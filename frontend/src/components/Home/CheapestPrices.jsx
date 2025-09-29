import React from "react";
import { useCheapestPrice } from "../../hooks/useCheapestPrice";
import { useTranslation } from "react-i18next";
import NepaliNumber from "../NepaliNumber";

const CheapestPrices = () => {
  const {
    data: cheapestPrices,
    isLoading: cheapestPricesLoading,

    error: cheapeastPricesError,
  } = useCheapestPrice();
  const { t, i18n } = useTranslation();
  if (cheapestPricesLoading) return <p>Loading cheapest prices...</p>;
  if (cheapeastPricesError)
    return <p className="text-red-500">{cheapeastPricesError}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">
        {t("cheapestPrices.title")}
      </h2>

      <ul className="divide-y divide-gray-200 mt-4">
        {cheapestPrices.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors rounded px-2"
          >
            <span className="text-gray-800 font-medium">
              {i18n.language === "ne" ? item.name_ne : item.item}
            </span>
            <span className=" font-semibold">
              {t("Labels.rs")}
              <NepaliNumber value={item.avg_price} /> {}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CheapestPrices;
