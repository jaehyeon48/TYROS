const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
  holder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, required: true }
});

const Cash = mongoose.model('Cash', cashSchema);

module.exports = Cash;