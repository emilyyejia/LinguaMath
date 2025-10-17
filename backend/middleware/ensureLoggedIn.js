// backend/middleware/ensureLoggedIn.js
module.exports = function (req, res, next) {
  // Allow preflight requests
  if (req.method === 'OPTIONS') return next();

  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  next();
};
