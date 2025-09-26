import express from "express";
import fetch from "node-fetch";

const app = express();

// مفتاحك
const API_KEY = "8d9db8192762438d9f8b0ac4bf86475e";

// قائمة بالأسهم السعودية اللي تريد جلبها
const symbols = ["2222.SR","7010.SR","1120.SR","2002.SR","1211.SR","1050.SR","2010.SR","2330.SR","3010.SR","4000.SR"];

app.get("/api/stocks", async (req, res) => {
  try {
    const results = [];

    for (const symbol of symbols) {
      const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      // حساب إشارة دخول/خروج مبسطة
      const changePercent = parseFloat(data.percent_change) || 0;
      const signal = changePercent > 0 ? "✅ دخول" : "❌ خروج";

      results.push({
        name: data.name || symbol,
        symbol: symbol,
        price: data.close || 0,
        change: data.change || 0,
        percent: data.percent_change || "0%",
        signal: signal
      });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "فشل في جلب البيانات" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`));
