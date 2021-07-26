const mongoose = require("mongoose");
const ArticleSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;