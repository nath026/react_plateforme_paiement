const { Model, DataTypes } = require('sequelize');
const connection = require('../../lib/sequelize');
const Trader = require('./Trader');

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

module.exports = Article;
