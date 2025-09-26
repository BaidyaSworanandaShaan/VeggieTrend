import { runScraper } from "../services/scraperServices.js";

export const scrapeManually = async (req, res) => {
  try {
    const result = await runScraper();
    res.json({
      message: "✅ Scraper executed successfully.",
      ...result,
    });
  } catch (error) {
    console.error("Scraper error:", error);
    res
      .status(500)
      .json({ message: "❌ Scraper failed.", error: error.message });
  }
};
