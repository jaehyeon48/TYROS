const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllShares,
  getSharesOfPortfolio,
  createNewPosition
} = require('../controllers/stockControllers');


// @ROUTE         GET api/stock
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
router.get('/', auth, getAllShares);

// @ROUTE         GET api/stock/:portfolioId
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
router.get('/:portfolioId', auth, getSharesOfPortfolio);

// @ROUTE         POST api/stock
// @DESCRIPTION   Create a new position
// @ACCESS        Private
router.post('/', auth, createNewPosition);

module.exports = router;