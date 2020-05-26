const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  holder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' },
  ticker: { type: String, required: true },
  pricePerShare: { type: Number, required: true },
  quantity: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, required: true }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;