const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllPortfolios,
  createNewPortfolio
} = require('../controllers/portfolioController');

// @ROUTE         GET api/portfolio
// @DESCRIPTION   Load all portfolios
// @ACCESS        Private
router.get('/', auth, getAllPortfolios);

// @ROUTE         POST api/portfolio
// @DESCRIPTION   Create a new portfolio
// @ACCESS        Private
router.post('/', auth, createNewPortfolio);

module.exports = router;