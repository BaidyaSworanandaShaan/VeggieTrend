import React from "react";
import { useCheapestPrice } from "../../hooks/useCheapestPrice";

const CheapestPrices = () => {
  const {
    data: cheapestPrices,
    isLoading: cheapestPricesLoading,

    error: cheapeastPricesError,
  } = useCheapestPrice();

  if (cheapestPricesLoading) return <p>Loading cheapest prices...</p>;
  if (cheapeastPricesError)
    return <p className="text-red-500">{cheapeastPricesError}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">Affordable Choices</h2>

      <ul className="divide-y divide-gray-200 mt-4">
        {cheapestPrices.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 hover:bg-gray-50 transition-colors rounded px-2"
          >
            <span className="text-gray-800 font-medium">{item.item}</span>
            <span className=" font-semibold">Rs. {item.avg_price}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CheapestPrices;
