const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const connection = require('../../lib/sequelize');
// const { Article } = require('./Article');

class Trader extends Model {}

Trader.init(
  // Schema
  {
    companyName: DataTypes.STRING,
    kbis: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    devise: DataTypes.ENUM(['EUR', 'USD', 'YEN']),
    contactEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(['PENDING', 'BASIC', 'ADMIN']),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    confirmationURL: DataTypes.STRING,
    cancelUrL: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: 'Trader',
    paranoid: true,
  },
);

const cryptPassword = /* 1BBCFG34237 */ async (trader) => {
  // eslint-disable-next-line no-param-reassign
  trader.password = await bcryptjs.hash(trader.password, await bcryptjs.genSalt());
};
Trader.addHook('beforeCreate', /* 1BBCFG34237 */ cryptPassword);
Trader.addHook('beforeUpdate', /* 1BBCFG34237 */ cryptPassword);
// Trader.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);

module.exports = Trader;
