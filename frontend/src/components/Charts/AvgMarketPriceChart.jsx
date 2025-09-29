import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMarketAvgPrice } from "../../hooks/useMarketAvgPrice";
import { useTranslation } from "react-i18next";

const AvgMarketPriceChart = () => {
  const { data, isLoading, isError, error } = useMarketAvgPrice();
  const { t } = useTranslation();
  if (isLoading) return <p>Loading market average...</p>;
  if (isError) return <p className="text-red-500">{error?.message}</p>;

  return (
    <section className=" mb-20">
      <div style={{ width: "100%", height: 300 }}>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="title">
              <h2 className="text-2xl font-bold text-gray-900">
                {t("avgMarketPrice.title")}
              </h2>
            </div>
          </div>
        </div>
        <ResponsiveContainer>
          <LineChart data={data.averagePrices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="market_avg_price"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AvgMarketPriceChart;
