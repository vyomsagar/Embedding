import express from "express";
import ollama from "ollama";
import { embedding, getAnswer } from "./embedding.js";
import connectDB from "./db.js";
import { configDotenv } from "dotenv";
import Embed from "./embedSchema.js";

configDotenv();


const app = express();

app.use(express.json());

connectDB();

const PORT = 3000;

app.post("/savedata", async (req, res) => {
  try {
    const { text } = req.body;
    const embed = await embedding(text);

    try {
        const newEmbed = new Embed({
        text,
        embedding: embed,
    })
    await newEmbed.save();
    }
    catch (error) {
        console.error("Error saving embedding to database:", error);
    }

    if (embed){
        return res.status(200).json({ message: "Embedding generated successfully" });
    }

  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post('/ask', async (req, res)=> {
    try{
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }
        const answer = await getAnswer(query);
        return res.status(200).json({ answer });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"});
    }
})

app.post("/", async (req, res) => {
 const result = await ollama.chat({
  model: "llama3",
  messages: [
    { role: "user", content: "Hello" }
  ]
});

console.log(result.message.content);
return res.status(200).json({ message: result.message.content });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
