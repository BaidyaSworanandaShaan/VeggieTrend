import express from "express";
import {
  getCheapestItems,
  getExpensiveItems,
  getLatestPrices,
  getMarketAvgPrice,
  getPriceHistory,
  getPricesByDate,
  getPricesByDateRange,
  getVolatileItems,
  searchPrices,
} from "../controller/priceController.js";

const router = express.Router();
router.get("/prices/latest", getLatestPrices);
router.get("/prices/expensive/today", getExpensiveItems);
router.get("/prices/cheapest/today", getCheapestItems);
router.get("/prices/volatile", getVolatileItems);
router.get("/prices/market/average", getMarketAvgPrice);
router.get("/prices", getPricesByDate);
router.get("/prices/search", searchPrices);
router.get("/prices/range", getPricesByDateRange);
router.get("/prices/:item", getPriceHistory);

export default router;
