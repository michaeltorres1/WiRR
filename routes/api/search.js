const express = require('express');
const articleRoutes = express.Router();
const mongoose = require('mongoose');
const Article = require('../../models/Article');

articleRoutes.get('/:keyword', (req, res) => {
  Article.find({ title: req.params.keyword })
    .sort({ wirrScore: -1 })
    .then(article => res.json(article))
    .catch(err =>
      res.status(404).json({ notweetsfound: 'No article found' }
      )
    );
});

module.exports = articleRoutes;