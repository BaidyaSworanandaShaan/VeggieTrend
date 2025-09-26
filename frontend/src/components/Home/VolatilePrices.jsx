import React from "react";
import { useVolatilePrice } from "../../hooks/useVolatilePrice";

const VolatilePrices = () => {
  const {
    data: volatilePrices,
    isLoading: volatilePricesLoading,
    error: volatilePricesError,
  } = useVolatilePrice();

  if (volatilePricesLoading) return <p>Loading volatile prices...</p>;
  if (volatilePricesError)
    return <p className="text-red-500">{volatilePricesError}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">Most Volatile Items</h2>

      <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 mb-2 px-2 mt-4">
        <span>Item</span>
        <span>Yesterday</span>
        <span>Today</span>
        <span>Change</span>
      </div>

      <ul className="divide-y divide-gray-200">
        {volatilePrices?.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-4 gap-4 py-2 hover:bg-gray-50 transition-colors rounded px-2"
          >
            <span className="text-gray-800 font-medium">{item.item}</span>
            <span className="text-gray-500 text-sm">
              Rs. {item.yesterday_price}
            </span>
            <span className="font-semibold">Rs. {item.today_price}</span>
            <span
              className={`${
                item.changes > 0 ? "text-red-500" : "text-green-500"
              } font-medium`}
            >
              {item.changes > 0 ? "+" : ""}
              {item.changes}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VolatilePrices;
