import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for prototype
  const articles: any[] = [];

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/news", async (req, res) => {
    try {
      const { category = "Tech" } = req.query;
      
      // If we have articles in memory, return them (filtered by category if needed)
      // For the prototype, we'll generate them on the fly if empty
      if (articles.length === 0) {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-pro-preview",
          contents: `Generate 5 breaking news articles about ${category} and AI. 
          Return a JSON array of objects with the following properties:
          - id (string, unique)
          - title (string, catchy headline)
          - summary (string, 60-second read summary)
          - content (string, full article content, at least 3 paragraphs)
          - category (string, e.g., "AI", "Startups", "Gadgets")
          - author (string, fictional journalist name)
          - publishedAt (string, ISO date string for today)
          - readTime (number, estimated minutes)
          - imageUrl (string, a descriptive keyword for an image, e.g., "robotics", "server-room")`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  content: { type: Type.STRING },
                  category: { type: Type.STRING },
                  author: { type: Type.STRING },
                  publishedAt: { type: Type.STRING },
                  readTime: { type: Type.NUMBER },
                  imageUrl: { type: Type.STRING },
                },
                required: ["id", "title", "summary", "content", "category", "author", "publishedAt", "readTime", "imageUrl"],
              }
            }
          }
        });

        const generatedArticles = JSON.parse(response.text || "[]");
        articles.push(...generatedArticles);
      }

      res.json(articles);
    } catch (error) {
      console.error("Error generating news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
