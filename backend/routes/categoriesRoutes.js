import express from "express";
import {
  getAllCategories,
  getItemByCategories,
} from "../controller/categoriesController.js";

const router = express.Router();
router.get("/categories", getAllCategories);
router.get("/categories/:id", getItemByCategories);
export default router;
