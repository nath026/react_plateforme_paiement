// const { Model, DataTypes } = require('sequelize');
// const connection = require('../../lib/sequelize');
// const Trader = require('./Trader');

// class Article extends Model {}

// Article.init(
//   // Schema
//   {
//     name: DataTypes.STRING,
//     description: DataTypes.STRING,
//     price: DataTypes.BIGINT,
//     quantity: DataTypes.BIGINT,
//   },
//   {
//     sequelize: connection,
//     modelName: 'Article',
//     paranoid: true,
//   },
// );

// module.exports = Article;
const connection = require("../../lib/sequelize");
const { Model, DataTypes } = require("sequelize");

class Article extends Model {}

Article.init(
  //Schema
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Article",
    paranoid: true,
  }
);

// One-To-One
//User.hasOne(Article)
//Article.belongsTo(User, { as: "author" }); // unique author

// One-To-Many
// User.MyArticles = User.hasMany(Article, {
//   as: "myArticles",
//   foreignKey: "authorId",
// });
// Article.belongsTo(User, { as: "author" }); // unique author

// Many-To-Many
//Article.belongsToMany(User, { as: "coauthors" }); // multiple author
//User.hasMany(Article)

module.exports = Article;

