import express from "express";
import cors from "cors";
import { getAramcoData } from "./scraper.js";

const app = express();
app.use(cors());

// API endpoint لسهم أرامكو
app.get("/api/aramco", async (req, res) => {
  try {
    const data = await getAramcoData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to scrape Aramco data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
