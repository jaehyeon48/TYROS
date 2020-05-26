const Cash = require('../models/CashModel');


// @ROUTE         GET api/cash
// @DESCRIPTION   Load all cashes of the user
// @ACCESS        Private
async function getAllCash(req, res) {
  try {
    const cashes = await Cash.find({ holder: req.user.id });
    res.json(cashes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         POST api/cash
// @DESCRIPTION   Create a new cash position
// @ACCESS        Private
async function createNewCashPosition(req, res) {
  const { quantity, transactionDate, transactionType } = req.body;

  try {
    const newCashPosition = new Cash({
      quantity,
      transactionDate,
      transactionType,
      holder: req.user.id
    });

    const cashPosition = await newCashPosition.save();

    res.json(cashPosition);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = {
  getAllCash,
  createNewCashPosition
};