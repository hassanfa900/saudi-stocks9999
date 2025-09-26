import puppeteer from "puppeteer";

export async function getAramcoData() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // صفحة أرامكو في تداول
  await page.goto(
    "https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/main-market-watch/company-details/2222",
    { waitUntil: "networkidle2" }
  );

  const data = await page.evaluate(() => {
    const getText = (selector) =>
      document.querySelector(selector)?.innerText.trim() || "N/A";

    return {
      name: getText(".company-name"),
      price: getText(".last-price"),
      change: getText(".change"),
      percent: getText(".change-percent"),
      volume: getText(".volume"),
      value: getText(".value"),
    };
  });

  await browser.close();
  return data;
}
