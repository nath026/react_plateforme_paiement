const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Trader = require('./Trader');
const Customer = require('./Customer');


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

// One-To-Many
Trader.MyArticles = Trader.hasMany(Article, {
  as: 'myArticles',
  foreignKey: 'traderID',
});
Article.belongsTo(Trader, { as: 'trader' }); // unique marchand

// One-To-Many
Customer.MyArticles = Customer.hasMany(Article, {
  as: 'myArticles',
  foreignKey: 'traderID',
});
Article.belongsTo(Customer, { as: 'customer' }); // unique customer



module.exports = Article;
