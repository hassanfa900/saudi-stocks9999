const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/stocks', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(
      'https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/main-market-watch',
      { waitUntil: 'networkidle2', timeout: 0 }
    );

    // 🔽 نسحب أول 10 أسطر فقط
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr')).slice(0, 10);
      return rows.map(row => {
        const cols = row.querySelectorAll('td');
        return {
          name: cols[0]?.innerText.trim() || 'N/A',
          symbol: cols[1]?.innerText.trim() || 'N/A',
          price: cols[2]?.innerText.trim() || 'N/A',
          change: cols[3]?.innerText.trim() || 'N/A'
        };
      });
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching stock data:', err);
    res.status(500).send('Error fetching stock data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
