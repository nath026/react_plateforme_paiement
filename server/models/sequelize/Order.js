const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Article = require('./Article');
const Transaction = require('./Transaction');


class Order extends Model {}

Order.init(
  // Schema
  {
    totalPrice: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: 'Transaction',
    paranoid: true,
  },
);

// One-To-One
// Order.hasOne(Order)
// Order.belongsTo(Order, { as: "order" }); // unique author

// One-To-Many
// Trader.MyArticles = Trader.hasMany(Transaction, {
//   as: 'myArticles',
//   foreignKey: 'traderID',
// });
// Transaction.belongsTo(Trader, { as: 'trader' }); // unique marchand

// Many-To-Many
Article.belongsToMany(Transaction, { as: "multipleArticle" }); // multiple author
Transaction.hasMany(Article)

module.exports = Order;
