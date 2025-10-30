const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

console.log('✅ Auth routes loaded');
console.log('✅ deleteAccount function exists:', typeof authCtrl.deleteAccount);

// All paths start with '/api/auth'
router.post('/signup', authCtrl.signUp);
router.post('/login', authCtrl.logIn);
router.delete('/account', ensureLoggedIn, authCtrl.deleteAccount);

console.log('✅ DELETE /account route registered');

module.exports = router;