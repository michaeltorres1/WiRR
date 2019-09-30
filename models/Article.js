const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {type: String, required: true, unique: true},
  snippet: {type: String, required: true},
  description: {type: String, required: true},
  url: {type: String, required: true},
  category: {type: Array, required: true},
  references: {type: Array, required: true},
  // lastUpdated: {type: String, required: true},
  // contributors: {
  //   username: {type: String, required: true},
  //   totalContributions: { type: String, required: true },
  // },
  wirrScore: {type: Number, required: true},
})

module.exports = Article = mongoose.model('Article', ArticleSchema);