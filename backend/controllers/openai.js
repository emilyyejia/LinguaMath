const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function create(req, res) {
  try {
    const { prompt } = req.body;
    console.log("Text Prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-5" if available
      messages: [
        { role: "system", content: "You are a helpful math assistant." },
        { role: "user", content: prompt },
      ],
    });

    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (err) {
    console.error("OpenAI Text API Error:", err);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
}

module.exports = { create };
