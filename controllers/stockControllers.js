const Stock = require('../models/StockModel');
const Portfolio = require('../models/PortfolioModel');
const axios = require('axios');

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

// @ROUTE         GET api/stock/realTime/:ticker
// @DESCRIPTION   get real time price of a share
// @ACCESS        Private
async function getRealTimePrice(req, res) {
  const ticker = req.params.ticker.toUpperCase();
  const url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/iexRealtimePrice?token=pk_37e934a52c6a451182f2dbf16615da50`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    if (err.response.status === 404) {
      res.status(404).json({ msg: 'The market is closed now.' });
    }
    console.error(err);
  }
}

// @ROUTE         GET api/stock/close/:ticker
// @DESCRIPTION   get close price of a share
// @ACCESS        Private
async function getClosePrice(req, res) {
  const ticker = req.params.ticker.toUpperCase();
  const url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/close?token=pk_37e934a52c6a451182f2dbf16615da50`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    if (err.response.status === 404) {
      res.status(404).json({ msg: 'Could not get close price' });
    }
    console.error(err);
  }
}

// @ROUTE         GET api/stock/change/:ticker
// @DESCRIPTION   get change of the share from previous day
// @ACCESS        Private
async function getChangeOfShare(req, res) {
  const ticker = req.params.ticker.toUpperCase();
  const url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/change?token=pk_37e934a52c6a451182f2dbf16615da50`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
  }
}

// @ROUTE         GET api/stock/changePercent/:ticker
// @DESCRIPTION   get change percent of the share from previous day
// @ACCESS        Private
async function getChangePercentOfShare(req, res) {
  const ticker = req.params.ticker.toUpperCase();
  const url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote/changePercent?token=pk_37e934a52c6a451182f2dbf16615da50`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err);
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
  getRealTimePrice,
  getClosePrice,
  getChangeOfShare,
  getChangePercentOfShare,
  createNewPosition
};