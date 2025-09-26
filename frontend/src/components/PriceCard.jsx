import React from "react";
import { useNavigate } from "react-router-dom";

const PriceCard = ({ price }) => {
  const navigate = useNavigate();
  return (
    <div
      key={price.id}
      onClick={() => navigate(`/prices/${encodeURIComponent(price.item)}`)}
      className="bg-white shadow-sm border rounded-lg p-4 flex justify-between items-center
                 transform transition duration-200 hover:scale-105 hover:shadow-sm cursor-pointer"
    >
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-bold mb-1">{price.item}</h3>
        <p className="text-gray-600 text-md mb-0.5">
          <span className="font-semibold">Unit:</span> {price.unit || "-"}
        </p>
        <div className="flex gap-4">
          <p className="text-gray-600 text-md mb-0.5">
            <span className="font-semibold">Min:</span> {price.min_price || "-"}
          </p>
          <p className="text-gray-600 text-md mb-0.5">
            <span className="font-semibold">Max:</span> {price.max_price || "-"}
          </p>
          <p className="text-gray-600 text-md">
            <span className="font-semibold">Avg:</span> {price.avg_price || "-"}
          </p>
        </div>
      </div>

      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={
            price.image_url ||
            "https://img.freepik.com/premium-vector/park-pictogram_764382-144210.jpg"
          }
          alt={price.item}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default PriceCard;
