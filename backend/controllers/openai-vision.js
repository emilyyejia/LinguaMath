const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

async function uploadToS3(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: fileContent,
    ContentType: "image/jpeg",
  });
  await s3.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
}

async function create(req, res) {
  try {
    const { prompt } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No image uploaded." });

    const fileName = `${Date.now()}-${file.originalname}`;
    const imageUrl = await uploadToS3(file.path, fileName);

    console.log("Prompt:", prompt);
    console.log("Uploaded Image URL:", imageUrl);

    // OpenAI Vision API (multimodal)
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt || "Analyze this image." },
            { type: "input_image", image_url: imageUrl }
          ]
        }
      ]
    });

    const aiReply = response.output_text;
    res.json({ reply: aiReply });

    fs.unlinkSync(file.path);
  } catch (err) {
    console.error("OpenAI Vision API Error:", err);
    res.status(500).json({ error: "Failed to get response from OpenAI Vision" });
  }
}

module.exports = { create };
