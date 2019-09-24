// Author:       Michael Torres
// Filename:     users.js
// Description:  The purpose of this file is to route to the users route

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password', 'A password of 6 or more characters is required').isLength({ min: 6 })
  ],
  (req, res) => {
    // Handle response
    const errors = validationResult(req);

    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('Users...');
  }
);

module.exports = router;