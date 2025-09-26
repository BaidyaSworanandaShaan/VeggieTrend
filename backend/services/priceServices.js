import pool from "../config/db.js";

// Fetch price history for a specific item
export const fetchPriceHistory = async (item) => {
  const [rows] = await pool.execute(
    `SELECT 
    p.id, 
    p.item, 
    i.image_url, 
    p.unit, 
    p.min_price, 
    p.max_price, 
    p.avg_price, 
    DATE_FORMAT(p.date, '%Y-%m-%d') AS date
FROM prices p
LEFT JOIN items i 
    ON p.item_id = i.id
WHERE p.item = ?
  AND p.date >= DATE_SUB(
        (SELECT MAX(p2.date) FROM prices p2), 
        INTERVAL 30 DAY
      )
ORDER BY p.date DESC`,
    [item]
  );
  return rows;
};

// Fetch latest prices (today)
export const fetchLatestPrices = async () => {
  const [rows] = await pool.execute(
    `SELECT 
    p.item, 
    i.image_url, 
    p.unit, 
    p.min_price, 
    p.max_price, 
    p.avg_price, 
    DATE_FORMAT(p.date, '%Y-%m-%d') AS date
FROM prices p
LEFT JOIN items i 
    ON p.item_id = i.id
WHERE DATE(p.date) = (
    SELECT MAX(DATE(date)) 
    FROM prices
)
ORDER BY p.item DESC;
`
  );
  return rows;
};

// Fetch prices by a specific date
export const fetchPricesByDate = async (date) => {
  const [rows] = await pool.execute(
    `SELECT p.id, p.item, i.image_url, p.unit, p.min_price, p.max_price, p.avg_price, 
            DATE_FORMAT(p.date, '%Y-%m-%d') AS date
     FROM prices p
     LEFT JOIN items i ON p.item_id = i.id
     WHERE DATE(p.date) = ?
     ORDER BY p.item ASC`,
    [date]
  );
  return rows;
};

// Search prices by item name
export const searchPricesByItem = async (item) => {
  const [rows] = await pool.execute(
    `SELECT p.item, i.image_url, p.unit, p.min_price, p.max_price, p.avg_price, 
            DATE_FORMAT(p.date, '%Y-%m-%d') AS date
     FROM prices p
     LEFT JOIN items i ON p.item_id = i.id
     WHERE p.item LIKE ?
     ORDER BY p.date DESC`,
    [`%${item}%`]
  );
  return rows;
};
export const fetchMarketAvgPrice = async () => {
  const [rows] = await pool.execute(
    `SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') AS date,
        ROUND(AVG(avg_price), 2) AS market_avg_price
     FROM prices
     WHERE date >= CURDATE() - INTERVAL 30 DAY
     GROUP BY date
     ORDER BY date ASC`
  );
  return rows;
};
// Fetch prices by date range
export const fetchPricesByDateRange = async (start, end) => {
  const [rows] = await pool.execute(
    `SELECT p.item, i.image_url, p.unit, p.min_price, p.max_price, p.avg_price, 
            DATE_FORMAT(p.date, '%Y-%m-%d') AS date
     FROM prices p
     LEFT JOIN items i ON p.item_id = i.id
     WHERE DATE(p.date) BETWEEN ? AND ?
     ORDER BY p.date ASC, p.item ASC`,
    [start, end]
  );
  return rows;
};
//Fetch top 5 expensive items
export const fetchTopExpensiveItems = async () => {
  const [rows] = await pool.execute(
    `SELECT 
    p.id,
        p.item, 
        i.image_url, 
        p.unit, 
        p.min_price, 
        p.max_price, 
        p.avg_price, 
        DATE_FORMAT(p.date, '%Y-%m-%d') AS date
     FROM prices p
     LEFT JOIN items i ON p.item_id = i.id
     WHERE p.date = (SELECT MAX(date) FROM prices)
     ORDER BY p.avg_price DESC
     LIMIT 5`
  );
  return rows;
};
export const fetchTopCheapestItems = async () => {
  const [rows] = await pool.execute(
    `SELECT 
    p.id,
        p.item, 
        i.image_url, 
        p.unit, 
        p.min_price, 
        p.max_price, 
        p.avg_price, 
        DATE_FORMAT(p.date, '%Y-%m-%d') AS date
     FROM prices p
     LEFT JOIN items i ON p.item_id = i.id
     WHERE p.date = (SELECT MAX(date) FROM prices)
     ORDER BY p.avg_price ASC
     LIMIT 5`
  );
  return rows;
};
export const fetchTopVolatileItems = async () => {
  const [rows] = await pool.execute(
    `SELECT 
        p_today.id,
        p_today.item,
        p_today.unit,
        p_today.avg_price AS today_price,
        p_yesterday.avg_price AS yesterday_price,
        ROUND(p_today.avg_price - p_yesterday.avg_price, 2) AS changes
     FROM prices p_today
     JOIN prices p_yesterday 
        ON p_today.item_id = p_yesterday.item_id 
        AND p_yesterday.date = DATE_SUB(p_today.date, INTERVAL 1 DAY)
     WHERE p_today.date = (SELECT MAX(date) FROM prices)
     ORDER BY ABS(p_today.avg_price - p_yesterday.avg_price) DESC
     LIMIT 5;`
  );

  return rows;
};
