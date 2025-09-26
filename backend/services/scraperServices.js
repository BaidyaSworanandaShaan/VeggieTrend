// services/scraperService.js
import puppeteer from "puppeteer";
import pool from "../config/db.js";

export const runScraper = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to English site
  await page.goto("https://kalimatimarket.gov.np/lang/en", {
    waitUntil: "networkidle2",
  });

  // Go to price page
  await page.goto("https://kalimatimarket.gov.np/price", {
    waitUntil: "networkidle2",
  });

  const connection = await pool.getConnection();

  try {
    // Get last scraped date
    const [rows] = await connection.execute(
      "SELECT MAX(date) as lastDate FROM prices"
    );

    let startDate;
    if (rows[0]?.lastDate) {
      startDate = new Date(rows[0].lastDate);
      startDate.setDate(startDate.getDate() + 1); // start next day
    } else {
      startDate = new Date("2014-01-01");
    }

    const today = new Date();

    while (startDate <= today) {
      const formattedDate = startDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
      console.log(`⏳ Scraping ${formattedDate}...`);

      try {
        // 👉 Set date in input
        await page.evaluate((date) => {
          const input = document.querySelector("#datePricing");
          input.value = date;
        }, formattedDate);

        // Submit & wait for reload
        await Promise.all([
          page.click(".comment-btn"),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        // Wait for table rows
        await page.waitForSelector("#commodityPriceParticular tbody tr", {
          timeout: 8000,
        });

        // Extract data
        const prices = await page.evaluate(() => {
          const rows = Array.from(
            document.querySelectorAll("#commodityPriceParticular tbody tr")
          );
          const cleanNumber = (str) =>
            parseFloat((str || "").replace(/[^0-9.]/g, "")) || null;

          return rows
            .map((row) => {
              const cols = row.querySelectorAll("td");
              if (!cols[0]?.innerText) return null;
              return {
                item: cols[0]?.innerText.trim(),
                unit: cols[1]?.innerText.trim() || "-",
                minPrice: cleanNumber(cols[2]?.innerText),
                maxPrice: cleanNumber(cols[3]?.innerText),
                avgPrice: cleanNumber(cols[4]?.innerText),
              };
            })
            .filter(Boolean);
        });

        // Insert into DB
        for (let price of prices) {
          const [itemRows] = await connection.execute(
            "SELECT id FROM items WHERE name = ?",
            [price.item]
          );
          const itemId = itemRows.length > 0 ? itemRows[0].id : null;

          await connection.execute(
            `INSERT INTO prices
               (item_id, item, unit, min_price, max_price, avg_price, date)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               min_price = VALUES(min_price),
               max_price = VALUES(max_price),
               avg_price = VALUES(avg_price)`,
            [
              itemId,
              price.item,
              price.unit,
              price.minPrice,
              price.maxPrice,
              price.avgPrice,
              formattedDate,
            ]
          );
        }

        console.log(
          `✅ Done ${formattedDate} (${prices.length} prices inserted)`
        );
      } catch (err) {
        console.error(`❌ Error scraping ${formattedDate}:`, err.message);
      }

      // move to next day
      startDate.setDate(startDate.getDate() + 1);

      // clean up memory a bit
      await page.evaluate(() => null);

      // delay
      await new Promise((res) => setTimeout(res, 1200));
    }
  } catch (error) {
    console.error("Scraper error:", error);
  } finally {
    connection.release();
    await browser.close();
  }
};
