import React from "react";
import { useLatestPrice } from "../../hooks/useLatestPrice";
import PriceCard from "../PriceCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NepaliNumber from "../NepaliNumber";

const LatestPrices = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useLatestPrice();

  if (isLoading) return <p>Loading latest prices...</p>;
  if (isError)
    return <p className="text-red-500">{error?.message || "Failed to load"}</p>;

  return (
    <section className="my-20 ">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="title">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("latestPrices.title")}
            </h2>
            <p className="text-gray-600 mt-1">
              {t("latestPrices.subtitle")}
              <span className="font-medium">
                {" "}
                {<NepaliNumber value={data.date} /> || "-"}
              </span>
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate("/prices/all")}
          >
            {t("Labels.viewAll")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {data.prices.slice(0, 6).map((price) => (
          <PriceCard key={price.id} price={price} />
        ))}
      </div>
    </section>
  );
};

export default LatestPrices;
