import React, { useState } from "react";
import PriceCard from "../../components/PriceCard";
import { useLatestPrice } from "../../hooks/useLatestPrice";

const AllPrice = () => {
  const { data, isLoading, isError, error } = useLatestPrice();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPrices = data.prices?.filter((price) =>
    price.item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Calculate total pages
  const totalPages = Math.ceil((filteredPrices?.length || 0) / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPrices?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="my-6">
      <div className="title">
        <h2 className="text-2xl font-bold text-gray-900">
          Latest Market Prices
        </h2>
        <p className="text-gray-600 mt-1">
          Showing prices for <span className="font-medium">{data.date}</span>
        </p>
      </div>
      <input
        type="text"
        placeholder="Search by item name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page on search
        }}
        className="border border-gray-300 rounded p-2 w-full my-5 focus:outline-none focus:border-gray-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {currentItems?.map((price) => (
          <PriceCard key={price.id} price={price} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-4 mt-6">
          `{/* Items per page selector */}
          <div className="flex justify-end">
            <label className="mr-2 font-medium">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="border rounded p-1"
            >
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
              <option value={18}>18</option>
              <option value={21}>21</option>
            </select>
          </div>
          `
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPrice;
