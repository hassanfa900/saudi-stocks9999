const express = require("express");
const cors = require("cors");
const { scrapeStocks } = require("./scraper");

const app = express();
app.use(cors());

app.get("/api/stocks", async (req, res) => {
  try {
    const data = await scrapeStocks();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stock data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
