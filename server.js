const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/aramco', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.saudiexchange.sa/wps/portal/tadawul/market-watch/', {waitUntil: 'networkidle2'});

        // جلب البيانات (هنا كمثال، تحتاج التحقق من Selector الصحيح)
        const data = await page.evaluate(() => {
            const row = document.querySelector('tr[data-symbol="2222.SR"]');
            if (!row) return {};
            const cells = row.querySelectorAll('td');
            return {
                name: 'أرامكو',
                symbol: '2222.SR',
                price: cells[2]?.innerText || 'N/A',
                percent: cells[3]?.innerText || 'N/A',
                signal: cells[3] && parseFloat(cells[3].innerText) > 0 ? '✅ دخول' : '❌ خروج'
            };
        });

        await browser.close();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
