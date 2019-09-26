let express = require('express');
let cors = require('cors');

import app from 'express';


app.use(cors())

// Set up a whitelist and check against it:
var whitelist = ['https://en.wikipedia.org/wiki/Almond_milk']

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Then pass them to cors:
app.use(cors(corsOptions));