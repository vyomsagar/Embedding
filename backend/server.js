import express from "express";
import ollama from "ollama";
import { embedding, getAnswer } from "./embedding.js";
import connectDB from "./db.js";
import { configDotenv } from "dotenv";
import Embed from "./embedSchema.js";
import uploadpdfRoutes from "./src/routes/uploadpdf.js";
import cors from "cors";

configDotenv();


const app = express();

app.use(cors());
app.use(express.json());


connectDB();

const PORT = 3000;

app.post("/savedata", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    // ✅ Check duplicate FIRST
    const existing = await Embed.findOne({ text });

    if (existing) {
      return res.status(400).json({
        message: "This text already exists"
      });
    }

    // ✅ Then generate embedding
    const embed = await embedding(text);

    // ✅ Save
    await Embed.create({
      text,
      embedding: embed
    });

    return res.status(200).json({
      message: "Text saved successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error saving data"
    });
  }
});

app.post('/ask', async (req, res)=> {
    try{
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }
        const answer = await getAnswer(query);
        console.log("Answer from getAnswer:", answer);
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"});
    }
})

app.use('/pdf', uploadpdfRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
