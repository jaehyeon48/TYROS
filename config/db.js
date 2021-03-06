const mongoose = require('mongoose');
const config = require('config');

const MONGO_URI = config.get('mongoURI');

console.log(MONGO_URI)

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);

    // Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;