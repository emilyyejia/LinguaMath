const express = require("express");
const aws = require("aws-sdk");
require("dotenv").config();
const router = express.Router();

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

router.get("/api/s3url", async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}.jpg`,
    Expires: 60,
    ContentType: "image/jpeg",
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  res.json({ url });
});

module.exports = router;
