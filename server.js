import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// يقدم index.html و script.js
app.use(express.static(__dirname));

app.get("/api/stocks", async (req, res) => {
  try {
    const symbols = "AAPL,MSFT,GOOG,AMZN,TSLA,META,NVDA,ORCL,IBM,INTC";
    const apiKey = "8d9db8192762438d9f8b0ac4bf86475e"; // ✅ المفتاح الصحيح
    const url = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("❌ خطأ في جلب البيانات:", error);
    res.status(500).json({ error: "فشل في جلب البيانات" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});
