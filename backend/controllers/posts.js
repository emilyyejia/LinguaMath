
const Post = require('../models/post');
;
module.exports = {
    create,
};

// async function index(req, res) {
//   try {
//     const posts = await Post.find({});
//     // below would return all posts for just the logged in user
//     res.json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Failed to fetch posts' });
//   }
// }

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create post' });
  }
}

