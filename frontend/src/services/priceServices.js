const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

export const getLatestPrices = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/prices/latest`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch latest price";
  }
};
export const getItemDetail = async (item) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/prices/${item}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch latest price";
  }
};
export const getExpensiveItems = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/prices/expensive/today`
    );
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch expensive items";
  }
};

export const getVolatileItems = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/prices/volatile`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch volatile items";
  }
};
export const getCheapestItems = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/prices/cheapest/today`
    );
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch cheapest items";
  }
};
export const getMarketAvgPrice = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/prices/market/average`
    );
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch average market price";
  }
};
