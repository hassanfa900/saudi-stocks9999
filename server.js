const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = '8d9db8192762438d9f8b0ac4bf86475e'; // مفتاح Twelve Data

app.use(cors());
app.use(express.static('public'));

app.get('/api/aramco', async (req, res) => {
    try {
        const url = `https://api.twelvedata.com/quote?symbol=2222.SR&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        // حساب إشارة الدخول والخروج
        const price = parseFloat(data.close) || 0;
        const change = parseFloat(data.change) || 0;
        const percent = parseFloat(data.percent_change) || 0;
        const volume = parseInt(data.volume) || 0;

        const signal = percent > 0 ? '✅ دخول' : '❌ خروج';

        res.json({
            name: 'أرامكو',
            symbol: '2222.SR',
            price,
            change,
            percent,
            volume,
            signal
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
