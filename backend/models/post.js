const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  inputType: { type: String, enum: ["text", "image"], required: true },
  inputText: { type: String },
  imageUrl: { type: String },
  sourceLanguage: { type: String, default: "en" },
  targetLanguage: { type: String, default: "zh" },
  translation: { type: String },
  culture: { type: String },
  hint: { type: String },
  savedToLog: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("Post", postSchema);
