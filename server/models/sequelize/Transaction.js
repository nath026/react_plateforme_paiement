const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class Transaction extends Model {}

Transaction.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    addressFacturation: DataTypes.STRING,
    addressLivraison: DataTypes.STRING,
    date: DataTypes.DATE,
    currency: {
      type: DataTypes.ENUM(['EUR', 'YEN', 'USD']),
      allowNull: false,
      defaultValue: 'EUR',
    },
    state: {
      type: DataTypes.ENUM(['PENDING', 'ACCEPTED', 'VALIDATED']),
      allowNull: false,
      defaultValue: 'PENDING',
    },

  },
  {
    sequelize: connection,
    modelName: 'Transaction',
    paranoid: true,
  },
);

module.exports = Transaction;
