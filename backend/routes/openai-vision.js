const express = require("express");
const multer = require("multer");
const router = express.Router();
const VisionCtrl = require("../controllers/openai-vision");
const upload = multer({ dest: "uploads/" }); 
router.post("/", upload.single("image"), VisionCtrl.create);

module.exports = router;
