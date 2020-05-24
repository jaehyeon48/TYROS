const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/UserModel');

// @ROUTE         POST api/user
// @DESCRIPTION   Register user
// @ACCESS        Public
async function signUpCtrl(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (!!isUserExist) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    const jwtPayload = {
      user: { id: newUser.id }
    };

    jwt.sign(jwtPayload, config.get('jwtSecret'), { expiresIn: '12h' }, (err, token) => {
      if (err) throw err;
      res.status(200).cookie('token', token, { httpOnly: true }).send();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}

module.exports = { signUpCtrl };