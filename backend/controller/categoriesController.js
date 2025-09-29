import {
  fetchAllCategories,
  fetchItemByCategories,
} from "../services/categoriesServices.js";

export const getAllCategories = async (req, res) => {
  try {
    const rows = await fetchAllCategories();
    if (rows.length === 0) {
      return res.status(404).json({ message: `No categories found` });
    }
    res.status(200).json({
      categories: rows,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getItemByCategories = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const rows = await fetchItemByCategories(categoryId);
    if (rows.length === 0) {
      return res.status(404).json({ message: `No categories found` });
    }

    const categoryName = rows.length ? rows[0].category_name : null;
    const categoryNameNe = rows.length ? rows[0].category_name_ne : null;

    res.status(200).json({
      category: {
        id: categoryId,
        name: categoryName,
        name_ne: categoryNameNe,
      },
      items: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching items by category" });
  }
};
