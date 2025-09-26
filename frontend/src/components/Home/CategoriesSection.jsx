import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const CategoriesSection = () => {
  const {
    data,
    isLoading: categoriesLoading,

    error: categoriesError,
  } = useCategories();

  const navigate = useNavigate();
  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p className="text-red-500">{categoriesError}</p>;
  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {data.categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
            className="bg-white shadow-sm border rounded-lg p-4 flex justify-between items-center
                 transform transition duration-200 hover:scale-105 hover:shadow-sm cursor-pointer"
          >
            {category.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
