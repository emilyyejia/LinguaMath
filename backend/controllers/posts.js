const Post = require("../models/post");
module.exports = {
  create,
  index,
};

async function index(req, res) {
  try {
    const posts = await Post.find({});
    // below would return all posts for just the logged in user
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function create(req, res) {
  try {
    // assign the user
    req.body.user = req.user._id;

    // default to "text" if inputType not provided
    if (!req.body.inputType) req.body.inputType = "text";

    // map frontend 'content' to schema 'inputText'
    if (!req.body.inputText && req.body.content) {
      req.body.inputText = req.body.content;
    }

    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create post" });
  }
}
