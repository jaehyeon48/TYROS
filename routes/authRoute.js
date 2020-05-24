const express = require('express');

const router = express.Router();

const { loginCtrl } = require('../controllers/authControllers');

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
router.post('/', loginCtrl);

module.exports = router;