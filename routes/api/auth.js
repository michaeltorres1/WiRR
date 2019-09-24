// Author:       Michael Torres
// Filename:     auth.js
// Description:  The purpose of this file is to route to the auth route

const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('Testing Auth Route'));

module.exports = router;