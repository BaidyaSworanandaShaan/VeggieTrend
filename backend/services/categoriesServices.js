import pool from "../config/db.js";

export const fetchAllCategories = async () => {
  const [rows] = await pool.execute(
    `SELECT id, name FROM categories ORDER BY id ASC
`
  );
  return rows;
};
export const fetchItemByCategories = async (categoryId) => {
  const [rows] = await pool.execute(
    `SELECT i.id, i.name, i.image_url, c.name AS category_name
     FROM items i
     JOIN categories c ON i.category_id = c.id
     WHERE i.category_id = ?`,
    [categoryId]
  );
  return rows;
};
