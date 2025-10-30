const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    signUp,
    logIn,
    deleteAccount,
};

async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Duplicate Email' });
  }
}

async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Bad Credentials' });
  }
}

async function deleteAccount(req, res) {
  try {
    // req.user is populated by your auth middleware
    const userId = req.user._id;
    
    // Optional: Verify password before deletion for extra security
    if (req.body.password) {
      const user = await User.findById(userId);
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }
    
    // Delete the user account
    await User.findByIdAndDelete(userId);
    
    // Optional: Delete related data (posts, etc.)
    // await Post.deleteMany({ user: userId });
    
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ message: 'Failed to delete account' });
  }
}

/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}