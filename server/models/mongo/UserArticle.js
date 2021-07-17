const { Schema } = require('mongoose');
const conn = require('../../lib/mongo');

const UserArticleSchema = new Schema({
  lastname: String,
  firstname: String,
  username: String,
  myArticles: Array,
});

const UserArticle = conn.model('UserArticle', UserArticleSchema);

module.exports = UserArticle;
