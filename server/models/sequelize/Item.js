const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class Item extends Model {}

Item.init(
  // Schema
  {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: 'Item',
    paranoid: true,
  },
);

module.exports = Item;
