import express from "express";
import { scrapeManually } from "../controller/scraperController.js";

const router = express.Router();

router.post("/scrape", scrapeManually);

export default router;
