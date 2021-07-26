const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class Transaction extends Model {}

Transaction.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    price: DataTypes.BIGINT,
    addressFacturation: DataTypes.STRING,
    addressLivraison: DataTypes.STRING,
    date: DataTypes.DATE,
    currency: DataTypes.STRING,
    state: DataTypes.ENUM(['PENDING', 'ACCEPTED', 'VALIDATED']),
  },
  {
    sequelize: connection,
    modelName: 'Transaction',
    paranoid: true,
  },
);

module.exports = Transaction;
