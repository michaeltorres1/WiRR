// Author:       Michael Torres
// Filename:     auth.js
// Description:  The purpose of this file is to route to the auth route

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route     GET api/auth
// @desc      Auth route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Authenticate user & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password field cannot be empty').exists()
  ],
  async (req, res) => {
    // Handle response
    const errors = validationResult(req);

    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials!' }] });
      }

      const passWordsMatch = await bcrypt.compare(password, user.password);

      if (!passWordsMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials!' }]});
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      // TODO: Change expired time to 1 hr (36000) when deployed
      jwt.sign(
        payload,
        config.get('secretOrKey'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message).send('Server Error');
    }

  }
);

module.exports = router;