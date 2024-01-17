const User = require('../models/User');
const jwt = require('jsonwebtoken');
const resObj = require('../utils/resObj');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false, // set to true in production
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: token,
  });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    try {
      await User.create({
        username,
        password: password,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: error.message,
        },
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        message: 'User registered successfully',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))) {
      return resObj.fail(res, 400, 'Invalid username or password');
    }

    sendToken(res, 200, user);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};

exports.me = async (req, res) => {
  try {
    // get user data from auth middleware
    const user = req.user;
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
