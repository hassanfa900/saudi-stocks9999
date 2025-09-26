import express from "express";
import fetch from "node-fetch";

const app = express();
const API_KEY = "8d9db8192762438d9f8b0ac4bf86475e"; // مفتاحك
const SYMBOL = "2222.SR"; // سهم أرامكو

app.use(express.static("./"));

app.get("/api/aramco", async (req, res) => {
  try {
    const url = `https://api.twelvedata.com/quote?symbol=${SYMBOL}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const changePercent = parseFloat(data.percent_change) || 0;
    const signal = changePercent > 0 ? "✅ دخول" : "❌ خروج";

    res.json({
      name: data.name || "Aramco",
      symbol: SYMBOL,
      price: data.close || 0,
      change: data.change || 0,
      percent: data.percent_change || "0%",
      signal: signal
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "فشل في جلب البيانات" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`));
