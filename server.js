import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// لمعالجة __dirname مع ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ تقديم الملفات الثابتة (index.html + script.js)
app.use(express.static(__dirname));

// ✅ API لجلب بيانات الأسهم
app.get("/api/stocks", async (req, res) => {
  try {
    const symbols = "AAPL,MSFT,GOOG,AMZN,TSLA,META,NVDA,ORCL,IBM,INTC"; // 10 أسهم
    const apiKey = "8cde9bd31a70482ab1304d7f8bfaad72"; // مفتاح Twelve Data
    const url = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("❌ خطأ في جلب البيانات:", error);
    res.status(500).json({ error: "فشل في جلب البيانات" });
  }
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});
