// Author:       Michael Torres
// Filename:     users.js
// Description:  The purpose of this file is to route to the users route

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     POST api/users/register
// @desc      Register user
// @access    Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password', 'A password of 6 or more characters is required').isLength({ min: 6 })
  ],
  async (req, res) => {
    // Handle response
    const errors = validationResult(req);

    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{msg: 'User already exists!' }]});
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({ name, email, avatar, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();

      const data = {
        user: {
          id: user.id
        }
      }

      // TODO: Change expired time to 1 hr (36000) when deployed
      jwt.sign(
        data,
        config.get('secretOrKey'),
        { expiresIn: 360000},
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