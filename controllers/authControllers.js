const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

// @ROUTE         GET api/auth
// @DESCRIPTION   check authentication
// @ACCESS        Private
async function checkAuthCtrl(req, res) {
  try {
    const user = await User.findById(req.user.id, '-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         POST api/auth
// @DESCRIPTION   Login user and get token
// @ACCESS        Public
async function loginCtrl(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Email or Password is invalid. Please check again!' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ msg: 'Email or Password is invalid. Please check again!' });
    }

    const jwtPayload = {
      user: { id: user.id }
    };

    jwt.sign(jwtPayload, config.get('jwtSecret'), { expiresIn: '12h' }, (err, token) => {
      if (err) throw err;
      return res.status(200).cookie('token', token, { httpOnly: true }).send();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

// @ROUTE         GET api/auth/logout
// @DESCRIPTION   logout
// @ACCESS        Private
function logOutCtrl(req, res) {
  res.status(200).cookie('token', '', { maxAge: '-1' }).send();
}

module.exports = {
  checkAuthCtrl,
  loginCtrl,
  logOutCtrl
}