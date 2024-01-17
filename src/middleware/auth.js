const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const resObj = require('../utils/resObj');

module.exports = async (req, res, next) => {
  let token; // intialize token globally first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization?.split(' ')[1];
  }

  if (!token) {
    return resObj.fail(res, 401, {
      message: 'No token, authorization denied',
    });
  }

  // Verify token
  try {
    // this step is to convert callback to promise and avoid blocking the event loop
    const verifyAsync = promisify(jwt.verify);
    decoded = await verifyAsync(token, process.env.JWT_SECRET);

    // check if user still exists
    const userExistence = await User.findById(decoded.id);
    if (!userExistence) {
      return resObj.fail(res, 401, {
        message: 'The user belonging to this token does not exist anymore',
      });
    }

    // check if user changed password after the token was issued
    if (userExistence.passwordGotChanged(decoded.iat)) {
      return resObj.fail(res, 401, {
        message: 'User recently changed password! Please log in again',
      });
    }

    // pass user data to next middleware
    req.user = userExistence;
    next();
  } catch (err) {
    resObj.fail(res, 401, {
      message: 'Token is not valid',
    });
  }
};
