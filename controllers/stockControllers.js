const Stock = require('../models/StockModel');
const Portfolio = require('../models/PortfolioModel');

// @ROUTE         GET api/stock
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
async function getAllShares(req, res) {
  try {
    const allShares = await Stock.find({ holder: req.user.id }).sort({ _id: -1 });
    res.json(allShares);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         GET api/stock/:portfolioId
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
async function getSharesOfPortfolio(req, res) {
  try {
    const allShares = await Stock.find({ holder: req.user.id }).sort({ _id: -1 });

    const sharesOfPortfolio = allShares.filter(share => share.portfolio.toString() === req.params.portfolioId);

    return res.json(sharesOfPortfolio);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         POST api/stock
// @DESCRIPTION   Create a new position
// @ACCESS        Private
async function createNewPosition(req, res) {
  const { ticker, pricePerShare, quantity, transactionDate, transactionType, portfolioId } = req.body;
  try {
    const newPosition = new Stock({
      ticker,
      pricePerShare,
      quantity,
      transactionDate,
      transactionType,
      holder: req.user.id,
      portfolio: portfolioId
    });

    const position = await newPosition.save();

    res.json(position);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = {
  getAllShares,
  getSharesOfPortfolio,
  createNewPosition
};