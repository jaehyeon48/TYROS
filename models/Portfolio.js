const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;