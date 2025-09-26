// import puppeteer from "puppeteer";
// import cron from "node-cron";
// import mysql from "mysql2/promise";

// // Function to scrape and save prices
// const runScraper = async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Go to English version
//   await page.goto("https://kalimatimarket.gov.np/lang/en", {
//     waitUntil: "networkidle2",
//   });

//   // Go to price page
//   await page.goto("https://kalimatimarket.gov.np/price", {
//     waitUntil: "networkidle2",
//   });

//   const today = new Date().toLocaleDateString("en-CA");

//   await page.waitForSelector("#commodityPriceParticular tbody tr");

//   const prices = await page.evaluate(() => {
//     const rows = Array.from(
//       document.querySelectorAll("#commodityPriceParticular tbody tr")
//     );

//     const cleanNumber = (str) => parseFloat(str.replace(/[^0-9.]/g, "")) || 0;

//     return rows.map((row) => {
//       const cols = row.querySelectorAll("td");
//       return {
//         item: cols[0]?.innerText.trim(),
//         unit: cols[1]?.innerText.trim(),
//         minPrice: cleanNumber(cols[2]?.innerText),
//         maxPrice: cleanNumber(cols[3]?.innerText),
//         avgPrice: cleanNumber(cols[4]?.innerText),
//       };
//     });
//   });

//   console.log(`Prices for today (${today}):`);
//   console.table(prices);

//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "kalimati_market",
//   });

//   for (let price of prices) {
//     await connection.execute(
//       `INSERT IGNORE INTO prices
//       (item, unit, min_price, max_price, avg_price, date)
//       VALUES (?, ?, ?, ?, ?, ?)`,
//       [
//         price.item,
//         price.unit,
//         price.minPrice,
//         price.maxPrice,
//         price.avgPrice,
//         today,
//       ]
//     );
//   }

//   await connection.end();
//   console.log("✅ Data inserted into MySQL successfully.");

//   await browser.close();
// };
// runScraper();
// cron.schedule("0 8 * * *", async () => {
//   console.log("🕗 Running Kalimati scraper at 8 AM...");
//   await runScraper();
// });

// console.log("Scheduler started. The scraper will run daily at 8 AM.");
