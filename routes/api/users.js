// Author:       Michael Torres
// Filename:     users.js
// Description:  The purpose of this file is to route to the users route

const express = require('express');
const router = express.Router();

// @route     GET api/users
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('Testing User Route'));

module.exports = router;