const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // if token does not exist
  if (!token) {
    return res.status(401).json({ msg: 'Token missing, authorization denied!' });
  }

  // if there is a token
  try {
    const decoded = jwt.verify(token, config.get('secretOrKey'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid!' });
  }
}