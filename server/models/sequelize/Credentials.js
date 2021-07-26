const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');

class Credentials extends Model {}

Credentials.init(
  // Schema
  {
    token: DataTypes.STRING,
    secret: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: 'Credentials',
    paranoid: true,
  },
);

module.exports = Credentials;
