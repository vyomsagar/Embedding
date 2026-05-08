import ollama  from "ollama";
import Embed from "./embedSchema.js";

export const embedding = async (text) => {
    try {

    if (!text) {
      throw new Error("Text is required");
    }

    const response = await ollama.embed({
      model: "nomic-embed-text:latest",
      input: text,
    });

    return  response.embeddings[0];

    

  } catch (error) {
    throw error;
  }
}


function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}


export const getAnswer = async (query) => {
     try {
    const question = query;

    const queryEmbedding = await embedding(question);

    const notes = await Embed.find({});

    const results = notes.map(note => ({
      text: note.text,
      score: cosineSimilarity(queryEmbedding, note.embedding)
    }));

    const topResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const context = topResults.map(r => r.text).join("\n");

    const response = await ollama.chat({
      model: "llama3",
      messages: [
        {
          role: "system",
          content: "Answer only using the provided context."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`
        }
      ]
    });

    return { answer: response.message.content };

  } catch (err) {
    throw new Error("Error generating answer");
  }
}

