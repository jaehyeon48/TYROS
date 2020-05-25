const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  checkAuthCtrl,
  loginCtrl
} = require('../controllers/authControllers');

// @ROUTE         GET api/auth
// @DESCRIPTION   check authentication
// @ACCESS        Private
router.get('/', auth, checkAuthCtrl)

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', loginCtrl);

module.exports = router;