const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllShares,
  getSharesOfPortfolio,
  getRealTimePrice,
  getChangeOfShare,
  getChangePercentOfShare,
  createNewPosition,
} = require('../controllers/stockControllers');


// @ROUTE         GET api/stock
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
router.get('/', auth, getAllShares);

// @ROUTE         GET api/stock/realTime/:ticker
// @DESCRIPTION   get real time price of a share
// @ACCESS        Private
router.get('/realTime/:ticker', auth, getRealTimePrice);

// @ROUTE         GET api/stock/change/:ticker
// @DESCRIPTION   get change of the share from previous day
// @ACCESS        Private
router.get('/change/:ticker', auth, getChangeOfShare);

// @ROUTE         GET api/stock/changePercent/:ticker
// @DESCRIPTION   get change percent of the share from previous day
// @ACCESS        Private
router.get('/changePercent/:ticker', auth, getChangePercentOfShare);


// @ROUTE         GET api/stock/:portfolioId
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
router.get('/:portfolioId', auth, getSharesOfPortfolio);

// @ROUTE         POST api/stock
// @DESCRIPTION   Create a new position
// @ACCESS        Private
router.post('/', auth, createNewPosition);

module.exports = router;