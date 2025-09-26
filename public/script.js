const puppeteer = require("puppeteer");

async function scrapeStocks() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.goto("https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/main-market-watch");

  // مثال لجلب بيانات الأسهم
  const stocks = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    return rows.map(row => {
      const tds = row.querySelectorAll("td");
      return {
        symbol: tds[0]?.innerText.trim(),
        name: tds[1]?.innerText.trim(),
        price: tds[2]?.innerText.trim(),
        change: tds[3]?.innerText.trim(),
        volume: tds[4]?.innerText.trim()
      };
    });
  });

  await browser.close();
  return stocks;
}

module.exports = { scrapeStocks };
