import puppeteer from "puppeteer";

export async function getAramcoData() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // صفحة أرامكو في تداول
  await page.goto("https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/main-market-watch/company-details/2222", {
    waitUntil: "networkidle2",
  });

  // استخراج البيانات
  const data = await page.evaluate(() => {
    const getText = (selector) =>
      document.querySelector(selector)?.innerText.trim() || "N/A";

    return {
      name: getText(".company-name"), // اسم الشركة
      price: getText(".last-price"), // السعر الأخير
      change: getText(".change"), // التغير
      percent: getText(".change-percent"), // النسبة المئوية
      volume: getText(".volume"), // الكمية المتداولة
      value: getText(".value"), // السيولة
    };
  });

  await browser.close();
  return data;
}
