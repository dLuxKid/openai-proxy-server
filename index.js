import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/chat", async (req, res) => {
  const { input } = req.body;

  const response = await client.responses.create({
    model: "gpt-4.1",
    instructions:
      "You are an expert email assistant. Generate concise, actionable emails. Use placeholders like [Name] if details are missing. Tone should be mainly professional but can be informal based on the context of the input",
    input,
  });

  res.status(201).json({ status: "successful", message: response.output_text });
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
