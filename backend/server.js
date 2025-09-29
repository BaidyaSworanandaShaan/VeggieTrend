import express from "express";
import scraperRoutes from "./routes/scraperRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import cors from "cors";

import cron from "node-cron";
import { runScraper } from "./services/scraperServices.js";
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies to be sent
  allowedHeaders: ["Content-Type", "Authorization"], // allow custom headers
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // allowed HTTP methods
};

app.use(cors(corsOptions));
//Routes

app.use("/api", scraperRoutes);
app.use("/api", priceRoutes);
app.use("/api", categoriesRoutes);

app.listen(port, async () => {
  console.log(`Server running on PORT: ${port}`);
  console.log("🚀 Running Kalimati scraper on startup...");
  await runScraper();
});
