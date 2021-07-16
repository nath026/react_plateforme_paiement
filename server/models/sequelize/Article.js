const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Trader = require('./Trader');

class Article extends Model {}

Article.init(
  // Schema
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.BIGINT,
    quantity: DataTypes.BIGINT,
  },
  {
    sequelize: connection,
    modelName: 'Article',
    paranoid: true,
  },
);

// One-To-One
// User.hasOne(Article)
// Article.belongsTo(User, { as: "author" }); // unique author

// One-To-Many
Trader.MyArticles = Trader.hasMany(Article, {
  as: 'myArticles',
  foreignKey: 'traderId',
});
Article.belongsTo(Trader, { as: 'trader' }); // unique marchand

// Many-To-Many
// Article.belongsToMany(User, { as: "coauthors" }); // multiple author
// User.hasMany(Article)

module.exports = Article;
