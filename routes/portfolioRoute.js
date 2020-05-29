const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllPortfolios,
  getPortfolioById,
  createNewPortfolio,
  editPortfolioName,
  deletePortfolio
} = require('../controllers/portfolioController');

// @ROUTE         GET api/portfolio
// @DESCRIPTION   Load all portfolios
// @ACCESS        Private
router.get('/', auth, getAllPortfolios);

// @ROUTE         GET api/portfolio/:portfolioId
// @DESCRIPTION   get portfolio by its id
// @ACCESS        Private
router.get('/:portfolioId', auth, getPortfolioById);

// @ROUTE         POST api/portfolio
// @DESCRIPTION   Create a new portfolio
// @ACCESS        Private
router.post('/', auth, createNewPortfolio);

// @ROUTE         PATCH api/portfolio/:portfolioId
// @DESCRIPTION   Edit portfolio name
// @ACCESS        Private
router.patch('/:portfolioId', auth, editPortfolioName);

// @ROUTE         DELETE api/portfolio/:portfolioId
// @DESCRIPTION   delete portfolio and its stocks
// @ACCESS        Private
router.delete('/:portfolioId', auth, deletePortfolio);

module.exports = router;