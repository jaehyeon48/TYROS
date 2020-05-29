const Portfolio = require('../models/PortfolioModel');
const Stock = require('../models/StockModel');

// @ROUTE         GET api/portfolio
// @DESCRIPTION   Load all portfolios
// @ACCESS        Private
async function getAllPortfolios(req, res) {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id });

    res.json(portfolios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         GET api/portfolio/:portfolioId
// @DESCRIPTION   Get portfolio by its id
// @ACCESS        Private
async function getPortfolioById(req, res) {
  try {
    const portfolio = await Portfolio.findOne({ id: req.params.id });

    if (!portfolio) {
      return res.status(404).json({ msg: 'Cannot find a portfolio!' });
    }

    return res.json(portfolio);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}


// @ROUTE         POST api/portfolio
// @DESCRIPTION   Create a new portfolio
// @ACCESS        Private
async function createNewPortfolio(req, res) {
  const { name } = req.body;
  try {
    const isNameExist = await Portfolio.findOne({ name });

    if (!!isNameExist) {
      return res.status(400).json({ 'msg': 'Portfolio name is already exist. Try another name!' });
    }

    const newPortfolio = new Portfolio({
      user: req.user.id,
      name
    });

    const createdPortfolio = await newPortfolio.save();

    res.json(createdPortfolio);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         PATCH api/portfolio/:portfolioId
// @DESCRIPTION   Edit portfolio name
// @ACCESS        Private
async function editPortfolioName(req, res) {
  try {
    const portfolio = await Portfolio.findById(req.params.portfolioId);

    if (!portfolio) {
      return res.status(404).json({ msg: 'Cannot find a portfolio!' });
    }

    portfolio.name = req.body.name;

    await portfolio.save();

    return res.json(portfolio);
  } catch (error) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         DELETE api/portfolio/:portfolioId
// @DESCRIPTION   delete portfolio and its stocks
// @ACCESS        Private
async function deletePortfolio(req, res) {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.portfolioId);
    await Stock.deleteMany({ portfolio: portfolio._id });
    return res.json(portfolio);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createNewPortfolio,
  editPortfolioName,
  deletePortfolio
};