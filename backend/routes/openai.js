const express = require("express");
const router = express.Router();
const OpenAICtrl = require("../controllers/openai");

router.post("/", OpenAICtrl.create);

module.exports = router;
