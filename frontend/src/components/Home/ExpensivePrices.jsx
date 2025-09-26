import React from "react";

import { useExpensivePrices } from "../../hooks/useExpensivePrice";

const ExpensivePrices = () => {
  const {
    data: expensivePrices,
    isLoading: expensivePricesLoading,

    error: expensivePriceError,
  } = useExpensivePrices();

  if (expensivePricesLoading) return <p>Loading expensive prices...</p>;
  if (expensivePriceError)
    return <p className="text-red-500">{expensivePriceError}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">
        Today’s Price Leaders
      </h2>
      <ul className="divide-y divide-gray-200 mt-4">
        {expensivePrices.map((item, index) => (
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

export default ExpensivePrices;
