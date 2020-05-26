const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const {
  getAllCash,
  createNewCashPosition
} = require('../controllers/cashControllers');

// @ROUTE         GET api/cash
// @DESCRIPTION   Load all cashes of the user
// @ACCESS        Private
router.get('/', auth, getAllCash);


// @ROUTE         POST api/cash
// @DESCRIPTION   Create a new cash position
// @ACCESS        Private
router.post('/', auth, createNewCashPosition);

module.exports = router;