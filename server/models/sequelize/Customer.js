const { Model, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const connection = require('../../lib/sequelize');
// const { Article } = require('./Article');

class Customer extends Model {}

Customer.init(
  // Schema
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    adress: DataTypes.STRING,
    articles: DataTypes.ARRAY,
  },
  {
    sequelize: connection,
    modelName: 'Customer',
    paranoid: true,
  },
);

module.exports = Customer;
