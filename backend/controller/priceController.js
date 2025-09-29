import {
  fetchLatestPrices,
  fetchPriceHistory,
  fetchPricesByDate,
  searchPricesByItem,
  fetchPricesByDateRange,
  fetchTopExpensiveItems,
  fetchTopCheapestItems,
  fetchTopVolatileItems,
  fetchMarketAvgPrice,
} from "../services/priceServices.js";

export const getPriceHistory = async (req, res) => {
  try {
    const { item } = req.params;
    const rows = await fetchPriceHistory(item);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No price history found for ${item}` });
    }
    res.status(200).json({
      item,
      history: rows,
    });
  } catch (error) {
    console.error("Error fetching price history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getMarketAvgPrice = async (req, res) => {
  try {
    const rows = await fetchMarketAvgPrice();
    if (rows.length === 0) {
      return res.status(404).json({ message: `No average price found` });
    }
    res.status(200).json({
      averagePrices: rows,
    });
  } catch (error) {
    console.error("Error fetching average price history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getExpensiveItems = async (req, res) => {
  try {
    const rows = await fetchTopExpensiveItems();
    if (rows.length === 0) {
      return res.status(404).json({ message: `No expensive ${item} found` });
    }
    res.status(200).json({
      topExpensive: rows,
    });
  } catch (error) {
    console.error("Error fetching expensiveItems:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getCheapestItems = async (req, res) => {
  try {
    const rows = await fetchTopCheapestItems();
    if (rows.length === 0) {
      return res.status(404).json({ message: `No Cheapest ${item} found` });
    }
    res.status(200).json({
      topCheapest: rows,
    });
  } catch (error) {
    console.error("Error fetching CheapestItems:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getVolatileItems = async (req, res) => {
  try {
    const rows = await fetchTopVolatileItems();
    if (rows.length === 0) {
      return res.status(404).json({ message: `No volatile ${item} found` });
    }
    res.status(200).json({
      topVolatiles: rows,
    });
  } catch (error) {
    console.error("Error fetching volatile items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getLatestPrices = async (_req, res) => {
  try {
    const rows = await fetchLatestPrices();

    if (rows.length === 0) {
      return res.status(404).json({ message: "No prices found." });
    }

    res.json({
      date: rows[0].date,
      prices: rows,
    });
  } catch (error) {
    console.error("Error fetching latest prices:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const searchPrices = async (req, res) => {
  try {
    const { item } = req.query;

    if (!item) {
      return res
        .status(400)
        .json({ message: "Please provide an item to search." });
    }

    const rows = await searchPricesByItem(item);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No prices found matching "${item}"` });
    }

    res.json({
      query: item,
      results: rows,
    });
  } catch (error) {
    console.error("Error searching prices:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getPricesByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: "Please provide a date in YYYY-MM-DD format." });
    }

    const rows = await fetchPricesByDate(date);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No prices found for ${date}` });
    }

    res.json({
      date,
      prices: rows,
    });
  } catch (error) {
    console.error("Error fetching prices by date:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPricesByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        message:
          "Please provide both start and end dates in YYYY-MM-DD format.",
      });
    }

    const rows = await fetchPricesByDateRange(start, end);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No prices found between ${start} and ${end}` });
    }

    res.json({
      start,
      end,
      prices: rows,
    });
  } catch (error) {
    console.error("Error fetching prices by date range:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
