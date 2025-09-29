import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/categories`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "No categories found";
  }
};
export const getItemsByCategories = async (categoryID) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/categories/${categoryID}`
    );
    console.log("RS", response);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "No items by category found";
  }
};
