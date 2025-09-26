import puppeteer from "puppeteer";

import pool from "./config/db.js";

const runImageScraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://nepalipatro.com.np/vegetables", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("#vegetable_table tbody tr");

  const imageData = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll("#vegetable_table tbody tr")
    );

    return rows.map((row) => {
      const cols = row.querySelectorAll("td");
      return {
        item:
          cols[0].querySelector("div div")?.innerText.trim().split("\n")[0] ||
          "",
        imageUrl: cols[0].querySelector("img")?.src || "",
      };
    });
  });

  console.log(imageData);

  const connection = await pool.getConnection();
  try {
    for (let image of imageData) {
      await connection.execute(
        `INSERT INTO items (name, image_url) 
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE image_url = ?`,
        [image.item, image.imageUrl, image.imageUrl]
      );
      console.log(`✅ Saved image for ${image.item}`);
    }
  } finally {
    connection.release();
    await browser.close();
  }
};

// Run once immediately
runImageScraper();
