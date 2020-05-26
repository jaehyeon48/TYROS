const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllShares,
  createNewPosition
} = require('../controllers/stockControllers');


// @ROUTE         GET api/stock
// @DESCRIPTION   Load all shares of the user
// @ACCESS        Private
router.get('/', auth, getAllShares)

// @ROUTE         POST api/stock
// @DESCRIPTION   Create a new position
// @ACCESS        Private
router.post('/', auth, createNewPosition);

module.exports = router;