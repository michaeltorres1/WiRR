// Author:       Michael Torres
// Filename:     auth.js
// Description:  The purpose of this file is to validate the token for the
//               current logged in user

const jwt = require('jsonwebtoken');
const config = require('../config/keys.js');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // if token does not exist
  if (!token) {
    return res.status(401).json({ msg: 'Token missing, authorization denied!' });
  }

  // if there is a token
  try {
    const decodedToken = jwt.verify(token, config.secretOrKey);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid!' });
  }
}