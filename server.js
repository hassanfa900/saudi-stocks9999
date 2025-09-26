const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.static('public'));

// دالة لحساب المؤشرات الافتراضية (كمثال)
function calculateIndicators(price, prevData = {}) {
  // مثال لحساب EMA بسيط
  const ema9 = prevData.ema9 ? (price * 2/10 + prevData.ema9 * 8/10) : price;
  const ema20 = prevData.ema20 ? (price * 2/21 + prevData.ema20 * 19/21) : price;

  // RSI افتراضي: أقل من 30 = شراء
  const rsi = 50; // قيمة وهمية، يمكن ربط API لاحقًا

  // MACD: تقاطع صعودي إذا EMA9 > EMA20
  const macdSignal = ema9 > ema20 ? 'صعود' : 'هبوط';

  // حجم التداول
  const volumeSignal = true; // افتراضي

  // MFI
  const mfi = 40; // أقل من 50 = دعم شراء

  // حساب نقاط الدخول: نعتبر المؤشر إيجابي إذا تحقق شرطه
  let score = 0;
  if (ema9 > ema20) score++;
  if (rsi < 50) score++;
  if (macdSignal === 'صعود') score++;
  if (volumeSignal) score++;
  if (mfi < 50) score++;

  const entrySignal = score >= 3 ? '✅ دخول' : '❌ خروج';

  return { ema9, ema20, rsi, macdSignal, mfi, score, entrySignal };
}

app.get('/api/aramco', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.saudiexchange.sa/', { waitUntil: 'networkidle2' });

    await page.waitForSelector('tr[data-symbol="2222.SR"]');
    const rawData = await page.evaluate(() => {
      const row = document.querySelector('tr[data-symbol="2222.SR"]');
      return {
        name: row.querySelector('.stock-name').innerText,
        symbol: row.dataset.symbol,
        price: parseFloat(row.querySelector('.last-price').innerText.replace(/,/g,'')),
        change: row.querySelector('.change').innerText,
        volume: row.querySelector('.volume').innerText
      };
    });

    const indicators = calculateIndicators(rawData.price);

    await browser.close();

    res.json({ ...rawData, ...indicators });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
