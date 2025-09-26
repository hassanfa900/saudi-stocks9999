const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/api/stocks', async (req, res) => {
    const data = [
        { name: "شركة أ", symbol: "AAA", price: 120.5, entry: 80, signal: "✅ دخول" },
        { name: "شركة ب", symbol: "BBB", price: 45.2, entry: 20, signal: "❌ خروج" },
        { name: "شركة ج", symbol: "CCC", price: 78.9, entry: 60, signal: "✅ دخول" }
    ];
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
