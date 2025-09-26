const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// ====== تعديل المفتاح هنا إذا أردت ======
const API_KEY = "8d9db8192762438d9f8b0ac4bf86475e";
const SYMBOL = "2222.SR"; // سهم أرامكو

app.get('/api/aramco', async (req, res) => {
  try {
    const url = `https://api.twelvedata.com/quote?symbol=${SYMBOL}&apikey=${API_KEY}`;
    const response = await fetch(url, { timeout: 10000 });
    const data = await response.json();

    // شكل البيانات التي نعيدها للواجهة
    const result = {
      name: data.name || "Aramco",
      symbol: SYMBOL,
      price: data.close ?? null,
      change: data.change ?? null,
      percent_change: data.percent_change ?? null,
      volume: data.volume ?? null,
      timestamp: new Date().toISOString()
    };

    res.json(result);
  } catch (err) {
    console.error("Error fetching aramco:", err);
    res.status(500).json({ error: "Failed to fetch aramco data" });
  }
});

// fallback index (optional) - serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
