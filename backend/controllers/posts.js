const Post = require("../models/post");
module.exports = {
  create,
  index,
};

async function index(req, res) {
  try {
    const posts = await Post.find({ user: req.user._id, savedToLog: true });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function create(req, res) {
  console.log("User from token:", req.user);
  try {
    const post = await Post.create({ ...req.body, user: req.user._id });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create post" });
  }
}


