const express = require('express');

const router = express.Router();

const { signUpCtrl } = require('../controllers/userControllers');

// @ROUTE         POST api/user
// @DESCRIPTION   Register user
// @ACCESS        Public
router.post('/', signUpCtrl);

module.exports = router;