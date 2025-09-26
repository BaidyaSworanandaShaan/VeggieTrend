import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItemByCategories } from "../../hooks/useCategories";
import PriceCard from "../../components/PriceCard";

const CategoriesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useItemByCategories(id);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <section className="my-20 ">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="title">
            <h2 className="text-2xl font-bold text-gray-900">
              {data.category.name} Items
            </h2>
            <p className="text-gray-600 mt-1">
              Browse all items under the{" "}
              <span className="font-medium">{data.category.name}</span>{" "}
              category.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {data.items.map((price) => (
          <div
            key={price.id}
            onClick={() =>
              navigate(`/prices/${encodeURIComponent(price.name)}`)
            }
            className="bg-white shadow-sm border rounded-lg p-4 flex justify-between items-center
                 transform transition duration-200 hover:scale-105 hover:shadow-sm cursor-pointer"
          >
            <span className="text-lg font-bold mb-1">{price.name}</span>{" "}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={
                  price.image_url ||
                  "https://img.freepik.com/premium-vector/park-pictogram_764382-144210.jpg"
                }
                alt={price.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesDetail;
