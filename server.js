const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

// مفتاح Twelve Data
const API_KEY = "8cde9bd31a70482ab1304d7f8bfaad72";

// رموز بعض الأسهم السعودية
const symbols = [
  "2222.SR", // أرامكو
  "7010.SR", // STC
  "1120.SR", // الراجحي
  "1180.SR", // الأهلي
  "2010.SR", // سابك
  "1080.SR", // العربي الوطني
  "1140.SR", // بنك البلاد
  "2380.SR", // بترو رابغ
  "4200.SR", // الدريس
  "4003.SR"  // إكسترا
];

app.get('/api/stocks', async (req, res) => {
  try {
    const promises = symbols.map(sym => {
      return fetch(`https://api.twelvedata.com/quote?symbol=${sym}&apikey=${API_KEY}&source=docs`)
        .then(r => r.json())
        .then(data => ({
          name: data.name || sym,
          symbol: sym,
          price: data.close,
          change: data.percent_change,
          volume: data.volume,
          exchange: data.exchange
        }));
    });

    const stocks = await Promise.all(promises);
    res.json(stocks);
  } catch (err) {
    console.error("Error fetching via API:", err);
    res.status(500).json({ error: "Failed to fetch stocks via API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
