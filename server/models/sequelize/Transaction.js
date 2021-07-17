const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Trader = require('./Trader');
const Order = require('./Order');

class Transaction extends Model {}

Transaction.init(
  // Schema
  {
    addressFacturation: DataTypes.STRING,
    addressLivraison: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: 'Transaction',
    paranoid: true,
  },
);

// One-To-One
Order.hasOne(Transaction);
Transaction.belongsTo(Order, { as: "order" }); // unique author

// One-To-Many
// Trader.MyArticles = Trader.hasMany(Transaction, {
//   as: 'myArticles',
//   foreignKey: 'traderID',
// });
// Transaction.belongsTo(Trader, { as: 'trader' }); // unique marchand

// Many-To-Many
// Article.belongsToMany(User, { as: "coauthors" }); // multiple author
// User.hasMany(Article)

module.exports = Transaction;
