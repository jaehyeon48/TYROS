const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');

const connectDB = require('./config/db');

connectDB(); // Connect to DB

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/user', require('./routes/userRoute'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// https.createServer(options, app).listen(PORT, () => console.log(`Server is running on port ${PORT}`));