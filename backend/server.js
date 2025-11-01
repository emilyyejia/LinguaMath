const path = require('path'); // Built into Node
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();

// Force HTTPS on all requests
// Force HTTPS on all requests (production only)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.use(cors({
  origin: [
    'https://linguamath-d1c9e2effc7a.herokuapp.com',
    'https://www.linguamath.ca',
    'http://localhost:5173',
    'http://localhost:3000',
    'capacitor://localhost',  // Add this for iOS app
    'ionic://localhost',       // Also add this for good measure
    'http://localhost'
  ],
  credentials: true
}));
// Process the secrets/config vars in .env
require('dotenv').config();

// Connect to the database
require('./db');



app.use(logger('dev'));
// Serve static assets from the frontend's built code folder (dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Note that express.urlencoded middleware is not needed
// because forms are not submitted!
app.use(express.json());
 // Middleware to check the request's headers for a JWT and
 // verify that it's a valid.  If so, it will assign the
 // user object in the JWT's payload to req.user
 app.use(require('./middleware/checkToken'));
// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/openai', require('./routes/openai'));
app.use('/api/openai-vision', require('./routes/openai-vision'));

// Use a "catch-all" route to deliver the frontend's production index.html
app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});