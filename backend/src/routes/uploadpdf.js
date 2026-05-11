import express from "express";
import fs from "fs";
import PdfParse from 'pdf-parse-new';
import upload from "../middleware/upload.js";
import { embedding } from "../../embedding.js";
import Embed from "../../embedSchema.js";

const router = express.Router();
router.post('/upload-pdf', upload.single("file"), async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    filePath = req.file.path;

    // console.log("PDF uploaded:", req.file.originalname);

    const text = await extractTextFromPDF(filePath);

    if (!text) {
      return res.status(400).json({ error: "No text found in PDF" });
    }

    const cleanedText = text
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const chunks = chunkText(cleanedText);

    // console.log("Total chunks:", chunks.length);

    for (let chunk of chunks) {
      if (!chunk.trim()) continue;

      const emb = await embedding(chunk);

      await Embed.create({
        text: chunk,
        embedding: emb
      });
    }

    res.json({ message: "PDF processed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });

  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

const extractTextFromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await PdfParse(buffer);

  return data.text;
};

const chunkText = (text, size = 500) => {
  const chunks = [];

  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }

  return chunks;
};





export default router;