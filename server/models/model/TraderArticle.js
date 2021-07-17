const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const TraderArticleSchema = new Schema({

  lastname: String,
  firstname: String,
  username: String,
  myArticles: Array,
  companyName: String,
  kbis: String,
  devise: String,
  contactEmail: String,
  password: String,
  confirmed: Boolean,
  role: String,
  confirmationURL: String,
  cancelUrL: String,
  client_toke: String,
  client_secret: String,
});

const TraderArticle = conn.model('TraderArticle', TraderArticleSchema);

module.exports = TraderArticle;
