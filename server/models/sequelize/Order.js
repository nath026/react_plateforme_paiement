const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Transaction = require('./Transaction');
const Article = require('./Article');

class Order extends Model {}

Order.init(
  // Schema
  {
    totalPrice: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: 'Order',
    paranoid: true,
  },
);

module.exports = Order;
